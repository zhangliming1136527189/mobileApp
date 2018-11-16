/**
 * Created by liyxt on 2016/10/9.
 */

$(function(){
    localStorage.location = 'https://ncapp.yyuap.com/fiwechat/';
    //localStorage.location = 'http://10.11.115.39:5050/fiwechat/';
    $(".a_add").on("click",function(){
        $.post(localStorage.location+"mobilecheckauthority",{userid:sessionStorage.token},function(data){
            if(data.status=="success"){
                window.location="html/add.html";
            }else if(data.status=="error"){
                window.location="html/sorry.html";
            }
        });
    });
    sessionStorage.which="index";
    if(!sessionStorage.idName){
        sessionStorage.idName="bug";
    }
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    var height=document.documentElement.clientHeight-$("#tab").outerHeight()-$("#search").outerHeight()-$("#footer").outerHeight();
    $("#show").height(height);

    //我的
		//sessionStorage.token="0001ZF10000000039C0T";
//		sessionStorage.token="0001AA10000000034SQ6";
    //李洪鹏的
//		sessionStorage.token="0001ZF1000000002MMQK";

    //获取用户的token
    if(!sessionStorage.token){
        var url=window.location.href;
        var token=url.split("token=")[1];
        sessionStorage.token=token;
    }

    $("li[name='"+sessionStorage.idName+"']").addClass("active").siblings().removeClass("active");
    //初始化数据
    switch(sessionStorage.idName){
        case "bug":
            $("#search input").attr("placeholder","搜索BUG名称、BUG描述、项目名称、解决人邮箱");
            break;
        case "demand":
            $("#search input").attr("placeholder","搜索需求名称、需求描述、项目名称、解决人邮箱");
            break;
    }
    load();

    //切换页签
    $("#tab li").on("click",function(){
        //layer遮罩层
        layer.load(2);
        sessionStorage.idName=$(this).attr("name");
        $("div[id='"+sessionStorage.idName+"']").show().siblings().hide().html();
        $(this).addClass("active").siblings().removeClass("active");
        //改变搜索框提示信息
        switch(sessionStorage.idName){
            case "bug":
                $("#search input").attr("placeholder","搜索BUG名称、BUG描述、项目名称、解决人邮箱");
                break;
            case "demand":
                $("#search input").attr("placeholder","搜索需求名称、需求描述、项目名称、解决人邮箱");
                break;
        }
        //调用接口查询数据
        load();
    });

    //搜索相关
    $("#search input").on("click",function(){
        $(".cover,.back,.icon_close").show();
        $(this).css({width:"2.4rem"});
    }).on("keypress",function(event){
        if(event.keyCode=="13"){
            $("#search input").blur();
            load();
            $(".cover,.back,.icon_close").hide();
            $("#search input").css({width:"2.85rem"});
        }
    });
    $(".back").on("click",function(){
        $(".cover,.back,.icon_close").hide();
        $("#tab").show();
        $("#search input").css({width:"2.85rem"}).val("");
        load();
    });
    $(".icon_close").on("click",function(){
        $("#search input").val("");
    });
});
$(function(){//上滑刷新
    $('#show').bind('touchcancel touchend', function (e) {
        e.stopPropagation();
        var height = $(this).height();
        var scrolltop = $(this).scrollTop();
        var offsetH = $('.show').outerHeight();
        scroll();
        if (scrolltop >= offsetH - height - 50) {
            $('#show').unbind('scroll');
            $('.tip').hide();
            var beginindex=$(".msg").length+1;
            var params={
                beginindex:beginindex,
                endindex:beginindex+9,
                param:JSON.stringify({supporttype:sessionStorage.idName,search:$("#search input").val().trim()})
            };

            $.post(localStorage.location+"alldhsupports",params,function(data){
                $(".bugCount").html("("+(data.bugCount?data.bugCount:0)+")");
                $(".demandCount").html("("+(data.demandCount?data.demandCount:0)+")");
                var data = data.data;
                var length = data.length;

                if (length == 0) {
                    //没有更多了
                    $('.loading').hide();
                    $('.noMore').show();
                    $('.tip').hide();
                    setTimeout(
                        function () {
                            $('.noMore').hide();
                        }, 300
                    );
                    return false
                } else {
                    //正在加载中
                    $('.loading').show();
                    setTimeout(function () {
                        switch (sessionStorage.idName) {
                            case "bug":
                                var name = "BUG";
                                break;
                            case "demand":
                                var name = "需求";
                                break;
                        }
                        var appendStr="";
                        for(var i=0;i<data.length;i++){
                            appendStr +=
                                '<div class="msg">' +
                                '<a href="html/detail.html?pk_support=' + data[i].pk_support + '">' +
                                '<p><span class="title">项目名称:</span><span class="text">' + (data[i].projectname ? data[i].projectname : "") + '</span></p>' +
                                (data[i].image1?'<i class="ti-pin-alt"></i>':'')+
                                '<p><span class="title">' + name + '名称:</span><span class="text">' + (data[i].supportname ? data[i].supportname : "") + '</span></p>' +
                                '<span style="width: 50%;"><span class="title">大&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span><span class="text">' + (data[i].areaname ? data[i].areaname : "") + '</span></span><span style="width: 50%;"><span class="title">领&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</span><span class="text">' + (data[i].field ? data[i].field : "") + '</span></span>' +
                                '<span><span class="title">录单时间:</span><span class="text">' + data[i].creationtime + '</span></span>' +
								'<p><span class="title">解决人:</span><span class="text">' + (data[i].namemobile ? data[i].namemobile.split("（")[0] : "暂无解决人") + '</span></p>' +
								'</a>' +
                                (data[i].supportstatus == "已解决" ? '<span class="state">' + (data[i].supportstatus ? data[i].supportstatus : "") + '</span>' : "") +
                                (data[i].supportstatus == "进行中" ? '<span class="state doing">' + (data[i].supportstatus ? data[i].supportstatus : "") + '</span>' : "") +
                                (data[i].supportstatus=="未开始"?'<span class="state notStart">'+(data[i].supportstatus?data[i].supportstatus:"")+'</span>':"")+
                                '</div>';
                        }
                        $(".show").append(appendStr);
                        $('.loading').hide();
                    }, 300)
                }
            });
        }
    })
});
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,'');
};
function load(){
    $(".show").html("");
    var params = {
        beginindex: 1,
        endindex: 10,
        param: JSON.stringify({supporttype: sessionStorage.idName, search: $("#search input").val().trim()})
    };
    $.post(localStorage.location + "alldhsupports", params, function (data) {
        if(data.status=="success") {
            switch (sessionStorage.idName) {
                case "bug":
                    var name = "BUG";
                    break;
                case "demand":
                    var name = "需求";
                    break;
            }
            //原始数据
            $(".bugCount").html("(" + (data.bugCount ? data.bugCount : 0) + ")");
            $(".demandCount").html("(" + (data.demandCount ? data.demandCount : 0) + ")");
            //列表数据
            var data = data.data;
            var length = data.length;
            if (!length) {
                layer.alert("没有查到数据", {icon: 2, closeBtn: 0});
            } else {
                for (var i = 0; i < data.length; i++) {
                    var appendStr =
                        '<div class="msg">' +
                        '<a href="html/detail.html?pk_support=' + data[i].pk_support + '">' +
                        '<p><span class="title">项目名称:</span><span class="text">' + (data[i].projectname ? data[i].projectname : "") + '</span></p>' +
                        (data[i].image1?'<i class="ti-pin-alt"></i>':'')+
                        '<p><span class="title">' + name + '名称:</span><span class="text">' + (data[i].supportname ? data[i].supportname : "") + '</span></p>' +
                        '<span style="width: 50%;"><span class="title">大&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span><span class="text">' + (data[i].areaname ? data[i].areaname : "") + '</span></span><span style="width: 50%;"><span class="title">领&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</span><span class="text">' + (data[i].field ? data[i].field : "") + '</span></span>' +
                        '<span><span class="title">录单时间:</span><span class="text">' + data[i].creationtime + '</span></span>' +
						'<p><span class="title">解决人:</span><span class="text">' + (data[i].namemobile ? data[i].namemobile.split("（")[0] : "暂无解决人") + '</span></p>' +
						'</a>' +
                        (data[i].supportstatus == "已解决" ? '<span class="state">' + (data[i].supportstatus ? data[i].supportstatus : "") + '</span>' : "") +
                        (data[i].supportstatus == "进行中" ? '<span class="state doing">' + (data[i].supportstatus ? data[i].supportstatus : "") + '</span>' : "") +
                        (data[i].supportstatus == "未开始" ? '<span class="state notStart">' + (data[i].supportstatus ? data[i].supportstatus : "") + '</span>' : "") +
                        '</div>';
                    $(".show").append(appendStr);
                }
                $(".cover,.back,.icon_close").hide();
                $("#search input").css({width:"2.85rem"});
            }
            layer.closeAll('loading');
        }else{
            layer.alert("失败！！！",{icon:2,closeBtn: 0});
        }
    });
}
function scroll(){
    $('#show').bind("scroll",function () {
        var height = $(this).height();
        var scrolltop = $(this).scrollTop();
        var offsetH = $('.show').outerHeight();
        if (scrolltop >= offsetH - height-20) {
            $('.tip').show();
        } else {
            $('.tip').hide();
        }
    });
}