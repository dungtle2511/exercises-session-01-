import { test, expect, request } from '@playwright/test';
import { API_BASE_URL } from '../../playwright.config';
import { faker } from '@faker-js/faker';

const apiUsers = `${API_BASE_URL}/users`;

let ctx: { authenticatedUser?: any; searchUser?: any } = {};

test.beforeAll(async () => {
//   const { faker: fakerModule } = await import('@faker-js/faker');
//   faker = fakerModule;
  // Ensure the app is up
  const req = await request.newContext();
  await req.get(API_BASE_URL);
  await req.dispose();
});

test.beforeEach(async () => {
  // Seed database
  const req = await request.newContext();
  await req.post(`${API_BASE_URL}/testData/seed`);
  const usersRes = await req.get(`${API_BASE_URL}/testData/users`);
  const users = await usersRes.json();
  ctx.authenticatedUser = users.results[0];
  ctx.searchUser = users.results[1];
  await req.dispose();
});

test.describe('TC-01: Users API @regression', () => {
  test('TC-01.1: POST /users creates user with starting balance', async () => {
    const req = await request.newContext();
    const firstName = faker.person.firstName();
    const res = await req.post(apiUsers, {
      data: {
        firstName,
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        password: 's3cret',
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        avatar: faker.image.avatar(),
        balance: 100_00,
      },
    });
    const body = await res.json();
    expect(res.status()).toBe(201);
    expect(body.user).toEqual(expect.objectContaining({ firstName }));
    expect(body.user.balance).toBe(100_00);
    await req.dispose();
  });

  test('TC-01.2: POST /login authenticates existing user', async () => {
    const req = await request.newContext();
    const res = await req.post(`${API_BASE_URL}/login`, {
      data: { username: ctx.authenticatedUser.username, password: 's3cret' },
    });
    expect(res.status()).toBe(200);
    await req.dispose();
  });
});