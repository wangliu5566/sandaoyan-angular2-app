import {Base_url} from './../../../providers/Constants';
import { Component, ViewChild, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {IonicPage, NavController, NavParams,Slides} from 'ionic-angular';

import {HttpService} from '../../../providers/HttpService';
import {GlobalData} from '../../../providers/GlobalData';
import {JdNavigatePageModule} from './jd-navigate.module';

/**
 * Generated class for the JdNavigatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare const APlayer: any;//声明
@IonicPage()
@Component({
  selector: 'page-jd-navigate',
  templateUrl: 'jd-navigate.html',
})
export class JdNavigatePage{
  
  @ViewChild('ionSlides') slider:Slides;

  APlayer: any;//声明
  sceneryId: string;
  token: string;
  aplayerpic: any;
  ap1: any;
  autoplayDisableOnInteraction: any;
  jddataobj: JdNavigatePageModule = new JdNavigatePageModule();
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpService, private globalData: GlobalData) {
    this.sceneryId = navParams.get('id');
    this.token = navParams.get('token');
    if (!this.token) {
      this.token = this.globalData.token;
    }
    this.httpService.get('/scenery/detail', {sceneryId: this.sceneryId}).map((res: Response) => res.json())
      .subscribe(res => {
        if (res.code == 200) {
          this.jddataobj = res['data'];
          this.setplayerpic();  
        }
      }, err => {

      })
  }
  // jdmapobj() {
  //   this.httpService.get('/scenery/detail', {sceneryId: this.sceneryId}).map((res: Response) => res.json())
  //     .subscribe(res => {
  //       debugger
  //       if (res.code == 200) {
  //         this.jddataobj = res['data'];
  //       }
  //     }, err => {
  //
  //     })
  // }
  ngOnInit() {
    setInterval(()=>{
      this.slider.slideNext(500,true);
    },5000);
  }
  ionViewDidEnter() {
    // this.slider.startAutoplay();  
    // this.slides.autoplayDisableOnInteraction = false;
  }
  setplayerpic(){
    var that = this;
    that.ap1 = new APlayer({
      element: document.getElementById('player1'),
      narrow: false,
      autoplay: false,
      showlrc: false,
      mutex: true,
      theme: '#c62707',
      preload: 'metadata',
      mode: 'order',
      music: {
        title: this.jddataobj.name,
        author: '',
        // url: 'http://devtest.qiniudn.com/Preparation.mp3',
        // pic: '../../../assets/images/pic_1.png'
        url: this.jddataobj.introduceVoice,
        pic: this.jddataobj.imageUrl
      }
    });
    that.aplayerpic = document.getElementById('aplayerpic');
    that.ap1.on('pause', function () {
      that.aplayerpic.setAttribute('class', 'aplayer-pic');
    });
    that.ap1.on('play', function () {
      that.aplayerpic.setAttribute('class', 'aplayer-pic animat');
    });
    that.ap1.on('ended', function () {
      that.aplayerpic.setAttribute('class', 'aplayer-pic');
    });
  }

  ionViewWillLeave() {
    this.ap1.pause();
    this.slider.stopAutoplay();  
  }
}
