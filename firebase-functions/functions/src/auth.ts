import { onRequest } from "firebase-functions/v2/https";

export const createUser = onRequest(async (request, response) => {
  response.json({ result: "TODO: Implement createUser" });
});


