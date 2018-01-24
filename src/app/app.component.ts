import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

//店铺详情
import { ShopIonicPage } from '../pages/travel/shop/shop-details';
//商品详情
import { ProductIonicPage } from '../pages/travel/product/product-details';
//预订商品详情
import { orderProductIonicPage } from '../pages/travel/product/orderproduct-details';
//订单详情
import { OrderIonicPage } from '../pages/me/orders/orders-detail';
import { RefundPage } from '../pages/me/order-refund/refund';
import { ListPage } from '../pages/list/list';
import { SubmitOrderPage } from '../pages/travel/submit-order/submit-order';//提交订单
import { GraphicDetailsPage } from '../pages/graphic-details/graphic-details';//头条图文详情
import { ImgDetailsPage } from '../pages/travel/img-details/img-details';//商品图文详情
//家庭医生
import { AppointPage } from '../pages/family-doctor/appoint/appoint';//预约服务
import { ServicePage } from '../pages/family-doctor/service/service';//服务协议
//小镇详情
import { TownDetailsPage } from '../pages/town-details/town-details';
//电影院
import { MovieComponent } from '../pages/civic/movie/movie-ind/movie-ind.component';
import { MoviePayComponent } from '../pages/civic/movie/movie-pay/movie-pay.component';
import { MovieSltComponent } from '../pages/civic/movie/movie-select/movie-slt.component';
//电影院订单
import { MovieOrderComponent } from '../pages/me/mov-order/mov-order.component';
//扫码溯源
import { ToSourceComponent } from '../pages/sweepyard/tosource/tosource.component';
// import { SweepYardModule } from '../pages/sweepyard/sweepyard.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//地图
import { MapPage } from '../pages/travel/map/map';
//语音导航
import {IvrPage} from '../pages/sdy-navigate/IVR/ivr';
//景点导航
import {JdNavigatePage} from '../pages/sdy-navigate/jd-navigate/jd-navigate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = ShopIonicPage;
  pages: Array<{title: string, component: any,parame?:object}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '店铺详情', component: ShopIonicPage },
      { title: '商品详情', component: ProductIonicPage },
      {title:'预订商品详情',component:orderProductIonicPage},
      { title: '订单详情', component: OrderIonicPage},
      { title: '申请退款', component: RefundPage},
      // ,parame:{"token":"7fc48cd0-86a8-48fa-adbf-ca998f5cd427"}
      { title: '高德地图', component: MapPage },
      { title: '服务协议', component: ServicePage },
      { title: '预约服务', component: AppointPage },
      { title: '提交订单', component: SubmitOrderPage },
      { title: '电影院', component: MovieComponent},
      { title: '电影选座', component: MovieSltComponent },
      { title: '电影支付', component: MoviePayComponent },
      { title: '电影订单', component: MovieOrderComponent },
      { title: '扫码溯源', component: ToSourceComponent },
      { title: '详情', component: GraphicDetailsPage },
      { title: '图文详情', component: ImgDetailsPage },
      { title: '小店详情', component: TownDetailsPage },
      { title: '语音导航', component: IvrPage},
      { title: '景点导航', component: JdNavigatePage},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component,page.parame);
  }
}
