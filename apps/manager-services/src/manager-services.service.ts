import { Injectable } from '@nestjs/common';
import { ProjectRepository, ServiceAccountRepository } from '@app/repository';


@Injectable()
export class ManagerServicesService {

  constructor(
    private readonly serviceAccountRepository: ServiceAccountRepository,
    private readonly projectRepository: ProjectRepository
  ) { }

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

  // getProjectDetails: async (req, res, next) => {
  //     const { user } = req.body;
  //     const { project_id } = req.params;
  //     console.log(user);
  //     console.log(req.params);
  //     console.log(project_id);

  //     try {
  //         const project = await Project.findOne({ user: user,_id: new mongoose.Types.ObjectId(project_id) });
  //         // const project = await Project.findById(project_id);
  //         console.log(project);
  //         if (!project) {
  //             return next(createHttpError(400, "Project Not Found!"));
  //         }

  //         const projectServices = await ProjectService.find({project_id: project_id});
  //         console.log("projectServices", projectServices);
  //         const projectDetails = {...project._doc}    ;
  //         projectDetails.services = projectServices
  //         console.log(project);
  //         return res.status(200).json(projectDetails);
  //     } catch (err) {
  //         console.log(err);
  //         next(createHttpError(500, err));
  //     }
  // }
  // addProjectService: async(req, res, next) =>{
  //     const {service, project_id, user} = req.body;
  //     // Check if the project exists for the user
  //     // CHECK FOR THE ACTIVE SERVICE
  //     //  Add Project Service
  //     try{   

  //         const projectExists = await Project.findById(project_id);
  //         if(!projectExists){
  //             return next(createHttpError(400, "INVALID PROJECT ID!"));
  //         }
  //         const existsService = await ProjectService.find({project_id: project_id, service: service.name});
  //         console.log(existsService.length);
  //         if(existsService.length > 0) {
  //             return next(createHttpError(400, "Service Alreaduy exists for the project!"));  
  //         }

  //         const projectService = new ProjectService({
  //             project_id: project_id,
  //             service: service.name,
  //             status: true,
  //             isLimited: (service.credits_alloted  && service.credits_alloted > 0) ? true : false,
  //             credits_alloted: (service.credits_alloted && service.credits_alloted> 0) ? service.credits_alloted : 0,
  //             isLimited:false,
  //             credits_alloted: 0,
  //             api_keys: []
  //         });
  //         const activatedService = await projectService.save();
  //         console.log("ACTIVATED SERVICE:", activatedService.service);
  //         return res.status(200).json({status: true, message: "ADDED SERVICE TO PROJECT}"})
  //     }catch(err){
  //         console.log("ERROR:",err);
  //         next(createHttpError(500));
  //     }
  // }
  // addProject: async (req, res, next) => {
  //     const { project, user } = req.body;
  //     console.log(user);
  //     try {
  //         if (!project) {
  //             next(createHttpError(400, "Missing Details!"));
  //         }
  //         console.log("Name:", project.name);
  //         console.log("Sector:", project.sector);

  //         const newProject = new Project({
  //             name: project.name,
  //             sector: project.sector,
  //             user: user,
  //             credits_alloted: 0
  //         });
  //         const savedProject = await newProject.save();

  //         const services = user.services;
  //         console.log(services);
  //         const activeServices = [];

  //         Object.keys(services).map((key) =>{
  //             console.log(services[key]);
  //             if(services[key] == true){
  //                 activeServices.push(key);
  //             }
  //         });
  //         console.log("ACTIVE SERVICES", activeServices);

  //         if(activeServices.length > 0){
  //             const project_id = savedProject._id;
  //             console.log("Project:",savedProject.name, "Id:", savedProject._id);
  //             activeServices.map(async(service) =>{
  //                 const projectService = new UserService({
  //                     project_id: project_id,
  //                     service: service,
  //                     status: true,
  //                     isLimited:false,
  //                     credits_alloted: 0,
  //                     api_keys: []
  //                 });
  //                 const activatedService = await projectService.save();
  //                 console.log("Activated Services:", activatedService);
  //             })
  //         } 

  //         // ADD PROJECT EVENT
  //         const message = { project_id: savedProject._id, services: {} }
  //         await EventEmitter("add_project", message);
  //         return res.status(200).json({
  //             status: "success",
  //             action: "Added PROJECT!"
  //         })
  //     }
  //     catch (err) {
  //         next(err);
  //     }
  // }

}
