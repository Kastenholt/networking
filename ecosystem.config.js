module.exports = {
  apps: [{
    name: 'app1',
    script: 'server.js',
    watch: true,
    watch_options: {
      usePolling: true,
    },
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
    ignore_watch: ['node_modules', 'db'],
  }],
};
