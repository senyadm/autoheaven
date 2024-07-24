import { cn } from '@/src/shared/utils/cn';
import Link from 'next/link'
import React from 'react'

interface LinkLikeButtonProps{
    href: string;
    className?: string;
    children?: React.ReactNode;
}

export default function LinkLikeButton({href, className, children}: LinkLikeButtonProps) {
  return (
    <Link
    href={href}
    className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2", className)}
  >
{children}  </Link>
  )
}
