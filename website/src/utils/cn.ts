import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ReadonlyArray<ClassValue>) => twMerge(clsx(inputs));
