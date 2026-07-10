/** PM2: pm2 start deploy/ecosystem.config.cjs */
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
      },
      max_memory_restart: "512M",
      autorestart: true,
      watch: false,
    },
  ],
};
