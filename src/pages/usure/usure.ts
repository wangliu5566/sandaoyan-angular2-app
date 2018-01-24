import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UsurePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-usure',
  templateUrl: 'usure.html',
})
export class Usure {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.autoSize()
  }
  autoSize(){
    !(function(win, doc){
        function setFontSize() {
            // 获取window 宽度
            // zepto实现 $(window).width()就是这么干的
            var winWidth =  window.innerWidth;
            doc.documentElement.style.fontSize = (winWidth / 720) * 100 + 'px' ;

        }

        var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

        var timer = null;

        win.addEventListener(evt, function () {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }, false);

        win.addEventListener("pageshow", function(e) {
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
