/**
 * Created by liyxt on 2016/10/25.
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

    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    var height=document.documentElement.clientHeight-$("#footer").outerHeight();
    $("#userRequirement").height(height);

    $.post(localStorage.location+"getMyData",{userId:sessionStorage.token},function(data){
        sessionStorage.creatorname=data.data.username;
    });

    $(".detail").on("input",function(){
        if($(this).val().length>100){
            $(this).val($(this).val().substring(0,100));
        }
    });

    var appendStr=$(".userInfo").html();
    //$(".userInfo").remove();
    onEvent();

    $(".add").on("click",function(){
        $("#main").append("<div class='userInfo'>"+appendStr+"</div>");
        var length=$(".userInfo").length-1;
        $("#main .userInfo:eq("+length+")").find(".person").html("人员"+(length+1));
        onEvent();
    });

    var area="";
    switch(sessionStorage.token){
        case "0001AA1000000002SJKD":
            area="北京";
            break;
        case "0001AA1000000003JEZ3":
            area="上海";
            break;
        case "0001AA1000000003NFHK":
            area="深圳";
            break;
        case "0001AA1000000003NFIG":
            area="浙江区";
            break;
        case "0001AA1000000003NFJI":
            area="苏皖区";
            break;
        case "0001AA1000000003LBOL":
            area="华南区";
            break;
        case "0001AA1000000003JEY5":
            area="福建区";
            break;
        case "0001AA1000000003M67Z":
            area="华中区";
            break;
        case "0001AA1000000003M688":
            area="西南区";
            break;
        case "0001AA1000000003JEX7":
            area="西北区";
            break;
        case "0001AA1000000002W4LY":
            area="津冀区";
            break;
        case "0001AA1000000003NFK2":
            area="东北区";
            break;
        case "0001AA1000000003BBXN":
            area="山东区";
            break;
        case "0001AA1000000003JMA9":
            area="央本-军工";
            break;
        case "0001ZF10000000039C0T"://李艺轩测试环境
            area="东北区";
            break;
        case "0001AA1000000002TYU1"://王伟
            area="北京";
            break;
        case "0001AA1000000002W4SU"://李洪鹏
            area="深圳";
            break;
        case "0001AA10000000037SVQ"://董跃龙
            area="津冀区";
            break;
        case "0001AA100000000393LB"://王少华
            area="央本-军工";
            break;
        case "0001AA10000000034SQ6"://李艺轩
            area="东北区";
            break;
        case "0001AA10000000030R77"://高昆
            area="山东区";
            break;
        case "0001AA1000000002ZJG0"://迟明
            area="浙江区";
            break;
        case "0001AA10000000035KVT"://张黎明
            area="苏皖区";
            break;
        default:
    }
    $.post(localStorage.location+"getuserrequirebyarea",{areaname:area},function(data){
        console.log(data);
        if(data.status=="success"){
            var userrequire=data.data.userrequire;
            if(userrequire){
                $(".detail").val(data.data.requirement.replace(/~@~@~/g,"\n"));
                $(".userInfo").remove();
                var users=userrequire.split(";");
                users.map(function(user,i){
                    console.log(user);
                    console.log(i);
                    var appendString='<div class="userInfo">'+appendStr+'</div>';
                    var info=user.split("+");
                    $("#main").append(appendString);
                    $("#main .userInfo:eq("+i+")").find(".person").html("人员"+(i+1));
                    $("#main .userInfo:eq("+i+")").find(".clickMe p").hide();
                    info[2].split(",").map(function(field){
                        var fieldStr="<span class='field active'>"+field+"</span>";
                        $("#main .userInfo:eq("+i+")").find("#field").append(fieldStr);
                        $("#main .userInfo:eq("+i+")").find("#fieldList .field[name='"+field+"']").addClass("active");

                    });
                });
                onEvent();
            }
        }else{
            alert("后台报错啦！");
        }
        return 0;
    });
    $(".button").on("click",function(){
        if($(".userInfo").length!=0&&$(".detail").val()==""){
            layer.alert("需求详情不能为空!",{icon:7,closeBtn: 0});
            return 0;
        }
        for(var i=0;i<$(".userInfo").length;i++){
            if($(".userInfo:eq("+i+") #field").html()==""){
                layer.alert("擅长领域不能为空!",{icon:7,closeBtn: 0});
                return 0;
            }
        }

        if($(".detail").val().length>100){
            layer.alert("最多输入100个字!",{icon:7,closeBtn: 0});
            return 0;
        }
        var infoStr="";
        $(".userInfo").each(function(){
            var fieldStr="";
            $(this).find("#field .field").each(function(){
                if(fieldStr==""){
                    var sep="";
                }else{
                    var sep=",";
                }
                fieldStr+=sep+$(this).html();
            });
            if(infoStr==""){
                var sep="";
            }else{
                var sep=";";
            }
            infoStr+=sep+$(this).find(".user").val()+"+"+$(this).find(".tips").html()+"+"+fieldStr;
        });
        var params={
            "areaname":area,
            "pk_manager":sessionStorage.token,
            "managername":sessionStorage.creatorname,
            "requirement":$(".detail").val().replace(/\n/g,'~@~@~').trim(),
            "userrequire":infoStr
        };
        console.log(params);
        $.post(localStorage.location+"saveuserrequire",params,function(data){
            if(data.status=='success'){
                layer.alert("添加成功！",{icon:1,closeBtn: 0},function(index){
                    window.location.href="exchange.html";
                    layer.close(index);
                });
            }else if(data.status=='error'){
                layer.alert("添加失败！",{icon:2,closeBtn: 0});
                return 0;
            }
        });
    });
});
function onEvent(){
    $(".clickMe").off("click").on("click",function(){
        var _this=$(this);
        $(this).closest("div").find("#fieldList .field").off("click").on("click",function(){
            $(this).toggleClass("active");
        });
        layer.open({
            title:["选择擅长领域","background-color:rgb(46, 141, 237);color:#fff;"],
            type: 1,
            skin: '',
            closeBtn: 0,
            shift: 0,
            shadeClose: true,
            content:_this.closest("div").find("#fieldList"),
            btn:['完成','取消'],
            yes:function(index){
                var str="";
                _this.closest("div").find("#fieldList .field.active").each(function(){
                    str+='<span class="field active">'+$(this).html()+'</span>';
                });
                _this.closest("div").find("#field").html("").append(str);
                $("#field .field").off("click");
                if(_this.closest("div").find("#field .field").length){
                    _this.find("p").hide();
                }else{
                    _this.find("p").show();
                }
                layer.close(index);
            }
        });
    });
    $(".userInfo .del").off("click").on("click",function(){
        var _this=$(this);
        layer.confirm("要删除这条记录吗？",{icon: 3, title:'提示'},function(index){
            _this.closest("div").remove();
            $(".userInfo").map(function(i,ele){
                $(ele).find(".person").html("人员"+(i+1));
            });
            layer.close(index);
        })
    });
}
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,'');
};

