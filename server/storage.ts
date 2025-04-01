import { users, internshipApplications, type User, type InsertUser, type InternshipApplication, type InsertInternshipApplication } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createInternshipApplication(application: InsertInternshipApplication): Promise<InternshipApplication>;
  getAllInternshipApplications(): Promise<InternshipApplication[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private internshipApplications: Map<number, InternshipApplication>;
  currentUserId: number;
  currentApplicationId: number;

  constructor() {
    this.users = new Map();
    this.internshipApplications = new Map();
    this.currentUserId = 1;
    this.currentApplicationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createInternshipApplication(insertApplication: InsertInternshipApplication): Promise<InternshipApplication> {
    const id = this.currentApplicationId++;
    const application: InternshipApplication = {
      ...insertApplication,
      id,
      createdAt: new Date().toISOString(),
      status: "pending"
    };
    this.internshipApplications.set(id, application);
    return application;
  }

  async getAllInternshipApplications(): Promise<InternshipApplication[]> {
    return Array.from(this.internshipApplications.values());
  }
}

export const storage = new MemStorage();
