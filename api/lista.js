// api/lista.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  const r = await fetch(`${url}/lrange/lista/0/-1`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const d = await r.json();
  const lista = d.result ? d.result.map(i => JSON.parse(i)) : [];
  return res.json({ registrados: lista });
}
