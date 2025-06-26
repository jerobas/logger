# Logger

Simple and reusable Winston logger with Grafana Loki transport, for Node.js applications.

## 📦 Installation

Install directly from GitHub:

```bash
npm install git+https://github.com/jerobas/logger.git
```

## ⚒️ Usage

1. Import and initialize the logger
```bash
import LokiLogger from "logger";

const logger = new LokiLogger({
  jobName: "dev",
  lokiHost: "http://localhost:3100",
}).getLogger();
```
or
```bash
const loggerModule = require("logger");
const LokiLogger = loggerModule.default;

const logger = new LokiLogger({
  jobName: "dev",
  lokiHost: "http://localhost:3100",
}).getLogger();
```

2. Use the logger
```bash
logger.info('Application started');
logger.warn('Potential issue detected');
logger.error('An unexpected error occurred');
```