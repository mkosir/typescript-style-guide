import CodeBlock from '@theme/CodeBlock';
import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { cn } from '../utils/cn';

type RuleProps = {
  children: string;
  href: string;
  prefix?: string;
};

export const Rule = ({ children, href, prefix }: RuleProps) => {
  const [isRuleExpanded, setIsRuleExpanded] = useState(false);

  return (
    <div>
      {prefix}{' '}
      <span>
        <div
          className="dark:bg-opacity-40 dark:hover:bg-opacity-40 mb-1 inline-flex cursor-pointer items-center rounded-md bg-gray-100 px-1.5 py-1 text-xs font-medium text-neutral-600 hover:bg-gray-200 dark:bg-blue-900 dark:text-neutral-200 dark:hover:bg-blue-950"
          onClick={() => setIsRuleExpanded((prev) => !prev)}
        >
          <div className="mr-1">
            <span
              className={cn(
                'ease inline-block transform transition-all duration-500',
                isRuleExpanded ? 'rotate-[65deg]' : 'rotate-0',
              )}
            >
              📏
            </span>{' '}
            Rule
          </div>
        </div>
        <AnimateHeight duration={500} easing="ease" height={isRuleExpanded ? 'auto' : 0}>
          <div className="rounded-md border-0 border-l-[5px] border-solid border-neutral-500 bg-gray-200 p-2 text-xs text-neutral-600 italic dark:border-gray-200 dark:bg-neutral-600 dark:text-gray-200 [&_p]:mb-0">
            <a
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-500"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Rule</span>
              <span className="ml-0.5 flex items-center">
                <ExternalLinkIcon />
              </span>
            </a>
            <CodeBlock className="mt-1 mb-0! text-sm" language="ts" title="eslint.config.mjs">
              {children}
            </CodeBlock>
          </div>
        </AnimateHeight>
      </span>
    </div>
  );
};

const ExternalLinkIcon = () => (
  <svg
    aria-hidden="true"
    className="inline-block"
    fill="none"
    height="15px"
    viewBox="0 0 24 24"
    width="15px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Interface / External_Link">
      <path
        d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
        id="Vector"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  </svg>
);
