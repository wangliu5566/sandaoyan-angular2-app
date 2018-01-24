import { Component, OnInit, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, Slides } from 'ionic-angular';
import { ModalController, Platform, ViewController } from 'ionic-angular';

import { HttpService } from '../../../providers/HttpService';

declare const AMap: any;//声明

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  MapObj: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService: HttpService) {
    this.MapObj = JSON.parse(navParams.get('mapObj'));
  }

  ionViewDidLoad() {
    //初始化地图
    // let map = new AMap.Map('container', {
    //     resizeEnable: true,
    //     // center: ['116.397428', '39.90923'],
    //     zoom: 13,
    //     center: [this.MapObj.longitude,this.MapObj.latitude]
    // });
    // AMap.plugin(['AMap.ToolBar'], function () {
    //   map.addControl(new AMap.ToolBar());
    // })
    //  map.setZoomAndCenter(14, [104.06, 30.67]);
    // let marker = new AMap.Marker({
    //   position: map.getCenter(),
    //   map: map,
    //   draggable: true,
    //   cursor: 'move'
    // });
    // marker.setMap(map);
    // // 设置点标记的动画效果，此处为弹跳效果
    // // marker.setAnimation('AMAP_ANIMATION_BOUNCE');
    // marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
    //     offset: new AMap.Pixel(20, -10),//修改label相对于maker的位置
    //     content: this.MapObj.name
    // });
    var that=this;
    // setTimeout(function() {
        var map = new AMap.Map('container', {
          resizeEnable: true,
          center: [that.MapObj.longitude, that.MapObj.latitude],
          // center: [
          //         '104.072941','30.663049'
          // ],
          zoom: 16
      });
      var marker = new AMap.Marker({
          position: map.getCenter()
      });
      marker.setMap(map);
      // 设置label标签
      marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
        offset: new AMap.Pixel(20, -10),//修改label相对于maker的位置
        content: that.MapObj.name
      })
    // }, 100);
  }
}