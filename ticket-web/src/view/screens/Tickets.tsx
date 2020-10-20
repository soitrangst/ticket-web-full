import React from 'react';
import { Ticket } from './Detail';


import QRCode from "qrcode.react"

import iconMoive from "../../assets/images/icon-moive.png"
import { Url } from '../../service/infastructural/constant';

type PropsType = {
    tickets: Array<Ticket>
}

const TicketScreen: React.FC<PropsType> = (props: PropsType) => {

    const { tickets } = props


    return (
        <React.Fragment>

            {tickets.map((e) => {
                const key = e.ticket.loc,
                    date = e.date,
                    movie = e.movie,
                    price = e.ticket.price,
                    seat = e.ticket.name,
                    type = e.ticket.zone,
                    hall = e.hall
                    const qr = <QRCode   
                    value={Url.link+ Url.getTicket+'?'+ e.ticket.code}
                    size={100}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                    renderAs={"svg"}
                    />
                return (
                    <div key={key} className="card col s12 m10 l7 row" >
                        <div className="card-body col l10 ">
                            <div className="card-items">
                                <div className="title ">
                                    <span>Vé xem phim</span>
                                </div>

                                <div className="item">
                                    <span className="label">Date</span>
                                    <div>
                                        <span> {date} </span>
                                    </div>
                                </div>

                                <div className="item">
                                    <span className="label">Type</span>
                                    <div>
                                        <span> {type} </span>
                                    </div>
                                </div>

                                <div className="item">
                                    <span className="label">Seat</span>
                                    <div>
                                        <span> {seat} </span>
                                    </div>
                                </div>

                                <div className="item">
                                    <span className="label">Hall</span>
                                    <div>
                                        <span> {hall} </span>
                                    </div>
                                </div>


                                <div className="item">
                                    <span className="label">Price</span>
                                    <div>
                                        <span> {price} </span>
                                    </div>
                                </div>

                            </div>
                            <div className="datted">
                                <div className="point">
                                </div>
                                <div className="point">
                                </div>
                                <div className="point">
                                </div>
                                <div className="point">
                                </div>
                                <div className="point">
                                </div>
                                <div className="point">
                                </div>
                            </div>
                            <div className="card-items">
                                <div className="item title underline">
                                    <div className="icon__medium">
                                        <img src={iconMoive} alt="icon" />
                                    </div>
                                    <span>CINEMA HALL</span>
                                </div>

                                <div className="item underline center">

                                    <span className="label label__white"> {movie} </span>

                                </div>

                                <div className="item underline">

                                    <div className="item-child">
                                        <span className="label">Date</span>
                                        <div>
                                            <span> {date} </span>
                                        </div>
                                    </div>

                                    <div className="item-child border__left">
                                        <span className="label">Time</span>
                                        <div>
                                            <span> {date} </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="item underline">

                                    <div className="item-child">
                                        <span className="label">seat</span>
                                        <div>
                                            <span>{seat}</span>
                                        </div>
                                    </div>

                                    <div className="item-child border__left">
                                        <span className="label">Hall</span>
                                        <div>
                                            <span>Americano</span>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="code col l2">
                            <div className="code-item">
                                {qr}
                            </div>
                        </div>
                    </div>

                )
            })}
        </React.Fragment>
    );
}

export default TicketScreen;