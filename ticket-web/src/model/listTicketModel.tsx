import { TicketModel } from "./ticketModel";

export interface ListTicketModel {
    date: string
    hall: string
    movie: string
    tickets: Array<TicketModel>
}