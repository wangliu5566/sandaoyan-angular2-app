import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular'
import { AlertController } from 'ionic-angular';
// import { ModalController, Platform, ViewController } from 'ionic-angular';
import { Response } from '@angular/http';


import { getScreenSeat_data, getSessionSeat_data } from '../model/movie';
import { MoviePayComponent } from '../../../../pages/civic/movie/movie-pay/movie-pay.component';

import { HttpService } from '../../../../providers/HttpService';

@Component({
    selector: 'movie-slt',
    templateUrl: 'movie-slt.component.html'
})

export class MovieSltComponent {
    // get={};
    UlWidth:number;
    screenSeat_data=[];
    thisArr: Array<getScreenSeat_data>
    sessionSeat_data: Array<getSessionSeat_data> = [];
    getScreenSeat_option: any = {};
    filmObj: any;
    currState: any = {};
    @ViewChild(Slides) slides: Slides;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private httpService: HttpService) {
        this.filmObj = JSON.parse(navParams.get('filmObj'));
        this.getScreenSeat_option = {
            pCinemaID: this.filmObj.cinemaNo,
            pScreenID: this.filmObj.screenNo
        }
        this.GetScreenSeatF();  //座位图
        this.GetSessionSeatF();//状态
    }
    ngAfterViewInit() {

    }
    //座位图
    GetScreenSeatF() {
        this.httpService.post('/private/ticket/getScreenSeat', this.getScreenSeat_option).map((res: Response) => res.json())
            .subscribe(res => {
                if (res.errno == 0) {
                    // this.screenSeat_data = res['data'];
                    for (let i = 1; i < 10; i++) {
                        this.thisArr = [];
                        for (let val of res['data']) {
                            if (val.seat_row == i.toString()) {
                                this.thisArr.push(<getScreenSeat_data>{
                                    // bind_id: val.bind_id,
                                    seat_row: val.seat_row,
                                    // seat_type_id: val.seat_type_id,
                                    seat_col: val.seat_col,
                                    seat_no: val.seat_no,
                                    // seat_piece_no: val.seat_piece_no,
                                    // graph_row: val.graph_row,
                                    // seat_code: val.seat_code,
                                    seat_type_desc: val.seat_type_desc,
                                    // graph_col: val.graph_col,
                                });
                            }

                            // this.currState[val.seat_no]=val.session_seat_no;
                        }
                        if(i==1){
                            this.UlWidth=this.thisArr.length*28+50;
                                  //deubgger;
                        }
                  
                        this.screenSeat_data.push({ obj: this.thisArr });
                    }
                }
            }, err => {

            })
    }
    //状态
    GetSessionSeatF() {
        this.httpService.post('/private/ticket/getSessionSeat', { pSessionID: this.filmObj.sessionNo }).map((res: Response) => res.json())
            .subscribe(res => {
                if (res.errno == 0) {
                    // this.sessionSeat_data = res['data']['datas'][0];
                    for (let val of res['data']) {
                        this.currState[val.seat_no] = val.seat_status;
                    }
                }
            }, err => {

            })
    }

    //锁定
    // order_no:string;
    lockSeatCustomF() {
        let pSeatNo:string;
        let t_piaoPrice:string;
        let t_feePrice:string;
        this.selectObj.forEach((val, idx) => {
            if(idx==0){
                pSeatNo=val.seat_no;
                t_piaoPrice=val.piaoPrice;
                t_feePrice=val.pFee;
            }else{
                pSeatNo=pSeatNo+','+val.seat_no;
                t_piaoPrice=t_piaoPrice+','+val.piaoPrice;
                t_feePrice=t_feePrice+','+val.pFee;
            }
        });
        var options={
            pSessionID:this.filmObj.sessionNo,//场次排期
            pSeatNo:pSeatNo,
            pTicketPrice:t_piaoPrice,
            pFee:t_feePrice,
            filmNo:this.filmObj.filmNo,
            screenNo:this.filmObj.screenNo,
            number:this.selectObj.length
        }
        // //deubgger;
        this.httpService.post('/private/ticket/lockSeatCustom', options).map((res: Response) => res.json())
            .subscribe(res => {
                //deubgger;
                if(res.errno===0){
                    // //deubgger;
                    let order_no=res['data']['order_no'];
                    let filmObj = {
                        filmName: this.filmObj.filmName,//电影名称
                        screenName: this.filmObj.screenName,//影厅名称
                        sessionNo: this.filmObj.sessionNo,//场次ID
                        filmNo: this.filmObj.filmNo,//电影ID
                        cinemaNo: this.filmObj.cinemaNo,//影院ID
                        screenNo: this.filmObj.screenNo,//影厅ID
                        sessionDate: this.filmObj.sessionDate, //日期
                        startTime: this.filmObj.startTime, //时间
                        screenType: this.filmObj.screenType, //影厅类型
                        selectObj: this.selectObj, //已选座位
                        price: this.selectObjPrice,//总价格
                        feePrice: this.feePrice,//服务费
                        order_no: order_no//订单号
                    }
                    //deubgger;
                    this.navCtrl.push(MoviePayComponent, {
                        filmObj: JSON.stringify(filmObj)
                    })
                }else{
                    this.alertFun("选座失败！");
                }
            }, err => {

            })
    }

    //座位选择
    selectObj=[];
    selectObjPrice:number;
    piaoPrice:number;
    feePrice:number;
    select_seat(obj){
        let selectObj_th=this.selectObj.length+1;
        let searss=this.currState[obj.seat_no];
        if(selectObj_th<5 || searss==2){
            if(searss==-1 || searss==1 || searss==3){
                return;
            }else{
                if(searss==0){
                    this.currState[obj.seat_no]=2;
                    this.selectObj.push({name:obj.seat_row+'排'+obj.seat_col+'座',seat_no:obj.seat_no,piaoPrice:this.filmObj.standartPrice,pFee:this.filmObj.fee});
                }else{
                    this.currState[obj.seat_no]=0;
                    var index;
                    for(let val of this.selectObj){
                        if(val.seat_no==obj.seat_no){
                        index=this.selectObj.indexOf(val);
                        }
                    }
                    // var index = selectObj.indexOf({name:obj.seat_row+'排'+obj.seat_col+'座',seat_no:obj.seat_no});
                    this.selectObj.splice(index,1);
                }
                //计算价格
                selectObj_th=this.selectObj.length;
                let standartPrice=parseInt(this.filmObj.standartPrice);
                let fee=parseInt(this.filmObj.fee);
                this.piaoPrice=standartPrice*selectObj_th;
                this.feePrice=fee*selectObj_th;
                this.selectObjPrice=this.piaoPrice+this.feePrice;
            }
        }else{
            this.alertFun("最多只能购买4个座位");
        }

        // obj.seat_no='1';
    }

    //下单去确认页面
    GotoPay() {
        this.lockSeatCustomF();//锁定
    }

    alertFun(txt){
        let alertPwdError = this.alertCtrl.create({ 
                title:'提示', 
                // subTitle:'please enter a valid Password', 
                message:txt, 
                buttons:[{ 
                    text:'确 定', 
                    handler:()=>{ 
                    }
                }], 
                // inputs:[{ type:'checkbox' },{ type:'checkbox' }] 
            }); 
            alertPwdError.present();
    }

}

