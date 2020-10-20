import React, { useEffect, useState } from 'react';
import { ListTicketModel } from '../../model/listTicketModel';
import { SeatModel } from '../../model/seatModel';
import { TicketModel } from '../../model/ticketModel';

//libs

//libs
import { Constant } from '../../service/infastructural/constant';
import { ToastCustomSuccess } from '../../service/infastructural/toast';
import { StorageService } from '../../service/storageService';
import Empty from './Empty';


import TicketScreen from './Tickets';


const storageService = new StorageService()

export interface Ticket {
    movie: string,
    date: string,
    hall:string
    ticket:TicketModel
}


const Detail: React.FC = () => {

    const data: ListTicketModel = storageService.get(Constant.bookingData.isData)

    const [tickets, setTickets] = useState<Array<Ticket>>([])


    useEffect(() => {
        if (data) {
            const ticketList: Array<Ticket> = data.tickets.map((e) => {
                return {
                    date: data.date,
                    hall: data.hall,
                    movie: data.movie,
                    ticket:{...e}
                }
            })
            setTickets(ticketList)
        }
    }, [])

    const complete = () => {
        ToastCustomSuccess("Saved")
    }


    return (
        <React.Fragment>
            { tickets.length === 0 ? (
                <Empty />
            )
                :
                <div className="page row">

                    {tickets.length > 0 && (
                        <TicketScreen tickets={tickets} />
                    )
                    }
                    {tickets.length > 0 && (
                        <div className="button">
                            <button className="btn" onClick={complete}>Hoàn tất</button>
                        </div>
                    )}
                    {tickets.length === 0 && (
                        <Empty />
                    )}
                </div>
            }
        </React.Fragment>

    );
}

export default Detail;