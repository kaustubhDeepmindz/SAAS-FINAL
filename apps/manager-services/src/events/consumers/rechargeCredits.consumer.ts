
import { ConsumerService } from '@app/common/kafka/consumer.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessageType } from '@app/common/kafka/kafkajs.consumer';
import { UserCreditRechargeRepository, UserCreditsRepository } from '@app/repository';
import { uuid } from 'uuidv4';


@Injectable()
export class RechargeCreditsConsumer implements OnModuleInit {
    constructor(
        private readonly consumerService: ConsumerService,
        private readonly userCreditsRepository: UserCreditsRepository,
        private readonly userCreditRechargeRepository: UserCreditRechargeRepository
    ) { }

    async onModuleInit() {
        await this.consumerService.consume(
            {
                topic: { topic: 'recharge-credits' },
                config: { groupId: 'test-consumer' },
                onMessage: async (message) => {
                    // Perform some action
                    // console.log(message);
                    console.log("User:", message.user);
                    console.log("Payment Amount:", message.payment_amount);
                    const creditsToBeAdded = parseInt(message.payment_amount);
                    const isExists = await this.userCreditsRepository.find({ user: message.user })
                    console.log(isExists);
                    const rechargeDetails = {
                        recharge_id: uuid(),
                        payment_id: message.payment_id,
                        user: message.user,
                        currency: "INR",
                        recharge_amount: message.payment_amount,
                        credits_added: creditsToBeAdded,
                        initial_credit_balance: 0,
                        final_credit_balance: 0
                    };

                    if (isExists.length != 0) {
                        const oldCredits = await this.userCreditsRepository.findOne({ user: message.user });
                        rechargeDetails['initial_credit_balance'] = oldCredits.credits;
                        oldCredits.credits += creditsToBeAdded;
                        // const updatedUserCredits = await oldCredits.save();
                        // const updatedUserCredits = await this.userCreditsRepository.findOneAndUpdate({ user: message.user }, { $inc: { credits: creditsToBeAdded } });
                        // console.log("updatedUserCredits", updatedUserCredits);
                        // await updtatedUserCredits.save();
                        // rechargeDetails['final_credit_balance'] = updatedUserCredits.credits;
                    }
                    else {
                        rechargeDetails['initial_credit_balance'] = 0;
                        const newSavedUserCredits = await this.userCreditsRepository.create(
                            {
                                user: message.user,
                                credits: creditsToBeAdded,
                                last_recharge: "test"
                            }
                        );
                        console.log(newSavedUserCredits);
                        rechargeDetails['final_credit_balance'] = newSavedUserCredits.credits;
                    }
                    console.log(rechargeDetails);
                    const userCreditRecharge = await this.userCreditRechargeRepository.create(rechargeDetails);
                    console.log(userCreditRecharge)
                },
                messageType: MessageType.JSON
            }
        );
    }
}
