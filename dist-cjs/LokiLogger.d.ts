import winston from "winston";
interface LokiLoggerOptions {
    jobName?: string;
    lokiHost?: string;
}
declare class LokiLogger {
    private logger;
    /**
     *
     * @param {LokiLoggerOptions} [options] - Opções de configuração para o logger.
     * @param {string} [options.jobName="default-node-app"] - O nome do job ou serviço (usado como label no Loki).
     * @param {string} [options.lokiHost="http://localhost:3100"] - A URL do servidor Loki.
     */
    constructor(options?: LokiLoggerOptions);
    /**
     *
     * @returns {winston.Logger} A instância configurada do Winston logger.
     */
    getLogger(): winston.Logger;
}
export default LokiLogger;
//# sourceMappingURL=LokiLogger.d.ts.map