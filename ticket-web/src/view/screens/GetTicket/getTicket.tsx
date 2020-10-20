import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getTicket } from '../../../api';
import { Url } from '../../../service/infastructural/constant';

interface Message {
    message: string,
    isUsed:boolean
}

const Index: React.FC = () => {

    const location = useLocation()
    const history = useHistory()
    const [message, setMessage] = useState<Message>({message:"",isUsed:false})
    
    
    const actionGet = async (): Promise<void> => {
        
        const code:string = location.search.substring(1)
        
        const response = await getTicket(code)
        if(response.isSuccess){
            if(response.data.data.used){
                setMessage({message:'OOPS!!! Your ticket was used',isUsed:true})
            }else{
                setMessage({message:'Your ticket is available',isUsed:false})
            }
        }else{
             history.push(Url[401])
        }
    }

    useEffect(() => {
        actionGet()
    }, [])

    return (
        <div className="mainbox">
            <div className="msg"> 
            <span className={`${message.isUsed ? 'orange-text text-darken-4' : 'green-text text-darken-4'}`}>{message.message}</span>
            <p>Let&apos;s go
                <Link to="/"> home </Link>
                and try from there.
                </p>
            </div>
        </div>
    );
}

export default Index;