// Quote type for Firestore
export interface Quote {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  note?: string;
  company?: string;
  items?: any[];
  createdAt?: Timestamp;
}

/**
 * Save a quote to Firestore in the 'quotes' collection
 */
export async function saveQuoteToFirestore(data: Quote): Promise<string> {
  try {
    const db = getFirebaseDb();
    const cleanData = {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      note: data.note || "",
      company: data.company || "",
      items: Array.isArray(data.items) ? data.items : [],
      createdAt: Timestamp.now(),
    };
    const quotesRef = collection(db, "quotes");
    const docRef = await addDoc(quotesRef, cleanData);
    console.log(`Quote saved to quotes/${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("Error saving quote:", error);
    throw error;
  }
}
import { getFirebaseDb } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  Timestamp,
  CollectionReference,
} from "firebase/firestore";

export interface TeamRegistration {
  id?: string;
  gradRange: string;
  sportType: string;
  classGroup: string;
  gradYear: string;
  gender: string;
  teamName?: string;
  contactName?: string;
  contactPhone?: string;
  transactionCode?: string;
  members: TeamMember[];
  createdAt?: Timestamp;
  status?: "pending" | "approved" | "rejected";
}

export interface TeamMember {
  lastName: string;
  firstName: string;
  fullName?: string;
  sportRank: string;
  position: string;
  registerNo: string;
  job: string;
  photoUrl?: string;
}

/**
 * Get the collection name based on sport type
 */
function getSportTypeCollection(sportType: string): string {
  const normalized = sportType?.trim().toLowerCase();

  // Map Mongolian sport names to target English collection names
  if (normalized === "сагсан бөмбөг" || normalized === "basketball") {
    return "basketball";
  }
  if (normalized === "дартс" || normalized === "darts") {
    return "darts";
  }
  if (normalized === "теннис" || normalized === "tennis") {
    return "tennis";
  }

  // fall back to simple sanitized name for any other sports
  const safeName = (normalized || "")
    .replace(/\s+/g, "_")
    .replace(/[\/\\]+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

  return safeName || "other";
}

/**
 * Save team registration to Firestore organized by sport type
 * Creates collection structure: {sportType}/{teamName}/{teamRegistration}
 */
export async function saveTeamRegistration(
  data: TeamRegistration
): Promise<string> {
  try {
    const db = getFirebaseDb();

    // Validate required fields
    if (!data.sportType) {
      throw new Error("Sport type is required");
    }

    // Team name is optional for all sports; tennis still follows player-name-based behavior.
    // Get the collection name based on sport type
    const sportCollection = getSportTypeCollection(data.sportType);

    // Clean and validate the data
    const cleanData = {
      gradRange: data.gradRange || "",
      sportType: data.sportType,
      classGroup: data.classGroup || "",
      gradYear: data.gradYear || "",
      gender: data.gender || "",
      contactPhone: data.contactPhone || "",
      transactionCode: data.transactionCode || "",
      members: (data.members || []).map(member => ({
        lastName: member.lastName || "",
        firstName: member.firstName || "",
        sportRank: member.sportRank || "",
        position: member.position || "",
        registerNo: member.registerNo || "",
        job: member.job || "",
        photoUrl: (member.photoUrl && !member.photoUrl.startsWith("blob:")) ? member.photoUrl : "",
      })),
      createdAt: Timestamp.now(),
      status: "pending" as const,
    } as any;

    if (data.sportType !== "Теннис") {
      cleanData.teamName = data.teamName?.trim() || "";
      cleanData.contactName = data.contactName || "";
    }

    // Save directly in sportType collection (e.g., basketball, darts, tennis)
    // This avoids one extra level of teamName/registrations.
    const sportCollectionRef = collection(db, sportCollection);

    const docRef = await addDoc(sportCollectionRef, cleanData);

    const logTeamName = data.sportType === "Теннис" ? "(tennis player)" : data.teamName || "";
    console.log(
      `Team registration saved to ${sportCollection}/${docRef.id} (teamName=${logTeamName})`
    );
    return docRef.id;
  } catch (error) {
    console.error("Error saving team registration:", error);
    throw error;
  }
}

/**
 * Get team registration by sport type and ID
 */
export async function getTeamRegistration(
  sportType: string,
  registrationId: string
): Promise<TeamRegistration | null> {
  try {
    const db = getFirebaseDb();
    const sportCollection = getSportTypeCollection(sportType);

    const registrationRef = doc(db, sportCollection, registrationId);
    const docSnapshot = await getDoc(registrationRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as TeamRegistration;
    }
    return null;
  } catch (error) {
    console.error("Error getting team registration:", error);
    return null;
  }
}

/**
 * Get all registrations for a specific sport type
 */
export async function getRegistrationsBySportType(
  sportType: string
): Promise<TeamRegistration[]> {
  try {
    const db = getFirebaseDb();
    const sportCollection = getSportTypeCollection(sportType);
    
    // Only fetch approved registrations
    const registrationsSnapshot = await getDocs(
      query(collection(db, sportCollection), where("status", "==", "approved"))
    );

    const allRegistrations: TeamRegistration[] = [];

    registrationsSnapshot.docs.forEach((docItem) => {
      const data = docItem.data();
      allRegistrations.push({
        id: docItem.id,
        ...data,
        members: Array.isArray(data.members)
          ? data.members.map((m: any) => ({
              lastName: m.lastName || "",
              firstName: m.firstName || "",
              fullName: m.fullName || "",
              sportRank: m.sportRank || "-",
              position: m.position || "",
              registerNo: m.registerNo || m.personalNumber || "",
              job: m.job || "",
              photoUrl: [m.photoUrl, m.imageUrl].find((u) => u && !u.startsWith("blob:")) || "",
            }))
          : [],
      } as unknown as TeamRegistration);
    });

    return allRegistrations;
  } catch (error) {
    console.error("Error getting registrations by sport type:", error);
    return [];
  }
}

/**
 * Get all registrations by team name across all sports
 */
export async function getRegistrationsByTeamName(
  teamName: string
): Promise<TeamRegistration[]> {
  try {
    const db = getFirebaseDb();
    const allRegistrations: TeamRegistration[] = [];

    // Define all sport types to search
    const sportTypes = ["basketball", "volleyball", "soccer", "tennis", "darts", "other"];
    
    // Search each sport type
    for (const sportType of sportTypes) {
      if (!teamName?.trim()) {
        continue;
      }
      const sportCollection = getSportTypeCollection(sportType);
      const registrationsSnapshot = await getDocs(
        query(collection(db, sportCollection), where("teamName", "==", teamName.trim()))
      ).catch(() => null);

      if (registrationsSnapshot) {
        registrationsSnapshot.docs.forEach((doc) => {
          allRegistrations.push({
            id: doc.id,
            ...doc.data(),
          } as TeamRegistration);
        });
      }
    }

    return allRegistrations;
  } catch (error) {
    console.error("Error getting registrations by team name:", error);
    return [];
  }
}

/**
 * Update team registration status
 */
export async function updateRegistrationStatus(
  sportType: string,
  registrationId: string,
  status: "pending" | "approved" | "rejected"
): Promise<void> {
  try {
    const db = getFirebaseDb();
    const sportCollection = getSportTypeCollection(sportType);

    const registrationRef = doc(db, sportCollection, registrationId);

    await updateDoc(registrationRef, { status });
    console.log(`Registration ${registrationId} status updated to ${status}`);
  } catch (error) {
    console.error("Error updating registration status:", error);
    throw error;
  }
}
