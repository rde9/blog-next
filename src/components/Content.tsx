import { FC } from 'react';

type Props = { children: React.ReactNode };
const Content: FC<Props> = ({ children }) => {
  return (
    <div id='container' className='min-h-[calc(80vh_-_96px)]'>
      {children}
    </div>
  );
};

export default Content;
