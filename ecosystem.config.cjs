module.exports = {
  apps : [{ 
      name: "iris-strukol",
      script: "server.js",
      instances: "1",
      autorestart: true,
      max_memory_restart: "1G", 
      watch: false, 
      exec_mode: "fork", 
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }, 
    },
  ]
};
