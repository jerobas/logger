"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_loki_1 = __importDefault(require("winston-loki"));
class LokiLogger {
    /**
     *
     * @param {LokiLoggerOptions} [options] - Opções de configuração para o logger.
     * @param {string} [options.jobName="default-node-app"] - O nome do job ou serviço (usado como label no Loki).
     * @param {string} [options.lokiHost="http://localhost:3100"] - A URL do servidor Loki.
     */
    constructor(options) {
        const { jobName = "default-node-app", lokiHost = "http://localhost:3100" } = options || {};
        if (typeof jobName !== "string" || jobName.trim() === "") {
            throw new Error("JobName deve ser uma string não vazia.");
        }
        if (typeof lokiHost !== "string" || lokiHost.trim() === "") {
            throw new Error("LokiHost deve ser uma string não vazia.");
        }
        this.logger = winston_1.default.createLogger({
            level: "info",
            transports: [
                new winston_loki_1.default({
                    host: lokiHost,
                    labels: { job: jobName },
                    json: true,
                    replaceTimestamp: true,
                }),
                new winston_1.default.transports.Console({
                    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
                }),
            ],
            exitOnError: false,
        });
        this.logger.on("error", (err) => {
            console.error("Erro no logger Winston:", err);
        });
    }
    /**
     *
     * @returns {winston.Logger} A instância configurada do Winston logger.
     */
    getLogger() {
        return this.logger;
    }
}
exports.default = LokiLogger;
//# sourceMappingURL=LokiLogger.js.map