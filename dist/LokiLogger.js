import winston from "winston";
import LokiTransport from "winston-loki";
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
        this.logger = winston.createLogger({
            level: "info",
            transports: [
                new LokiTransport({
                    host: lokiHost,
                    labels: { job: jobName },
                    json: true,
                    replaceTimestamp: true,
                }),
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
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
export default LokiLogger;
//# sourceMappingURL=LokiLogger.js.map