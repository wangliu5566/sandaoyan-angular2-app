import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Content } from 'ionic-angular';
import { Response } from '@angular/http';

// import { Post } from '../../../model/post-model';
import { TsDetailComponent } from '../tosource-detail//tsdetail.component';//溯源图文详情
import { ProductIonicPage } from '../../../pages/travel/product/product-details';
import { TraceEntityDetail_data } from '../model/tosource.model';
import { HttpService } from '../../../providers/HttpService';

// @IonicPage({
//   name: 'tosource',
//   segment: 'tosource/:id'
// })
@IonicPage()
@Component({
    selector: 'to-source',
    templateUrl: 'tosource.component.html'
})

export class ToSourceComponent{
    @ViewChild(Content) content: Content;
    detail_data: TraceEntityDetail_data=new TraceEntityDetail_data();
    sourceId:string;
    titlebox:any;
    titleboxoffsetTop:number;
    pet:string='li1';
    // public post: Post = new Post();
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private httpService: HttpService
    ) {
        this.sourceId=navParams.get('Id');
        this.GetTraceEntityDetail(this.sourceId);
       // //deubgger;
    }
    //页面加载后
    ionViewDidEnter() {
        this.titlebox = document.getElementById('titlebox2');
        this.titleboxoffsetTop=this.titlebox.offsetTop;
    }
    //去商品图文详情页面
    GotoDal(Id){
        this.navCtrl.push(TsDetailComponent,{
            Id:Id
        })
    }
    //去商品页面
    GoProductDal(){
        window.location.href=this.detail_data.resourceUrl;
        // this.navCtrl.push(ProductIonicPage,{
        //     itemId:Id
        // })
    }
    //内容详情
    GetTraceEntityDetail(id) {
        let options = {"traceEntityId":id};
        this.httpService.get('/traceEntity/traceEntityDetail', options).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.detail_data=res['data']['datas'][0];
                }
            }, err => {
                
            })
    }

    //滑动
    segmentChanged(elementId:string){
        // let yOffset = document.getElementById(elementId).offsetTop-64;
        let yOffset = document.getElementById(elementId).offsetTop;
        this.content.scrollTo(0, yOffset, 1000)
        // this.content;
       
    }
    //固定FIXED
    scrollHandler(event) {
        // this.content;
        let contentPT=this.content.getContentDimensions();
        var isfiexd=this.titlebox.classList.contains('fixed');
        if(contentPT.scrollTop>this.titleboxoffsetTop){
            if(!isfiexd){
                this.titlebox.setAttribute('class', 'toStitlebox bbe fixed')
            }
        }else{
            if(isfiexd){

                this.titlebox.setAttribute('class', 'toStitlebox bbe')
            }
        }

    }


    // public getPost(id: number) {
    //     this.toSourceService
    //         .getPost(id)
    //         .subscribe(
    //         data => this.post = data,
    //         error => console.error(error)
    //         );
    // }
}

