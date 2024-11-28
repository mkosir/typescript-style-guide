import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';

type NoteProps = {
  children?: string;
};

export const Note = ({ children }: NoteProps) => {
  const [descriptionHeight, setDescriptionHeight] = useState<'auto' | 0>(0);

  return (
    <div className="mb-2">
      <div
        className="mb-1 inline-flex cursor-pointer items-center rounded-lg bg-neutral-500 px-1.5 text-[11px] font-normal text-gray-200 dark:bg-gray-200 dark:text-neutral-600"
        onClick={() => setDescriptionHeight((prev) => (prev === 0 ? 'auto' : 0))}
      >
        <div className="mr-1">Note</div>
        <InfoIcon />
      </div>
      <AnimateHeight duration={500} easing="ease" height={descriptionHeight}>
        <div className="rounded-md border-0 border-l-[5px] border-solid border-neutral-500 bg-gray-200 p-2 text-xs italic text-neutral-600 dark:border-gray-200 dark:bg-neutral-600 dark:text-gray-200 [&_p]:mb-0">
          {children}
        </div>
      </AnimateHeight>
    </div>
  );
};

const InfoIcon = () => (
  <svg fill="currentColor" height="12px" viewBox="0 0 16 16" width="12px">
    <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);
