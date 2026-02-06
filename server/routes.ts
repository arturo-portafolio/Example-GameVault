
import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // No backend routes needed for this SPA MVP.
  // The frontend handles all logic with mock data.
  
  return httpServer;
}
