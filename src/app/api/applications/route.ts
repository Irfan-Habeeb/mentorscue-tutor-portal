import { NextRequest, NextResponse } from 'next/server'
import { supabase, mockData, Application } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (supabase) {
      const { data, error } = await supabase
        .from('applications')
        .insert([body])
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data, { status: 201 })
    } else {
      // Mock data fallback
      const newApplication: Application = {
        id: Math.random().toString(36).substr(2, 9),
        ...body,
        applied_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockData.applications.push(newApplication)
      return NextResponse.json(newApplication, { status: 201 })
    }
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')

    if (supabase) {
      let query = supabase.from('applications').select('*')
      
      if (status) {
        query = query.eq('status', status)
      }
      
      if (email) {
        query = query.eq('personal_info->email', email)
      }

      const { data, error } = await query.order('applied_at', { ascending: false })

      if (error) throw error
      return NextResponse.json(data)
    } else {
      // Mock data fallback
      let filteredApplications = mockData.applications

      if (status) {
        filteredApplications = filteredApplications.filter((app: Application) => app.status === status)
      }

      if (email) {
        filteredApplications = filteredApplications.filter((app: Application) => 
          app.personal_info.email === email
        )
      }

      return NextResponse.json(filteredApplications)
    }
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}