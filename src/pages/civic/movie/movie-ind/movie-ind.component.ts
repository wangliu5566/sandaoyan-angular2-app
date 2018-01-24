import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Content, NavController, NavParams, Slides } from 'ionic-angular'
import { ModalController, AlertController, Platform, ViewController } from 'ionic-angular';
// import { Broadcaster } from '@ionic-native/broadcaster';
import { Storage } from '@ionic/storage';
import { Response } from '@angular/http';

// import { Post } from '../../../model/post-model';
import { MapPage } from '../../../../pages/travel/map/map';
import { CinemaDetail, CinemaFilmList, Films, SessionByFilm, GetFilmDetail } from '../model/movie';
import { MovieSltComponent } from '../../../../pages/civic/movie/movie-select/movie-slt.component';

// import { FilmTypePipe } from '../../../../pipes/pipes';
import { HttpService } from '../../../../providers/HttpService';
import { Utils } from '../../../../providers/Utils';
import { GlobalData } from '../../../../providers/GlobalData';
declare var Swiper;

@Component({
    selector: 'movie-ind',
    templateUrl: 'movie-ind.component.html',
})

export class MovieComponent {
    @ViewChild('slides') slides: ElementRef;
    cinemaId: string;
    token: string;
    txxx:number;
    openModalF = new EventEmitter();
    // cinemaList: CinemaList = new CinemaList();//电影院列表
    Indsession: number = 0;
    Dateitems: Array<string> = ['今天', '明天', '后天'];
    currDate: string;
    // paramObj:any=paramObj;
    // dateitems:any={'1':'今天','2':'明天','3':'后天'};
    cinemaDetail: CinemaDetail = new CinemaDetail();//电影院详情
    cinemaFilmList: CinemaFilmList = new CinemaFilmList();//可放映的电影列表
    films: Films = new Films();//可放映的电影列表
    sessionByFilm: SessionByFilm = new SessionByFilm();//电影的排期

