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

export const fetchUsersFilter = async (query = ""): Promise<User[]> => {
  try {
    if (query.length < 3) return []; // Ensure search is meaningful

    const response = await axios.get(`${API_URL}?q=${query}`); // API call with search param
    return response.data.slice(0, 20).map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      body: user.body.length > 64 ? user.body.slice(0, 64) + "..." : user.body, // Truncate body
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
