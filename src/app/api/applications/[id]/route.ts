import { NextRequest, NextResponse } from 'next/server'
import { supabase, mockData, Application } from '@/lib/supabase'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const { status } = body

    if (supabase) {
      const { data, error } = await supabase
        .from('applications')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'Failed to update application' },
          { status: 500 }
        )
      }

      return NextResponse.json(data[0])
    } else {
      // Mock implementation
      const applicationIndex = mockData.applications.findIndex((app: Application) => app.id === id)
      if (applicationIndex === -1) {
        return NextResponse.json(
          { error: 'Application not found' },
          { status: 404 }
        )
      }
      
      const application = mockData.applications[applicationIndex] as Application
      application.status = status
      application.updated_at = new Date().toISOString()
      
      return NextResponse.json(application)
    }
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}