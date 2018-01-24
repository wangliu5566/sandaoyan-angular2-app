import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/HttpService';
import { GlobalData } from '../../../providers/GlobalData';

import { IvrPageModule,townScenery,sceneryList} from './ivr.module';
import { JdNavigatePage } from '../jd-navigate/jd-navigate';

declare const AMap: any;//声明
declare const APlayer: any;//声明
/**
 * Generated class for the IvrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ivr',
  templateUrl: 'ivr.html',
})
export class IvrPage{
  // IvrPage_data: IvrPageModule=new IvrPageModule();
  // sceneryObj:scenery;
  // BuyRecordArr:Array<BuyRecord>;
 townScenerye_data: townScenery=new townScenery();
 sceneryList_data:Array<sceneryList>;


  townId: string;
  token:string;
  ap2:any;
  aplayerpic:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService,private globalData: GlobalData) {
    this.townId=navParams.get('townId');
    this.token=navParams.get('token');
    if(this.token){
        this.globalData.token =this.token;
    }
    this.ivrmapobj();
  }
  ivrmapobj(){
    this.httpService.get('/scenery/listByTownId',  { townId: this.townId}).map((res: Response) => res.json())
    .subscribe(res => {
        if(res.code==200){
          // this.IvrPageModuleArr=res['data']['datas'];
          // this.IvrPage_data=res['data']['datas'];
          this.townScenerye_data=res['data'].townScenery;
          this.sceneryList_data=res['data'].sceneryList;
          this.setplayer();
          this.drawMap();
        }
    }, err => {

    })
  }
  ionViewDidEnter() {
   
  }
  setplayer(){
    //播放器
    var that=this;
    that.ap2 = new APlayer({
      element: document.getElementById('player2'),
      narrow: true,
      autoplay: false,
      showlrc: false,
      mutex: true,
      theme: '#e6d0b2',
      mode: 'order',
      music: {
          title: 'Preparation',
          author: 'Hans Zimmer/Richard Harvey',
          url: this.townScenerye_data.introduceVoice,
          pic: this.townScenerye_data.imageUrl
      }
    });
      that.aplayerpic = document.getElementById('aplayerpic');
      that.ap2.on('pause', function () {
        that.aplayerpic.setAttribute('class', 'aplayer-pic'); 
      });
      that.ap2.on('play', function () {
          that.aplayerpic.setAttribute('class', 'aplayer-pic animat'); 
      });
      // that.ap2.on('playing', function () {
      //     that.aplayerpic.setAttribute('class', 'aplayer-pic animat');
      // });
      that.ap2.on('ended', function () {
          that.aplayerpic.setAttribute('class', 'aplayer-pic'); 
      });
    // }, 1000)
  }
  ionViewWillLeave(){
    this.ap2.pause()
  }
  drawMap(){
     //初始化地图
     var that=this;
       var map = new AMap.Map('IVRcontainer', {
           resizeEnable: true,
           expandZoomRange: true,
           layers: [new AMap.TileLayer.Satellite()],
           zoom: 19
       });
        
       var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(-15, -20)}); 
       var markers = []; //province见Demo引用的JS文件
       var iconArr=['../../assets/images/wusuo.png','../../assets/images/yousuo.png'];
        for(var a = 0;a < that.sceneryList_data.length; a++){
          var sceneryObj=that.sceneryList_data[a];
          var icon=sceneryObj.isBuy==0?iconArr[0]:iconArr[1];
          var marker = new AMap.Marker({
            map: map,
            position: [sceneryObj.longitude,sceneryObj.latitude],
            // position: [116.47395,39.986058],
            icon: new AMap.Icon({
              image: '../../assets/images/wusuo.png',
              //  image: icon,
               size: new AMap.Size(40, 40),  //图标大小
               imageSize: new AMap.Size(40,40),
            }),
            offset: new AMap.Pixel(-12,-12),
            zIndex: 101,
            title: sceneryObj.name,   
          });
          // 设置弹出层
          let tokeno:string=that.token;
          var iconHtml='';
          var content='<div class="info-title">'+sceneryObj.name+'</div>'+
          '<div class="info-content">'+
          '<a class="nopermission">'+
          '<img src="'+sceneryObj.imageUrl+'" alt="">'+
          '</a>'+
          '<div class="info-con"><span class="info-con-span">'+sceneryObj.introduction+'</span>'+
          '<button ion-button block outline class="ivr_button" onclick="jd_navigate('+sceneryObj.id+')">语音介绍</button></span>'
          '</div>';
          var content1='<div class="info-content" style="display: block;width: 220px;border-radius: 8px;padding: 20px 10px;">'+
          '<div class="info-con" style="width: 100%;float: inherit;text-align:center;"><span class="unpurchased">仅需支付￥'+sceneryObj.price/100.00+'即可解锁全部景点</span>'+
          '<button ion-button block outline end class="ivr_button" style="float: inherit;" onclick="gotoApp('+sceneryObj.id+',\''+tokeno+'\')">前去购买</button></div>'
          '</div>';
          if(sceneryObj.isBuy==1){
            marker.content = content1;
          }else{
            marker.content = content;
          }
          marker.on('click', markerClick);
          markers.push(marker);
          // 设置label标签
          marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(-4, 38),//修改label相对于maker的位置
            content: sceneryObj.name
          })
        }
        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(map, e.target.getPosition());
        }
        map.setFitView();
         
  }
}
