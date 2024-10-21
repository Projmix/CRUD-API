import request from 'supertest';
import app from '../app'; 

describe('CRUD API Tests', () => {
  let createdUserId: string;

  it('should return an empty array of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); 
  });

  it('should create a new user', async () => {
    const newUser = {
      username: 'John Doe',
      age: 28,
      hobbies: ['gaming', 'reading'],
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty('id'); 
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.age).toBe(newUser.age);
    expect(response.body.hobbies).toEqual(newUser.hobbies);

    createdUserId = response.body.id;
  });

  it('should retrieve the created user by ID', async () => {
    const response = await request(app).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdUserId);
    expect(response.body.username).toBe('John Doe');
    expect(response.body.age).toBe(28);
    expect(response.body.hobbies).toEqual(['gaming', 'reading']);
  });

  it('should update the user details', async () => {
    const updatedUser = {
      username: 'Jane Doe',
      age: 30,
      hobbies: ['painting', 'travelling'],
    };

    const response = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdUserId);
    expect(response.body.username).toBe(updatedUser.username);
    expect(response.body.age).toBe(updatedUser.age);
    expect(response.body.hobbies).toEqual(updatedUser.hobbies);
  });

  it('should delete the user', async () => {
    const response = await request(app).delete(`/api/users/${createdUserId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for a deleted user', async () => {
    const response = await request(app).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(404); 
    expect(response.body).toHaveProperty('message', 'User not found');
  });
});
