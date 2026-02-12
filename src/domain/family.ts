export type Gender = "M" | "F";

export type Person = {
  id: string;
  name: string;
  gender: Gender;
  dob: string;      // ISO or readable string
  mobile: string;
  address: string;

  fatherId?: string;
  motherId?: string;

  spouseId?: string;  // optional
};

export type FamilyStore = {
  peopleById: Record<string, Person>;
};
