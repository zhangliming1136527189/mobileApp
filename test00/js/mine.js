/**
 * Created by liyxt on 2016/10/9.
 */
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,'');
};

$(function(){
    $(".a_add").on("click",function(){
        $.post(localStorage.location+"mobilecheckauthority",{userid:sessionStorage.token},function(data){
            console.log(data);
            if(data.status=="success"){
                window.location="add.html";
            }else if(data.status=="error"){
                window.location="sorry.html";
            }
        });
    });
    var tokens=[
        "0001AA1000000002SLFO",//李俊毅
        "1010ZF100000000001NM",//钟志民
        "0001AA1000000002TYU1",//王伟
        "0001AA1000000002W4SU",//李洪鹏
        "0001AA10000000037SVQ",//董跃龙
        "0001AA100000000393LB",//王少华
        "0001AA10000000034SQ6",//李艺轩
        "0001AA10000000030R77",//高昆
        "0001AA1000000002ZJG0",//迟明
        "0001AA10000000035KVT",//张黎明
        "0001AA1000000002SLFZ",//马先虎
        "0001AA100000000557QW",//刘永帅
        "0001AA1000000003OQ40",//王策
        "0001AA1000000003T6MK",//张善庆
        "0001AA1000000003QY79",//张巍
        "0001AA1000000002W4VG",//谢朋程
        "0001AA10000000058PLI",//叶勋
        "0001AA1000000003QWKU",//魏云吉
        "0001AA1000000003JEX7",//王立
        "0001AA1000000002T2US",//聂倩
        "0001AA1000000003TD3S",//李加金
        "0001AA1000000003MVXA",//陈顺风
        "0001AA1000000003QSB9",//周永意
        "0001AA1000000003QSLC",//关凯旋
        "0001ZF10000000039C0T"
    ];
    if(tokens.indexOf(sessionStorage.token)=="-1"){
        $("#ball").hide();
    }else{
        $("#ball").show();
    }

    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    var height=document.documentElement.clientHeight-$("#tab").outerHeight()-$("#search").outerHeight()-$("#footer").outerHeight();
    $("#show").height(height);

    sessionStorage.which="mine";

    if(!sessionStorage.idName2){
        sessionStorage.idName2="bug";
    }

    //初始化数据
    $("li[name='"+sessionStorage.idName2+"']").addClass("active").siblings().removeClass("active");
    switch(sessionStorage.idName2){
        case "bug":
            $("#search input").attr("placeholder","搜索BUG名称、BUG描述、项目名称、解决人邮箱");
            break;
        case "demand":
            $("#search input").attr("placeholder","搜索需求名称、需求描述、项目名称、解决人邮箱");
            break;
    }
    //console.log(sessionStorage.token);
    load();


    $("#tab li").on("click",function(){
        var index = layer.load(2);
        var idName=$(this).attr("name");
        sessionStorage.idName2=idName;
        switch(sessionStorage.idName2){
            case "bug":
                $("#search input").attr("placeholder","搜索BUG名称、BUG描述、项目名称、解决人邮箱");
                break;
            case "demand":
                $("#search input").attr("placeholder","搜索需求名称、需求描述、项目名称、解决人邮箱");
                break;
        }
        $("div[id='"+idName+"']").show().siblings().hide().html();
        $(this).addClass("active").siblings().removeClass("active");

        //调用接口查询数据
        load();
    });

    //悬浮球
    $("#ball").on({
        "touchstart":function(){
            $(this).css({
                "transition":"right 0s"
            });
        },
        "touchmove":function(){
            var screenWidth=document.documentElement.clientWidth;
            var screenHeight=document.documentElement.clientHeight;
            var right=screenWidth-event.targetTouches[0].clientX-$(this).outerWidth(true)/2;
            var top=event.targetTouches[0].clientY-$(this).height()/2;

            if(event.targetTouches[0].clientX>screenWidth-$(this).outerWidth(true)/2){
                right=0;
            }
            if(event.targetTouches[0].clientY>screenHeight-$(this).height()/2-100){
                top=screenHeight-$(this).height()-100;
            }

            if(event.targetTouches[0].clientX<$(this).outerWidth(true)/2){
                right=screenWidth-$(this).outerWidth(true);
            }
            if(event.targetTouches[0].clientY<$(this).height()/2+130){
                top=130;
            }

            $(this).css({
                "top":top+"px",
                "right":right+"px"
            });
        },
        "touchend":function(){
            var screenWidth=document.documentElement.clientWidth;
            var screenHeight=document.documentElement.clientHeight;
            if(parseFloat($(this).css("right").split("px")[0])+$(this).outerWidth(true)/2>screenWidth/2){
                $(this).css({
                    "right":screenWidth-$(this).outerWidth(true)+"px",
                    "transition":"right 0.1s"
                });
            }else{
                $(this).css({
                    "right":"0px",
                    "transition":"right 0.1s"
                });
            }
        }
    });
});
$(function(){
    $('#show').bind('touchcancel touchend', function (e) {
        e.stopPropagation();
        var height = $(this).height();
        var scrolltop = $(this).scrollTop();
        var offsetH = $('.show').outerHeight();
        scroll();

        if (scrolltop >= offsetH - height - 50) {
            $.post(localStorage.location+"getMyData",{userId:sessionStorage.token},function(data){
                var email=data.data.email.split("@")[0];
                $('#show').unbind('scroll');
                $('.tip').hide();
                var beginindex=$(".msg").length+1;
                var params={
                    beginindex:beginindex,
                    endindex:beginindex+9,
                    param:JSON.stringify({supporttype:sessionStorage.idName2,creator:sessionStorage.token,solvername:email,search:$("#search input").val().trim()})
                };
                $.post(localStorage.location+"mydhsupports",params,function(data){
                    var idName=sessionStorage.idName2;
                    var dataLength = data.data.length;
                    var data = data.data;
                    if (dataLength == 0) {
                        $('.loading').hide();
                        $('.noMore').show();
                        $('.tip').hide()
                        setTimeout(
                            function () {
                                $('.noMore').hide();
                            }, 300
                        );
                        return false
                    } else {
                        $('.loading').show();
                        setTimeout(function () {
                            for(var i=0;i<dataLength;i++){
                                switch(idName){
                                    case "bug":
                                        var name="BUG";
                                        break;
                                    case "demand":
                                        var name="需求";
                                        break;
                                }
                                var appendStr=
                                    '<div class="msg">'+
                                    '<a href="detail.html?pk_support='+data[i].pk_support+'">'+
                                    '<p><span class="title">项目名称:</span><span class="text">'+(data[i].projectname?data[i].projectname:"")+'</span></p>'+
                                    (data[i].image1?'<i class="ti-pin-alt"></i>':'')+
                                    '<p><span class="title">'+name+'名称:</span><span class="text">'+(data[i].supportname?data[i].supportname:"")+'</span></p>'+
                                    '<span style="width: 50%;"><span class="title">大&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span><span class="text">'+(data[i].areaname?data[i].areaname:"")+'</span></span><span style="width: 50%;"><span class="title">领&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</span><span class="text">'+(data[i].field?data[i].field:"")+'</span></span>'+
                                    '<span><span class="title">录单时间:</span><span class="text">'+data[i].creationtime+'</span></span>'+
	                                '<p><span class="title">解决人:</span><span class="text">' + (data[i].namemobile ? data[i].namemobile.split("（")[0] : "暂无解决人") + '</span></p>' +
									'</a>'+
                                    (data[i].supportstatus=="已解决"?'<span class="state">'+(data[i].supportstatus?data[i].supportstatus:"")+'</span>':"")+
                                    (data[i].supportstatus=="进行中"?'<span class="state doing">'+(data[i].supportstatus?data[i].supportstatus:"")+'</span>':"")+
                                    (data[i].supportstatus=="未开始"?'<span class="state notStart">'+(data[i].supportstatus?data[i].supportstatus:"")+'</span>':"")+
                                    '<a href="change.html?pk_support='+data[i].pk_support+'" class="change">修改</a>'
                                '</div>';
                                $(".show").append(appendStr);

                            }
                            $('.loading').hide();
                        }, 300)
                    }
                });
            });
        }
    })
});
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
$(function(){
    $("#search input").on("click",function(){
        $(".cover,.back,.icon_close").show();
        $(this).css({width:"2.4rem"});
    }).on("keypress",function(event){
        if(event.keyCode=="13"){
            $("#search input").blur();
            load();
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
function load(){
    $.post(localStorage.location+"getMyData",{userId:sessionStorage.token},function(data){
        console.log(data);
        var email=data.data.email.split("@")[0];
        $(".show").html("");
        var params={
            beginindex:1,
            endindex:10,
            param:JSON.stringify({supporttype:sessionStorage.idName2,creator:sessionStorage.token,solvername:email,search:$("#search input").val().trim()})
        };
        $.post(localStorage.location+"mydhsupports",params,function(data){
            switch(sessionStorage.idName2){
                case "bug":
                    var name="BUG";
                    break;
                case "demand":
                    var name="需求";
                    break;
            }
            //console.log(data);
            $(".bugCount").html("("+(data.bugCount?data.bugCount:0)+")");
            $(".demandCount").html("("+(data.demandCount?data.demandCount:0)+")");
            var data=data.data;
            var length=data.length;
            console.log(length);
            if(!length){
                layer.alert("没有查到数据",{icon:2,closeBtn: 0});
            }else{
                for(var i=0;i<data.length;i++){
                    var appendStr=
                        '<div class="msg">'+
                        '<a href="../html/detail.html?pk_support='+data[i].pk_support+'">'+
                        '<p><span class="title">项目名称:</span><span class="text">'+(data[i].projectname?data[i].projectname:"")+'</span></p>'+
                        (data[i].image1?'<i class="ti-pin-alt"></i>':'')+
                        '<p><span class="title">'+name+'名称:</span><span class="text">'+(data[i].supportname?data[i].supportname:"")+'</span></p>'+
                        '<span style="width: 50%;"><span class="title">大&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span><span class="text">'+(data[i].areaname?data[i].areaname:"")+'</span></span><span style="width: 50%;"><span class="title">领&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</span><span class="text">'+(data[i].field?data[i].field:"")+'</span></span>'+
                        '<span><span class="title">录单时间：</span><span class="text">'+data[i].creationtime+'</span></span>'+
                        '<p><span class="title">解决人:</span><span class="text">' + (data[i].namemobile ? data[i].namemobile.split("（")[0] : "暂无解决人") + '</span></p>' +
                        '</a>'+
                        (data[i].supportstatus=="已解决"?'<span class="state">'+(data[i].supportstatus?data[i].supportstatus:"")+'</span>':"")+
                        (data[i].supportstatus=="进行中"?'<span class="state doing">'+(data[i].supportstatus?data[i].supportstatus:"")+'</span>':"")+
                        (data[i].supportstatus=="未开始"?'<span class="state notStart">'+(data[i].supportstatus?data[i].supportstatus:"")+'</span>':"")+
                        '<a href="change.html?pk_support='+data[i].pk_support+'" class="change">修改</a>'
                    '</div>';
                    $(".show").append(appendStr);
                }
                $(".cover,.back,.icon_close").hide();
                $("#search input").css({width:"2.85rem"});
            }
            layer.closeAll('loading');
        });
    });
}