const top5movies = require("./../../data.json")

class Service {
    // here we are mocking the service as a promise 
    // which returns the static data stored in data.json file of project root directory
    get = (url) => {
        return new Promise((resolve,reject)=>{
            // adding the settimeout asour service call takes some time
            window.setTimeout(()=>{
                return resolve({ body: top5movies })
            },2000)
            
        })
    }
}
export default new Service()