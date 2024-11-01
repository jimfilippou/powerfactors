import { useState } from "react";

type ModalState<T> = T | null;

export function useModal<T = void>(defaultOpen = false, defaultState: ModalState<T> = null) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [state, setState] = useState<ModalState<T>>(defaultState);

  return {
    isOpen,
    state,
    open: (newState?: T) => {
      setIsOpen(true);
      if (newState !== undefined) {
        setState(newState);
      }
    },
    close: () => {
      setIsOpen(false);
      setState(null);
    },
    setState,
  };
}
