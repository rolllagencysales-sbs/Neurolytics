import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies() // Next.js 15 için await eklendi

  // Yeni nesil Supabase Server Client kurulumu
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component içindeyken cookie set edilemeyebilir, hata vermemesi için boş bıraktık
          }
        },
      },
    }
  )

  // 1. Giriş yapmış kullanıcıyı bul
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

  // 2. Kullanıcının API anahtarlarını çek
  const { data: keys } = await supabase
    .from('integrations')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  if (!keys?.meta_access_token) {
    return NextResponse.json({ error: "Meta API anahtarı bulunamadı" }, { status: 404 })
  }

  try {
    // 3. Meta Graph API'ye istek at
    const metaUrl = `https://graph.facebook.com/v19.0/${keys.meta_ad_account_id}/insights?fields=spend,clicks,ctr,impressions&date_preset=last_7d&access_token=${keys.meta_access_token}`
    
    const response = await fetch(metaUrl)
    const metaData = await response.json()

    if (metaData.error) throw new Error(metaData.error.message)

    return NextResponse.json(metaData.data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}