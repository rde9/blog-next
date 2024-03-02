'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'react-feather';

type Props = {
  pageId: string;
  pagePath: string;
  pagesCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export const PaginationControl: FC<Props> = ({
  pagePath,
  pageId,
  pagesCount,
  hasNextPage,
  hasPrevPage,
}) => {
  const prevHref = hasPrevPage ? `${pagePath}/${Number(pageId) - 1}` : '';
  const nextHref = hasNextPage ? `${pagePath}/${Number(pageId) + 1}` : '';
  const disabled = 'cursor-not-allowed opacity-50';

  return (
    <nav className='my-6 flex justify-center gap-3 sm:gap-6'>
      <Link
        href={prevHref}
        className={`flex shrink-0 items-center rounded border-2 border-bg-card px-1 hover:bg-bg-card ${hasPrevPage ? '' : disabled}`}
      >
        <ChevronLeft className='w-4' />
        <span className='mr-1 hidden sm:inline-block'>上一页</span>
      </Link>
      <div className='flex items-center sm:hidden'>
        <span>
          {pageId} / {pagesCount}
        </span>
      </div>
      <ol className='hidden flex-wrap justify-center gap-3 sm:flex'>
        {Array.from({ length: pagesCount }, (_, i) => i + 1).map((page) => {
          return (
            <li key={page}>
              <Link
                href={`${pagePath}/${page}`}
                className={`flex shrink-0 items-center rounded border-2 border-bg px-2 py-1 ${page === Number(pageId) ? 'bg-selected' : 'hover:bg-bg-card'}`}
              >
                <span
                  className={`${page === Number(pageId) ? 'text-bg-card' : ''}`}
                >
                  {page}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <Link
        href={nextHref}
        className={`flex shrink-0 items-center rounded border-2 border-bg-card px-1 hover:bg-bg-card ${hasNextPage ? '' : disabled}`}
      >
        <span className='ml-1 hidden sm:inline-block'>下一页</span>
        <ChevronRight className='w-4' />
      </Link>
    </nav>
  );
};
