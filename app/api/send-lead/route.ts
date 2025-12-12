import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const BACKUP_EMAIL = 'arnaldostore1@gmail.com';

export async function POST(request: NextRequest) {
  try {
    // Verifica che la chiave API sia configurata
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - email backup skipped');
      return NextResponse.json({ success: false, error: 'Email service not configured' }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name, phone, address, landing, price, currency, quantity, timestamp } = body;

    // Formatta la data
    const date = new Date(timestamp || Date.now());
    const formattedDate = date.toLocaleString('it-IT', {
      timeZone: 'Europe/Rome',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Invia email con Resend
    const { data, error } = await resend.emails.send({
      from: 'Prixily Orders <orders@prixily.com>',
      to: [BACKUP_EMAIL],
      subject: `🛒 Nuovo Ordine - ${landing} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🛒 Nuovo Ordine Ricevuto</h1>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Landing Page:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #212529;">${landing}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Data/Ora:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #212529;">${formattedDate}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #e9ecef; border-top: none;">
            <h2 style="color: #495057; font-size: 18px; margin-top: 0;">👤 Dati Cliente</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057; width: 120px;">Nome:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #212529;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Telefono:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #212529;"><a href="tel:${phone}" style="color: #007bff;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Indirizzo:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #212529;">${address}</td>
              </tr>
            </table>
          </div>

          <div style="background: #e8f5e9; padding: 20px; border: 1px solid #c8e6c9; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #2e7d32; font-size: 18px; margin-top: 0;">💰 Dettagli Ordine</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">Quantità:</td>
                <td style="padding: 10px 0; color: #212529;">${quantity || 1}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">Prezzo Totale:</td>
                <td style="padding: 10px 0; color: #2e7d32; font-size: 20px; font-weight: bold;">${price} ${currency}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; padding: 20px; color: #6c757d; font-size: 12px;">
            <p>Questa email è stata inviata automaticamente da Prixily</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
