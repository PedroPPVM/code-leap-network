import React from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#777777CC] p-2">
      <div className="relative rounded-2xl bg-white">{children}</div>
    </div>
  );
};

export default Modal;
