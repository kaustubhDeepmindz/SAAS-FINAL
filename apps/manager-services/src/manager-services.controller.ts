import { Controller, ForbiddenException, Get, HttpException, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { ManagerServicesService } from './manager-services.service';


@Controller("/service")
export class ManagerServicesController {
  constructor(private readonly managerServicesService: ManagerServicesService) {}

  @Get()
  getHello(): string {
    return this.managerServicesService.getHello();
  }


  @Post("/account/create")
  async createAccount() {
    try{
      return this.managerServicesService.createServiceAccount();
    }
    catch(err){
      throw new ForbiddenException;
    }
  }


  @Get("/projects")
  async getProjects(){
    try{
      return this.managerServicesService.getProjects();
    }
    catch(err){
      throw new NotFoundException;
    }
  }
}
