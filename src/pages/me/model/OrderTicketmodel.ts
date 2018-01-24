export class OrderTicketDetail {
  id: string;
  customerId: string;
  orderNo: string;
  filmNo: string;
  screenNo: string;
  sessionNo: string;
  qrCode: string;
  remark: string;
  isPlay: string;
  film: {
    id: string;
    filmNo: string;
    cinemaNo: string;
    filmName: string;
    filmType: string;
    poster: string;
    score: string;
    genres: string;
    key: string;
  };
  screen: OrderTscreen;
  ticketOrder: OrderTticketOrder;
  sessions: OrderTsessions;
}
export class OrderTfilm {
    id: string;
    filmNo: string;
    cinemaNo: string;
    filmName: string;
    filmType: string;
    poster: string;
    score: string;
    genres: string;
    key: string;
  }

export class  OrderTscreen{
    id: string;
    createDate: string;
    cinemaNo: string;
    screenNo: string;
    screenCode: string;
    screenName: string;
    screenType: string;
    screenTypeDesc: string;
    key: string;
  }

export class OrderTticketOrder {
    id: string;
    createDate: string;
    orderNo: string;
    customerId: string;
    filmNo: string;
    screenNo: string;
    number: string;
    priceAmount: string;
    fee: string;
    totalAmount: string;
    status: string;
    completeTime: string;
    payTime: string;
    ticketCode: string;
    remark: string;
    seats: string;
    isDel: string;
    key: string;
  }
export class  OrderTsessions{
    id: string;
    sessionNo: string;
    filmNo: string;
    screenNo: string;
    cinemaNo: string;
    sessionDate: string;
    startTime: string;
    totalTime: string;
    consecutive: string;
    screenType: string;
    settlementPrice: string;
    standartPrice: string;
    lowestPrice: string;
    fee: string;
    status: string;
    filmCount: string;
    key: string;
  }