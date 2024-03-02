'use client';
import { useRef } from 'react';
import { useWindowScroll } from '@uidotdev/usehooks';
import { Navigation2 } from 'react-feather';
import { CSSTransition } from 'react-transition-group';

const classNames = {
  enterActive: 'transition duration-300 bottom-[-92px] translate-y-[-100px]',
  exitActive: 'transition duration-300 translate-y-[100px]',
};

export default function ScrollToTop() {
  const [{ x, y }, scrollTo] = useWindowScroll();
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={y && y > 200 ? true : false}
      nodeRef={nodeRef}
      timeout={300}
      classNames={classNames}
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className='fixed bottom-2 right-2 cursor-pointer rounded-full p-3 md:right-6 md:p-6'
        onClick={() => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
      >
        <Navigation2 size={32} className='opacity-40 hover:opacity-100' />
      </div>
    </CSSTransition>
    // <aside style={{ position: 'fixed', bottom: 0, right: 0 }}>
    //   Coordinates <span className='x'>x: {x}</span>{' '}
    //   <span className='y'>y: {y}</span>{' '}

    // </aside>
  );
}
