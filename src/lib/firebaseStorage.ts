import { getFirebaseStorage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Upload a file to Firebase Storage
 * @param file - The file to upload
 * @param path - The path in storage (e.g., "team-photos/2026/photo.jpg")
 * @returns Download URL or null if upload fails
 */
export async function uploadFileToStorage(
  file: File,
  path: string
): Promise<string | null> {
  try {
    if (!file) {
      console.error("No file provided");
      return null;
    }

    const storage = getFirebaseStorage();
    // Create storage reference
    const storageRef = ref(storage, path);

    // Upload file
    const snapshot = await uploadBytes(storageRef, file);

    // Get download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    return null;
  }
}

/**
 * Upload a team member photo
 * @param file - The photo file
 * @param tournamentYear - Year of tournament
 * @param teamName - Team name
 * @param memberName - Team member name
 * @returns Download URL or null if upload fails
 */
const safeSegment = (value: string): string =>
  value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .replace(/[-_]+/g, "-")
    .replace(/(^-+|-+$)/g, "");

export async function uploadTeamMemberPhoto(
  file: File,
  tournamentYear: string,
  teamName: string,
  memberName: string
): Promise<string | null> {
  const ts = Date.now();
  const fileExtension = file.name.split(".").pop() || "jpg";
  const safeYear = safeSegment(tournamentYear || "");
  let safeTeam = safeSegment(teamName || "");
  const safeMember = safeSegment(memberName || "");

  // If teamName is empty and this is for darts, use memberName as team segment
  if (!safeTeam && teamName === "" && typeof tournamentYear === "string") {
    // Try to detect darts by call site, fallback to memberName for empty team
    safeTeam = safeMember;
  }

  if (!safeYear || !safeTeam || !safeMember) {
    console.error("Invalid path segment for team-photos upload", { safeYear, safeTeam, safeMember });
    return null;
  }

  const fileName = `${safeMember}-${ts}.${safeExtension(fileExtension)}`;
  const path = `team-photos/${safeYear}/${safeTeam}/${fileName}`;

  return uploadFileToStorage(file, path);
}

const safeExtension = (ext: string): string =>
  ext
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 5) || "jpg";


/**
 * Upload registration request files
 * @param files - Files to upload
 * @param registrationId - Registration ID
 * @returns Array of download URLs
 */
export async function uploadRegistrationFiles(
  files: File[],
  registrationId: string
): Promise<(string | null)[]> {
  const uploadPromises = files.map((file, index) => {
    const fileExtension = file.name.split(".").pop() || "bin";
    const fileName = `${registrationId}-file-${index}.${fileExtension}`;
    const path = `registrations/${registrationId}/${fileName}`;
    return uploadFileToStorage(file, path);
  });

  return Promise.all(uploadPromises);
}
