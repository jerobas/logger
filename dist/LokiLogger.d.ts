import winston from "winston";
/**
 * Interface para as opções de configuração do LokiLogger.
 */
interface LokiLoggerOptions {
    jobName?: string;
    lokiHost?: string;
}
/**
 * Classe LokiLogger
 *
 * Configura e fornece uma instância do Winston Logger com transporte para Loki.
 * Inclui também um transporte para o console.
 */
declare class LokiLogger {
    private logger;
    /**
     * Construtor da classe LokiLogger.
     *
     * @param {LokiLoggerOptions} [options] - Opções de configuração para o logger.
     * @param {string} [options.jobName="default-node-app"] - O nome do job ou serviço (usado como label no Loki).
     * @param {string} [options.lokiHost="http://localhost:3100"] - A URL do servidor Loki.
     */
    constructor(options?: LokiLoggerOptions);
    /**
     * Retorna uma instância do Winston Logger.
     *
     * Você pode usar este logger para registrar mensagens em diferentes níveis:
     * logger.info("Mensagem informativa");
     * logger.warn("Mensagem de aviso");
     * logger.error("Mensagem de erro", { error: someErrorObject });
     * logger.debug("Mensagem de depuração");
     *
     * @returns {winston.Logger} A instância configurada do Winston logger.
     */
    getLogger(): winston.Logger;
}
export default LokiLogger;
//# sourceMappingURL=LokiLogger.d.ts.map