import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        tutor_id: body.tutorId,
        student_name: body.studentName,
        student_email: body.studentEmail,
        subject: body.subject,
        date: body.date,
        start_time: body.startTime,
        end_time: body.endTime,
        duration: body.duration,
        total_price: body.totalPrice,
        status: 'pending',
        notes: body.notes
      }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit booking' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Booking submitted successfully', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Server error:', error)
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
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (tutorId) {
      query = query.eq('tutor_id', tutorId)
    }

    if (date) {
      query = query.eq('date', date)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}