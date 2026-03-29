// api/registrar.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, apellido, cedula, email, tel } = req.body;
  if (!nombre || !apellido || !cedula || !email || !tel)
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  async function kvGet(key) {
    const r = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const d = await r.json();
    return d.result ? JSON.parse(d.result) : null;
  }

  async function kvSet(key, value) {
    await fetch(`${url}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([JSON.stringify(value)])
    });
  }

  async function kvLpush(key, value) {
    await fetch(`${url}/lpush/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([JSON.stringify(value)])
    });
  }

  const existeCedula = await kvGet(`cedula:${cedula.replace(/-/g,'')}`);
  const existeEmail  = await kvGet(`email:${email.toLowerCase()}`);

  if (existeCedula || existeEmail) {
    const existing = existeCedula || existeEmail;
    return res.status(200).json({ codigo: existing.codigo, yaExistia: true });
  }

  const codigo = 'UNIBE-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2,5).toUpperCase();
  const fecha  = new Date().toLocaleString('es-DO', { timeZone: 'America/Santo_Domingo' });
  const persona = { nombre, apellido, cedula, email, tel, codigo, fecha };

  await kvSet(`codigo:${codigo}`, persona);
  await kvSet(`cedula:${cedula.replace(/-/g,'')}`, persona);
  await kvSet(`email:${email.toLowerCase()}`, persona);
  await kvLpush('lista', persona);

  return res.status(200).json({ codigo });
}
