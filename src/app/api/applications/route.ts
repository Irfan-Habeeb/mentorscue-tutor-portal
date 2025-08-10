import { NextRequest, NextResponse } from 'next/server'
import { supabase, mockData } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (supabase) {
      const { data, error } = await supabase
        .from('applications')
        .insert([{
          personal_info: body.personalInfo,
          education: body.education,
          experience: body.experience,
          availability: body.availability,
          additional: body.additional,
          status: 'pending'
        }])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'Failed to submit application' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { message: 'Application submitted successfully', data },
        { status: 201 }
      )
    } else {
      // Mock implementation
      const newApplication = {
        id: Date.now().toString(),
        personal_info: body.personalInfo,
        education: body.education,
        experience: body.experience,
        availability: body.availability,
        additional: body.additional,
        status: 'pending' as const,
        applied_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      mockData.applications.push(newApplication)
      
      return NextResponse.json(
        { message: 'Application submitted successfully', data: newApplication },
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
    const status = searchParams.get('status')
    const subject = searchParams.get('subject')
    const search = searchParams.get('search')

    if (supabase) {
      let query = supabase
        .from('applications')
        .select('*')
        .order('applied_at', { ascending: false })

      // Filter by status
      if (status && status !== 'all') {
        query = query.eq('status', status)
      }

      // Filter by subject (search in experience.subjects array)
      if (subject && subject !== 'all') {
        query = query.contains('experience', { subjects: [subject] })
      }

      // Search by name or email
      if (search) {
        query = query.or(`personal_info->>firstName.ilike.%${search}%,personal_info->>lastName.ilike.%${search}%,personal_info->>email.ilike.%${search}%`)
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'Failed to fetch applications' },
          { status: 500 }
        )
      }

      return NextResponse.json(data)
    } else {
      // Mock implementation
      let applications = [...mockData.applications]
      
      // Filter by status
      if (status && status !== 'all') {
        applications = applications.filter(app => app.status === status)
      }
      
      // Filter by subject
      if (subject && subject !== 'all') {
        applications = applications.filter(app => 
          app.experience.subjects?.includes(subject)
        )
      }
      
      // Search by name or email
      if (search) {
        const searchLower = search.toLowerCase()
        applications = applications.filter(app => 
          app.personal_info.firstName.toLowerCase().includes(searchLower) ||
          app.personal_info.lastName.toLowerCase().includes(searchLower) ||
          app.personal_info.email.toLowerCase().includes(searchLower)
        )
      }
      
      return NextResponse.json(applications)
    }
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}