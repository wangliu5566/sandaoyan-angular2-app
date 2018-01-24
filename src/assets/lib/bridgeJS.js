function GotoApp(e) {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.webkit.messageHandlers.toios.postMessage(e);
    } else if (/android/.test(ua)) {
        //var rowstring=angular.toJson(row);
        window.Android.Post(e);
    }
}

function jd_navigate(id) {
     var url='http://sdy.cdtown.cn:30303/scenery/detail?sceneryId='+id;
    // var url='http://192.168.2.200:8087//scenery/detail?sceneryId='+id;
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        cache: false,
        success: function (data) {
            // var app0 = document.getElementsByClassName('amap-info');
            if(data.status==200){
                window.location = './#/jddh/' + id
            }else{
                // alert(data.msg);
                //提示
                layer.open({
                    content: data.msg,
                    skin: 'msg',
                    time: 6 //6秒后自动关闭
                });
            }
        }
    })
}