const concurrently = require('concurrently');
const { resolve } = require('path');

const servicesToBuild = [
    {
        command: 'npx nest build payment-services',
        name: 'payment-services',
        prefixColor: 'red',
    },
    {
        command: 'npx next build auth-services',
        name: 'auth-services',
        prefixColor: 'blue',
    },
    // Add more services to build here as needed
];

const buildCommands = servicesToBuild.map((service) => ({
    command: service.command,
    name: service.name,
    prefixColor: service.prefixColor,
}));



const {result} = concurrently(buildCommands, {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 1,
    cwd: resolve(__dirname, 'scripts'), // Change 'scripts' to the correct directory containing your Nest.js apps
})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
   result.then((success, failure) => {
        console.log('All services built successfully');
    })
    .catch((err) => {
        console.error('Error occurred during build:', err);
    });

