import { User } from "../types";

export async function fetchUser(id: number): Promise<User | undefined> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} `);
  }

  const data: User = await response.json();
  return data;
}
