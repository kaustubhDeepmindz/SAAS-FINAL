import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProjectServiceKeysRepository } from "@app/repository";
import { uuid } from  "uuidv4";
import bcrypt from "bcrypt";

// const service_config = require("./Service.config.json");

@Injectable()
export class ServiceManager{
    constructor(
        private readonly projectServiceKeysRepository:ProjectServiceKeysRepository
    ){}

    createServiceAPIKey (user_id, project_id){
        // Validate the service_id and the user_id;
        const servicePromise = new Promise((resolve, reject) => {
    
            if (!user_id || !project_id) {
                return reject(new Error("Missing params!"));
            }
            // Construct an APIKEY
            const API_Key_RAW = user_id + Date.now() + project_id;
    
            // console.log(API_Key_RAW);
    
            bcrypt.genSalt(process.env.SALT_ROUNDS, (err, Salt) => {
                if (err) return reject(new InternalServerErrorException);
    
                // Hash/Encrypt the above key using a suitable ENCRYPTION ALGORITHM!
                bcrypt.hash(API_Key_RAW, Salt, async (err, hash) => {
                    if (err) {
                        return reject(new InternalServerErrorException);
                    }
                    const savedKey = await this.projectServiceKeysRepository.create({
                        project_id: project_id,
                        key_id: hash,
                        status: true
                    })
                    console.log("SAVED KEY: ", savedKey);
                    // console.log(hash);
                    return resolve({
                        key_id: savedKey.key_id,
                        // created_at: savedKey.createdAt,
                        status: savedKey.status
                    });
                });
            });
        })
    
        return servicePromise;
    }
    
    validateAPIKey (API_Key, user_id) {
        // check if the user_id is mapped to userid if exists
        return new Promise(async (resolve, reject) => {
            try {
                console.log("User:", user_id);
                console.log("KEY:", API_Key);
                const UserKeys = await this.projectServiceKeysRepository.find(
                    {
                        user: user_id,
                        key_id: API_Key
                    }
                );
    
                console.log(UserKeys);
                if (UserKeys.length == 0) {
                    resolve(false);
                }
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        })
    }
    
    // createUser(userData){
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const user = new User(userData);
    //             const savedUser = await user.save();
    //             console.log(savedUser);
    //             resolve(savedUser);
    //         } catch(err) {
    //                 reject(err);
    //         }
    //     });
    // }
    
    // createServiceId  ()  {
    //     const Service_ID = new uuid();
    //     return Service_ID;
    // }
    
    // AddService (config)  {
    
    //     return new Promise((resolve, reject) => {
    
    //     })
    //     const ServiceConfig = {
    //         service_name: config.name,
    //         url: config.url,
    //         secret: config.secret,
    //         service_endpoints: config.endpoints
    //     }
    //     service.add()
    // }

}
