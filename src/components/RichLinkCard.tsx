import { metadataBase } from '@/constants';
import { fetchSiteMetadata, getFaviconUrl } from '@/utils/metadata';

type Props = {
  href: string;
  isExternal: boolean;
};

export const RichLinkCard: React.FC<Props> = ({ href, isExternal }) => {
  return <RichLinkCardInner href={href} isExternal={isExternal} />;
};

const RichLinkCardInner: React.FC<Props> = async ({ href }) => {
  const url = new URL(href, metadataBase);
  const metadata = await fetchSiteMetadata(url.href);

  if (!metadata) {
    return <RichLinkCardError href={href} />;
  }

  return (
    <a
      className='not-prose flex h-36 w-full gap-2 overflow-hidden rounded-lg bg-bg-card transition-colors duration-200 hover:bg-bg-card-hover'
      href={metadata.url}
      target='_blank'
      rel='noreferrer'
      style={{
        border: '1px solid #303030',
      }}
    >
      <div className='flex h-full flex-1 flex-col px-4 py-2'>
        <div className='line-clamp-2 break-words font-medium text-primary-text'>
          {metadata.title ? metadata.title : metadata.url}
        </div>
        <div className='mt-2 flex-1'>
          <div className='line-clamp-2 break-words text-sm text-secondary-text'>
            {metadata.description}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFaviconUrl(url.hostname)}
            alt=''
            width={16}
            height={16}
          />
          <span className='line-clamp-1 text-sm text-secondary-text'>
            {url.hostname}
          </span>
        </div>
      </div>
      {metadata.image && (
        <div className='hidden h-36 max-w-[2/5] sm:block'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='dark:img-dark-filter h-full w-full object-cover'
            src={metadata.image}
            alt=''
          />
        </div>
      )}
    </a>
  );
};

const RichLinkCardError: React.FC<{ href: string }> = ({ href }) => {
  return (
    <a
      className='not-prose flex flex-col gap-2 rounded-lg bg-bg-card p-4 text-primary-text transition-colors duration-200 hover:bg-bg-card-hover'
      href={href}
      target='_blank'
      rel='noreferrer'
      style={{
        border: '1px solid #303030',
      }}
    >
      <p className='font-medium'>No preview</p>
      <div className='text-sm text-secondary-text'>{href}</div>
    </a>
  );
};
