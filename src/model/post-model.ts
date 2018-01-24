export class Post {
  totalPage:number;
  pageNumber: number=10;
  pageSize: number=1;
  traceEntityId: number;
  itemId:number;
  shopId:number;
  orderId:number;
  contentId:number;
  type:string;
  targetId:string;
  name:string;
  gender:string;
  age:string;
  idCard:string;
  cellPhone:string;
  signedType:string;
  remark:string;
  reserveType:string;
  account:string;
  password:string;
}

export class FileObj {
  id: string;//主键
  origPath: string;//原文件路径
  thumbPath: string;//缩略文件路径(图片类型文件)
  name: string;//资源名称
  createTime: string;///创建时间
  size: string;//大小
  type: string; //类型(jpg, gift, png, xls, doc
  status: string;//状态(1:正常，0:删除)
  token: string;
  base64: string;//base64字符串
}
