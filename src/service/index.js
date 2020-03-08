const top5movies = require("./../../data.json")

class Service {
    get = (url) => {
        return new Promise((resolve,reject)=>{
            return resolve({ body: top5movies })
        })
    }
}
export default new Service()