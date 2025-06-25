import winston from "winston";
import LokiTransport from "winston-loki";

/**
 * LokiLogger Class
 *
 * @param {string} jobName - The name of the job or service (used as a label in Loki).
 * @param {string} lokiHost - The URL of the Loki server (e.g., "http://localhost:3100").
 */

class LokiLogger {
  constructor(
    jobName = "default-node-app",
    lokiHost = "http://localhost:3100"
  ) {
    if (typeof jobName !== "string" || jobName.trim() === "") {
      throw new Error("JobName must be a string");
    }
    if (typeof lokiHost !== "string" || lokiHost.trim() === "") {
      throw new Error("LokiHost must be a string");
    }

    this.logger = winston.createLogger({
      transports: [
        new LokiTransport({
          host: lokiHost,
          labels: { job: jobName },
          json: true,
          replaceTimestamp: true,
        }),

        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
      level: "info",
    });
  }

  /**
   * Returns an instance of Winston Logger
   * 
   * @returns {winston.Logger} The configured Winston logger instance
   */
  getLogger() {
    return this.logger;
  }
}
export default LokiLogger;
