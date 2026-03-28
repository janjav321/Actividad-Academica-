# Sistema de Registro UNIBE 🎓

Formulario de registro con código QR para actividades académicas.

---

## ¿Cómo publicarlo? (5 minutos, gratis)

### Paso 1 — Sube los archivos a GitHub

1. Ve a **github.com** y crea una cuenta gratuita si no tienes
2. Clic en **New repository** → ponle el nombre `unibe-registro` → clic en **Create**
3. Arrastra todos estos archivos al repositorio y haz clic en **Commit changes**

---

### Paso 2 — Conéctalo a Vercel

1. Ve a **vercel.com** y regístrate con tu cuenta de GitHub
2. Clic en **Add New Project**
3. Selecciona el repositorio `unibe-registro`
4. Clic en **Deploy** — Vercel lo publica automáticamente

---

### Paso 3 — Activa la base de datos (gratis)

1. En tu proyecto de Vercel, ve a la pestaña **Storage**
2. Clic en **Create Database** → selecciona **KV (Redis)**
3. Ponle cualquier nombre → clic en **Create**
4. Clic en **Connect to Project** → selecciona tu proyecto
5. Vercel conecta todo automáticamente

---

### Paso 4 — ¡Listo! Comparte los links

Vercel te da un link como `unibe-registro.vercel.app`

- **Para la gente:** `tudominio.vercel.app` → llenan el formulario y obtienen su QR
- **Para ti (organizador):** `tudominio.vercel.app/verificar.html` → escaneas el QR en el evento

---

## ¿Cómo funciona en el evento?

1. La persona abre su QR en el celular
2. Tú abres `tudominio.vercel.app/verificar.html` en tu celular o tablet
3. Clic en **Iniciar cámara** y apuntas al QR de la persona
4. Aparece ✅ **Registrado** con todos sus datos, o ❌ **No registrado**

---

## Páginas incluidas

| Página | URL | Para quién |
|--------|-----|-----------|
| Formulario | `/` | Los asistentes |
| Verificador | `/verificar.html` | El organizador |
