import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [
  { id: uuidv4(), username: 'Alice', age: 30, hobbies: ['reading', 'gaming'] },
  { id: uuidv4(), username: 'Bob', age: 25, hobbies: ['hiking'] },
  { id: uuidv4(), username: 'Charlie', age: 35, hobbies: ['painting', 'cooking'] },
];

export const getAllUsersFromDB = (): User[] => users;

export const getUserByIdFromDB = (id: string): User | undefined => users.find(user => user.id === id);

export const addUserToDB = (username: string, age: number, hobbies: string[]): User => {
  const newUser: User = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  return newUser;
};

export const updateUserInDB = (id: string, updatedUser: Omit<User, 'id'>): User | null => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;

  const userToUpdate = { id, ...updatedUser };
  users[userIndex] = userToUpdate;
  return userToUpdate;
};

export const removeUserFromDB = (id: string): boolean => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return false;

  users.splice(userIndex, 1);
  return true;
};

export default users