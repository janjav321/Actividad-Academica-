// api/verificar.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { codigo, q } = req.query;

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  async function kvGet(key) {
    const r = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const d = await r.json();
    return d.result ? JSON.parse(d.result) : null;
  }

  async function kvLrange(key) {
    const r = await fetch(`${url}/lrange/${encodeURIComponent(key)}/0/-1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const d = await r.json();
    return d.result ? d.result.map(i => JSON.parse(i)) : [];
  }

  if (codigo) {
    const persona = await kvGet(`codigo:${codigo}`);
    if (persona) return res.json({ encontrado: true, persona });
    return res.json({ encontrado: false });
  }

  if (q) {
    const term = q.toLowerCase().replace(/-/g,'');
    const lista = await kvLrange('lista');
    const match = lista.find(p =>
      p.nombre.toLowerCase().includes(term) ||
      p.apellido.toLowerCase().includes(term) ||
      `${p.nombre} ${p.apellido}`.toLowerCase().includes(term) ||
      p.cedula.replace(/-/g,'').includes(term) ||
      p.email.toLowerCase().includes(term)
    );
    if (match) return res.json({ encontrado: true, persona: match });
    return res.json({ encontrado: false });
  }

  return res.status(400).json({ error: 'Parámetro requerido.' });
}
