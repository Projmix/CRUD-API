import { getAllUsersFromDB, getUserByIdFromDB, addUserToDB, updateUserInDB, removeUserFromDB } from '../db/inMemoryDB';

export const getUsers = () => getAllUsersFromDB();

export const getUser = (id: string) => getUserByIdFromDB(id);

export const addUser = ({ username, age, hobbies }: { username: string, age: number, hobbies: string[] }) => addUserToDB(username, age, hobbies);

export const updateUserRecord = (id: string, { username, age, hobbies }: { username: string, age: number, hobbies: string[] }) => updateUserInDB(id, { username, age, hobbies });

export const removeUser = (id: string) => removeUserFromDB(id);
