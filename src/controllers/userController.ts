import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserByIdFromDb,
  updateUserInDb,
  deleteUserFromDb,
} from "../models/userModel";

const secretKey = "your-secret-key";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ username, email, password: hashedPassword, role });
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdFromDb(Number(id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving user");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await updateUserInDb(Number(id), updates);
    if (result) {
      res.send("User updated");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error updating user");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteUserFromDb(Number(id));
    if (result) {
      res.send("User deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
};
