import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllOrder } from '../../api';

import Avatar from "../../assets/images/avatar.png"
import { ListOrderModel } from '../../model/listOrderModel ';
import { Url } from '../../service/infastructural/constant';
import { convertTime } from '../../service/infastructural/Helpers';

function Admin() {

    const userDropDown = useRef(null)
    const history = useHistory()
    const [data, setData] = useState<Array<ListOrderModel>>([])

    const getData = async (): Promise<void> => {
        const response = await getAllOrder()
        if (response.isSuccess) {
            console.log(response.data);
            setData(response.data.data)
        } else {
            history.push(Url[401])
        }

    }

    useEffect(() => {
        M.Dropdown.init(userDropDown.current)
        getData()
    }, []);

    return (

        <React.Fragment>
            <section>
                <aside className="sidebar">
                    {/* User Infor */}
                    <div className="user-info">
                        <div className="image">
                            <img src={Avatar} alt="User" />
                        </div>
                        <div className="info-container">
                            <div className="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">William Pham</div>
                            <div className="email">john@example.com</div>
                            <div className="btn-group user-helper-dropdown">
                                <i className="material-icons dropdown-trigger" ref={userDropDown} data-target='dropdown1'>keyboard_arrow_down</i>
                                <ul className="dropdown-menu pull-right dropdown-content" id='dropdown1'>
                                    <li><a href="#"><i className="material-icons">person</i>Profile</a></li>
                                    <li role="seperator" className="divider"></li>
                                    <li><a href="#"><i className="material-icons">group</i>Followers</a></li>
                                    <li><a href="#"><i className="material-icons">shopping_cart</i>Sales</a></li>
                                    <li><a href="#"><i className="material-icons">favorite</i>Likes</a></li>
                                    <li role="seperator" className="divider"></li>
                                    <li><a href="#"><i className="material-icons">input</i>Sign Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* User Infor */}

                    {/* Menu */}
                    <div className="menu">
                        <ul className="list">
                            <li className="header">MAIN NAVIGATION</li>
                            <li className="active">
                                <a href="#">
                                    <i className="material-icons">home</i>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="material-icons">text_fields</i>
                                    <span>Database</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="material-icons">layers</i>
                                    <span>Movie</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="menu-toggle">
                                    <i className="material-icons">widgets</i>
                                    <span>Statics</span>
                                </a>
                                <ul className="ml-menu">
                                    <li>
                                        <a href="#" className="menu-toggle">
                                            <span>Cards</span>
                                        </a>
                                        <ul className="ml-menu">
                                            <li>
                                                <a href="#">Basic</a>
                                            </li>
                                            <li>
                                                <a href="#">Colored</a>
                                            </li>
                                            <li>
                                                <a href="#">No Header</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="menu-toggle">
                                    <i className="material-icons">swap_calls</i>
                                    <span>Analysis</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="material-icons">update</i>
                                    <span>Vesion</span>
                                </a>
                            </li>
                            <li className="header">LABELS</li>
                            <li>
                                <a href="#">
                                    <i className="material-icons col-red">donut_large</i>
                                    <span>Important</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="material-icons col-amber">donut_large</i>
                                    <span>Warning</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="material-icons col-light-blue">donut_large</i>
                                    <span>Information</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Menu */}
                </aside>
            </section>

            { data.length > 0 && (

                <section className="content">
                    <div className="container-fluid">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Order</th>
                                    <th>Customer Name</th>
                                    <th>Customer Email</th>
                                    <th>Movie</th>
                                    <th>Hall</th>
                                    <th>Date</th>
                                    <th>Used</th>
                                    <th>Booked At</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((e, index) => {

                                    const idOrder = e._id,
                                        customerName = e.customerName,
                                        customerEmail = e.customerEmail,
                                        movie = e.movie,
                                        hall = e.hall,
                                        date = e.date,
                                        bookedAt = convertTime(e.createAt),
                                        tickets = e.tickets

                                    return (

                                        <tr key={index}>
                                            <td className="text"> {idOrder} </td>
                                            <td className="text"> {customerName} </td>
                                            <td className="text"> {customerEmail} </td>
                                            <td className="text"> {movie} </td>
                                            <td className="text"> {hall} </td>
                                            <td className="text"> {date} </td>
                                            <td>
                                                {tickets.map((t, idx) => {
                                                    const ticketID = t._id,
                                                        used = t.used
                                                    return (
                                                        <div key={idx} style={{ padding: "10px" }}>
                                                            <span className="label">IdTicket:</span>
                                                            <span className="text"> {ticketID} </span>
                                                            <div>
                                                                <span className="label">Used:</span>
                                                                <input type="checkbox" className="checkbox" defaultChecked={used} style={{ opacity: 1 }} />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </td>
                                            <td className="text"> {bookedAt} </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            )

            }
        </React.Fragment>
    );
}

export default Admin;