import React from 'react';
import Link from 'next/link';

type Props = {
  // title: string;
  // description: string;
  imageUrl?: string;
};

// export const CCInfo: React.FC<Props> = ({ title, description, imageUrl }) => {
export const CCInfo: React.FC<Props> = ({ imageUrl }) => {
  return (
    <div className='not-prose grid w-full grid-cols-1 gap-6 overflow-hidden rounded-xl bg-bg-card px-4 dark:py-4 md:grid-cols-[2.5fr_1fr]'>
      <div className='flex'>
        <div className='flex flex-col space-y-2 break-words pb-2 text-sm text-secondary-text'>
          <p className='line-clamp-2 break-words text-xl font-semibold text-primary-text'>
            版权声明
          </p>
          <p>
            ① 本博客所有原创文章，除非另有特别声明，均采用
            <Link
              href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans'
              className='text-link hover:underline'
            >
              CC BY-NC-SA 4.0/知识共享署名-非商业性使用-相同方式共享 4.0
              国际许可协议
            </Link>
            进行授权。
          </p>
          <p>
            ②
            本博客中，在文章内容之外使用的原创图片、动画、音频等多媒体素材的知识产权归属如下：
            <br /> <b>(i)</b>{' '}
            由博客作者独立创作的素材，其知识产权由博客作者单独所有；
            <br /> <b>(ii)</b>{' '}
            与他人合作创作的素材，其知识产权由博客作者与原创作者共同所有；
            <br /> <b>(iii)</b>{' '}
            对于特定素材，如有不同的版权归属，将在相应位置特别注明。
            <br />{' '}
            未经原作者或博客作者的明确授权，任何个人或组织不得在其他场合使用、复制、修改或传播这些素材。
          </p>
        </div>
      </div>
      {imageUrl && (
        <div className='hidden items-center md:flex'>
          <div
            className={`h-48 w-full bg-contain bg-center bg-no-repeat dark:[filter:brightness(0.8)_contrast(1.2)]`}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
        </div>
      )}
    </div>
  );
};
