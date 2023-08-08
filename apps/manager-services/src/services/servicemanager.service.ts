import { HttpException, HttpStatus, Injectable, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ProjectRepository, ProjectServiceRepository, ProjectServiceKeysRepository } from '@app/repository';
import mongoose from 'mongoose';
import { Request } from 'express';
import { ServiceManager } from '../utils/serviceManager';


@Injectable()
export class ServiceManagerService {
    logger: Logger;

    constructor(
        private readonly serviceManager:ServiceManager,
        private readonly projectServiceKeysRepository: ProjectServiceKeysRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly projectServiceRepository: ProjectServiceRepository,
    ) {
        this.logger = new Logger(ServiceManagerService.name);
    }

    async activateUserService(req:Request) {
        const { service, project_id, user } = req.body;

        const projectExists = await this.projectRepository.findOne({ _id: new mongoose.Types.ObjectId(project_id) });
        console.log(projectExists ? true : false);
        if (!projectExists) {
            throw new HttpException("INVALID PROJECT ID!", HttpStatus.BAD_REQUEST);
        }

        if (!service || !project_id) {
            console.log("HELLO");
            throw new HttpException("MISSING DETAILS!", HttpStatus.BAD_REQUEST);
        } else {
            try {
                // CHECK IF SERVICE IS ALREADY ACTIVE 
                const serviceActive = await this.projectServiceRepository.findOne({ project_id: project_id, service: service });

                if (serviceActive && serviceActive.status) {
                    throw new HttpException("Service Already Active!", HttpStatus.BAD_REQUEST);
                }
                else if (serviceActive && !serviceActive.status) {
                    await this.projectServiceRepository.findOneAndUpdate(
                        { project_id: project_id, service: service },
                        { status: true }
                    );

                    const messageObj = {
                        project_id: project_id,
                        service: service
                    };
                    // await EventEmitter("resume_project_service", messageObj);
                    return {
                        status: {
                            service: serviceActive.service,
                            status: "active",
                            action: "resumed"
                        }
                    };
                }
                else {
                    const userServiceObject = {
                        project_id: project_id,
                        service: service,
                        status: true,
                        isLimited: false,
                        credits_alloted: 0,
                        api_keys: [],
                    };
                    // ACTIVATE USER
                    let ActivatedUserService = await this.projectServiceRepository.create(userServiceObject);
                    console.log("ACTIVATED USER SERVICE:", ActivatedUserService);

                    const messageObj = {
                        project_id: project_id,
                        service: service
                    };
                    // await EventEmitter("initiate_project_service", messageObj);

                    return {
                        status: {
                            service: ActivatedUserService.service,
                            status: "active",
                            action: "initiated"
                        }
                    };
                }
            }
            catch (err) {
                console.log("CATCH");
                throw new InternalServerErrorException;
            }
        }
    }

    async deactivateUserService(req:Request) {
        console.log(req.body);
        const { service, project_id, user } = req.body;
        // token.split(" ")[1] for auth format BEARER {TOKEN}
        if (!service) {
            // console.log("HELLO");
            throw new BadRequestException;
        } else {
            try {
                // CHECK IF SERVICE IS ALREADY ACTIVE 

                const serviceActive = await this.projectServiceRepository.findOne({ project_id: project_id, service: service });
                console.log("serviceActive", serviceActive);
                if (!serviceActive) {
                    throw new HttpException("Service not initiated!", HttpStatus.BAD_REQUEST);
                } else if (!serviceActive.status) {
                    throw new HttpException("Service Already InActive!", HttpStatus.BAD_REQUEST);
                }
                else {
                    await this.projectServiceRepository.findOneAndUpdate(
                        { project_id: project_id, service: service },
                        { status: false }
                    );

                    const messageObj = {
                        project_id: project_id,
                        service: service
                    };
                    // await EventEmitter("pause_project_service", messageObj);
                    return {
                        status: {
                            service: serviceActive.service,
                            status: "inactive",
                            action: "paused"
                        }
                    };
                }
            }
            catch (err) {
                console.log("CATCH");
                throw new InternalServerErrorException;
            }
        }
    }

    async validateKey(req:Request) {
        let { key_id, user_id } = req.body;
        if (!key_id || !user_id) {
            throw new HttpException("Missing Details!", HttpStatus.BAD_REQUEST)
        }
        console.log(key_id, user_id);
        try {
            const validKeys = await this.serviceManager.validateAPIKey(key_id, user_id);
            console.log(validKeys);
            return validKeys;
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException;
        }
    }

    async getUserKeys(req: Request) {
        const { project_id } = req.params;
        const { user } = req.body;

        console.log(project_id);
        try {
            const keys = await this.projectServiceKeysRepository.find({ project_id: project_id });
            console.log(keys);
            return keys ;
        } catch (err) {
            console.log("ERROR IN FETCHING KEYS", err);
            throw new InternalServerErrorException;
        }
    }

    async addServiceKeys(req: Request) {
        const { user, project_id } = req.body;
        console.log(user, project_id);
        try {
            const keys = await this.serviceManager.createServiceAPIKey(user, project_id);
            // await EventEmitter("service_keys_activate", { project_id, key_id: keys.key_id });
            console.log(keys);
            return keys;
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException;
        }
    }

    async activateServiceKeys(req: Request) {
        console.log("HELLO");
        const { key } = req.body;
        try {

            // SEND DEACTIVATION MESSAGE
            let keyExists = await this.projectServiceKeysRepository.findOne({
                key_id: key
            });
            console.log(keyExists);

            if (!keyExists) {
                throw new HttpException("Invalid key!", HttpStatus.BAD_REQUEST);
            }
            await this.projectServiceKeysRepository.findOneAndUpdate({ key_id: key }, { status: true });
            // EVENT
            // await EventEmitter("service_keys_activate", { key_id: key });

            return key;
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException;
        }
    }

    async deactivateServiceKeys(req:Request) {
        console.log("HELLO");
        const { key } = req.body;
        try {

            // SEND DEACTIVATION MESSAGE
            let keyExists = await this.projectServiceKeysRepository.findOne({
                key_id: key
            });
            console.log(keyExists);

            if (!keyExists) {
                throw new HttpException("Invalid key!", HttpStatus.BAD_REQUEST);
            }
            await this.projectServiceKeysRepository.findOneAndUpdate({ key_id: key }, { status: false });
            // EVENT
            // await EventEmitter("service_keys_deactivate", { key_id: key })

            return key;
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException;
        }
    }

    async deleteServiceKeys(req:Request) {
        console.log("HELLO");
        const { key } = req.query;
        console.log(req.query);
        console.log(key);
        try {
            // SEND DEACTIVATION MESSAGE
            let keyExists = await this.projectServiceKeysRepository.findOne({ key_id: key });
            console.log(keyExists);
            if (!keyExists) {
                throw new HttpException("Invalid key!", HttpStatus.BAD_REQUEST);
            }
            // const deletedKey = await this.projectServiceKeysRepository.deleteOne({ key_id: key });
            // console.log(deletedKey);
            // // EVENT
            // await EventEmitter("service_keys_delete", {key_id: key})
            // console.log(`SENT ----> DEACTIVATE_SERVICE_KEYS_EVENT:`, messageEvent);
            return key;
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException;
        }
    }

}

