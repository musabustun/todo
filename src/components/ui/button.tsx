import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    clsx(
                        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
                        {
                            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm': variant === 'primary',
                            'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm': variant === 'secondary',
                            'border border-input bg-transparent hover:bg-foreground/5 hover:text-foreground hover:border-foreground/30': variant === 'outline',
                            'hover:bg-foreground/5 hover:text-foreground': variant === 'ghost',
                            'text-primary underline-offset-4 hover:underline': variant === 'link',

                            'h-9 px-4 text-sm': size === 'sm',
                            'h-11 px-6 text-base': size === 'md',
                            'h-14 px-8 text-lg': size === 'lg',
                            'h-10 w-10 p-0': size === 'icon',
                        },
                        className
                    )
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
