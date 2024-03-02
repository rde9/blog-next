import 'server-only';
import { RootContent, RootContentMap, PhrasingContent } from 'mdast';
import React, { FC } from 'react';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { remarkShiki } from '@/plugins/remark-shiki';
import { remarkBlockLink } from '@/plugins/remark-block-link';
import { remarkPlaceholder } from '@/plugins/remark-placeholder';
import { getHeadingSlugArray } from '@/utils/markdown';
import type { HeadingSlugArray } from '@/utils/markdown';
import ImageModal from './ImageModal';
import { RichLinkCard } from './RichLinkCard';

const parseMarkdown = remark()
  .use(remarkFrontmatter)
  .use(remarkBlockLink)
  .use(
    remarkPlaceholder,
  ) /* just a placeholder, does nothing, to be replaced soon */
  .use(remarkGfm);

type Props = { children: string };

let headingSlugArray: HeadingSlugArray;
let headingCount: number, headingIndex: number;

export const MarkdownRenderer: React.FC<Props> = async ({ children }) => {
  const parsed = parseMarkdown.parse(children);
  const mdastRoot = await parseMarkdown.run(parsed);

  headingSlugArray = getHeadingSlugArray(mdastRoot);
  headingCount = headingSlugArray.length;
  headingIndex = 0;

  return (
    <div id='markdown-renderer' className='markdown-renderer'>
      <NodesRenderer nodes={mdastRoot.children} />
    </div>
  );
};

const NodesRenderer: FC<{ nodes: RootContent[] }> = ({ nodes }) => {
  return nodes.map((node, index) => {
    switch (node.type) {
      case 'heading': {
        return <HeadingNode key={index} node={node} />;
      }
      case 'text': {
        return <TextNode key={index} node={node} />;
      }
      case 'paragraph': {
        return <ParagraphNode key={index} node={node} />;
      }
      case 'inlineCode': {
        return <InlineCodeNode key={index} node={node} />;
      }
      case 'blockquote': {
        return <BlockQuoteNode key={index} node={node} />;
      }
      case 'link': {
        return <LinkNode key={index} node={node} />;
      }
      case 'list': {
        return <ListNode key={index} node={node} />;
      }
      case 'listItem': {
        return <ListItemNode key={index} node={node} />;
      }
      case 'emphasis': {
        return <EmphasisNode key={index} node={node} />;
      }
      case 'strong': {
        return <StrongNode key={index} node={node} />;
      }
      case 'image': {
        const { url, title, alt } = node;
        return <ImageModal key={index} url={url} title={title} alt={alt} />;
      }
      case 'code': {
        return <CodeNode key={index} node={node} />;
      }
      case 'delete': {
        return <DeleteNode key={index} node={node} />;
      }
      case 'table': {
        return <TableNode key={index} node={node} />;
      }
      case 'thematicBreak': {
        return <ThematicBreakNode key={index} node={node} />;
      }
      case 'html': {
        return <HTMLNode key={index} node={node} />;
      }
      case 'block-link': {
        return <BlockLinkNode key={index} node={node} />;
      }
      // case "twitter-embed": {
      //   return <TwitterEmbedNode key={index} node={node} />;
      // }
      // case "youtube-embed": {
      //   return <YouTubeEmbedNode key={index} node={node} />;
      // }

      default: {
        if (process.env.NODE_ENV === 'development') {
          return (
            <div key={index}>
              <p style={{ color: 'red' }}>Unknown node type: {node.type}</p>
              <pre>{JSON.stringify(node, null, 2)}</pre>
            </div>
          );
        } else {
          throw new Error(`Unknown node type: ${node.type}`);
        }
      }
    }
  });
};

const HeadingNode: FC<{ node: RootContentMap['heading'] }> = ({ node }) => {
  const Component = (
    {
      1: 'h2',
      2: 'h3',
      3: 'h4',
      4: 'h5',
      5: 'h6',
      6: 'h6',
    } as const
  )[node.depth];

  // console.log(headingSlugArray)
  // console.log(headingIndex)
  const anchorSlug = headingSlugArray[headingIndex++].slug;
  // It's a rather hacky way, I don't really know why it works!!
  // Seems that the iteration will be done twice when being built (but once in dev mode)
  if (headingIndex === headingCount) headingIndex = 0;

  return (
    <Component id={anchorSlug} className='relative'>
      <NodesRenderer nodes={node.children} />
    </Component>
  );
};

