import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnBackdropClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnBackdropClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => closeOnBackdropClick && onClose()}
      />
      <div
        className={`relative bg-white dark:bg-navy-800 rounded-lg shadow-xl animate-fade-in ${sizeClasses[size]} w-full mx-4`}
      >
        {title ? (
          <div className="flex items-center justify-between p-6 border-b border-earth-200 dark:border-navy-600">
            <h2 className="text-xl font-semibold text-navy-800 dark:text-earth-100">{title}</h2>
            <button
              onClick={onClose}
              className="text-earth-500 hover:text-navy-800 dark:hover:text-earth-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        ) : null}
        <div className={title ? 'p-6' : 'p-6 pt-8'}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
