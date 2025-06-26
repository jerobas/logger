import winston from "winston";
import LokiTransport from "winston-loki";
/**
 * Classe LokiLogger
 *
 * Configura e fornece uma instância do Winston Logger com transporte para Loki.
 * Inclui também um transporte para o console.
 */
class LokiLogger {
    logger;
    /**
     * Construtor da classe LokiLogger.
     *
     * @param {LokiLoggerOptions} [options] - Opções de configuração para o logger.
     * @param {string} [options.jobName="default-node-app"] - O nome do job ou serviço (usado como label no Loki).
     * @param {string} [options.lokiHost="http://localhost:3100"] - A URL do servidor Loki.
     */
    constructor(options) {
        const { jobName = "default-node-app", lokiHost = "http://localhost:3100" } = options || {};
        // Validação básica dos parâmetros de entrada
        if (typeof jobName !== "string" || jobName.trim() === "") {
            throw new Error("JobName deve ser uma string não vazia.");
        }
        if (typeof lokiHost !== "string" || lokiHost.trim() === "") {
            throw new Error("LokiHost deve ser uma string não vazia.");
        }
        // Uma validação mais robusta para logLevel poderia ser adicionada,
        // mas o Winston já lida com níveis inválidos internamente.
        this.logger = winston.createLogger({
            // Define o nível mínimo de log para todos os transportes
            level: "info",
            transports: [
                // Transporte para Loki
                new LokiTransport({
                    host: lokiHost,
                    labels: { job: jobName }, // Rótulos para identificar os logs no Loki
                    json: true, // Envia logs como JSON
                    replaceTimestamp: true, // Substitui o timestamp padrão do Loki pelo do Winston
                    // Outras opções para winston-loki podem ser adicionadas aqui,
                    // como 'format', 'batching', 'interval', etc.
                }),
                // Transporte para Console (para depuração local)
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), // Adiciona cores aos níveis de log no console
                    winston.format.simple() // Formato simples para saída no console
                    ),
                }),
            ],
            // Rejeita logs se o transporte não puder lidar com eles (por exemplo, erros de rede para Loki)
            exitOnError: false,
        });
        // Opcional: Adicionar tratamento de erros para o transporte Loki
        this.logger.on("error", (err) => {
            console.error("Erro no logger Winston:", err);
        });
    }
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
    getLogger() {
        return this.logger;
    }
}
export default LokiLogger;
//# sourceMappingURL=LokiLogger.js.map