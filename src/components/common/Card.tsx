import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  hover?: boolean;
  animated?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = true, animated = false, className = '', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white rounded-xl p-6 shadow-soft border border-earth-100',
      glass: 'bg-white bg-opacity-70 backdrop-blur-xl rounded-xl p-6 shadow-soft border border-white border-opacity-40 hover:border-opacity-60',
      elevated: 'bg-white rounded-xl p-6 shadow-elevated border border-earth-100',
    };

    const hoverStyle = hover ? 'hover:shadow-xl transition-all duration-300' : '';
    const animatedStyle = animated ? 'animate-fade-in-up' : '';

    return (
      <div 
        ref={ref} 
        className={`
          ${variantStyles[variant]} 
          ${hoverStyle} 
          ${animatedStyle}
          ${className}
        `} 
        {...props} 
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;
