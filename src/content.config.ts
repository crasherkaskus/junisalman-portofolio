import { defineCollection, z } from 'astro:content';
// Pastikan ini diimpor jika Anda menggunakan loader glob
import { glob } from 'astro/loaders';

export const collections = {
    // --- KOLEKSI 1: WORK ---
    work: defineCollection({
        // Load Markdown files in the src/content/work directory.
        loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
        schema: ({ image }) => z.object({
            title: z.string(),
            description: z.string(),
            publishDate: z.coerce.date(),
            tags: z.array(z.string()),
            img: image(),
            img_alt: z.string().optional(),
        }),
    }), // <--- WAJIB ADA TANDA KOMA (,) UNTUK MEMISAHKAN KOLEKSI!

    // --- KOLEKSI 2: BLOG ---
    blog: defineCollection({
        // Tentukan agar mencari file di src/content/blog
        loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
        schema: ({ image }) => z.object({
            title: z.string(),
            description: z.string().optional(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
        }),
    }),
}; // <--- HANYA SATU KURUNG KURAWAL PENUTUP UNTUK collections