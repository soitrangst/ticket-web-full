import axios from "axios"

import { Constant } from "../service/infastructural/constant"
import { StorageService } from "../service/storageService"
import { Booking } from "../view/screens/Home"
import { url } from "./contants"

const Error = {
    status: 401
}

const storageService = new StorageService()

const customePost = async (url:string,dataForm:any):Promise<any> => {
    
    const token = storageService.get(Constant.auths.token)

    return (
      await axios({
            url: url,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            data: dataForm
        })
    )
}

const orderApi = async (data:Booking):Promise<any> => {
    try {
        const response = await customePost(url.order,data)
        return response
    } catch (error) {
        return Error
    }
}

export{
    orderApi
}