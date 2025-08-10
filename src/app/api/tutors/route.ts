import { NextRequest, NextResponse } from 'next/server'
import { supabase, mockData } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      subjects,
      classes,
      experience,
      hourly_rate,
      timezone,
      status,
      bio
    } = body

    // Validate required fields
    if (!name || !subjects || !classes || !experience || !hourly_rate || !timezone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (supabase) {
      // Insert new tutor
      const { data, error } = await supabase
        .from('tutors')
        .insert({
          name,
          subjects,
          classes,
          experience,
          hourly_rate: parseFloat(hourly_rate),
          timezone,
          status: status || 'active',
          bio
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating tutor:', error)
        return NextResponse.json(
          { error: 'Failed to create tutor' },
          { status: 500 }
        )
      }

      return NextResponse.json(data, { status: 201 })
    } else {
      // Mock implementation
      const newTutor = {
        id: Date.now().toString(),
        name,
        subjects,
        classes,
        experience,
        rating: 0,
        hourly_rate: parseFloat(hourly_rate),
        timezone,
        status: status || 'active',
        avatar_url: undefined,
        bio,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      mockData.tutors.push(newTutor)
      
      return NextResponse.json(newTutor, { status: 201 })
    }
  } catch (error) {
    console.error('Error in POST /api/tutors:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject')
    const classLevel = searchParams.get('class')
    const status = searchParams.get('status')

    if (supabase) {
      let query = supabase
        .from('tutors')
        .select('*')

      if (subject && subject !== 'all') {
        query = query.contains('subjects', [subject])
      }

      if (classLevel && classLevel !== 'all') {
        query = query.contains('classes', [classLevel])
      }

      if (status && status !== 'all') {
        query = query.eq('status', status)
      }

      const { data, error } = await query.order('name', { ascending: true })

      if (error) {
        console.error('Error fetching tutors:', error)
        return NextResponse.json(
          { error: 'Failed to fetch tutors' },
          { status: 500 }
        )
      }

      return NextResponse.json(data)
    } else {
      // Mock implementation
      let tutors = [...mockData.tutors]
      
      if (subject && subject !== 'all') {
        tutors = tutors.filter(tutor => tutor.subjects.includes(subject))
      }
      
      if (classLevel && classLevel !== 'all') {
        tutors = tutors.filter(tutor => tutor.classes.includes(classLevel))
      }
      
      if (status && status !== 'all') {
        tutors = tutors.filter(tutor => tutor.status === status)
      }
      
      return NextResponse.json(tutors.sort((a, b) => a.name.localeCompare(b.name)))
    }
  } catch (error) {
    console.error('Error in GET /api/tutors:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}