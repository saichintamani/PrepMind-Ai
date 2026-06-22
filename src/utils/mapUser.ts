import { User } from '../types';

export function mapDbUser(row: Record<string, unknown>): User {
  return {
    id: String(row.id),
    email: String(row.email),
    name: row.name ? String(row.name) : undefined,
    phone: row.phone ? String(row.phone) : undefined,
    bio: row.bio ? String(row.bio) : undefined,
    profilePicture: row.profile_picture ? String(row.profile_picture) : undefined,
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
  };
}
