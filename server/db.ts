import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, articles, adminUsers, type Article, type InsertArticle, type AdminUser } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL);
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _client = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // For PostgreSQL, use INSERT ... ON CONFLICT
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Article queries
 */
export async function getArticles(limit?: number) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(articles).orderBy(desc(articles.publishedAt)) as any;
  if (limit) query = query.limit(limit);
  return query;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createArticle(data: InsertArticle): Promise<Article | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(articles).values(data).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create article:", error);
    throw error;
  }
}

export async function updateArticle(id: number, data: Partial<InsertArticle>): Promise<Article | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.update(articles).set(data).where(eq(articles.id, id)).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update article:", error);
    throw error;
  }
}

export async function deleteArticle(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.delete(articles).where(eq(articles.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete article:", error);
    throw error;
  }
}

/**
 * Admin user queries
 */
export async function getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createAdminUser(data: { email: string; passwordHash: string; name?: string }): Promise<AdminUser | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(adminUsers).values(data).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create admin user:", error);
    throw error;
  }
}
