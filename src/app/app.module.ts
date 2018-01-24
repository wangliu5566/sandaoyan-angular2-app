import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
//import { Broadcaster } from '@ionic-native/broadcaster';
import {IonicStorageModule } from '@ionic/storage';
import { MyApp} from './app.component';

//店铺详情
import { ShopIonicPage } from '../pages/travel/shop/shop-details';
//商品详情
import { ProductIonicPage } from '../pages/travel/product/product-details';
//预订商品详情
import { orderProductIonicPage } from '../pages/travel/product/orderproduct-details';
//订单详情
import { OrderIonicPage } from '../pages/me/orders/orders-detail';
import { RefundPage } from '../pages/me/order-refund/refund';
//小镇详情
import { TownDetailsPage } from '../pages/town-details/town-details';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { SubmitOrderPage } from '../pages/travel/submit-order/submit-order';//提交订单
import { GraphicDetailsPage } from '../pages/graphic-details/graphic-details';//头条图文详情
import { ImgDetailsPage } from '../pages/travel/img-details/img-details';//商品图文详情
//家庭医生
import { AppointPage } from '../pages/family-doctor/appoint/appoint';//预约服务
import { ServicePage } from '../pages/family-doctor/service/service';//服务协议

//订单
import { GraphicService } from '../pages/graphic-details/GraphicService';//头条图文详情
import { OrderService } from '../pages/travel/submit-order/OrderService';//提交订单

//电影院
import { MovieComponent,ModalContentPage } from '../pages/civic/movie/movie-ind/movie-ind.component';
import { MoviePayComponent } from '../pages/civic/movie/movie-pay/movie-pay.component';
import { MovieSltComponent } from '../pages/civic/movie/movie-select/movie-slt.component';
//电影院订单
import { MovieOrderComponent } from '../pages/me/mov-order/mov-order.component';
//扫码溯源
import { ToSourceModule } from '../pages/sweepyard/tosource.component.module';
import { ToSourceComponent } from '../pages/sweepyard/tosource/tosource.component';
import { TsDetailComponent } from '../pages/sweepyard/tosource-detail/tsdetail.component';

import { AgePipe,DatePipe,FilmTypePipe } from '../pipes/pipes';
import { UerPingjia } from '../pages/user-ping/user-ping';
import { HttpService } from '../providers/HttpService';
import { NativeService } from '../providers/NativeService';
import { GlobalData } from '../providers/GlobalData';
import { Utils } from '../providers/Utils';
// import { WindowRefService } from '../providers/WindowService';
//
// import { ElesltDirective,HighlightDirective } from '../pipes/directive';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {ReserveDeatilsPage} from '../pages/reserve-deatils/reserve-deatils'//预定详情


//地图
import { MapPage } from '../pages/travel/map/map';

//语音导航
import {IvrPage} from '../pages/sdy-navigate/IVR/ivr';
//景点导航
import {JdNavigatePage} from '../pages/sdy-navigate/jd-navigate/jd-navigate';
//医生详情
import { DocterDetails } from '../pages/doctor-details/doctor-details';
import { Hotel } from '../pages/hotel/hotel';//酒店
import { HotelDetails } from '../pages/hotel-deatils/hotel-deatils';//酒店详情
import { HotelServices} from '../pages/hotel-services/hotel-services';//酒店服务
import { HotelOrderPage } from '../pages/hotel-order/hotel-order';//酒店订单详情

//用户协议
import { Usure } from '../pages/usure/usure';
import { DoctorList } from '../pages/doctor-list/doctor-list';//医生列表
import { DocterPar } from '../pages/doc-particulars/doc-particulars';//医生详情
import { YuyueGuehao } from '../pages/yuyue-guahao/yuyue-guahao';//预约挂号

