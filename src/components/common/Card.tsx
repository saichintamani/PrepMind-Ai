import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = true, className = '', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white rounded-lg p-6 shadow-md',
      glass: 'bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-6 shadow-soft border border-white border-opacity-20',
      elevated: 'bg-white rounded-lg p-6 shadow-lg border border-earth-100',
    };

    const hoverStyle = hover ? 'hover:shadow-lg transition-shadow' : '';

    return (
      <div ref={ref} className={`${variantStyles[variant]} ${hoverStyle} ${className}`} {...props} />
    );
  }
);

Card.displayName = 'Card';

export default Card;
