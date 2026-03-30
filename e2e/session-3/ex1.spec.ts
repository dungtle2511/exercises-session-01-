import { test, expect, request } from '@playwright/test';
import { API_BASE_URL } from '../../playwright.config';
import { ApiUtils } from '../../utils/ApiUtils';

let ctx: { authenticatedUser?: any; searchUser?: any } = {};

test.beforeAll(async () => {
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
  await req.dispose();
});


test('TC-01: session 3 exercise 1', async () => {
  const req = await request.newContext();
  const api = new ApiUtils(req, API_BASE_URL);

  await api.login(ctx.authenticatedUser.username, 's3cret');
  const bankAccountsRes = await req.get(`${API_BASE_URL}/bankAccounts`);
  const bankAccounts = await bankAccountsRes.json();
  const userBankAccountID = bankAccounts.results[0].id;

  const usersRes = await req.get(`${API_BASE_URL}/testData/users`);
  const users = await usersRes.json();
  ctx.searchUser = users.results[1];
  
  const res = await req.post(`${API_BASE_URL}/transactions`, {
    data: {
      "transactionType": "payment",
      "amount": "1",
      "description": "test 1",
      "senderId": ctx.authenticatedUser.id,
      "receiverId": ctx.searchUser.id,
    }
  });
  const body = await res.json();
  expect(res.status()).toBe(200);
  expect(typeof body.transaction.id).toBe('string');
  expect(body.transaction.status).toBe('complete');
  expect(body.status).toBe(undefined);

  await req.dispose();
});