// blog category metedata
export class Order_data  {
id:number;
orderNo:number;
itemId:number;
shopId:number;
itemName:string;
orderImage:string;
number:number;
usedNumber:number;
actualAmount:number;
nowReturn:number;
outdateReturn:number;
unReservation:number;
canAppend:number;
status:string;
mobile:number;
type: string;
localOrderItemList:Array<localOrderItemList>;
itemSubTitle:string;
shop:{
	id:number;
	name:number;
	longitude:number;
	latitude:number;
	distanceToMe:number;
	address:string;
	servicerMobile:number;
}
item:{
	subTitle:string;
}
};
export class shop{
	id:number;
	name:number;
	longitude:number;
	latitude:number;
	distanceToMe:number;
	address:string;
	servicerMobile:number;
}
class localOrderItemList{
	id:number;
	itemName:string;
	itemImg:string;
	salePrice:number;
	marketPrice:number;
	useCode:number;
	useQrCode:string;
	status:number;
}
export class item{
	subTitle:string;
}