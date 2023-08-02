const { Kafka, Partitioners } = require('kafkajs');

const topic = 'new-user';

const kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
// GENERATE RANDOM NUMBER
const getRandomNumber = () => Math.round(Math.random() * 1000)

// CREATE NEW MESSAGE
const createMessage = (num: number, message: {}) => ({
    key: `key-${num}`,
    value: JSON.stringify({user: message}),
})

// REPORT USAGE 
const reportUsage = (message: {}) => {
    return producer
        .send({
            topic,
            // compression: CompressionTypes.GZIP,
            messages: [createMessage(getRandomNumber(), message)],
        });
}
export const UserCreated = {

    run: async () => {

        try {
            // queue.activateConsumer(authController.add);
            await producer.connect();
            console.log("Connected to KAFKA!")
        } catch (err) {
            console.error(`Error Listening to ${topic}: ${err}`);
        }
    },
        sendUserCreated: (user: {}) => {

            return new Promise((resolve, reject) => {
                try {
                    if (!user) {
                        throw new Error('Sould send a valid user to message queue');
                    }
                    console.log('Sending EVENT to KAFKA!');
                    reportUsage(user)
                        .then(() => {
                            console.log("EVENT SENT: ", topic)
                            resolve("USER CREATED!");
                        })
                        .catch((e: Error) => console.error(`[${topic}/producer]: ${e.message}`, e))
                        .catch((err: Error) => {
                            console.log("Error:", err);
                            reject(`Error in reporting topic ${topic}!`);
                        });
                    setTimeout(() => {
                        reject('No sufficient credits');
                    }, 500);
                } catch (err) {
                    console.error(`Error Sending Article Added Event to ${topic}: ${err}`);
                }
            })
        },
};





// const topic = "api-usage"

// const userCreated  = (req) => {
//     return new Promise((resolve, reject) => {
//         console.log("Checking credit with token", req.headers["token"]);
//         const { token } = req.headers;
//         console.log("Token", token);

//         if (tokens.includes(token)) {
//             credits[token].credits = credits[token].credits - 10;
//             console.log("CREDITS used:", credits[token]);
//             const usage = {
//                 service_name: "/transcribe",
//                 route: "example",
//                 api_key: req.headers.apiKey,
//                 timeStamp: Date.now(),
//                 req_host: "unknown",
//                 completion_time: 2
//             }
//             reportUsage(usage)
//                 .then(console.log("Usage Sent succesfully to KAFKA!"))
//                 .then(() => {
//                     console.log("reported usage");
//                     resolve("Forwading the details");
//                 })
//                 .catch(e => console.error(`[example/producer] ${e.message}`, e))
//                 .catch((err) => {
//                     console.log("Error:", err);
//                     reject("Error in reporting usage!");
//                 })
//         }
//         setTimeout(() => {
//             reject('No sufficient credits');
//         }, 500);
//     })
// }






// const details = {
//     "id": "sub_1234567890",
//     "object": "subscription",
//     "customer": "cus_1234567890",
//     "plan": {
//         "id": "credit_plan",
//         "object": "plan",
//         "amount": null,
//         "currency": null,
//         "interval": null,
//         "nickname": "Credit Plan",
//         "product": "prod_1234567890",
//         "tiers_mode": null,
//         "usage_type": null
//     },
//     "quantity": 100,
//     "credits": {
//         "total": 100,
//         "used": 50,
//         "remaining": 50
//     },
//     "status": "active",
//     "metadata": {
//         "order_number": "12345"
//     }
// };

// const tokens = ["123", "124"]
// const credits = {
//     "123": {
//         credits: 100,
//         expiresAt: "2020",
//         subcription_id: "124391"
//     },
//     "123": {
//         credits: 100,
//         expiresAt: "2020",
//         subcription_id: "124391"
//     }
// }
