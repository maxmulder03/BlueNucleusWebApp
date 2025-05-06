/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

initializeApp();

type EmployeeType = "Undergraduate" | "Graduate" | "Admin";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  githubUsername: string;
  employeeType: EmployeeType;
  activeEmployee: boolean;
}

export const createUser = onRequest(async (request, response) => {
  const userInfo: UserInfo = request.body;
  const result = await getFirestore().collection("users").add(userInfo);
  response.json({result: `User Info Created with ID: ${result.id}`});
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
