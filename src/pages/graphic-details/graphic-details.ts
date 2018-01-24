import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { GraphicService } from './GraphicService';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Base_url } from '../../providers/Constants';
import { AlertController } from 'ionic-angular';
import { graphic } from './graphic.model';
import { HttpService } from '../../providers/HttpService';
import { Post } from '../../model/post-model';
import { GlobalData } from '../../providers/GlobalData';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'graphic-details.html'
})
export class GraphicDetailsPage {
  graphic:graphic = new graphic();
  recommend:any=[];
  datas:any=[];
  id:number;
  src:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public alertCtrl: AlertController,private httpService:HttpService) {
    this.recommends();
    this.id = navParams.get('contentId');
    this.getInfo(this.id);

    console.log(this.id)
  }
  ionViewDidLoad(){
    this.autosize()
  }
  //文章推荐
  recommends(){
    this.httpService.get('content/contentRecommend').map((res: Response) => res.json())
      .subscribe(res => {
        if(res.code==200){
          this.recommend = res['data']['datas'];
          console.log(this.recommend);
          
        }
      }, err => {

      })
  }
  //获取详情
  getInfo(id){
    let options = {"contentId":id};
    this.httpService.get('content/contentDetail', options).map((res: Response) => res.json())
      .subscribe(res => {
        if(res.code==200){
          this.graphic = res['data']['datas'][0];
        }
      }, err => {

      })
  }
  //点击文章推荐
  getNext(id){
    this.navCtrl.push(GraphicDetailsPage,{
      contentId:id
    });
    this.getInfo(id);
  }
  ////点击收藏出现弹窗
  //showConfirm() {
  //  let confirm = this.alertCtrl.create({
  //    title: '提示',
  //    message: '您确定将这篇文章收藏吗？',
  //    buttons: [
  //      {
  //        text: '确定',
  //        handler: () => {
  //          console.log('确定 clicked');
  //          this.collect();
  //        }
  //      },
  //      {
  //        text: '取消',
  //        handler: () => {
  //          console.log('取消 clicked');
  //        }
  //      }
  //    ]
  //  });
  //  confirm.present();
  //}
  ////收藏
  //collect(){
  //  let options = <Post>{"type": "town","targetId":"1"};
  //  this.httpService.post('private/collect/add', options).map((res: Response) => res.json())
  //    .subscribe(res => {
  //      if(res.code==200){
  //        alert(1);
  //      }
  //    }, err => {
  //        this.src = 'assets/images/collect1.png'
  //    })
  //}
  autosize(){
    !(function (win, doc) {
      function setFontSize() {
        // 获取window 宽度
        // zepto实现 $(window).width()就是这么干的
        var winWidth = window.innerWidth;
        doc.documentElement.style.fontSize = (winWidth / 720) * 100 + 'px';
        //设置页面元素根元素的px大小，然后所有rem以此为基准。
        //640为开发时候的页面宽度，20为基准px大小， 可以设置任意数字，方便开发时候rem计算

      }

      var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

      var timer = null;

      win.addEventListener(evt, function () {
        clearTimeout(timer);

        timer = setTimeout(setFontSize, 300);
      }, false);

      win.addEventListener("pageshow", function (e) {
        if (e.persisted) {
          clearTimeout(timer);

          timer = setTimeout(setFontSize, 300);
        }
      }, false);

      //初始化
      setFontSize();

    }(window, document));
  }
}
