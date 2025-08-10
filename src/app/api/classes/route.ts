import { NextResponse } from 'next/server'
import { supabase, mockData } from '@/lib/supabase'

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('name')

      if (error) throw error
      return NextResponse.json(data)
    } else {
      // Mock data fallback
      return NextResponse.json(mockData.classes)
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    )
  }
}