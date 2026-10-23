import type { MetadataRoute } from 'next';
import { defaultCVData } from '../src/cvData';
import { getAllPosts } from '../src/lib/blog';

export const dynamic = 'force-static';

const BASE_URL = 'https://quachgiabao.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/projects/',
    '/publications/',
    '/blogs/',
    '/tags/',
    '/contact/',
    '/cv/',
    ...defaultCVData.projects.map((project) => `/projects/${project.slug}/`),
    ...(defaultCVData.publications ?? []).map((pub) => `/publications/${pub.slug}/`),
    ...getAllPosts().map((post) => `/blogs/${post.slug}/`),
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.7,
  }));
}
