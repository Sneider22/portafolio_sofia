// Convierte las imágenes de assets-originales/ a WebP livianas en public/assets/.
// Por cada imagen genera dos tamaños: <nombre>.webp (grande) y <nombre>-sm.webp (miniatura).
// Uso: npm run imagenes   (vuelve a correrlo cada vez que agregues fotos nuevas)
import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ORIGEN = 'assets-originales'
const DESTINO = 'public/assets'
const TAMANOS = [
  { sufijo: '', ancho: 2400, calidad: 80 },
  { sufijo: '-sm', ancho: 1000, calidad: 74 },
]

// "render 1.png" -> "render-1", "planta_terraza_construcción.png" -> "planta-terraza-construccion"
const limpiarNombre = (archivo) =>
  path.parse(archivo).name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+$/, '')

async function procesarCarpeta(carpeta) {
  const entradas = await readdir(path.join(ORIGEN, carpeta), { withFileTypes: true })
  for (const entrada of entradas) {
    const relativa = path.join(carpeta, entrada.name)
    if (entrada.isDirectory()) {
      await procesarCarpeta(relativa)
      continue
    }
    if (!/\.(png|jpe?g)$/i.test(entrada.name)) continue

    const salidaDir = path.join(DESTINO, carpeta)
    await mkdir(salidaDir, { recursive: true })
    const nombre = limpiarNombre(entrada.name)

    for (const { sufijo, ancho, calidad } of TAMANOS) {
      const salida = path.join(salidaDir, `${nombre}${sufijo}.webp`)
      await sharp(path.join(ORIGEN, relativa))
        .rotate()
        .resize({ width: ancho, withoutEnlargement: true })
        .webp({ quality: calidad })
        .toFile(salida)
    }
    const kb = Math.round((await stat(path.join(salidaDir, `${nombre}.webp`))).size / 1024)
    console.log(`${relativa} -> ${path.join(carpeta, nombre)}.webp (${kb} KB)`)
  }
}

await procesarCarpeta('')
