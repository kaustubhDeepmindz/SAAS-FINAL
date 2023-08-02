type accessToken = {
    acess_token: String,
    refresh_token: String
}
const { Kafka, Partitioners } = require('kafkajs')

const topic = "access_token_added"

const kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const getRandomNumber = () => Math.round(Math.random() * 1000);

// CREATE NEW MESSAGE
const createMessage = (num: number, message: {}) => ({
    key: `key-${num}`,
    value: JSON.stringify({ usage: message }),
})

// REPORT USAGE 
const reportUsage = (token: {}) => {
    return producer
        .send({
            topic,
            // compression: CompressionTypes.GZIP,
            messages: [createMessage(getRandomNumber(), token)],
        });
}


export const Access_Token = {

    run: async () => {
        try {
            // queue.activateConsumer(authController.add);
            await producer.connect();
            console.log("Connected to KAFKA!")
        } catch (err) {
            console.error(`Error Listening to ${topic}: ${err}`);
        }
    },
    sendAccessTokenCreated: (token: {}) => {
        return new Promise((resolve, reject) => {
            try {
                if (!token) {
                    throw new Error('Sould send a valid token to message queue');
                }
                console.log('Sending EVENT to KAFKA!');
                reportUsage(token)
                    .then(() => {
                        console.log("EVENT SENT: ", topic)
                        resolve("Access_Token_Generated");
                    })
                    .catch((e: Error) => console.error(`[${topic}/producer]: ${e.message}`, e))
                    .catch((err: Error) => {
                        console.log("Error:", err);
                        reject(`Error in reporting topic ${topic}!`);
                    });
                setTimeout(() => {
                    reject('No sufficient credits');
                }, 200);
            } catch (err) {
                console.error(`Error Sending Article Added Event to ${topic}: ${err}`);
            }
        })
    },
};
