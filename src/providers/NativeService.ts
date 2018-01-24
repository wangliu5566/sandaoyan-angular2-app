/**
 * Created
 */
import {Injectable} from '@angular/core';
import {ToastController, LoadingController, Platform, Loading, AlertController} from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
// import {Network} from '@ionic-native/network';

declare var LocationPlugin;
declare var AMapNavigation;
declare var cordova: any;

@Injectable()
export class NativeService {
  private loading: Loading;
  private loadingIsOpen: boolean = false;

  constructor(private platform: Platform,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              // private appVersion: AppVersion,
              // private camera: Camera,
              // private toast: Toast,
              // private transfer: Transfer,
              // private file: File,
              // private inAppBrowser: InAppBrowser,
              // private imagePicker: ImagePicker,
              // private network: Network,
              // private appMinimize: AppMinimize,
              private loadingCtrl: LoadingController) {
  }

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading(content: string = ''): void {
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => {//最长显示10秒
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, 10000);
    }
  };

  /**
   * 关闭loading
   */
  hideLoading(): void {
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  };

    /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

    /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  // getNetworkType(): string {
  //   if (!this.isMobile()) {
  //     return 'wifi';
  //   }
  //   return this.network.type;
  // }

  /**
   * 判断是否有网络
   * @returns {boolean}
   */
  // isConnecting(): boolean {
  //   return this.getNetworkType() != 'none';
  // }
  

}
