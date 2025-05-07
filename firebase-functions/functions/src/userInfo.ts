import express from "express";
import { getFirestore } from "firebase-admin/firestore";

type EmployeeType = "Undergraduate" | "Graduate" | "Admin";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  githubUsername: string;
  employeeType: EmployeeType;
  activeEmployee: boolean;
  activeProjects: string[];
}

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", async (req, res) => {
  const db = getFirestore();
  const snapshot = await db.collection("userInfo").get();
  const userInfo: UserInfo[] = snapshot.docs.map((doc) => {
    return {
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      email: doc.data().email,
      githubUsername: doc.data().githubUsername,
      employeeType: doc.data().employeeType,
      activeEmployee: doc.data().activeEmployee,
    };
  });
  res.json(userInfo);
});

router.post("/", async (req, res) => {
  const db = getFirestore();
  const userInfo: UserInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    githubUsername: req.body.githubUsername,
    employeeType: req.body.employeeType,
    activeEmployee: req.body.activeEmployee,
    activeProjects: [],
  };
  try {
    await db.collection("userInfo").add(userInfo);

    res.json("Created New User Info with details" + userInfo);
  } catch (error) {
    console.log(error);
    res.json("Error creating new user info: " + error);
  }
});

router.put("/:email", async (req, res) => {
  const db = getFirestore();
  const userInfo: UserInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    githubUsername: req.body.githubUsername,
    employeeType: req.body.employeeType,
    activeEmployee: req.body.activeEmployee,
  };
  try {
    await db.collection("userInfo").doc(req.params.email).set(userInfo);
    res.json("Updated User Info with details" + userInfo);
  } catch (error) {
    res.json("Error updating user info: " + error);
  }
});

export default router;
