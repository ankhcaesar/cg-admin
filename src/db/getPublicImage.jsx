import { supabase } from './supabaseclient';


const IMAGE_CONFIG = {
  fallback: '/imgs/e404.webp',
  bucket: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET
};

export async function getPublicImage(folder, imageName) {
  if (!imageName) return IMAGE_CONFIG.fallback;

  try {
    const { data, error } = supabase.storage
      .from(IMAGE_CONFIG.bucket)
      .getPublicUrl(`${folder}/${imageName}.webp`);

    if (error || !data?.publicUrl) throw new Error('Error al obtener la URL pública');

    const publicUrl = data.publicUrl;

    const cache = window.__imageCache || (window.__imageCache = {});
    if (cache[publicUrl]) return publicUrl;

    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = () => {
        cache[publicUrl] = true;
        resolve();
      };
      img.onerror = () => reject(new Error('Imagen no encontrada'));
      img.src = publicUrl;
    });

    return publicUrl;
  } catch (error) {
    return IMAGE_CONFIG.fallback;
  }
}
