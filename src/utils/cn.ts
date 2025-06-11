import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de Tailwind de manera inteligente
 * Previene conflictos y permite override de clases
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}