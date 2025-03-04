'use client';

import { useEffect, useState } from 'react';

export const MobileTOCToggle = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const tocToggle = document.querySelector('.js-toc-toggle');
    const tocContent = document.querySelector('.js-toc-content');
    const tocStickyContainer = document.querySelector('.toc-sticky-container');
    const tocPositionRef = document.querySelector('.toc-position-reference');
    const iconDown = document.querySelector('.js-toc-icon-down');
    const iconUp = document.querySelector('.js-toc-icon-up');
    
    if (tocToggle && tocContent && iconDown && iconUp && tocStickyContainer && tocPositionRef) {
      // Toggle functionality
      const toggleTOC = () => {
        const isCurrentlyOpen = !tocContent.classList.contains('hidden');
        setIsOpen(!isCurrentlyOpen);
        
        tocContent.classList.toggle('hidden');
        iconDown.classList.toggle('hidden');
        iconUp.classList.toggle('hidden');
        
        // 如果打开且已经固定，确保内容可见
        if (!isCurrentlyOpen && isSticky) {
          tocStickyContainer.classList.add('toc-is-open');
        } else if (isCurrentlyOpen) {
          tocStickyContainer.classList.remove('toc-is-open');
        }
      };
      
      tocToggle.addEventListener('click', toggleTOC);
      
      // Smooth scroll and close TOC when clicking on a link
      tocContent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Close TOC
          tocContent.classList.add('hidden');
          iconDown.classList.remove('hidden');
          iconUp.classList.add('hidden');
          setIsOpen(false);
          
          // Remove open class
          tocStickyContainer.classList.remove('toc-is-open');
          
          // Get the target element
          const href = link.getAttribute('href');
          if (!href) return;
          
          const targetId = href.replace('#', '');
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Calculate offset (accounting for any fixed headers)
            const offset = isSticky ? 60 : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
            
            // Smooth scroll to target
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, '', href);
          }
        });
      });
      
      // Sticky behavior
      const handleScroll = () => {
        const refRect = tocPositionRef.getBoundingClientRect();
        const refTop = refRect.top + window.scrollY;
        
        if (window.scrollY > refTop) {
          if (!isSticky) {
            setIsSticky(true);
            tocStickyContainer.classList.add('toc-is-sticky');
            
            // 如果TOC是打开的，添加open类
            if (isOpen) {
              tocStickyContainer.classList.add('toc-is-open');
            }
          }
        } else {
          if (isSticky) {
            setIsSticky(false);
            tocStickyContainer.classList.remove('toc-is-sticky');
            tocStickyContainer.classList.remove('toc-is-open');
          }
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      // 初始检查
      handleScroll();
      
      // Cleanup event listeners
      return () => {
        tocToggle.removeEventListener('click', toggleTOC);
        window.removeEventListener('scroll', handleScroll);
        tocContent.querySelectorAll('a').forEach(link => {
          link.removeEventListener('click', () => {});
        });
      };
    }
  }, [isSticky, isOpen]);
  
  return null;
};

export default MobileTOCToggle; 