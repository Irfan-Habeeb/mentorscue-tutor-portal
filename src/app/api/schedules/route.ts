import { NextRequest, NextResponse } from 'next/server'
import { supabase, mockData } from '@/lib/supabase'

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

    if (supabase) {
      // Check for schedule conflicts
      const { data: existingSchedules, error: conflictError } = await supabase
        .from('schedules')
        .select('*')
        .eq('tutor_id', tutor_id)
        .eq('date', date)
        .or(`start_time.lte.${end_time},end_time.gte.${start_time}`)

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
    } else {
      // Mock implementation
      const newSchedule = {
        id: Date.now().toString(),
        tutor_id,
        date,
        start_time,
        end_time,
        subject,
        class_level,
        student_name,
        student_contact,
        status: 'scheduled' as const,
        notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      mockData.schedules.push(newSchedule)
      
      return NextResponse.json(newSchedule, { status: 201 })
    }
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

    if (supabase) {
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
    } else {
      // Mock implementation
      let schedules = [...mockData.schedules]
      
      if (tutorId) {
        schedules = schedules.filter(schedule => schedule.tutor_id === tutorId)
      }
      
      if (date) {
        schedules = schedules.filter(schedule => schedule.date === date)
      }
      
      if (status) {
        schedules = schedules.filter(schedule => schedule.status === status)
      }
      
      return NextResponse.json(schedules.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date)
        if (dateCompare !== 0) return dateCompare
        return a.start_time.localeCompare(b.start_time)
      }))
    }
  } catch (error) {
    console.error('Error in GET /api/schedules:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}