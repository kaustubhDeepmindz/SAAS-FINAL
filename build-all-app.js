const concurrently = require('concurrently');
const path = require("path");
const { result } = concurrently(
  [
    { command: 'nest build payment-services', name: 'auth-services',prefixColor: "red" }
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 2,
    cwd: path.resolve(__dirname, 'scripts'),
  }
);
result.then((success, failure)=>{
    // console.log("FAILURE--" ,failure);
    // console.log("SUCCESS--",success);
}).catch((err)=>{
    console.log("ERROR:",err);
});