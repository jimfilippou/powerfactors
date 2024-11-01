import { useEffect } from "react";

type ModalProps = {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
};

export const Modal = ({ open = false, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 h-6 w-6 opacity-70 hover:opacity-100">
          ✕
        </button>
        {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
