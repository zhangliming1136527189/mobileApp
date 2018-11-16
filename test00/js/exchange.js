/**
 * Created by zhanglmg on 2016/10/25.
 */
$(function(){
    $(".a_add").on("click",function(){
        $.post(localStorage.location+"mobilecheckauthority",{userid:sessionStorage.token},function(data){
            if(data.status=="success"){
                window.location="add.html";
            }else if(data.status=="error"){
                window.location="sorry.html";
            }
        });
    });

    var oHeight=document.documentElement.clientHeight-$("#footer").outerHeight()-$("#exchange-header").outerHeight();
    $("#content").height(oHeight);
    $("#region-list").height(oHeight);
    //var oWidth=document.documentElement.clientWidth-$("#region-list").outerWidth();
    //$("#detail-wrap").width(oWidth-2);
    //console.log(document.documentElement.clientWidth);
    var liHeight=oHeight;
    $("#region-list ul").height(oHeight);
    $("#region-list ul li").height(liHeight/14);
    var height=$("#region-list").height();
    var liHeight=$("#region-list ul li").height();
    $("#region-list ul li").css({"lineHeight":liHeight+"px"});
    $("#detail-wrap").height(height);
    var provideHeight=$("#detail-wrap").height()-$("#detail-needs").outerHeight()
    $("#detail-provide").innerHeight(provideHeight);
    var provideListh=$("#detail-provide").innerHeight()-$("#provide-title").height();
    $("#provide-list").height(provideListh);
    /*var titleHeight=$("#region-title").height();
    $("#detail-name").height(titleHeight);*/
    var needsHeight=$("#detail-needs").innerHeight()-$("#needs-title").outerHeight()
    $("#needs-content").height(needsHeight-4);

    init();

    $("#region-list ul li").bind("click",function(){
        $(this).css({"background":"#fff","color":"#00a1ea"}).siblings().css({"background":"#00a1ea","color":"#fff"});
        console.log($(this).text())
        if($(this).text()=="深圳、海外"){
                 var params = {
                 "areaname":"深圳"
                 };
                 $.post(localStorage.location+"getuserrequirebyarea", params, function (data) {

                 draw(data)
                 });
        }else{
                 var params = {
                 "areaname":$(this).text()
                 };
                 $.post(localStorage.location+"getuserrequirebyarea", params, function (data) {

                 draw(data)
                 });
        }

    })
});
function draw(args){
    console.log(args.data)
    $("#provide-title").html("");
    $("#detail-provide ul").html("");
    $("#needs-content").html("");
    if(args.data.requirement){
        $("#provide-title").html("政委 "+args.data.managername+" 可提供人员：");
        console.log(args.data);
        var user=args.data.userrequire.split(";");
        console.log(user);
        for(var i=0;i<user.length;i++){
            var oRegin=user[i].split("+")[2].split(",");
            var appendStr="<li><p>人员"+(i+1)+"擅长领域：</p><p class='region'><span></span>";
            for(var j=0;j<oRegin.length;j++){
                appendStr+="<span>"+oRegin[j]+"</span>";
            }
            appendStr+="</p></li>";
            $("#detail-provide ul").append(appendStr);
        }
        $("#needs-content").html(args.data.requirement.replace(/~@~@~/g,"<br/>"));
        var provideListh=$("#detail-provide").innerHeight()-$("#provide-title").height();
        $("#provide-list").height(provideListh);
    }else{
        $("#needs-content").html("当前大区无需求");
        $("#detail-provide ul").append("<li style='border:0;margin-top:20px;text-indent:2em;font-size:0.16rem;'>当前大区无数据</li>");
    }



}
function init() {
    console.log("北京")
    var params = {
        "areaname":"北京"
    };
    $.post(localStorage.location+"getuserrequirebyarea", params, function (data) {

        draw(data)
    });
}