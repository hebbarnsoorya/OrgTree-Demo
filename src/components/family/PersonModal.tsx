"use client";

import React from "react";
import { Person } from "@/domain/family";
import { Modal } from "@/components/ui/Modal";

type PersonModalProps = {
  person?: Person | null;
  isOpen: boolean;
  onClose: () => void;
};

export function PersonModal({ person, isOpen, onClose }: PersonModalProps) {
  return (
    <Modal title="Person Details" isOpen={isOpen} onClose={onClose}>
      {!person ? (
        <p className="text-sm text-gray-600">No person selected.</p>
      ) : (
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Info label="Name" value={person.name} />
            <Info label="Gender" value={person.gender === "M" ? "He" : "She"} />
            <Info label="DOB" value={person.dob} />
            <Info label="Mobile" value={person.mobile} />
          </div>
          <Info label="Address" value={person.address} />

          <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
            You can extend this modal later with more fields (education, photo upload, notes, etc.).
          </div>
        </div>
      )}
    </Modal>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xl border bg-white p-3">
      <div className="text-[11px] font-medium text-gray-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-gray-800">{value || "-"}</div>
    </div>
  );
}