    //设置titleUlWidth宽度
    titleUlWidth: number;



    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, private httpService: HttpService, private globalData: GlobalData, private storage: Storage) {
        // this.cinemaId = navParams.get('cinemaId');
        // this.token ="8538a2e6-ed27-4cad-9631-7e921ab2ae64";
        this.token = navParams.get('token');
        if (this.token) {
            this.globalData.token = this.token;
            let listdata=Utils.ssGetItem("cinemaFilmList");
            if(listdata){
                this.cinemaFilmList=Utils.ssGetItem("cinemaFilmList");
            }
            // this.xxx=Utils.ssGetItem("cinemaFilmList");
            // debugger;
            if (this.cinemaFilmList && this.cinemaFilmList.films) {
                this.ionSlideDidChange(0);//默认选择
            } else {
                this.GetFilmByCinemaF();
            }
            // this.storage.get('cinemaFilmList').then((datas: CinemaFilmList) => {
            //     if (datas && datas.films) {
            //         this.cinemaFilmList = datas;
            //         this.ionSlideDidChange(0);//默认选择
            //     } else {
            //         this.GetFilmByCinemaF();
            //     }
            // });
        } else {
            this.httpService.alertLoginTimeOut();//获取用户信息
        }


    }

    //设置siwper
    // ngAfterViewInit() {
    //     this.slides.slidesPerView= 4;
    //     this.slides.centeredSlides= true;
    //     this.slides.paginationClickable= true,
    //     this.slides.spaceBetween= 0;
    //     this.ionSlideDidChange= function(){

    //     };
    // }


    // ionViewDidLoad() {

    // }

    //     sendData(){
    //       // 这句代码是 用于传值给 原生的
    //      this.broadcaster.fireNativeEvent('jsToNative', {"item":'我是来自ionic的值'}).then(() => console.log('success'));
    //        // 这句代码 添加了一个监听者, 用于接收原生 传来的值
    //      this.broadcaster.addEventListener('eventName').subscribe((event) => console.log('(2) 这句话是在ionic 里面打印的:===='+event['key']));
    // // 把这两句代码写在一起,是为了 在 传值的 同时,创建了 监听者(其实创建监听者 的操作在 ionViewDidLoad-页面加载 时最合适,但目前实现不了,还有待研究 )

    //     }
    // testEve1(){
    //     // let tempUser = new User();
    //     // tempUser.userID = 1;
    //     // tempUser.userName = "Shmily";
    //     GotoApp(JSON.stringify({xxx:'222',bbb:'bbb'}));

    //     // TempModule.shareTemp.userInfo = tempUser;
    //     // TempModule.shareTemp.test((data) => {
    //     //     // 回调函数内容
    //     // });
    //     // TempModule.shareTemp.login(tempUser.userName, "1234");
    // }

    ionViewDidEnter() {
        if(this.cinemaFilmList && this.cinemaFilmList.films){
            this.ionSlideDidChange(0);//默认选择
        }
        let that = this;
        // this.GetCinemaDetail();
        //http://www.swiper.com.cn/api/index.html
        // setTimeout(() => {}, 200)
        new Swiper(this.slides.nativeElement, {
            slidesPerView: 4,
            centeredSlides: true,
            // paginationClickable: true,
            // spaceBetween: 0
            onSlideChangeStart: function (swiper, e) {
                that.ionSlideDidChange(swiper.activeIndex);
            },
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        })
    }



    /*========获取电影院详情========*/
    // GetCinemaDetail() {
    //     this.httpService.get('/cinema/getCinemaByID',{cinemaId:'666'}).map((res: Response) => res.json())
    //         .subscribe(res => {
    //             if (res.code == 200) {
    //                 this.cinemaDetail = res['data'];
    //             }
    //         }, err => {

    //         })
    // }

    GogoMap() {
        this.navCtrl.push(MapPage, {
            mapObj: JSON.stringify({
                name: this.cinemaFilmList.cinemaName,
                longitude: this.cinemaFilmList.longitude,
                latitude: this.cinemaFilmList.latitude
            })
        });
    }


    /*========可放映的电影列表========*/
    GetFilmByCinemaF() {
        this.httpService.get('/cinema/getFilmByCinema', { cinemaId: '29' }).map((res: Response) => res.json())
            .subscribe(res => {
                if (res.code == 200) {
                    this.cinemaFilmList = res['data']['datas'][0];
                    // this.storage.set('cinemaFilmList', res['data']['datas'][0]);
                    Utils.ssSetItem('cinemaFilmList', res['data']['datas'][0]);
                    this.ionSlideDidChange(0);//默认选择
                }
            }, err => {

            })
    }
    ionSlideDidChange(ind: number) {
        this.films = this.cinemaFilmList.films[ind];
        this.GetSessionByFilmF(this.films.filmNo);//默认选择
        // var ind=this.cinemaFilmList.films.length;
        // if(ind>0){
        //     this.films = this.cinemaFilmList.films[ind];
        //     this.GetSessionByFilmF(this.films.filmNo);//默认选择
        // }
        // //deubgger;
    }

    /*========电影的排期========*/
    GetSessionByFilmF(id: string) {
        this.httpService.get('/film/getSessionByFilm', { filmNo: id }).map((res: Response) => res.json())
            .subscribe(res => {
                if (res.code == 200) {
                    let datas = res['data']['datas'][0];
                    for (let val of datas.dates) {
                        val.week = Utils.GetWeek(val.sessionDate);
                    }
                    this.sessionByFilm = datas;
                    this.titleUlWidth = 36 + 120 * this.sessionByFilm.dates.length;
                    this.GetcurrsessionByFilm(0);//默认选择
                }
            }, err => {

            })
    }
    GetcurrsessionByFilm(ind) {
        let sessionFmLht = this.sessionByFilm.dates.length;
        if (sessionFmLht == 0) {
            let alertPwdError = this.alertCtrl.create({
                title: '提示',
                // subTitle:'please enter a valid Password',
                message: '当前影片没有场次！',
                buttons: [{
                    text: '确 定',
                    handler: () => {
                    }
                }]
            });
            alertPwdError.present();
        } else {
            this.currDate = this.sessionByFilm.dates[ind].sessionDate;
            this.Indsession = ind;
        }

    }

    GotoBuy(Obj) {
        let filmObj = {
            filmName: this.sessionByFilm.filmName,
            screenName:Obj.screen? Obj.screen.screenName : "",
            sessionNo: Obj.sessionNo,//场次ID(排期)
            filmNo: Obj.filmNo,//电影ID
            cinemaNo: Obj.cinemaNo,//影院ID
            screenNo: Obj.screenNo,//影厅ID
            sessionDate: Obj.sessionDate, //日期
            startTime: Obj.startTime, //时间
            screenType: Obj.screenType, //影厅类型
            standartPrice: Obj.standartPrice, //市场票价
            fee: Obj.fee //服务费
        }
        this.navCtrl.push(MovieSltComponent, {
            filmObj: JSON.stringify(filmObj)
        })
    }

    //查看影片详情
    openModal(options) {
        let modal = this.modalCtrl.create(ModalContentPage, options, {
            enableBackdropDismiss: false,
            // enterAnimation:'no-animation',
            // leaveAnimation:'no-animation',
            cssClass: 'mov-modal-box',
        });
        modal.onDidDismiss(data => {
            console.log(data);
        });
        modal.present();
    }



}


