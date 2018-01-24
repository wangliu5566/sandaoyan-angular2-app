// blog category metedata
export class userAppraise{
// dimgUrl:string;
}
export class toltalpage{
// toltalpage:string;
// datas:Array<datas>;
}
export class isShowTxt{}
export class bigImgUrl{

}
export class Prod_data  {
id:number;
title:string;
subTitle:string;
salePrice:number;
buyNum:number;
costPrice:number;
marketPrice:number;
nowReturn:number;
outdateReturn:number;
unReservation:number;
canAppend:boolean;
sort:string;
isSale:number;
validityStartDate:number;
validityEndDate:number;
isCurrency:number;
useRules:string;
rulesRemark:string;
detail: string;
type:string;
localItemDetails:Array<localItemDetails>;
localItemPictures:Array<localItemPictures>;
shop:{
	name:string;
	address:string;
	level:number;
	perCapita:number;
	servicerMobile:number;
	latitude:number;
	longitude:number;
};
localItem:Array<localItem_data>;
}
export class shop{
	name:string;
	address:string;
	level:number;
	perCapita:number;
	servicerMobile:number;
	latitude:number;
	longitude:number;
};
class localItemPictures{
	id:number;
	simgUrl:string;
	mimgUrl:string;
	dimgUrl:string;
	type:string;
	isDel:string;
}
class localItem_data{
	title:string;
	subTitle:string;
	salePrice:number;
	localItemPictures:Array<localItem_data_pic>;
}
class localItemDetails{
	id:number;
	title:string;
	count:number;
	price:number;
	isDel:number;
};
class localItem_data_pic{
	simgUrl:string;
	mimgUrl:string;
	dimgUrl:string;
	type:string;
}

//溯源信息

export class ShopTraceDetail_data {
    id: number;
    title: string;
    townId: number;
    titlePage: string;
    introduction: string;
    originPlace: string;
    resourceUrl: string;
    traceDetail: Array<ShopTraceDetail_data_trace>;
}
class ShopTraceDetail_data_trace {
    id: number;
    traceEntityId: number;
    step: string;
    title: string;
    isView: number;
    content: string;
		operateDate:Date;
		key:number
}
