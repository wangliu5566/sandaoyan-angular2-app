import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, Slides } from 'ionic-angular'
import { AlertController,Platform } from 'ionic-angular';
// import { ModalController, Platform, ViewController } from 'ionic-angular';
import { Response } from '@angular/http';

// import { getScreenSeat_data, getSessionSeat_data } from '../model/movie';
// import { MoviePayComponent } from '../../../../pages/civic/movie/movie-pay/movie-pay.component';

import { MovieComponent } from '../../../../pages/civic/movie/movie-ind/movie-ind.component';
import { HttpService } from '../../../../providers/HttpService';
import { GlobalData } from '../../../../providers/GlobalData';

@Component({
    selector: 'movie-pay',
    templateUrl: 'movie-pay.component.html'
})

export class MoviePayComponent {
    @ViewChild(Slides) slides: Slides;
    filmObj: any;
    token: string;
    filmDetail: Object = {};//影片的详情
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private httpService: HttpService,private globalData:GlobalData,public platform: Platform) {
        this.filmObj = JSON.parse(navParams.get('filmObj'));
        this.token =this.globalData.token;
        this.GetFilmDetailF(this.filmObj.filmNo);

        setTimeout(() => { //10分钟后解锁
            this.UnLockSeat();
        }, 600000)

        // platform.ready().then(() => {
        //     this.registerBackButtonAction();//注册返回按键事件
        // });

    }
    //离开页面解锁
    // ionViewDidLeave(){
    ionViewWillLeave(){
        this.UnLockSeat();
    }
    // ngAfterViewInit() {

    // }

    // registerBackButtonAction() {
    //     this.platform.registerBackButtonAction(() => {
    //         alert(111);
    //     }, 1);
    // }

    //影片的详情
    GetFilmDetailF(filmNo: string) {
        this.httpService.get('/film/getFilmDetail', { filmNo: filmNo }).map((res: Response) => res.json())
            .subscribe(res => {
                if (res.code == 200) {
                    this.filmDetail = res['data']['datas'][0];
                }
            }, err => {

            })
    }

    //unLockSeat
    UnLockSeat() {
        this.httpService.post('/private/ticket/unLockSeat', { pOrderID: this.filmObj.order_no }).map((res: Response) => res.json())
            .subscribe(res => {
                if (res.errno == 0 || res.errno==100505) {
                    // this.navCtrl.push(MovieComponent,{
                    //     token:this.token
                    // });
                }
            }, err => {

            })
    }

    //去支付页面
    GotoPayNow() {
        //买电影票
        var options={
            pOrderID: this.filmObj.order_no,
            Balance:this.filmObj.price,
            sessionNo:this.filmObj.sessionNo,
            filmNo:this.filmObj.filmNo,
            screenNo:this.filmObj.screenNo
        }
        this.httpService.post('/private/ticket/sellTicketCustom', options).map((res: Response) => res.json())
            .subscribe(res => {
                if (res.status== 200) {
                    // let order_no = res['data']['order_no'];
                    var Gotooptions={
                        filmName: this.filmObj.filmName,
                        sessionDate: this.filmObj.sessionDate, //已选座位
                        startTime: this.filmObj.startTime, //已选座位
                        price: this.filmObj.price,//总价格
                        order_no: this.filmObj.order_no//订单号
                    }
                    //deubgger;
                    GotoApp(JSON.stringify(Gotooptions));
                    //成功后跳转
                    // let filmObj = {

                    // }
                    // this.navCtrl.push(MoviePayComponent, {
                    //     filmObj: JSON.stringify(filmObj)
                    // })

                }
            }, err => {

            })
    }

    

}