@Component({
    selector: 'mov-modal',
    template: `
  <div class="mov_modal">
        <span (click)="dismiss()" class="mov_modal_close"><img src="assets/images/icons_del.png" width="30" alt=""></span>
        <div class="mov_pic pb10 cf bbe">
            <div class="f_r"><img src="{{ filmDetail.poster || DEFAULT_picmd}}" width="75" alt=""></div>
            <h5 class="mt0">{{filmDetail.filmName || '暂无'}}</h5>
            <div class="red f16">{{filmDetail.score || 0}} 分</div>
            <div class="g9 mt5">{{filmDetail.filmType | filmtype}}</div>
            <div class="g9 mt5">{{filmDetail.region || '暂无'}} / {{filmDetail.genres || '暂无'}}</div>
        </div>
        <div class="mov_intro pt10 pb10 bbe" (click)="showallIntro()">{{filmDetail.introduce | slice:0:textNum}}<span *ngIf='textNum!=10000'>...</span></div>
        <ion-row class="mov_modal_other pt10 pb10">
            <ion-col col-3 class="p0">
                <div>导演</div>
                <ul class="mt5 cf">
                    <li *ngFor="let item of filmDetail.directors | slice:0:1 ">
                        <div class="imgbox"><img src="{{item.small || DEFAULT_picmd}}" width="100%"></div>
                        <div class="namebox mt5">{{item.name || '暂无'}}</div>
                    </li>
                </ul>
            </ion-col>
            <ion-col col-9 class="pt0 pr0 pb0">
                <div>主演</div>
                <ul class="mt5 cf">
                    <li *ngFor="let item of filmDetail.actors | slice:0:3 ">
                        <div class="imgbox"><img src="{{item.small || DEFAULT_picmd}}" width="100%"></div>
                        <div class="namebox mt5">{{item.name || '暂无'}}</div>
                    </li>
                </ul>
            </ion-col>
        </ion-row>

    </div>
`
})
export class ModalContentPage {
    textNum: number = 30;
    filmDetail: GetFilmDetail = new GetFilmDetail();//影片的详情
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        public httpService: HttpService
    ) {
        this.GetFilmDetailF(this.params.get('filmNo'));
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    //影片的详情
    GetFilmDetailF(filmNo: string) {
        this.httpService.get('/film/getFilmDetail', { filmNo: filmNo }).map((res: Response) => res.json())
            .subscribe(res => {
                if (res.code == 200) {
                    this.filmDetail = res['data']['datas'][0];
                    //deubgger;
                }
            }, err => {

            })
    }
    showallIntro() {
        this.textNum = 10000;
    }
}





/*export class MovieComponent implements OnInit {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  // this.navCtrl.push(SubmitOrderPage);

  ngOnInit() { }
}
*/
