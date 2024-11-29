// See documentation here:
// https://docs.astro.build/en/guides/content-collections/

// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from 'astro:content';

// 2. Define your collection(s)
const componentsCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: reference('category'),
    subcategory: reference('subcategory').optional(),
  }),
});

const categoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    isSpecial: z.boolean().optional(),
  }),
});

const subcategoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    category: reference('category'),
  }),
});
// schema: ({ image }) => z.object({
//   title: z.string(),
//   description: z.string(),
//   // cover: image(),
//   // cover2x: image(),
//   // cover: image().refine((img) => img.width >= 357, {
//   //   message: "Cover image must be at least 357 pixels wide!",
//   // }),
//   // cover2x: image().refine((img) => img.width >= 714, {
//   //   message: "Cover image must be at least 714 pixels wide!",
//   // }),
// }),
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'components': componentsCollection,
  'category': categoriesCollection,
  'subcategory': subcategoriesCollection,
};