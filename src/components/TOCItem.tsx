import React from 'react';
import type { HeadingSlugArray } from '@/utils/markdown';

type TOCItemProps = {
  item: HeadingSlugArray[number];
  indentationClass: string;
  sizeClass: string;
  onClick?: () => void;
};

const TOCItem: React.FC<TOCItemProps> = ({
  item,
  indentationClass,
  sizeClass,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();

      // Get the target element
      const targetId = item.slug;
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Call the onClick callback first (for mobile TOC to close)
        onClick();

        // Calculate offset (accounting for any fixed headers)
        const offset = 60; // Adjust based on your header height
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - offset;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update URL hash without scrolling
        history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <li className={`${indentationClass} ${sizeClass}`}>
      <a
        href={`#${item.slug}`}
        className='hover:text-primary-500'
        onClick={onClick ? handleClick : undefined}
      >
        {item.value}
      </a>
    </li>
  );
};

export default TOCItem;
