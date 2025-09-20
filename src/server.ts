import app from "./app";
import { Logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`);
  Logger.info(`Environment: ${process.env.NODE_ENV || "development"}`);
});

process.on("SIGTERM", () => {
  Logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    Logger.info("Process terminated");
  });
});

process.on("SIGINT", () => {
  Logger.info("SIGINT received, shutting down gracefully");
  server.close(() => {
    Logger.info("Process terminated");
  });
});

process.on("unhandledRejection", (err: Error) => {
  Logger.error("Unhandled Promise Rejection", err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err: Error) => {
  Logger.error("Uncaught Exception", err);
  server.close(() => {
    process.exit(1);
  });
});

export default server;
