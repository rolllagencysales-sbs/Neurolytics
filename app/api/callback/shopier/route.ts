import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Vercel üzerinde Service Role Key kullanımı için kontrol
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const status = formData.get('status')?.toString();
    
    // Shopier'den gelen kullanıcı ID'sini alıyoruz
    // Önemli: res_id veya platform_order_id olarak gelebilir.
    const platformUserId = formData.get('res_id')?.toString() || formData.get('platform_order_id')?.toString();
    const productId = formData.get('product_id')?.toString();

    if (status === 'success' && platformUserId) {
      // 1. Abonelik Süresini Hesapla
      let daysToAdd = 30;
      let planName = "1 Aylık Pro";

      if (productId === '46451431') {
        daysToAdd = 90;
        planName = "3 Aylık Gold";
      } else if (productId === '46451459') {
        daysToAdd = 365;
        planName = "12 Aylık Elite";
      }

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + daysToAdd);

      // 2. Aboneliği Güncelle
      const { error: subError } = await supabaseAdmin
        .from('subscriptions')
        .upsert({
          user_id: platformUserId,
          status: 'active',
          plan_type: planName,
          expires_at: expiryDate.toISOString(),
          updated_at: new Date().toISOString()
        });

      if (subError) throw subError;

      // 3. Fatura Geçmişine Kaydet (Hata aldığın kısım burasıydı)
      const { error: historyError } = await supabaseAdmin
        .from('payment_history')
        .insert({
          user_id: platformUserId, // Hatalı olan 'userId' yerine 'platformUserId' kullandık
          amount: productId === '46451401' ? "299 TL" : productId === '46451431' ? "799 TL" : "2.499 TL",
          plan_name: planName,
          status: "Başarılı"
        });

      if (historyError) throw historyError;
      
      return new Response("OK", { status: 200 });
    }

    return new Response("Payment failed or invalid data", { status: 400 });
  } catch (err: any) {
    console.error("Shopier Callback Error:", err.message);
    return new Response("Internal Error", { status: 500 });
  }
}