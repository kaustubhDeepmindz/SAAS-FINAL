import { UsageRepository, UserServiceStatusRepository } from '@app/repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

let usageDTO = {
  _id: 0,
  service_name: 1,
  api_key: 1,
  route: 1,
  completion_time: 1
}

@Injectable()
export class BillingServicesService {

 
  constructor(
    private readonly usageRepository: UsageRepository,
    private readonly userServiceRepository: UserServiceStatusRepository
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async recordUsage(req, res) {
    try {
      const usageObj = req.body.usage;
      const savedUsage = await this.usageRepository.create(usageObj);
      console.log("SAVED USAGE: ", savedUsage);
      return res.status(200).json("this.usageRepository Recorded Succesfully!")
    }
    catch (err) {
      const message = "Error in Recording this.usageRepository:" + err;
      console.log(message);
      return res.status(500).json({ message });
    }
  }

  async getUserServiceUsage(req,res) {
    try {
      const { service_name, api_key } = req.params;
      console.log(req.params);
      // Check if the API KEY used is valid 
      // And if the service token is valid as per the key
      const usage = await this.usageRepository.find({ api_key: api_key, service_name: service_name });
      console.log("this.usageRepository:", usage);
      return { usage };
    }
    catch (err) {
      console.log("Err:", err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getServiceUsage(req, res) {
    console.log(req.params);
    const { serviceName } = req.params;
    // Check for a Valid Service ID
    const serviceExists = await this.usageRepository.find({ service_name: serviceName });
    console.log(serviceExists);
    if (serviceExists) {
      return res.status(200).json({ usage: serviceExists });
    } else {
      return res.status(200).json({ message: "Invalid Service Name!" })
    }
  }

  async postRechargeCredits(req, res) {
    console.log(req.params);
    const { api_key, credits, serviceName } = req.body
    // Check for a Valid Service ID
    const serviceExists = await this.usageRepository.find({ service_name: serviceName });
    console.log(serviceExists);
    if (serviceExists) {
      return res.status(200).json({ usage: serviceExists });
    } else {
      throw new HttpException({ message: "Invalid Service Name!" }, HttpStatus.BAD_REQUEST);
    }
  }

  async getUsage(req,res) {
    // Check for a Valid Service ID
    const usage = await this.usageRepository.aggregate([
      { $project: usageDTO }
    ], {});
    if (usage) {
      return { usage };
    } else {
      throw new HttpException({ message: "NO RECORDS!" }, HttpStatus.NOT_FOUND)
    }
  }
}


