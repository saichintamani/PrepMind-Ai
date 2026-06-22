import { User } from '../types';

const USERS_KEY = 'prepmind_mock_users';
const SESSION_KEY = 'prepmind_mock_session';

interface StoredUser extends User {
  password: string;
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublicUser(user: StoredUser): User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

export const mockAuthService = {
  async signUp(email: string, password: string, name?: string) {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { data: { user: null }, error: { message: 'An account with this email already exists' } };
    }

    const now = new Date().toISOString();
    const user: StoredUser = {
      id: crypto.randomUUID(),
      email,
      name,
      password,
      createdAt: now,
      updatedAt: now,
    };

    users.push(user);
    writeUsers(users);
    localStorage.setItem(SESSION_KEY, user.id);

    return { data: { user: toPublicUser(user) }, error: null };
  },

  async signIn(email: string, password: string) {
    const user = readUsers().find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { data: { user: null }, error: { message: 'Invalid email or password' } };
    }

    localStorage.setItem(SESSION_KEY, user.id);
    return { data: { user: toPublicUser(user) }, error: null };
  },

  async signOut() {
    localStorage.removeItem(SESSION_KEY);
    return { error: null };
  },

  async resetPassword(email: string) {
    const exists = readUsers().some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      return { error: { message: 'No account found with this email address' } };
    }
    return { error: null };
  },

  async getSession() {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      return { data: { session: null }, error: null };
    }

    const user = readUsers().find((u) => u.id === sessionId);
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
      return { data: { session: null }, error: null };
    }

    return {
      data: { session: { user: toPublicUser(user) } },
      error: null,
    };
  },
};
