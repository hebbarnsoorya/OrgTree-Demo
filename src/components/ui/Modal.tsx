"use client";

import React, { useEffect } from "react";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
