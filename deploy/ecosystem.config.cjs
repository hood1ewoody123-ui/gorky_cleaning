/** PM2: pm2 start deploy/ecosystem.config.cjs */
const { loadEnvFile } = require("./load-env-file.cjs");

const productionEnv = loadEnvFile(".env.production");

module.exports = {
  apps: [
    {
      name: "gorkycleaning",
      cwd: "/var/www/gorkycleaning",
      script: "npm",
      args: "start -- -p 3002",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
        ...productionEnv,
      },
      max_memory_restart: "512M",
      autorestart: true,
      watch: false,
    },
  ],
};
