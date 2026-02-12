"use client";

import React from "react";
import styles from "@/styles/personCard.module.scss";
import { Person } from "@/domain/family";

type PersonCardProps = {
  person: Person;
  isSelected?: boolean;
  onClick?: () => void;
  badge?: string;
};

export function PersonCard({ person, isSelected, onClick, badge }: PersonCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "text-left",
        "w-[220px] sm:w-[240px]",
        "rounded-2xl border bg-white shadow-sm hover:shadow-md transition",
        "p-3",
        isSelected ? "ring-2 ring-blue-500" : "",
        styles.card,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "h-12 w-12 rounded-xl flex items-center justify-center",
            "border",
            styles.avatar,
          ].join(" ")}
          aria-hidden="true"
        >
          <span className="text-sm font-semibold text-gray-600">
            {person.gender === "M" ? "HE" : "SHE"}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-semibold">{person.name}</p>
            {badge ? (
              <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                {badge}
              </span>
            ) : null}
          </div>

          <div className="mt-1 space-y-0.5 text-[12px] text-gray-600">
            <p className="truncate"><span className="font-medium">DOB:</span> {person.dob}</p>
            <p className="truncate"><span className="font-medium">Mob:</span> {person.mobile}</p>
            <p className="truncate"><span className="font-medium">Addr:</span> {person.address}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
