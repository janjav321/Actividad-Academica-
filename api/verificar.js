// api/verificar.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { codigo, q } = req.query;

  // Search by QR code
  if (codigo) {
    const persona = await kv.get(`codigo:${codigo}`);
    if (persona) return res.json({ encontrado: true, persona });
    return res.json({ encontrado: false });
  }

  // Search by name or cedula
  if (q) {
    const term = q.toLowerCase().replace(/-/g,'');
    const lista = await kv.get('lista') || [];

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
