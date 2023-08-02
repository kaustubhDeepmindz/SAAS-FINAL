module.exports={
    apps : [{
        "name"        : "auth-services",
        "script"      : "./apps/auth-services/src/main.ts",
        "watch"       : true,
        "env": {
          "NODE_ENV": "development"
        },
        "env_production" : {
           "NODE_ENV": "production"
        }
      }]
    
}