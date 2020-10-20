import { SeatModel } from "./seatModel";
import { UserModel} from "./userModel";

export interface BookingModel extends UserModel {
  movie: string,
  date: string,
  seats: Array<SeatModel>,
  hall:string,
  totalPrice?: number
}