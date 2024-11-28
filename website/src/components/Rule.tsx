import React from 'react';

type RuleProps = {
  href: string;
};

export const Rule = ({ href }: RuleProps) => {
  return (
    <a
      className="rounded-md bg-gray-100 px-1.5 py-1 text-xs font-medium text-neutral-600 hover:bg-gray-200 hover:no-underline dark:bg-blue-600 dark:bg-opacity-40 dark:text-neutral-200 dark:hover:bg-blue-700 dark:hover:bg-opacity-40"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      📏 Rule
    </a>
  );
};
