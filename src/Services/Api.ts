import axios from "axios";
import { User } from "../models/userModel";

const API_URL = import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com/comments";

export const fetchUsers = async (query = ""): Promise<User[]> => {
  try {
    const response = await axios.get(API_URL);
    let users = response.data.slice(0, 20); // Default 20 users
    if (query.length >= 3) {
      users = users.filter((user:any) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
};
