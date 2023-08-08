import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProjectRepository, ProjectServiceRepository, ServiceAccountRepository } from '@app/repository';
import mongoose from 'mongoose';


@Injectable()
export class AccountService {
  logger: Logger;

  constructor(
    private readonly serviceAccountRepository: ServiceAccountRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly projectServiceRepository: ProjectServiceRepository,
  ) {
    this.logger = new Logger(AccountService.name);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createServiceAccount(): Promise<any> {
    // let { token } = req.headers;
    // console.log("TOKEN", token);
    try {
      let account = await this.serviceAccountRepository.create({
        account_id: "9q8fechalsdnland",
        isActive: true,
        credits: 0
      });
      const data = {

      }
      return account;
    }
    catch (err) {
      throw err;
    }
  }


  async getProjects() {
    try {
      const projects = await this.projectRepository.find({});
      return projects;
    } catch (err) {
      // console.log(err);
      throw Error(err)
    }
  }

  // async addProject(project: projectDTO, user) {
  async addProject() {
    // console.log(user);
    const project = {
      name: "SAMPLE",
      sector: "test",
      user: "kabirgupta@gmail.com",
      credits_alloted: 10
    };

    try {
      if (!project) {
        throw new HttpException("Missing Details!", HttpStatus.BAD_REQUEST);
      }
      console.log("Name:", project.name);
      console.log("Sector:", project.sector);

      const newProject = await this.projectRepository.create({ ...project });
      return newProject

      // const services = user.services;
      // console.log(services);
      // const activeServices = [];

      // Object.keys(services).map((key) => {
      //   console.log(services[key]);
      //   if (services[key] == true) {
      //     activeServices.push(key);
      //   }
      // });
      // console.log("ACTIVE SERVICES", activeServices);

      // if (activeServices.length > 0) {
      //   const project_id = savedProject._id;
      //   console.log("Project:", savedProject.name, "Id:", savedProject._id);
      //   activeServices.map(async (service) => {
      //     const projectService = new UserService({
      //       project_id: project_id,
      //       service: service,
      //       status: true,
      //       isLimited: false,
      //       credits_alloted: 0,
      //       api_keys: []
      //     });
      //     const activatedService = await projectService.save();
      //     console.log("Activated Services:", activatedService);
      //   })
      // }

      // ADD PROJECT EVENT
      // const message = { project_id: savedProject._id, services: {} }
      // await EventEmitter("add_project", message);
      // return res.status(200).json({
      //   status: "success",
      //   action: "Added PROJECT!"
      // })
    }
    catch (err) {
      throw err;
    }
  }

  async getProjectDetails() {
    // const { user } = req.body;
    const user = 'kabir07gupta@gmail.com'
    // const { project_id } = req.params;
    const project_id = "64cb84196a862ca376f2c680"
    // console.log(user);
    // console.log(req.params);
    // console.log(project_id);

    try {
      const project = await this.projectRepository.findOne({ _id: new mongoose.Types.ObjectId(project_id) });
      // const project = await Project.findById(project_id);
      this.logger.log("Project:", project);

      if (!project) { throw new HttpException('Project Not Found!', HttpStatus.NOT_FOUND); }

      const projectServices = await this.projectServiceRepository.find({ _id: project_id });
      this.logger.log("projectServices", projectServices);

      const projectDetails = { ...project };
      projectDetails["services"] = projectServices
      this.logger.log(project);

      return projectDetails;

    } catch (err) {
      this.logger.warn(err);
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addProjectService(){
      // const {service, project_id, user} = req.body;
      const service = {
        name:"Transcribe",
        credits_alloted: 10
      };
      const project_id = "64cb84196a862ca376f2c680";
      // const user = "kabirgup"
      // Check if the project exists for the user
      // CHECK FOR THE ACTIVE SERVICE
      //  Add Project Service
      try{   

          const projectExists = await this.projectRepository.findOne({ _id: new mongoose.Types.ObjectId(project_id) });
          if(!projectExists){
              throw new HttpException("INVALID PROJECT ID!", HttpStatus.BAD_REQUEST );
          }
          const existsService = await this.projectServiceRepository.find({project_id: project_id, service: service.name});
          console.log(existsService.length);
          if(existsService.length > 0) {
              throw new HttpException("Service Alreaduy exists for the project!", HttpStatus.BAD_REQUEST );
          }

          const activatedService = await this.projectServiceRepository.create({
              project_id: project_id,
              service: service.name,
              status: true,
              isLimited: (service?.credits_alloted  && service?.credits_alloted > 0) ? true : false,
              credits_alloted: (service?.credits_alloted && service?.credits_alloted> 0) ? service.credits_alloted : 0,
              api_keys: []
          });
          console.log("ACTIVATED SERVICE:", activatedService.service);
          // return res.status(200).json({status: true, message: "ADDED SERVICE TO PROJECT}"})
          return {status: true, message: "ADDED SERVICE TO PROJECT"};
      }catch(err){
          console.log("ERROR:",err);
          throw new Error()
      }
  }

}

