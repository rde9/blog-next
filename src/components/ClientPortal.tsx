'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { Poppins } from 'next/font/google';
import { createPortal } from 'react-dom';
type ClientPortalInterface = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};
const ClientPortal: FC<ClientPortalInterface> = ({
  children,
  selector,
  show,
}) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted && show && ref.current
    ? createPortal(children, ref.current)
    : null;
};
export default ClientPortal;
export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
