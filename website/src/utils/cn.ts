import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';
import clsx from 'clsx';

export const cn = (...inputs: ReadonlyArray<ClassValue>) => twMerge(clsx(inputs));
