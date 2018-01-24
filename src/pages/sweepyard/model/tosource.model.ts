//溯源接口
// export class TraceEntityDetail {
//     code: number;
//     msg: string;
//     Status: number;
//     data: {
//         totalPage: number;
//         pageSize: number;
//         pageNumber: number;
//         datas: Array<TraceEntityDetail_data>
//     }
// }
export class TraceEntityDetail_data {
    id: number;
    title: string;
    townId: number;
    titlePage: string;
    introduction: string;
    originPlace: string;
    resourceUrl: string;
    traceDetail: Array<TraceEntityDetail_data_trace>;
}
class TraceEntityDetail_data_trace {
    id: number;
    traceEntityId: number;
    step: string;
    title: string;
    isView: number;
    content: string;
    operateDate:Date;
}
//溯源详细信息
// export class TraceEntityAllDetail {
//     code: number;
//     msg: string;
//     Status: number;
//     data: {
//         totalPage: number;
//         pageSize: number;
//         pageNumber: number;
//         datas: Array<TraceEntityAllDetail_data>;
//     }
// }
export class TraceEntityAllDetail_data {
    id: number;
    createDate: Date;
    updateDate: Date;
    adminId: number;
    title: string;
    townId: number;
    titlePage: string;
    price: number;
    collect: number;
    views: number;
    collects: number;
    content: string;
    originPlace: string;
    isDel: boolean;
}

