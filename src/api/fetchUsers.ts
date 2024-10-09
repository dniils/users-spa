import { User } from "../types";

export async function fetchUsers(): Promise<User[] | undefined> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} `);
  }

  const data: User[] = await response.json();
  return data;
}
