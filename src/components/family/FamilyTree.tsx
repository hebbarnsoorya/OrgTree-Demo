"use client";

import React, { useMemo, useState } from "react";
import { familyDummy } from "@/data/familyDummy";
import { Person } from "@/domain/family";
import {  PersonCard } from "@/components/family/PersonCard";
import { PersonModal } from "@/components/family/PersonModal";
import { TreeRow } from "@/components/family/TreeRow";

type ReferenceLine = "father" | "mother";

function getPerson(id?: string) {
  if (!id) return undefined;
  return familyDummy.peopleById[id];
}

function getSpouse(p?: Person) {
  return getPerson(p?.spouseId);
}

function getChildrenOf(parentAId?: string, parentBId?: string): Person[] {
  const people = Object.values(familyDummy.peopleById);
  return people
    .filter((p) => {
      const fatherMatch = parentAId && p.fatherId === parentAId;
      const motherMatch = parentBId && p.motherId === parentBId;
      // handle cases where parent ids are swapped or only one known
      const fatherMatchAlt = parentBId && p.fatherId === parentBId;
      const motherMatchAlt = parentAId && p.motherId === parentAId;

      return (fatherMatch && motherMatch) || (fatherMatchAlt && motherMatchAlt) || fatherMatch || motherMatch;
    })
    .sort((a, b) => a.dob.localeCompare(b.dob));
}

function getAncestorsAlongLine(person: Person | undefined, line: ReferenceLine): Person[] {
  // One generation upward displayed (you can extend to multiple)
  if (!person) return [];
  const parentId = line === "father" ? person.fatherId : person.motherId;
  const parent = getPerson(parentId);
  if (!parent) return [];
  const spouse = getSpouse(parent);
  // show the selected parent + their spouse if available
  return spouse ? [parent, spouse] : [parent];
}

export function FamilyTree() {
  const father = getPerson("father")!;
  const mother = getPerson("mother")!;

  const [referenceLine, setReferenceLine] = useState<ReferenceLine>("father");
  const [focusId, setFocusId] = useState<string>(father.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalPerson, setModalPerson] = useState<Person | null>(null);

  const focus = getPerson(focusId);

  const focusChildren = useMemo(() => {
    if (!focus) return [];
    // For demo: treat focus + focus.spouse as parent pair
    const spouse = getSpouse(focus);
    return getChildrenOf(focus.id, spouse?.id);
  }, [focus]);

  const ancestorRow = useMemo(() => {
    return getAncestorsAlongLine(focus, referenceLine);
  }, [focus, referenceLine]);

  function openPerson(p: Person) {
    setModalPerson(p);
    setModalOpen(true);
  }

  function goUp() {
    if (!focus) return;
    const nextId = referenceLine === "father" ? focus.fatherId : focus.motherId;
    if (nextId) setFocusId(nextId);
  }

  function goDown() {
    // Demo behavior: go down to first child (you can enhance with a chooser)
    if (focusChildren.length > 0) setFocusId(focusChildren[0].id);
  }

  function resetToParents() {
    setFocusId(referenceLine === "father" ? father.id : mother.id);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold">Family Tree</h1>
          <p className="text-sm text-gray-600">
            Select Father/Mother as reference, navigate Up/Down, click any card to view details.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={goUp}
            className="rounded-xl border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50"
            type="button"
          >
            ↑ Up
          </button>
          <button
            onClick={goDown}
            className="rounded-xl border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50"
            type="button"
          >
            ↓ Down
          </button>
          <button
            onClick={resetToParents}
            className="rounded-xl border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50"
            type="button"
          >
            Reset to Selected Parent
          </button>
        </div>
      </header>

      {/* Ancestors (Upward) */}
      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <TreeRow title={`Upward (${referenceLine === "father" ? "Father’s" : "Mother’s"} side)`}>
          {ancestorRow.length === 0 ? (
            <p className="text-sm text-gray-600">No ancestor data found for the selected upward line.</p>
          ) : (
            ancestorRow.map((p) => (
              <PersonCard key={p.id} person={p} onClick={() => openPerson(p)} badge="Ancestor" />
            ))
          )}
        </TreeRow>
      </section>

      {/* Parents Row (Father + Mother side by side) */}
      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-gray-700">#1 Parents</p>

          <div className="flex items-center gap-4 rounded-xl border bg-gray-50 px-3 py-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="referenceLine"
                checked={referenceLine === "father"}
                onChange={() => {
                  setReferenceLine("father");
                  setFocusId("father"); // default focus change
                }}
              />
              Father (default)
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="referenceLine"
                checked={referenceLine === "mother"}
                onChange={() => {
                  setReferenceLine("mother");
                  setFocusId("mother");
                }}
              />
              Mother
            </label>
          </div>
        </div>

        <TreeRow>
          <PersonCard
            person={father}
            isSelected={focusId === father.id}
            onClick={() => openPerson(father)}
            badge="Father"
          />
          <PersonCard
            person={mother}
            isSelected={focusId === mother.id}
            onClick={() => openPerson(mother)}
            badge="Mother"
          />
        </TreeRow>
      </section>

      {/* Downward Tree from Focus */}
      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-gray-700">
          #2–#4 Downward (from focus: <span className="font-bold">{focus?.name ?? "-"}</span>)
        </p>

        {!focus ? (
          <p className="text-sm text-gray-600">No focus selected.</p>
        ) : (
          <Descendants
            root={focus}
            onOpenPerson={openPerson}
            depth={0}
          />
        )}
      </section>

      <PersonModal person={modalPerson} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function Descendants({
  root,
  onOpenPerson,
  depth,
}: {
  root: Person;
  onOpenPerson: (p: Person) => void;
  depth: number;
}) {
  const spouse = getSpouse(root);
  const children = getChildrenOf(root.id, spouse?.id);

  return (
    <div className="space-y-4">
      {/* Root row */}
      <div className="flex flex-wrap items-start gap-3">
        <PersonCard person={root} onClick={() => onOpenPerson(root)} badge={depth === 0 ? "Focus" : "Member"} />
        {spouse ? (
          <PersonCard person={spouse} onClick={() => onOpenPerson(spouse)} badge="Spouse" />
        ) : null}
      </div>

      {/* Children row */}
      {children.length > 0 ? (
        <div className="ml-0 sm:ml-6">
          <TreeRow title="#2 Children (and spouse if married)">
            {children.map((c) => {
              const cSpouse = getSpouse(c);
              return (
                <div key={c.id} className="flex flex-wrap gap-3">
                  <PersonCard person={c} onClick={() => onOpenPerson(c)} badge="Child" />
                  {cSpouse ? (
                    <PersonCard person={cSpouse} onClick={() => onOpenPerson(cSpouse)} badge="Spouse" />
                  ) : null}
                </div>
              );
            })}
          </TreeRow>

          {/* Recursively render next generations */}
          <div className="mt-4 space-y-6">
            {children.map((c) => (
              <div key={`sub-${c.id}`} className="rounded-2xl border border-dashed p-3">
                <Descendants root={c} onOpenPerson={onOpenPerson} depth={depth + 1} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No children found for this person.</p>
      )}
    </div>
  );
}
