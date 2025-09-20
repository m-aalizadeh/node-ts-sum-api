import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import apiRoutes from "./routes/api";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { Logger } from "./utils/logger";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    // Security middleware
    this.app.use(helmet());

    // CORS configuration
    this.app.use(
      cors({
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.ALLOWED_ORIGINS?.split(",") || []
            : "*",
        credentials: true,
      })
    );

    // Compression middleware
    this.app.use(compression());

    // Logging middleware
    this.app.use(
      morgan("combined", {
        stream: {
          write: (message: string) => Logger.info(message.trim()),
        },
      })
    );

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    // Health check endpoint
    this.app.get("/health", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
      });
    });

    // API routes
    this.app.use("/api", apiRoutes);
  }

  private initializeErrorHandling() {
    // Handle 404 errors
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }
}

export default new App().app;
