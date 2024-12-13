import { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';

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
          className="mb-1 inline-flex cursor-pointer items-center rounded-md bg-gray-100 px-1.5 py-1 text-xs font-medium text-neutral-600 hover:bg-gray-200 dark:bg-blue-600 dark:bg-opacity-40 dark:text-neutral-200 dark:hover:bg-blue-700 dark:hover:bg-opacity-40"
          onClick={() => setIsRuleExpanded((prev) => !prev)}
        >
          <div className="mr-1">
            <span
              className={clsx(
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
          <div className="rounded-md border-0 border-l-[5px] border-solid border-neutral-500 bg-gray-200 p-2 text-xs italic text-neutral-600 dark:border-gray-200 dark:bg-neutral-600 dark:text-gray-200 [&_p]:mb-0">
            <a
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-500"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              Rule
            </a>
            <CodeBlock className="!mb-0 mt-1 text-sm" language="ts" title="eslint.config.mjs">
              {children}
            </CodeBlock>
          </div>
        </AnimateHeight>
      </span>
    </div>
  );
};
