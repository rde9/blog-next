import { compareDesc, format, parseISO } from 'date-fns';
import { Article, allArticles } from 'contentlayer/generated';

export function formatDate(date: string): string {
  const isoDate = parseISO(date);
  const formattedDate = format(isoDate, 'yyyy-MM-dd');
  return formattedDate;
}

export function getPost(slug: string): Article | undefined {
  return allArticles.find((post) => post.slug === slug);
}

export function getPostsByTag(tag: string): Article[] {
  return allArticles.filter((post) => post.tags.includes(tag));
}

export function getSortedPosts(posts: Article[] = allArticles): Article[] {
  return posts.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  );
}

export function getSortedPostsByPage(page: number, perPage: number): Article[] {
  return getSortedPosts().slice((page - 1) * perPage, page * perPage);
}

export function getPagesCount(
  perPage: number,
  posts: Article[] = allArticles,
): number {
  return Math.ceil(posts.length / perPage);
}

export function getSortedPostsGroupedByYear(
  posts: Article[],
): { year: number; posts: Article[] }[] {
  const grouped = posts.reduce(
    (acc, post) => {
      const year = new Date(post.createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, Article[]>,
  );

  const groupedArray = Object.entries(grouped).map(([year, posts]) => ({
    year: Number(year),
    posts: posts.sort((a, b) =>
      compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
    ),
  }));

  return groupedArray.sort((a, b) => b.year - a.year);
}

export function getAllTags(): Record<string, number> {
  const tags = allArticles.reduce(
    (acc, post) => {
      post.tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = 0;
        }
        acc[tag]++;
      });
      return acc;
    },
    {} as Record<string, number>,
  );
  return tags;
}
