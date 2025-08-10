import { NextRequest, NextResponse } from 'next/server'
import { supabase, mockData } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (supabase) {
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
    } else {
      // Mock implementation
      const newBooking = {
        id: Date.now().toString(),
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
        notes: body.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      mockData.bookings.push(newBooking)
      
      return NextResponse.json(
        { message: 'Booking submitted successfully', data: newBooking },
        { status: 201 }
      )
    }
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

    if (supabase) {
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
    } else {
      // Mock implementation
      let bookings = [...mockData.bookings]
      
      if (tutorId) {
        bookings = bookings.filter(booking => booking.tutor_id === tutorId)
      }
      
      if (date) {
        bookings = bookings.filter(booking => booking.date === date)
      }
      
      if (status) {
        bookings = bookings.filter(booking => booking.status === status)
      }
      
      return NextResponse.json(bookings.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ))
    }
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}