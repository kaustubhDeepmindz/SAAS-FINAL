module.exports = {
    apps: [
        {
            name: 'auth-services',
            script: './dist/apps/auth-services/main.js', // Path to your main TypeScript file
            watch: true,
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        },
        {
            name: 'billing-services',
            script: './dist/apps/billing-services/main.js', // Path to your main TypeScript file
            watch: true,
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        },
        {
            name: 'manager-service',
            script: './dist/apps/manager-services/main.js', // Path to your main TypeScript file
            watch: true,
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        },
        {
            name: 'payment-service',
            script: './dist/apps/payment-services/main.js', // Path to your main TypeScript file
            watch: true,
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]

}
