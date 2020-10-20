
interface Ticket{
  _id:string,
  used:boolean
}

export interface ListOrderModel {
  _id:string
  customerName: string,
  customerEmail: string,
  movie:string,
  hall:string,
  date: string,
  createAt:Date,
  tickets:Array<Ticket>
}