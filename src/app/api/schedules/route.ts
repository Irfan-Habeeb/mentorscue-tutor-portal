import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tutor_id,
      date,
      start_time,
      end_time,
      subject,
      class_level,
      student_name,
      student_contact,
      notes
    } = body

    // Validate required fields
    if (!tutor_id || !date || !start_time || !end_time || !subject || !class_level || !student_name || !student_contact) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check for schedule conflicts
    const { data: existingSchedules, error: conflictError } = await supabase
      .from('schedules')
      .select('*')
      .eq('tutor_id', tutor_id)
      .eq('date', date)
      .overlaps('start_time', start_time, 'end_time', end_time)

    if (conflictError) {
      console.error('Error checking conflicts:', conflictError)
      return NextResponse.json(
        { error: 'Failed to check schedule conflicts' },
        { status: 500 }
      )
    }

    if (existingSchedules && existingSchedules.length > 0) {
      return NextResponse.json(
        { error: 'Schedule conflict: Tutor is already booked for this time slot' },
        { status: 409 }
      )
    }

    // Insert new schedule
    const { data, error } = await supabase
      .from('schedules')
      .insert({
        tutor_id,
        date,
        start_time,
        end_time,
        subject,
        class_level,
        student_name,
        student_contact,
        notes
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating schedule:', error)
      return NextResponse.json(
        { error: 'Failed to create schedule' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/schedules:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tutorId = searchParams.get('tutorId')
    const date = searchParams.get('date')
    const status = searchParams.get('status')

    let query = supabase
      .from('schedules')
      .select(`
        *,
        tutors (
          id,
          name,
          subjects,
          classes,
          hourly_rate
        )
      `)

    if (tutorId) {
      query = query.eq('tutor_id', tutorId)
    }

    if (date) {
      query = query.eq('date', date)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('date', { ascending: true }).order('start_time', { ascending: true })

    if (error) {
      console.error('Error fetching schedules:', error)
      return NextResponse.json(
        { error: 'Failed to fetch schedules' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/schedules:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}