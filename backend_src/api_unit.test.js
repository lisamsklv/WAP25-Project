import { jest, expect, test, describe, beforeEach } from '@jest/globals';
import { writeAccess } from './api.js';

describe('API Unit Tests (Direct Function Testing)', () => {
  let mockReq;
  let mockRes;
  let mockNext;
  let mockDb;

  beforeEach(() => {
    // Datenbank faken
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
    };

    // Request & Response faken
    mockReq = {
      app: { get: () => mockDb },
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      locals: {},
    };
    mockNext = jest.fn();
  });

  // TEST 1: Middleware writeAccess - Fehlender Token
  test('writeAccess sollte 401 liefern, wenn Authorization Header fehlt', async () => {
    mockReq.headers.authorization = ' ';

    await writeAccess(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Nicht angemeldet' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  // TEST 2: writeAccess - Gültiger Token & Schreibrechte
  test('writeAccess sollte next() rufen bei gültigem Token und Schreibrechten', async () => {
    // Setup: Header setzen
    mockReq.headers.authorization = 'Bearer valid-token';

    // Setup: DB Mocks (zuerst Token finden, dann User finden)
    const fakeToken = { user_id: 'user123' };
    const fakeUser = { _id: 'user123', permissions: { write: true } };

    mockDb.findOne
      .mockResolvedValueOnce(fakeToken) // 1. Aufruf (Token)
      .mockResolvedValueOnce(fakeUser);  // 2. Aufruf (User)

    await writeAccess(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.locals.user).toEqual(fakeUser);
  });
});