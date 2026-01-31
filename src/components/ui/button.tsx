import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    clsx(
                        'inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95',
                        {
                            'bg-primary text-primary-foreground hover:brightness-105 hover:shadow-lg hover:shadow-primary/20': variant === 'primary',
                            'bg-secondary text-secondary-foreground hover:brightness-105 hover:shadow-lg hover:shadow-secondary/20': variant === 'secondary',
                            'border-2 border-primary text-primary hover:bg-primary/10': variant === 'outline',
                            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
                            'h-9 px-4 text-sm': size === 'sm',
                            'h-11 px-6 text-base': size === 'md',
                            'h-14 px-8 text-lg': size === 'lg',
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
