// import { ConsumerService } from '@app/common/kafka/consumer.service';
// import { Injectable, OnModuleInit } from '@nestjs/common';

// @Injectable()
// export class TestConsumer implements OnModuleInit {
//   constructor(private readonly consumerService: ConsumerService) {}

//   async onModuleInit() {
//     await this.consumerService.consume({
//       topic: { topic: 'test' },
//       config: { groupId: 'test-consumer' },
//       onMessage: async (message) => {
//         console.log({
//           value: message.value.toString(),
//         });
//         // throw new Error('Test error!');
//       },
//     });
//   }
// }



// "usage":{
//     topic: "usage",
//     type: "json",
//     run: async (message) => {
//         // Perform some action
//         console.log(message);
//         console.log("New Usage Object:",message);
//         let usage = message.usage;
//         let {service_name} = usage;
//         // find the Service Id

//         const billingConfig = await Service.aggregate({service: service_id}
//             [
//                 { $match: { service_name: service_name } },
//                 {
//                   $lookup: {
//                     from: "billingconfigs",
//                     localField: "_id",
//                     foreignField: "service",
//                     as: "billingconfig",
//                   },
//                 },
//                 {
//                   $unwind: "$billingconfig",
//                 }
//             ]
//         );
//         console.log(billingConfig);       
//     }
// }