@NgModule({
  declarations: [
    MyApp,
    ShopIonicPage,//店铺详情
    ProductIonicPage,//商品详情
    orderProductIonicPage,//预订商品详情
    OrderIonicPage,//订单详情
    RefundPage,//申请退款
    ItemDetailsPage,
    ListPage,
    UerPingjia,//用户评价列表
    ReserveDeatilsPage,//预定详情
    HotelOrderPage,//酒店订单详情
    DocterDetails,//医生详情
    Hotel,//酒店
    HotelDetails,//酒店详情
    HotelServices,//酒店服务
    Usure,//用户协议
    YuyueGuehao,//预约挂号
    SubmitOrderPage,//提交订单
    GraphicDetailsPage,//头条图文详情
    ImgDetailsPage,//商品图文详情
    TownDetailsPage,//小镇详情
    AppointPage,//预约服务
    ServicePage,//服务协议
    MovieComponent,  //电影院
    ModalContentPage,//电影院
    MovieSltComponent,//电影院选座
    MoviePayComponent,//电影院支付
    MovieOrderComponent,//电影院订单
    DoctorList,//医生列表
    DocterPar,//医生详情
    // ToSourceComponent,//扫码溯源

    MapPage,//地图

    AgePipe,
    DatePipe,
    FilmTypePipe,
    IvrPage,//语音导航
    JdNavigatePage,//景点导航
    // ElesltDirective,
    // HighlightDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
            backButtonText: '返回',
            iconMode: 'ios',
            mode: 'ios',
    },{
      links: [
        { component: ShopIonicPage, name: 'shopdetail', segment: 'shopdetail/:shopId' },
        { component: ReserveDeatilsPage, name: 'reseverDetails', segment: 'reseverDetails/:orderNo/:token' },//预定 详情
        { component: HotelOrderPage, name: 'hotelOrderPage', segment: 'hotelOrders/:orderNo/:token' },//酒店预定 详情


        
        {  component: UerPingjia, name: 'uerPingjia', segment: 'uerPingjia/:shopId/:type'},//更多评价  列表
        { component: DocterDetails, name:"docterDetails",segment:'docterDetails/:townId'},//医生详情
        { component: Hotel, name:"hotel",segment:'hotel/:hotelId/:startDay/:endDay'},//酒店
        { component: HotelDetails, name:"hotelDetails",segment:'hotelDetails/:roomId/:startDay/:endDay/:hotelId/:howmany'},//房型详情
        { component: HotelServices, name:"hotelServices",segment:'hotelServices/:hotelId'},//酒店服务
        { component: Usure, name:"Yonghuxieyi",segment:'Yonghuxieyi'},//用户协议
        { component: DoctorList, name: "doctorList", segment: 'doctorList/:deptId/:token'},//医生列表
        { component: YuyueGuehao, name: "yuyueGuahao", segment: 'yuyueGuahao/:hospitalId/:token' },//预约挂号
        { component: DocterPar, name: "docPar", segment: 'docPar/:docId/:token'},//医生详情  2017/08/15

        { component: ProductIonicPage, name: 'productdetail', segment: 'productdetail/:itemId' },//商品详情
        { component: orderProductIonicPage, name: 'orderproductdetail', segment: 'orderproductdetail/:itemId' },//预订商品详情
        { component: ImgDetailsPage, name: 'productdtl', segment: 'productdtl/:itemId' },//商品图文详情
        { component: OrderIonicPage, name: 'proorder', segment: 'proorder/:orderNo/:token' },
        { component: RefundPage, name: 'orderrefund', segment: 'orderrefund/:orderObj' },
        { component: SubmitOrderPage, name: 'prosubmitorder', segment: 'prosubmitorder' },
        { component: GraphicDetailsPage, name: 'graphicdetail', segment: 'graphicdetail/:contentId' },
        { component: TownDetailsPage, name: 'towndetail', segment: 'towndetail/:id' },
        { component: AppointPage, name: 'appoint', segment: 'appoint/:token/:townId' },
        { component: ServicePage, name: 'service', segment: 'service/:token/:townId' },
        { component: MovieComponent, name: 'movie', segment: 'movie/:token' },
        // { component: MovieComponent, name: 'movie', segment: 'movie/:cinemaId' },
        { component: MovieSltComponent, name: 'movieslt', segment: 'movieslt/:filmObj'},
        { component: MoviePayComponent, name: 'moviepay', segment: 'moviepay/:filmObj'},
        { component: MovieOrderComponent, name: 'movieorder', segment: 'movieorder/:forderID/:token' },
        { component: ToSourceComponent, name: 'tosource', segment: 'tosource/:Id' },
        { component: TsDetailComponent, name: 'tsdetail', segment: 'tsdetail/:Id' },
        { component: MapPage, name: 'map', segment: 'map/:mapObj' },
        { component: IvrPage, name: 'ivrPage', segment: 'ivrmap/:townId' },
        { component: JdNavigatePage, name: 'jddh', segment: 'jddh/:id' },
        // { component: MapPage, name: 'map', segment: 'map/:mapObj' },
        // { component: ItemDetailPage, name: 'ItemDetail', segment: 'itemdetail/:item', defaultHistory: [WelcomePage] },
      ]
    }),
    IonicStorageModule.forRoot(),
    ToSourceModule,//扫码溯源

  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UerPingjia,//用户评价 列表
    ShopIonicPage,//店铺详情
    ProductIonicPage,//商品详情
    orderProductIonicPage,//预订商品详情
    OrderIonicPage,//订单详情
    RefundPage,//订单详情
    ItemDetailsPage,
    Hotel,//酒店
    YuyueGuehao,//预约挂号
    HotelDetails,//酒店详情
    HotelServices,//酒店服务
    HotelOrderPage,//酒店订单详情
    Usure,//用户协议
    DoctorList,//医生列表
    ListPage,
    DocterPar,//医生详情
    ReserveDeatilsPage,//预定详情
    SubmitOrderPage,//提交订单
    GraphicDetailsPage,//头条图文详情
    ImgDetailsPage,//商品图文详情
    TownDetailsPage,//小镇详情
    AppointPage,//预约服务
    ServicePage,//服务协议
    MovieComponent,  //电影院
    ModalContentPage,//电影院
    MovieSltComponent,//电影院选座
    MoviePayComponent,//电影院支付
    MovieOrderComponent,//电影院订单
    DocterDetails,//医生详情
    // ToSourceComponent,//扫码溯源

    MapPage,//地图
    
    IvrPage,//语音导航
    JdNavigatePage,//景点导航
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    NativeService,
    GlobalData,
    Utils,
    GraphicService,
    OrderService,
    //Broadcaster,
    // Storage,
     // WindowRefService,
    // {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
