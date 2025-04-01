import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { z } from "zod";

// Setup multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "../uploads");
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Create unique filename with original extension
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${ext}`);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only specific file types
    const allowedFileTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedFileTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.') as any);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // Internship application endpoint
  app.post(
    "/api/internship/apply", 
    upload.single("resume"), 
    async (req: Request, res: Response) => {
      try {
        // Validate request body
        const schema = z.object({
          name: z.string().min(2),
          email: z.string().email(),
          phone: z.string().min(10)
        });

        const { name, email, phone } = schema.parse(req.body);

        // Ensure the file was uploaded
        if (!req.file) {
          return res.status(400).json({ 
            message: "Resume file is required"
          });
        }

        // Create internship application
        const application = await storage.createInternshipApplication({
          name,
          email,
          phone,
          resumePath: req.file.path
        });

        res.status(201).json({ 
          message: "Application submitted successfully",
          applicationId: application.id
        });
      } catch (error) {
        console.error("Error submitting application:", error);
        
        if (error instanceof z.ZodError) {
          return res.status(400).json({ 
            message: "Invalid application data", 
            errors: error.errors 
          });
        }

        res.status(500).json({ 
          message: "Failed to submit application"
        });
      }
    }
  );

  // Get all internship applications (admin endpoint)
  app.get("/api/internship/applications", async (req: Request, res: Response) => {
    try {
      const applications = await storage.getAllInternshipApplications();
      
      // Don't return full resume path for security
      const sanitizedApplications = applications.map(app => ({
        ...app,
        resumePath: "Resume file uploaded",
      }));
      
      res.json(sanitizedApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
