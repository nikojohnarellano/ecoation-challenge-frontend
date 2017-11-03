import Config from '../config/config'

export default class ApiHelper {
    static header = {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json',
    }

    static headers(opts) {
        ApiHelper.header =  {
            ...ApiHelper.header,
            ...opts
        }
    }

    static async get(url) {
        return await this.xhr(url, null, 'GET');
    }

    static async put(url, params) {
        return await this.xhr(url, params, 'PUT')
    }

    static async post(url, params) {
        return await this.xhr(url, params, 'POST')
    }

    static async delete(url, params) {
        return await this.xhr(url, params, 'DELETE')
    }

    static async xhr(url, params, verb) {
        console.log(url)
        console.log(`${Config.endpoint}${url}`)

        console.log(ApiHelper.headers())
        try {
            let opts     = {}
            opts.method  = verb,
            opts.headers = ApiHelper.header,
            opts.body = params ?  JSON.stringify(params) : null
            
            let data     = await fetch(`${Config.endpoint}${url}`, opts)
            let jsonData = await data.json()
            
            return jsonData
        } catch(e) {
            console.error(e)
            return null;
        }

        /*
        try {
            let result =  await axios({
                url : Config.endpoint,
                method: verb,
                headers : ApiHelper.header,
                timeout: Config.TimeoutTime,
                data : JSON.stringify(params)
            });

            return result.data;
        } catch(error) {
            console.log(error)
            return null;
        }*/
    }
    

}