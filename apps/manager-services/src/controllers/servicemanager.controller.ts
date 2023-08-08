import { Controller, ForbiddenException, Get, HttpException, HttpStatus, NotFoundException, Post } from '@nestjs/common';
import { AccountService } from '../services/accounts.service';
import { ServiceManagerService } from '../services/servicemanager.service';



@Controller("/service")
export class ManagerController {
    constructor(
        private readonly accountService: AccountService,
        private readonly managerService: ServiceManagerService
    ) { }

    @Get()
    getHello(): string {
        return this.accountService.getHello();
    }

    @Post("/account/create")
    async createAccount() {
        try {
            return this.accountService.createServiceAccount();
        }
        catch (err) {
            throw new ForbiddenException;
        }
    }

    @Get("/project")
    async getProjectDetails() {
        try {
            return this.accountService.getProjectDetails();
        }
        catch (err) {
            throw new NotFoundException;
        }
    }

    @Get("/projects")
    async getProjects() {
        try {
            return this.accountService.getProjects();
        }
        catch (err) {
            throw new NotFoundException;
        }
    }

    @Post("/project/create")
    async addProject() {
        try {
            return this.accountService.addProject();
        }
        catch (err) {
            throw new NotFoundException;
        }
    }


    // SERVICE MANAGEMENT


    // USER SERVICE
    @Post('/activate')
    async activateUserService() {
        return this.managerService.activateUserService;
    }
 
    @Post('/deactivate')
    async deactivateUserService(){
        this.managerService.deactivateUserService;
    }

    // API KEY ROUTES

    @Post('/api/keys/:project_id')
    async getUserKeys(){
        this.managerService.getUserKeys;
    }

    @Post('/api/keys/generate')
    async addServiceKeys(){
        this.managerService.addServiceKeys;
    }

    @Post('/api/keys/activate')
    async activateServiceKeys(){
        this.managerService.activateServiceKeys;
    }

    @Post('/api/keys/validate')
    async validateKey(){
        this.managerService.validateKey;
    }

    @Post('/api/keys/deactivate')
    async deactivateServiceKeys(){
        this.managerService.deactivateServiceKeys;
    }

    @Post('/api/keys/delete')
    async deleteServiceKeys(){
        this.managerService.deactivateServiceKeys;
    }
}

