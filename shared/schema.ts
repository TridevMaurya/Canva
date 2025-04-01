import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const internshipApplications = pgTable("internship_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  resumePath: text("resume_path").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  status: text("status").notNull().$default(() => "pending"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertInternshipApplicationSchema = createInsertSchema(internshipApplications).pick({
  name: true,
  email: true,
  phone: true,
  resumePath: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertInternshipApplication = z.infer<typeof insertInternshipApplicationSchema>;
export type InternshipApplication = typeof internshipApplications.$inferSelect;
