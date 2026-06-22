import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToastStore, ToastType } from '../../store/toastStore';

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={20} className="text-green-600" />,
  error: <AlertCircle size={20} className="text-red-600" />,
  info: <Info size={20} className="text-brand-500" />,
  warning: <AlertTriangle size={20} className="text-amber-600" />,
};

const styles: Record<ToastType, string> = {
  success: 'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800',
  error: 'border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800',
  info: 'border-brand-200 bg-brand-50 dark:bg-navy-800 dark:border-brand-700',
  warning: 'border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800',
};

const ToastContainer: React.FC = () => {
  const { toasts, dismiss } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-slide-up ${styles[toast.type]}`}
          role="status"
        >
          {icons[toast.type]}
          <p className="flex-1 text-sm font-medium text-navy-800 dark:text-earth-100">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="text-earth-500 hover:text-navy-800 dark:hover:text-white"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
