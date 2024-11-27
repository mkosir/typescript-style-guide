import React from 'react';

type RuleProps = {
  href: string;
};

export const Rule = ({ href }: RuleProps) => {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      📏 Rule
    </a>
  );
};
