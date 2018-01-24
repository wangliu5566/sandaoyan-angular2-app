import { Component } from '@angular/core';
import { Content, NavController, NavParams, AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage';
import { Response } from '@angular/http';

import { UserInfo } from '../../../model/UserInfo';
import { OrderTicketDetail, OrderTfilm, OrderTscreen, OrderTticketOrder, OrderTsessions } from '../model/OrderTicketmodel';
import { HttpService } from '../../../providers/HttpService';
import { GlobalData } from '../../../providers/GlobalData';

@Component({
    selector: 'mov-order',
    templateUrl: 'mov-order.component.html'
})
export class MovieOrderComponent {

    // forderObj: {
    //     forderID: string;
    //     token: string;
    // }
    forderID: string;
    token: string;
    // orderFilms={};
    orderFilms: OrderTicketDetail = new OrderTicketDetail();
    orderTfilm: OrderTfilm = new OrderTfilm();
    orderTscreen: OrderTscreen = new OrderTscreen();
    orderTticketOrder: OrderTticketOrder = new OrderTticketOrder();
    orderTsessions: OrderTsessions = new OrderTsessions();

    userInfo: UserInfo = new UserInfo();
    filmDetail: Object = {};//影片的详情
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private httpService: HttpService, private storage: Storage, private globalData: GlobalData) {
        this.forderID=this.navParams.get('forderID');
        this.token=this.navParams.get('token');
        // this.forderObj = JSON.parse('{"forderID":"123","token":"9151b0e4-6a5f-41f7-83f5-e69d30a5debc"}');
        // this.forderObj=JSON.parse(this.navParams.get('forderObj'));
        // this.forderId=forderObj.forderID;
        // this.token=forderObj.token;
        if (this.token) {
            this.globalData.token = this.token;
            this.storage.get('UserInfo').then((userInfo: UserInfo) => {
                if (userInfo) {
                    this.userInfo = userInfo;
                } else {
                    httpService.GetcustomerF(userInfo);//获取用户信息
                }
            });
            this.GetOrderDetailF();//获取用户电影票详情
        }/* else {
            httpService.alertLoginTimeOut();//获取用户信息
        }*/
    }

    // ionViewDidEnter() {
    //     if(this.userInfo){
           
    //     }
    // }


    //获取用户电影票详情
    GetOrderDetailF() {
        // this.httpService.post('/private/filmTicket/getUserFilms', { pOrderID: this.order_no }).map((res: Response) => res.json())
        this.httpService.get('/private/filmTicket/getOrderDetail', { orderNo: this.forderID }).map((res: Response) => res.json())
            .subscribe(res => {
                this.orderFilms = res.data['datas'][0];
                this.orderTfilm = res.data['datas'][0]["film"];
                this.orderTscreen = res.data['datas'][0]["screen"];
                debugger;
                this.orderTticketOrder = res.data['datas'][0].ticketOrder;
                this.orderTsessions = res.data['datas'][0].sessions;
            }, err => {

            })
    }

    doConfirm() {
        let confirm = this.alertCtrl.create({
            subTitle: '券码：' + this.orderTticketOrder.ticketCode,
            message: '<img src="' + this.orderFilms.qrCode + '" width="200" />',
            buttons: [
                {
                    text: '确 定',
                    handler: () => {
                        // let navTransition = confirm.dismiss();
                        // navTransition.then(() => {
                        //     alert(11);
                        // });
                        // return false;
                    }
                }
            ]
        });
        confirm.present()
    }
}
