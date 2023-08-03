// import  jwt, {sign, Secret, JsonWebTokenError   } from 'jsonwebtoken';
// import createError from 'http-errors'
// import {Request, Response, NextFunction } from 'express';
// import { resolveObjectURL } from 'buffer';

// interface SignTokenOption {
//     expiresIn:string,
//     issuer : string,
//     audience: string

// }


// export const signAccessToken = (userId:string): Promise<string> =>{
//     return new Promise(( resolve, reject) =>{
//     const payload = {};
//     const secret : Secret = process.env.ACCESS_TOKEN_SECRET!
//     const options : SignTokenOption ={
//         expiresIn:'1h',
//         issuer:'phanxy_ai',
//         audience:userId
//     }
//     sign(payload, secret, options, (err,token) =>{
//        if(err){
//            console.log(err.message)
//            reject(createError.InternalServerError())
//            return 
//        }
//        resolve(token!)
//     })

// })
// }

// export const VerifyAccessToken  = (req:Request, res:Response, next:NextFunction) =>{
//       if(!req.headers.authorization) return createError.Unauthorized();

//       const authHeader = req.headers['authorization'] 
//       const token = authHeader.split(' ')[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string, (err : jwt.VerifyErrors | null, payload:any ) =>{
//           if(err ) 
//           {
//                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
//                return createError.Unauthorized(message)
//           }
//           req.payload = payload
//           next()
//         })

// }

// export const signRefreshToken = (userId:string): Promise<string> =>{
//     return new Promise(( resolve, reject) =>{
//     const payload = {};
//     const secret : Secret = process.env.REFRESH_TOKEN_SECRET!
//     const options : SignTokenOption ={
//         expiresIn:'1h',
//         issuer:'phanxy_ai',
//         audience:userId,
//     }
//     sign(payload, secret, options, (err,token) =>{
//        if(err){
//            console.log(err.message)
//            reject(createError.InternalServerError())
//            return 
//        }
//        resolve(token!)
//     })

// })
// }



// export const VerifyRefreshToken = (refreshToken:string):Promise<any> =>{
//   return new Promise((resolve, reject) =>{
//       jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!,(err,payload) =>{
//           if(err)   reject( createError.Unauthorized('token is not verified'))
//            const userId = (payload.aud)!
//            resolve(userId)

//       })
//   })
// }