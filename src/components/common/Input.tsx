import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-semibold text-navy-800 mb-2">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-500">{icon}</div>}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-lg border-2 border-earth-200
              text-navy-800 placeholder-earth-500
              focus:border-brand-500 focus:outline-none
              transition-colors
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        {helperText && <p className="text-sm text-earth-500 mt-2">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
