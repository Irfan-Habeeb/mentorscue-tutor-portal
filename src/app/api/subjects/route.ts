import { NextResponse } from 'next/server'
import { supabase, mockData } from '@/lib/supabase'

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name')

      if (error) throw error
      return NextResponse.json(data)
    } else {
      // Mock data fallback
      return NextResponse.json(mockData.subjects)
    }
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    )
  }
}