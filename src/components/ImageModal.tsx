'use client';

import { FC, useState } from 'react';
import ClientPortal from './ClientPortal';
import { Minus, Plus, X } from 'react-feather';
import Image from 'next/image';

/*
Sample Image Node in mdast:
{
  type: 'image',
  url: 'https://example.com/favicon.ico',
  title: 'bravo',
  alt: 'alpha'
}
*/

type ImgProps = {
  url: string;
  title: string | null | undefined;
  alt: string | null | undefined;
};

type ModalControlProps = {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  toggleModal: () => void;
};

const ImageModal: FC<ImgProps> = ({ url, title, alt }) => {
  const [showModal, setshowModal] = useState(false);
  const [zoom, setZoom] = useState(100); // 初始缩放级别为100%
  const toggleModal = () => {
    setshowModal(!showModal);
    setZoom(100); // reset zoom level
  };
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };
  return (
    <div id='img-wrapper' className='not-prose my-4 flex flex-col items-center'>
      <figure className='relative h-72 w-full'>
        <Image
          className='mx-auto cursor-zoom-in'
          src={url}
          alt={alt || ''}
          onClick={toggleModal}
          fill
          style={{
            visibility: showModal ? 'hidden' : 'visible',
            objectFit: 'scale-down',
          }}
        />
        {showModal && (
          <ClientPortal selector='portal' show={showModal}>
            <div className='modal-overlay fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70'>
              <img
                src={url}
                alt={alt || ''}
                className='modal-content z-50 h-full max-h-[80vh] w-full max-w-prose object-scale-down'
                style={{ transform: `scale(${zoom / 100})` }}
              />
              <ModalControl
                handleZoomIn={handleZoomIn}
                handleZoomOut={handleZoomOut}
                toggleModal={toggleModal}
              />
            </div>
          </ClientPortal>
        )}
      </figure>
      {alt && alt !== 'Untitled' && (
        <span className='p-1 text-center text-sm text-secondary-text'>
          {alt}
        </span>
      )}
    </div>
  );
};

const ModalControl: FC<ModalControlProps> = ({
  handleZoomIn,
  handleZoomOut,
  toggleModal,
}) => {
  return (
    <div className='modal-control absolute bottom-6 left-0 z-50 flex h-10 w-full items-center justify-center gap-2'>
      {/* <button className="modal-control-btn p-2 bg-transparent text-white rounded-full shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={handleZoomIn}>
        <Plus width={32} height={32} />
      </button>
      <button className="modal-control-btn p-2 bg-transparent text-white rounded-full shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={handleZoomOut}>
        <Minus width={32} height={32} />
      </button> */}
      <button
        className='modal-control-btn rounded-full bg-transparent p-2 text-white'
        onClick={toggleModal}
      >
        <X width={32} height={32} />
      </button>
    </div>
  );
};

export default ImageModal;
