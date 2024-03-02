import { Root, Heading, PhrasingContent } from 'mdast';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';

// Well, I found a lib called 'github-slugger' that does exactly the same thing

export type HeadingSlugArray = {
  value: string;
  slug: string;
  depth: number;
}[];

export const getHeadingSlugArray = (tree: Root) => {
  const slugger = new GithubSlugger();
  const headingSlugArray: HeadingSlugArray = [];
  visit(tree, 'heading', (node) => {
    const raw = toString(node);
    const escapedText = slugger.slug(raw);
    const headingSlugItem = {
      value: raw,
      slug: escapedText,
      depth: node.depth,
    };
    headingSlugArray.push(headingSlugItem);
  });
  // console.log(JSON.stringify(headingSlugArray, null, 2));
  return headingSlugArray;
};

/*
export const getHeadingSlugArray = (tree: Root) => {
  const nodes = {};
  const headingSlugArray: HeadingSlugArray = [];
  visit(tree, "heading", (node) => {
    getHeadingSlug(node, nodes, headingSlugArray);
  });
  console.log(JSON.stringify(headingSlugArray, null, 2));
  return headingSlugArray;
};

function getChildrenText(children: PhrasingContent[]): string {
  return children.reduce((acc, child) => {
    if ('value' in child) {
      return acc + child.value
    }
    if ('children' in child) {
      return acc + getChildrenText(child.children)
    }
    return acc
  }, '')
}
*/

/*
 * if the same heading content appears more than once, add a number to the end of the 'value' property
 * eg: "## Heading ... ## Heading" -> "heading-1", "heading-2", etc.
 */

/*
function getHeadingSlug(node: Heading, nodes: Record<string, number>, output: HeadingSlugArray) {
  const raw = getChildrenText(node.children);
  nodes[raw] = (nodes[raw] || 0) + 1;
  const escapedText = `${raw}${nodes[raw] > 1 ? ` ${nodes[raw] - 1}` : ""}`
                  .split(" ")
                  .join("-")
                  .toLowerCase();
  const headingSlugItem = {
    value: toString(node), // 'Lorem Ipsum'
    slug: escapedText, // 'lorem-ipsum'
  };
  output.push(headingSlugItem);
}
*/
