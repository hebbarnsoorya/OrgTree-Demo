import { FamilyStore } from "@/domain/family";

export const familyDummy: FamilyStore = {
  peopleById: {
    // --------- Paternal Grandparents ----------
    pGF: {
      id: "pGF",
      name: "Raghav Hebbar",
      gender: "M",
      dob: "1950-02-11",
      mobile: "9000000001",
      address: "Udupi, Karnataka",
      spouseId: "pGM",
    },
    pGM: {
      id: "pGM",
      name: "Savitri Hebbar",
      gender: "F",
      dob: "1955-07-19",
      mobile: "9000000002",
      address: "Udupi, Karnataka",
      spouseId: "pGF",
    },

    // --------- Maternal Grandparents ----------
    mGF: {
      id: "mGF",
      name: "Vishwanath Rao",
      gender: "M",
      dob: "1952-04-05",
      mobile: "9000000003",
      address: "Mangaluru, Karnataka",
      spouseId: "mGM",
    },
    mGM: {
      id: "mGM",
      name: "Shantha Rao",
      gender: "F",
      dob: "1956-12-22",
      mobile: "9000000004",
      address: "Mangaluru, Karnataka",
      spouseId: "mGF",
    },

    // --------- Parents (Root row) ----------
    father: {
      id: "father",
      name: "Mahesh Hebbar",
      gender: "M",
      dob: "1978-01-15",
      mobile: "9888888801",
      address: "Bengaluru, Karnataka",
      fatherId: "pGF",
      motherId: "pGM",
      spouseId: "mother",
    },
    mother: {
      id: "mother",
      name: "Anitha Rao",
      gender: "F",
      dob: "1980-09-09",
      mobile: "9888888802",
      address: "Bengaluru, Karnataka",
      fatherId: "mGF",
      motherId: "mGM",
      spouseId: "father",
    },

    // --------- Children ----------
    c1: {
      id: "c1",
      name: "Sahana Hebbar",
      gender: "F",
      dob: "2002-03-12",
      mobile: "9777777701",
      address: "Pune, Maharashtra",
      fatherId: "father",
      motherId: "mother",
      spouseId: "c1s",
    },
    c1s: {
      id: "c1s",
      name: "Arjun Kulkarni",
      gender: "M",
      dob: "2001-10-30",
      mobile: "9777777702",
      address: "Pune, Maharashtra",
      spouseId: "c1",
    },

    c2: {
      id: "c2",
      name: "Rohan Hebbar",
      gender: "M",
      dob: "2005-06-18",
      mobile: "9777777703",
      address: "Hyderabad, Telangana",
      fatherId: "father",
      motherId: "mother",
      // not married
    },

    c3: {
      id: "c3",
      name: "Meera Hebbar",
      gender: "F",
      dob: "2008-11-02",
      mobile: "9777777704",
      address: "Chennai, Tamil Nadu",
      fatherId: "father",
      motherId: "mother",
      spouseId: "c3s",
    },
    c3s: {
      id: "c3s",
      name: "Karthik Iyer",
      gender: "M",
      dob: "2007-08-21",
      mobile: "9777777705",
      address: "Chennai, Tamil Nadu",
      spouseId: "c3",
    },

    // --------- Grandchildren (children of c1 and c3) ----------
    gc1: {
      id: "gc1",
      name: "Ishaan Kulkarni",
      gender: "M",
      dob: "2025-01-04",
      mobile: "9666666601",
      address: "Pune, Maharashtra",
      fatherId: "c1s",
      motherId: "c1",
    },

    gc2: {
      id: "gc2",
      name: "Diya Iyer",
      gender: "F",
      dob: "2026-02-01",
      mobile: "9666666602",
      address: "Chennai, Tamil Nadu",
      fatherId: "c3s",
      motherId: "c3",
    },
  },
};
