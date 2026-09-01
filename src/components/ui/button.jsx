import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-teal-900 text-white hover:bg-teal-800',
        outline: 'border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-white',
        secondary: 'bg-paper-soft text-ink hover:bg-teal-100',
        ghost: 'hover:bg-paper-soft text-ink',
        link: 'text-teal-700 underline-offset-4 hover:underline',
      },
      size: {
        default: 'min-h-11 px-6 py-2',
        sm: 'min-h-9 rounded-full px-4',
        lg: 'min-h-12 rounded-full px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
