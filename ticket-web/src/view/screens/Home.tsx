import React, { useState, useEffect, useRef } from 'react';

import Seat from "./Seat"


import M from "materialize-css"
import { init, send } from 'emailjs-com';

import { ToastCustomWarning } from "../../service/infastructural/toast"

import { Url } from '../../service/infastructural/constant';
import { useHistory } from 'react-router-dom';
import { orderApi } from '../../api';
import { BookingModel } from '../../model/bookingModel';
import { SeatModel } from '../../model/seatModel';
import { ResponseModel } from '../../model/responseModel';



interface MessageMail {
  message_html: string,
  from_name: string,
  reply_to: string
}

function Home(): JSX.Element {

  const history = useHistory()

  const selectMovieRef = useRef(null)
  const selectDateRef = useRef(null)
  const collapsible = useRef(null)

  const [movie, setMovie] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [seats, setSeats] = useState<Array<SeatModel>>([])
  const [customerName, setCustomerName] = useState<string>('')
  const [customerEmail, setCustomerEmail] = useState<string>()
  const [totalPrice, setTotalPrice] = useState<number>()

  useEffect(() => {
    M.Collapsible.init(collapsible.current, { accordion: false })
    M.FormSelect.init(selectMovieRef.current,)
    M.FormSelect.init(selectDateRef.current)
    init("user_l9CkjWaLXC4f4ypel5HJy");
  }, [])

  const updateTotalPrice = (e: Array<SeatModel>): void => {
    if (e.length > 0) {
      setTotalPrice(
        e.reduce((a, l) => a += l.price, 0)
      )
      return
    }
    setTotalPrice(0)
  }

  const typeSeats = (): string => {
    return seats.map((e) => { return e.name }).join(',')
  }

  const updateSeat = (e: Array<SeatModel>): void => {
    setSeats(e)
    updateTotalPrice(e)
  }

  const alertSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, name: string): void => {
    const element = (e.target as HTMLLIElement).parentElement
    if (name === "date") {
      if (!movie) {
        ToastCustomWarning('Vui lòng chọn film')
      } else {
        element.classList.remove('disable')
      }
    }
    if (name === "seat") {
      if (!date) {
        ToastCustomWarning('Vui lòng chọn ngày')
      } else {
        element.classList.remove('disable')
      }
    }
  }
  const sendFeedback = ( variables: MessageMail) => {
    send(
      'service_j0fatyl', "template_eyasvay",
      variables
    ).then(res => {
      console.log('Email successfully sent!')
    })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }

  const submit = async (): Promise<void> => {
    if (validate()) {
      const dataform: BookingModel = {
        movie,
        date,
        seats,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        hall: "Arizona",
      }
      const response: ResponseModel = await orderApi(dataform)
      if (response.isSuccess) {
        sendFeedback( { message_html: `Your tickets was create, visit ${Url.link + Url.receive}`, from_name: "FDS", reply_to: customerEmail })
        history.push(Url.receive)
      }
    }
  }

  const validate = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!emailRegex.test(customerEmail)) {

      ToastCustomWarning('Vui lòng nhập đúng email')
      return false
    }
    if (customerName.trim().length < 1) {
      ToastCustomWarning('Vui lòng nhập tên')
      return false
    }
    if (!movie) {

      ToastCustomWarning('Vui lòng chọn film')
      return false
    }
    if (!date) {
      ToastCustomWarning('Vui lòng chọn ngày xem')
      return false
    }
    if (!totalPrice) {
      ToastCustomWarning("Vui lòng chọn ghế")
      return false
    }
    return true
  }

  return (
    <div className="container">

      <div className="form__user">
        <form className="col s12">
          <div className="row">

            <div className="input-field col s12">
              <input id="name" type="text"
                onChange={(e) => setCustomerName(e.target.value)} />
              <label htmlFor="name">Your name</label>
            </div>

            <div className="input-field col s12">
              <input id="email" type="text"
                onChange={(e) => setCustomerEmail(e.target.value)} />
              <label htmlFor="email">Your email</label>
            </div>

          </div>
        </form>
      </div>

      <ul ref={collapsible} className="collapsible">

        <li>
          <div className="collapsible-header"><i className="material-icons">filter_drama</i>Sellect Movie</div>
          <div className="collapsible-body">
            <div className="input-field col s12">
              <select ref={selectMovieRef} onChange={(e) => setMovie(e.target.value)} >
                <option defaultValue="">Choose your option</option>
                <option value="QUÁI VẬT SĂN ĐÊM">QUÁI VẬT SĂN ĐÊM</option>
                <option value="SÓNG THẦN Ở HAEUNDAE">SÓNG THẦN Ở HAEUNDAE</option>
                <option value="CỤC NỢ HÓA CỤC CƯNG">CỤC NỢ HÓA CỤC CƯNG</option>
              </select>
              <label>Sellect your movie</label>
            </div>
          </div>
        </li>

        <li className='disable' onClick={(e) => alertSelect(e, "date")}>
          <div className="collapsible-header "><i className="material-icons">place</i>Sellect date </div>
          <div className="collapsible-body">
            <div className="input-field col s12">
              <select ref={selectDateRef} onChange={(e) => setDate(e.target.value)}>
                <option defaultValue="">Choose your option</option>
                <option value="25/10/2020-8:30">25/10/2020-8:30</option>
                <option value="25/10/2020-10:30">25/10/2020-10:30</option>
                <option value="25/10/2020-20:30">25/10/2020-20:30</option>
              </select>
              <label>Sellect your date</label>
            </div>
          </div>
        </li>

        <li className='disable' onClick={(e) => alertSelect(e, "seat")}>

          <div className="collapsible-header"><i className="material-icons">whatshot</i>Seats</div>
          <div className="collapsible-body">
            <Seat updateSeat={updateSeat} />
          </div>

        </li>

      </ul>

      <div className="bottom-content">
        <div className="product-details">

          <table className="info-wrapper">
            <tbody>
              <tr>
                <td className="label">Tên khách hàng</td>
                <td> {customerName} </td>
              </tr>
              <tr>
                <td className="label"> Email </td>
                <td>
                  {customerEmail}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="info-wrapper">
            <tbody>
              <tr>
                <td className="label">Phim</td>
                <td> {movie} </td>
              </tr>
              <tr>
                <td className="label">Suất chiếu</td>
                <td>
                  {date}
                </td>
              </tr>
              <tr>
                <td className="label">Phòng chiếu</td>
                <td>Arizona</td>
              </tr>
              <tr className="block-seats" >
                <td className="label">Loại ghế</td>
                <td>{seats.length > 0 ? seats[0].zone : ''}</td>
              </tr>
              <tr className="block-seats" >
                <td className="label">Ghế</td>
                <td>{seats.length > 0 ? typeSeats() : ''}</td>
              </tr>
            </tbody>
          </table>

          <table className="info-wrapper">
            <tbody>
              <tr>
                <td className="label">Số lượng vé</td>
                <td> {seats.length > 0 ? seats.length : ''} </td>
              </tr>
              <tr>
                <td className="label"> Giá vé </td>
                <td>
                  {seats.length > 0 ? seats[0].price : ''}
                </td>
              </tr>
              <tr>
                <td className="label"> Tổng tiền </td>
                <td>
                  {totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="booking">
          <button className="btn" onClick={submit}>Book now</button>
        </div>
      </div>
    </div>
  )
}

export default Home;