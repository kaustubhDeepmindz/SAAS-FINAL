module.exports = {
  apps: [
    {
      name: 'auth-services',
      script: './dist/apps/auth-services/main.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },

      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'billing-services',
      script: './dist/apps/billing-services/main.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },

      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
