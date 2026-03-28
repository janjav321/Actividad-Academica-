// api/registrar.js
// Vercel Serverless Function — guarda registros en Vercel KV (free)

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, apellido, cedula, email, tel } = req.body;

  if (!nombre || !apellido || !cedula || !email || !tel) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  // Check if already registered by cedula or email
  const existeCedula = await kv.get(`cedula:${cedula.replace(/-/g,'')}`);
  const existeEmail  = await kv.get(`email:${email.toLowerCase()}`);

  if (existeCedula || existeEmail) {
    const existing = existeCedula || existeEmail;
    return res.status(200).json({ codigo: existing.codigo, yaExistia: true });
  }

  // Generate unique code
  const codigo = 'UNIBE-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2,5).toUpperCase();
  const fecha  = new Date().toLocaleString('es-DO', { timeZone: 'America/Santo_Domingo' });

  const persona = { nombre, apellido, cedula, email, tel, codigo, fecha };

  // Store with multiple lookup keys
  await kv.set(`codigo:${codigo}`, persona);
  await kv.set(`cedula:${cedula.replace(/-/g,'')}`, persona);
  await kv.set(`email:${email.toLowerCase()}`, persona);

  // Add to master list
  const lista = await kv.get('lista') || [];
  lista.push(persona);
  await kv.set('lista', lista);

  return res.status(200).json({ codigo });
}
