"use client";

import React from "react";

export function TreeRow({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="w-full">
      {title ? <p className="mb-2 text-xs font-semibold text-gray-600">{title}</p> : null}
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}
