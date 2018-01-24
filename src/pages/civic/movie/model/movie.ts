//获取电影院列表
export class CinemaList {
    id: number;
    createDate: Date;
    zoneId: number;
    zoneIds: string;
    cinemaNo: string;
    cinemaName: string;
    cinemaCode: string;
    cityNo: string;
    key: number;
}

//获取对应的电影院详情
export class CinemaDetail {
    id: number;
    createDate: string;
    zoneId: string;
    zoneIds: string;
    cinemaNo: string;
    cinemaName: string;
    cinemaCode: string;
    cityNo: string;
    address: string;
    longitude: string;
    latitude: string;
    key: number;
}

//获取电影院可放映的电影列表
export class CinemaFilmList {
    id: number;
    createDate: number;
    zoneId: number;
    zoneIds: string;
    cinemaNo: string;
    cinemaName: string;
    cinemaCode: string;
    cityNo: string;
    address: string;
    key: string;
    latitude: string;
    longitude: string;
    films: Array<Films>

}

export class Films {
    id: number;
    createDate: Date;
    filmNo: string;
    cinemaNo: string;
    filmName: string;
    filmType: string;
    language: string;
    originalName: string;
    poster: string;
    score: string;
    genres: string;
    region: string;
    duration: string;
    introduce: string;
    year: string;
    state: string;
    key: number;
}

//获取电影的排期（场次）列表
export class SessionByFilm {
    id: number;
    createDate: Date;
    filmNo: string;
    cinemaNo: string;
    filmName: string;
    filmType: string;
    language: string;
    originalName: string;
    poster: string;
    score: string;
    genres: string;
    region: string;
    duration: string;
    introduce: string;
    year: string;
    state: string;
    isplay: string;
    sessionses: Array<Sessionses>;
    dates: Array<{ sessionDate: string,week:object }>
}

export class Sessionses {
    id: number;
    createDate: Date;
    sessionNo: string;
    filmNo: string;
    screenNo: string;
    cinemaNo: string;
    sessionDate: Date;
    startTime: Date;
    totalTime: number;
    consecutive: number;
    screenType: string;
    settlementPrice: number;
    standartPrice: number;
    lowestPrice: number;
    fee: number;
    status: number;
    filmCount: number;
}

//获取影片的详情
export class GetFilmDetail {
    id: number;
    createDate: Date;
    filmNo: string;
    cinemaNo: string;
    filmName: string;
    filmType: string;
    language: string;
    originalName: string;
    poster: string;
    score: string;
    genres: string;
    region: string;
    duration: string;
    introduce: string;
    year: Date;
    state: string;
    directors: Array<{
        id: number;
        actorNo: string;
        name: string;
        small: string;
        medium: string;
        large: string;
    }>;
    actors: Array<{
        id: number;
        actorNo: string;
        name: string;
        small: string;
        medium: string;
        large: string;
    }>
}

//锁定座位
export class lockSeatCustom_post {
    pSessionID: string;
    pSeatNo: string;
    pTicketPrice: string;
    pFee: string;
}
export class lockSeatCustom_data {
    order_no: string;
    seat: Array<{
        auto_unlock_datetime: Date;
        seat_row: string;
        ticket_price: string;
        seat_col: string;
        seat_no: string;
    }>
}

//解锁座位
export class unLockSeat_data {
    true: boolean;
}

//买电影票
export class sellTicketCustom_post {
    pOrderID: string;
    Balance: string;
}

export class sellTicketCustom_data {
    order_no: string;
    print_no: string;
    verify_code: string;

}

//获取订单的状态信息

export class getOrderStatus_data {
    order_no: string;
    online_sale_code: string;
    order_status: string;
    film_code: string;
    refund_status: string;
    screen_code: string;
    session_code: string;
    print_no: string;
    print_status: string;
    verify_code: string;
    cinema_code: string;
    seat: Array<{
        seat_no: string;
        seat_code: string;
        film_ticket_code: string;
    }>
}

//获取影厅对应的所有座位信息
export class getScreenSeat_post {
    pCinemaID: string;
    pScreenID: string;
}
export class getScreenSeat_data {
    bind_id: string;
    seat_row: string;
    seat_type_id: string;
    seat_col: string;
    seat_no: string;
    seat_piece_no: string;
    graph_row: string;
    seat_code: string;
    seat_type_desc: string;
    graph_col: string;
}

//获取对应排期(场次)的座位图的状态
export class getSessionSeat_post {
    pSessionID: string;
}
export class getSessionSeat_data {
    seat_row: string;
    seat_col: string;
    seat_no: string;
    seat_status: string;
    session_seat_no: string;
    group_no: string;

}

//退票
export class refundTicket_post {
    pOrderID: string;
    pPrintNo: string;

}
export class refundTicket_data {
    order_no: string;
}