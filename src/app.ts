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
    this.app.use(helmet());

    this.app.use(
      cors({
        origin:
          process.env.NODE_ENV === "production"
            ? process.env.ALLOWED_ORIGINS?.split(",") || []
            : "*",
        credentials: true,
      })
    );

    this.app.use(compression());

    this.app.use(
      morgan("combined", {
        stream: {
          write: (message: string) => Logger.info(message.trim()),
        },
      })
    );

    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.get("/health", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
      });
    });

    this.app.use("/api", apiRoutes);
  }

  private initializeErrorHandling() {
    this.app.use(notFoundHandler);

    this.app.use(errorHandler);
  }
}

export default new App().app;
