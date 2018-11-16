/**
 * Created by zhanglmg on 2017/9/22.
 */
$(function () {
    //localStorage.location = 'https://ncapp.yyuap.com/fiwechat/';
    $(".a_add").on("click",function(){
        $.post(localStorage.location+"mobilecheckauthority",{userid:sessionStorage.token},function(data){
            if(data.status=="success"){
                window.location="add.html";
            }else if(data.status=="error"){
                window.location="sorry.html";
            }
        });
    });
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    var height=document.documentElement.clientHeight-$("#footer").outerHeight();
    $("#studyMain").height(height);
    //localStorage.location = "219.141.185.24:9082";
    init();
});

function draw(args) {
    var datas=args.data;
     var ranking=[];
     for(var i=0;i<datas.length;i++){
     ranking[i]=[datas[i].projectname,datas[i].bugcnt,datas[i].bugtime,datas[i].demandcnt,datas[i].demandtime,datas[i].totaltime];
     }
     ranking.sort(function(a,b){
     return b[5]-a[5];
     });
    $("#table").html("");
    $("#table").append("<div class='classify'><table border='1' cellspacing='0' cellpadding='0'><tr><td class='classify_A'>项目名称</td><td class='classify_B'>已解决Bug数</td><td class='classify_C'>Bug解决用时</td><td class='classify_D'>已解决需求数</td><td class='classify_E'>需求解决用时</td><td class='classify_F'>总用时</td></tr></table></div>");
    $("#table").append("<div class='tableMain'><table id='categories' border='1' cellspacing='0' cellpadding='0' style='background:#e9eaec;border-color:#fefefe'></table></div>")
    if(ranking.length>=20){
        for (var j = 0; j < 20; j++) {
            $("#table #categories").append("<tr id='" + j + "'><td class=\"tablerow\">"+ranking[j][0]+"</td><td id='tableNumber'>"+ranking[j][1]+"</td><td>"+ranking[j][2]+"</td><td>"+ranking[j][3]+"</td><td>"+ranking[j][4]+"</td><td>"+ranking[j][5]+"</td></tr>");
            $(".classify_F").css({background:"url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"})
        };
    }else{
        for (var j = 0; j < ranking.length; j++) {
            $("#table #categories").append("<tr id='" + j + "'><td class=\"tablerow\">"+ranking[j][0]+"</td><td id='tableNumber'>"+ranking[j][1]+"</td><td>"+ranking[j][2]+"</td><td>"+ranking[j][3]+"</td><td>"+ranking[j][4]+"</td><td>"+ranking[j][5]+"</td></tr>");
            $(".classify_F").css({background:"url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"})
        };
    }
    $(".classify td").outerHeight(36);
    var oHeight=$("#studyMain").height();
    $("#figure").height(oHeight);
    $("#table").height(oHeight);
    var height=oHeight-$(".classify").height();
    $(".tableMain").height(height);
    var i=0;
    var start,now,end;
    $(".tableMain").bind("touchstart",function(e){
        if($(".tableMain").scrollTop() >= $(".tableMain table").height() - $(".tableMain").height()-1){
            start=e.touches[0].clientY;
        }
    })
    $(".tableMain").bind("touchmove",function(e){
        now=e.touches[0].clientY;
        if (start-now>5 && $(".tableMain").scrollTop() >= $(".tableMain table").height() - $(".tableMain").height()-1){
            //这时触发touchend
            e.preventDefault();
        }
    })
    $(".tableMain").bind("touchend",function(e){
        end=e.changedTouches[0].clientY;
        if (start-end>5 && $(".tableMain").scrollTop() >= $(".tableMain table").height() - $(".tableMain").height()-1) {
            i=i+1;
            addData(i,ranking)
        }
    })
    /*$(".tableMain").bind("scroll",function(){
        if($(".tableMain").scrollTop()+$(".tableMain").outerHeight()>=($("#table table").outerHeight()-10)){
            i=i+1;
            addData(i,ranking)
        }

    });*/
    var styleC=true;
    var styleD=true;
    var styleB=true;
    var styleE=true;
    var styleF=true;
    $(".classify_C").on("click",function(){
        styleC=!styleC;
        $(".classify_D").css({backgroundImage:"none"});
        $(".classify_B").css({backgroundImage:"none"});
        $(".classify_E").css({backgroundImage:"none"});
        $(".classify_F").css({backgroundImage:"none"});
        if(styleC==true){
            $(".classify_C").css({background:"url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"})
            tableSort("c",styleC,ranking);
        }else{
            $(".classify_C").css({background:"url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"});
            tableSort("c",styleC,ranking);
        }

    });
    $(".classify_B").on("click",function(){
        styleB=!styleB;
        $(".classify_C").css({backgroundImage:"none"});
        $(".classify_D").css({backgroundImage:"none"});
        $(".classify_E").css({backgroundImage:"none"});
        $(".classify_F").css({backgroundImage:"none"});
        if(styleB==true){
            $(".classify_B").css({background:"url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"})

            tableSort("b",styleB,ranking);
        }else{
            $(".classify_B").css({background:"url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"});
            tableSort("b",styleB,ranking);
        }

    });
    $(".classify_D").on("click",function(){
        styleD=!styleD;
        $(".classify_C").css({backgroundImage:"none"});
        $(".classify_B").css({backgroundImage:"none"});
        $(".classify_E").css({backgroundImage:"none"});
        $(".classify_F").css({backgroundImage:"none"});
        if(styleD==true){
            $(".classify_D").css({background:"url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"})
            tableSort("d",styleD,ranking);
        }else{
            $(".classify_D").css({background:"url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"});
            tableSort("d",styleD,ranking);
        }

    });
    $(".classify_E").on("click",function(){
        styleE=!styleE;
        $(".classify_C").css({backgroundImage:"none"});
        $(".classify_B").css({backgroundImage:"none"});
        $(".classify_D").css({backgroundImage:"none"});
        $(".classify_F").css({backgroundImage:"none"});
        if(styleE==true){
            $(".classify_E").css({background:"url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"})
            tableSort("e",styleE,ranking);
        }else{
            $(".classify_E").css({background:"url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"});
            tableSort("e",styleE,ranking);
        }

    });
    $(".classify_F").on("click",function(){
        styleF=!styleF;
        $(".classify_C").css({backgroundImage:"none"});
        $(".classify_B").css({backgroundImage:"none"});
        $(".classify_D").css({backgroundImage:"none"});
        $(".classify_E").css({backgroundImage:"none"});
        if(styleF==true){
            $(".classify_F").css({background:"url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"})
            tableSort("f",styleF,ranking);
        }else{
            $(".classify_F").css({background:"url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",backgroundSize:"13% 41%"});
            tableSort("f",styleF,ranking);
        }

    });
};
function tableSort(type,style,ranking){
    if(style==true){
        switch(type){
            case "b":
                var sortFun=function(a,b){
                    return a[1]-b[1];
                };
                break;
            case "c":
                var sortFun=function(a,b){
                    return a[2]-b[2];
                };
                break;
            case "d":
                var sortFun=function(a,b){
                    return a[3]-b[3];
                };
                break;
            case "e":
                var sortFun=function(a,b){
                    return a[4]-b[4];
                };
                break;
            case "f":
                var sortFun=function(a,b){
                    return a[5]-b[5];
                };
                break;
        }
    }else{
        switch(type){
            case "b":
                var sortFun=function(a,b){
                    return b[1]-a[1];
                };
                break;
            case "c":
                var sortFun=function(a,b){
                    return b[2]-a[2];
                };
                break;
            case "d":
                var sortFun=function(a,b){
                    return b[3]-a[3];
                };
                break;
            case "e":
                var sortFun=function(a,b){
                    return b[4]-a[4];
                };
                break;
            case "f":
                var sortFun=function(a,b){
                    return b[5]-a[5];
                };
                break;
        }
    };
    ranking.sort(sortFun);
    $("#categories").html("");
    if(ranking.length>=20){
        for(var i=0;i<20;i++ ){
            $("#categories").append("<tr id='" + i + "'><td class=\"tablerow\">"+ranking[i][0]+"</td><td id='tableNumber'>"+ranking[i][1]+"</td><td>"+ranking[i][2]+"</td><td>"+ranking[i][3]+"</td><td>"+ranking[i][4]+"</td><td>"+ranking[i][5]+"</td></tr>");
        };
    }else{
        for(var i=0;i<ranking.length;i++ ){
            $("#categories").append("<tr id='" + i + "'><td class=\"tablerow\">"+ranking[i][0]+"</td><td id='tableNumber'>"+ranking[i][1]+"</td><td>"+ranking[i][2]+"</td><td>"+ranking[i][3]+"</td><td>"+ranking[i][4]+"</td><td>"+ranking[i][5]+"</td></tr>");
        };
    }
    var i=0;
    var start,now,end;
    $(".tableMain").bind("touchstart",function(e){
        if($(".tableMain").scrollTop() >= $(".tableMain table").height() - $(".tableMain").height()-1){
            start=e.touches[0].clientY;
        }
    })
    $(".tableMain").bind("touchmove",function(e){
        now=e.touches[0].clientY;
        if (start-now>5 && $(".tableMain").scrollTop() >= $(".tableMain table").height() - $(".tableMain").height()-1){
            //这时触发touchend
            e.preventDefault();
        }
    })
    $(".tableMain").bind("touchend",function(e){
        end=e.changedTouches[0].clientY;
        if (start-end>5 && $(".tableMain").scrollTop() >= $(".tableMain table").height() - $(".tableMain").height()-1) {
            i=i+1;
            addData(i,ranking)
        }
    })
}
function addData(s,ranking){
    var len=ranking.length;
    var o=(len-20)/10;
    var num=parseInt(o);
    var numPoint=(len-20)%10;
    if(((s-1)*10+20+numPoint)<=len){
         if((s*10+20)<=len){
             for(var j=20+(s-1)*10;j<30+(s-1)*10;j++){
                 $("#categories").append("<tr id='" + j + "'><td class=\"tablerow\">"+ranking[j][0]+"</td><td id='tableNumber'>"+ranking[j][1]+"</td><td>"+ranking[j][2]+"</td><td>"+ranking[j][3]+"</td><td>"+ranking[j][4]+"</td><td>"+ranking[j][5]+"</td></tr>");
             }
         }else{
             for(var j=20+(s-1)*10;j<len;j++){
                 $("#categories").append("<tr id='" + j + "'><td class=\"tablerow\">"+ranking[j][0]+"</td><td id='tableNumber'>"+ranking[j][1]+"</td><td>"+ranking[j][2]+"</td><td>"+ranking[j][3]+"</td><td>"+ranking[j][4]+"</td><td>"+ranking[j][5]+"</td></tr>");
             }
         }
    }else{
        if((num+2)==s){
            layer.msg('已加载全部数据');
        }
        return;
    };
}
function init() {
    var params = "";
    $.post(localStorage.location+"timeAndCountByProject", params, function (data) {
        if(data.status=="success"){
            draw(data);
        }else{
           $("#table").append("<h2>暂无数据</h2>")
        }
    });
}
function sleep(numberMillis){
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}


