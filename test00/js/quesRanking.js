/**
 * Created by zhanglmg on 2016/10/18.
 */
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
    var width=($("#tab-type-inner").width()-2)/3;
    $("#tab-type-inner div").width(width);
    init();
    $("#bug,#all,#demand-amount").bind("click",function(){
        $(this).css({"background":"#fff","color":"#00a2e8"}).siblings().css({"background":"#00a2e8","color":"#fff"})
    });
    //查看Bug
    $("#bug").on("click",function(){
        $("#ranking-content ul").html("");
        $("#total").css({"border-bottom":"3px solid #00a2e8"}).siblings().css({"border-bottom":"3px solid #fff"});
        sessionStorage.supporttype = "bug";
        sessionStorage.typeparam = "count";
        var params = {
            "supporttype": "bug",
            "typeparam":"count",
            "timeparam":"total"
        };
        $.post(localStorage.location + "rankbysovler", params, function (data) {
            draw(data)
        });
    })
    //查看需求个数
    $("#demand-amount").on("click",function(){
        $("#ranking-content ul").html("");
        $("#total").css({"border-bottom":"3px solid #00a2e8"}).siblings().css({"border-bottom":"3px solid #fff"})

        sessionStorage.supporttype = "demand";
        sessionStorage.typeparam = "count";
        var params = {
            "supporttype": "demand",
            "typeparam":"count",
            "timeparam":"total"
        };
        $.post(localStorage.location + "rankbysovler", params, function (data) {
            draw(data)
        });
    });
    //查看个人总数
    $("#all").on("click",function(){
        $("#ranking-content ul").html("");
        $("#total").css({"border-bottom":"3px solid #00a2e8"}).siblings().css({"border-bottom":"3px solid #fff"})
        sessionStorage.supporttype = "all";
        sessionStorage.typeparam = "count";
        var params = {
            "supporttype": "all",
            "typeparam":"count",
            "timeparam":"total"
        };
        $.post( localStorage.location + "rankbysovler", params, function (data) {
            draw(data)
        });
    })
    //查看累计
    $("#total").bind("click",function(){
        $("#ranking-content ul").html("");
        $("#total").css({"border-bottom":"3px solid #00a2e8"}).siblings().css({"border-bottom":"3px solid #fff"});
        sessionStorage.timeparam = "total";
        var params = {
            "supporttype": sessionStorage.supporttype,
            "typeparam":"count",
            "timeparam":"total"
        };
        $.post(localStorage.location + "rankbysovler", params, function (data) {

            draw(data)
        });

    });
    //查看周
    $("#week").bind("click",function(){
        $("#ranking-content ul").html("");
        $("#week").css({"border-bottom":"3px solid #00a2e8"}).siblings().css({"border-bottom":"3px solid #fff"});

        var params = {
            "supporttype": sessionStorage.supporttype,
            "typeparam":"count",
            "timeparam":"week"
        };
        $.post(localStorage.location+"rankbysovler", params, function (data) {
            draw(data)
        });
    });
    //查看月
    $("#month").bind("click",function(){
        $("#ranking-content ul").html("");
        $("#month").css({"border-bottom":"3px solid #00a2e8"}).siblings().css({"border-bottom":"3px solid #fff"});

        var params = {
            "supporttype": sessionStorage.supporttype,
            "typeparam":"count",
            "timeparam":"month"
        };
        $.post(localStorage.location+"rankbysovler", params, function (data) {

            draw(data)
        });
    })
});
function draw(args) {
    /*console.log(args);*/
    /*console.log(args.data);
     console.log(args.data[0]);*/
    var data = args.data
    for (var i = 0; i < data.length; i++) {

        if (i >= 0 && i <= 2) {
            if(i==0){
                $("#ranking-content ul").append("<li><span><img src=\"../img/icon_first.png\"/></span><span>" + data[i][0] + "</span><span>" + data[i][1] + "个</span></li>")

            }else if(i==1){
                $("#ranking-content ul").append("<li><span><img src=\"../img/icon_second.png\"/></span><span>" + data[i][0] + "</span><span>" + data[i][1] + "个</span></li>")

            }else if(i==2){
                $("#ranking-content ul").append("<li><span><img src=\"../img/icon_third.png\"/></span><span>" + data[i][0] + "</span><span>" + data[i][1] + "个</span></li>")

            }

        } else {
            if (i % 2 == 0) {
                $("#ranking-content ul").append("<li><span style='font-size:0.18rem;color:#FF9900'>" + (i + 1) + ".</span><span>" + data[i][0] + "</span><span>" + data[i][1] + "个</span></li>")

            } else {
                $("#ranking-content ul").append("<li><span style='font-size:0.18rem;color:#FF9900'>" + (i + 1) + ".</span><span>" + data[i][0] + "</span><span>" + data[i][1] + "个</span></li>")

            }


        }


    }
}
function init() {
        sessionStorage.supporttype = "all";
    sessionStorage.typeparam = "count";
    var params = {
        "supporttype": "all",
        "typeparam":"count",
        "timeparam":"total"
    };
    $.post(localStorage.location+"rankbysovler", params, function (data) {

        draw(data)
    });
}