const TextNode: FC<{ node: RootContentMap['text'] }> = ({ node }) => {
  return node.value;
};

const ParagraphNode: FC<{ node: RootContentMap['paragraph'] }> = ({ node }) => {
  if (node.children.length === 1 && node.children[0].type === 'image') {
    return <NodesRenderer nodes={node.children} />;
  }
  return (
    <p>
      <NodesRenderer nodes={node.children} />
    </p>
  );
};

const InlineCodeNode: FC<{ node: RootContentMap['inlineCode'] }> = ({
  node,
}) => {
  return <code className='inline-code'>{node.value}</code>;
};

const BlockQuoteNode: FC<{ node: RootContentMap['blockquote'] }> = ({
  node,
}) => {
  return (
    <blockquote
      style={{
        quotes: 'none',
      }}
    >
      <NodesRenderer nodes={node.children} />
    </blockquote>
  );
};

const LinkNode: FC<{ node: RootContentMap['link'] }> = ({ node }) => {
  return (
    <a className='link' href={node.url} target='_blank' rel='noreferrer'>
      <NodesRenderer nodes={node.children} />
    </a>
  );
};

const ListNode: FC<{ node: RootContentMap['list'] }> = ({ node }) => {
  return node.ordered ? (
    <ol>
      <NodesRenderer nodes={node.children} />
    </ol>
  ) : (
    <ul>
      <NodesRenderer nodes={node.children} />
    </ul>
  );
};

const ListItemNode: FC<{ node: RootContentMap['listItem'] }> = ({ node }) => {
  if (node.children.length === 1 && node.children[0].type === 'paragraph') {
    return (
      <li>
        <NodesRenderer nodes={node.children[0].children} />
      </li>
    );
  }

  return (
    <li>
      <NodesRenderer nodes={node.children} />
    </li>
  );
};

const EmphasisNode: FC<{ node: RootContentMap['emphasis'] }> = ({ node }) => {
  return (
    <i>
      <NodesRenderer nodes={node.children} />
    </i>
  );
};
const StrongNode: FC<{ node: RootContentMap['strong'] }> = ({ node }) => {
  return (
    <strong>
      <NodesRenderer nodes={node.children} />
    </strong>
  );
};

const CodeNode: FC<{ node: RootContentMap['code'] }> = async ({ node }) => {
  const lang = node.lang ?? 'plain';
  const highlighted = await remarkShiki(node.value, lang);

  return <div dangerouslySetInnerHTML={{ __html: highlighted }}></div>;
};

const DeleteNode: FC<{ node: RootContentMap['delete'] }> = ({ node }) => {
  return (
    <del>
      <NodesRenderer nodes={node.children} />
    </del>
  );
};

const TableNode: FC<{ node: RootContentMap['table'] }> = ({ node }) => {
  const [headRow, ...bodyRows] = node.children;
  return (
    <table>
      <thead>
        <tr>
          {headRow.children.map((cell, index) => (
            <th
              key={index}
              style={{ textAlign: node.align?.[index] ?? undefined }}
            >
              <NodesRenderer nodes={cell.children} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRows.map((row, index) => (
          <tr key={index}>
            {row.children.map((cell, index) => (
              <td
                key={index}
                style={{ textAlign: node.align?.[index] ?? undefined }}
              >
                <NodesRenderer nodes={cell.children} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ThematicBreakNode: FC<{ node: RootContentMap['thematicBreak'] }> = () => {
  return <hr />;
};

const HTMLNode: FC<{ node: RootContentMap['html'] }> = ({ node }) => {
  return node.value;
};

const BlockLinkNode: FC<{ node: RootContentMap['block-link'] }> = ({
  node,
}) => {
  return (
    <div className='my-6'>
      <RichLinkCard href={node.url} isExternal />
    </div>
  );
};

//   const TwitterEmbedNode: FC<{ node: RootContentMap["twitter-embed"] }> = ({ node }) => {
//     return (
//       <div className={classes.embeded}>
//         <ArticleTweetCard url={node.url} />
//       </div>
//     );
//   };

//   const YouTubeEmbedNode: FC<{ node: RootContentMap["youtube-embed"] }> = ({ node }) => {
//     return (
//       <div className={classes.embeded}>
//         <YouTubeEmbed videoId={node.videoId} />
//       </div>
//     );
//   };
