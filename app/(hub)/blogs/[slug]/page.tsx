import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug, getPostNeighbors } from '../../../../src/lib/blog';
import { PostView } from '../../../../src/components/PostView';

interface PostParams {
  slug: string;
}

export function generateStaticParams(): PostParams[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<PostParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} — Bao Quach`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<PostParams>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const { prev, next } = getPostNeighbors(slug);

  return <PostView post={post} prev={prev} next={next} />;
}