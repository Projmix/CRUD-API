import { Request, Response } from 'express';
import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { getUsers, getUser, addUser, updateUserRecord, removeUser } from '../services/userService';

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json(getUsers());
};

export const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!isUuid(userId)) {
    res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = getUser(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;

  if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
    res.status(400).json({ message: 'Invalid request body' }); 
  }

  const newUser = addUser({ username, age, hobbies });
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  if (!isUuid(userId)) {
    res.status(400).json({ message: 'Invalid user ID' });  
  }

  if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
    res.status(400).json({ message: 'Invalid request body' });  
  }

  const updatedUser = updateUserRecord(userId, { username, age, hobbies });
  if (!updatedUser) {
    res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(updatedUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!isUuid(userId)) {
    res.status(400).json({ message: 'Invalid user ID' }); 
  }

  const isDeleted = removeUser(userId);
  if (!isDeleted) {
    res.status(404).json({ message: 'User not found' });
  }

  res.status(204).send();
};
