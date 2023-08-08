import { PaymentDetailsRepository } from '@app/repository';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRazorpay } from 'nestjs-razorpay';
import Razorpay from 'razorpay';

// const { producer } = require("../messageBusInit");

// const CreateMessageTopic = require("../message-bus/MessageTopic.init");
// const RechargeCreditsTopic = CreateMessageTopic("recharge-credits");


@Injectable()
export class PaymentsService {

  constructor(
    @InjectRazorpay() private readonly razorpayClient: Razorpay,
    private readonly paymentDetailsRepository: PaymentDetailsRepository
  ) {

  }
  getHello(): string {
    return 'Hello World!';
  }

  async fetchPaymentDetails(req, res) {
    return "SERVICE UNAVAILABLE RIGHT NOW!";
  }

  async captureSuccessfulPayment(req) {
    const response = req.body;
    console.log(response);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount } = response;
    // this.razorpayClient.payments.capture(razorpay_payment_id,amount)
    // .then((res)=>{
    //     console.log(res);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })


    try {
     
      const savedPaymentDetails = await this.paymentDetailsRepository.create({
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        payment_signature: razorpay_signature
      })
      console.log(savedPaymentDetails);

      const data =  await this.razorpayClient.payments.fetch(razorpay_payment_id)
      // .then(async (data) => {
        console.log("Data:", data);
        // SEND RECHARGE EVENT
        // let message = await RechargeCreditsTopic.createMessage(data.email, amount, razorpay_payment_id);
        // console.log(message);
        // let messageEvent = await RechargeCreditsTopic.createEvent(message);
        // console.log(messageEvent);
        // await producer.send(messageEvent);

        // console.log("SENT ----> RECHARGE_CREDITS:", messageEvent);
        return data;
      // }).catch(err => {
      //   console.log(err)
      //   throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      // });

    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException;
    }
  }

  async createOrder(req, res) {
    const { amount, currency, receipt, notes } = req.body;

    this.razorpayClient.orders.create({ amount, currency, receipt, notes },
      (err, order) => {
        //STEP 3 & 4:
        if (!err)
          return order;
        else {
          console.log(err);
          throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    )
  }

  async fetchPayment(req, res) {
    const { payment_id } = req.body;
    // console.log(payment_id);
    this.razorpayClient.payments.fetch(payment_id).then(data => {
      // console.log(data);
      return data;
    }).catch(err => {
      console.log(err)
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }
}
