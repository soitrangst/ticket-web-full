import axios from "axios"

import { Constant } from "../service/infastructural/constant"
import { StorageService } from "../service/storageService"
import { Booking } from "../view/screens/Home"
import { url } from "./contants"

const Error = {
    status: 401
}

interface ResponseModel {
    isSuccess: boolean,
    data: any,
}

const storageService = new StorageService()

const customePost = async (url: string, dataForm: any): Promise<any> => {

    const token = storageService.get(Constant.auths.token)
    try {
        const res = await axios({
            url: url,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            data: dataForm
        })
        
        let response: ResponseModel = {
            isSuccess: true,
            data: res.data
        }
        return response
    } catch (error) {

        let response: ResponseModel = {
            isSuccess: false,
            data: null
        }
        return response
    }
}

const orderApi = async (data: Booking): Promise<any> => {
    const result = await customePost(url.order, data)
    return result
}

export {
    orderApi
}