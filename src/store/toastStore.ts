import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  show: (message: string, type?: ToastType) => void;
  dismiss: (id: string) => void;
}

const TOAST_DURATION = 4000;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  show: (message, type = 'info') => {
    const id = crypto.randomUUID();
    set({ toasts: [...get().toasts, { id, type, message }] });
    window.setTimeout(() => get().dismiss(id), TOAST_DURATION);
  },

  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
