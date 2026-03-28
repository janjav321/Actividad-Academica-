// api/lista.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const lista = await kv.get('lista') || [];
  return res.json({ registrados: lista });
}
