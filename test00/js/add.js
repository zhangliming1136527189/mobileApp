/**
 * Created by liyxt on 2016/10/9.
 */
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,'');
};
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
    var height=document.documentElement.clientHeight-$("#footer").outerHeight()-$("#tab").outerHeight();
    $("#add .list").height(height);
    var height=document.documentElement.clientHeight-$("#footer").outerHeight();
    $("#add").height(height);

    if(!sessionStorage.idName3){
        sessionStorage.idName3="bug";
    }

    //记录用户上次添加的是BUG还是需求
    $("li[name='"+sessionStorage.idName3+"']").addClass("active").siblings().removeClass("active");
    $("li[name='"+sessionStorage.idName3+"']").find("input").attr("checked","checked");
    switch(sessionStorage.idName3){
        case "bug":
            $("span.supportname").html("BUG名称:");
            $("span.description").html("BUG描述:");
            $(".time").html("小时");
            break;
        case "demand":
            $("span.supportname").html("需求名称:");
            $("span.description").html("需求描述:");
            $(".time").html("人/天");
    }

    //记录用户上次添加的大区、项目、领域
    if(sessionStorage.areaname){
        $("[name='areaname']").val(sessionStorage.areaname);
    }
    if(sessionStorage.projectname){
        $("[name='projectname']").val(sessionStorage.projectname);
    }
    if(sessionStorage.field){
        $("[name='field']").val(sessionStorage.field);
    }

    //大区-项目的二级联动
    $.post(localStorage.location+"getdhprojectname",{areaname:$("[name='areaname']").val()},function(data){
        $("[name='projectname']").html("");
        var data=data.data;
        if(!data.length){
            $("[name='projectname']").append("<option value='无'>此大区无项目</option>");
        }else{
            for(var i=0;i<data.length;i++){
                $("[name='projectname']").append("<option value='"+data[i]+"'>"+data[i]+"</option>");
            }
        }
    });

    //获取当前登录人的姓名，并赋值给录单人字段
    $.post(localStorage.location+"getMyData",{userId:sessionStorage.token},function(data){
        var name=data.data.username;
        $("input[name='creatorname']").val(name).prev(".text").html(name);
    });

    //准备将token传入后台
    $("input[name='creator']").val(sessionStorage.token);

    //输入解决人的邮箱时，实时查询解决人的姓名和电话
    $("input[name='solvername']").on("input",function(){
        $.post(localStorage.location+"getdhusernameandmobile",{solvername:$("input[name='solvername']").val().trim()},function(data){
            if(data.data){
                $(".tips").html(data.data).css("color","dodgerblue");
            }else{
                if($("input[name='solvername']").val()){
                    $(".tips").html("查无此人").css("color","red");
                }else{
                    $(".tips").html("");
                }
            }
        });
    });

    //选择大区时，项目进行相应的变化
    $("[name='areaname']").change(function(){
        var val=$(this).val();
        $.post(localStorage.location+"getdhprojectname",{areaname:val},function(data){
            $("[name='projectname']").html("");
            var data=data.data;
            if(!data.length){
                $("[name='projectname']").append("<option value='无'>此大区下无项目</option>");
            }else{
                for(var i=0;i<data.length;i++){
                    $("[name='projectname']").append("<option value='"+data[i]+"'>"+data[i]+"</option>");
                }
            }
        });
    });

    //点击页签，已填字段清空，字段名称变化
    $("#tab li").on("click",function(){
        //状态清空
        $("input[name='solvername'],input[name='supportname'],input[name='description'],input[name='plantime'],input[name='finishtime'],input[name='actualtime'],input[name='image1'],input[name='image2'],input[name='image3']").val("");
        $("textarea").val("");
        $(".tips").html("");

        $(".img-box").remove();
        $("#upload").show();

        var id=$(this).find("label").attr("for");
        sessionStorage.idName3=$(this).find("input").val();
        $("input[type='radio'][id='"+id+"']").check=true;
        if(id=='bug'){
            $(".supportname").html("BUG名称:");
            $(".description").html("BUG描述:");
            $(".time").html("小时");
        }else if(id=='need'){
            $(".supportname").html("需求名称:");
            $(".description").html("需求描述:");
            $(".time").html("人/天");
        }
        $("input[type='radio']:checked").closest("li").addClass("active").siblings().removeClass("active");
    });

    //限制textarea输入字符长度
    $("[name='supportname']").on("input",function(){
        if($(this).val().length>=20){
            $(this).val($(this).val().substring(0,20));
        }
    });
    $("[name='description']").on("input",function(){
        if($(this).val().length>=400){
            $(this).val($(this).val().substring(0,400));
        }
    });

    //清空计划完成日期
    $(".close").on("click",function(){
        $("#finishtime").val("");
    });

    //点击提交按钮
    $(".button").on("click",function(){
        //判断当前的type
        switch($("[name='supporttype']:checked").val()){
            case "bug":
                var name="BUG";
                break;
            case "demand":
                var name="需求";
                break;
        }

        //非空校验
        var arr2=/^\s*$/;
        if(arr2.test($("[name='supportname']").val())){
            layer.alert(name+"名称不能为空！",{icon:7,closeBtn: 0});
            return 0;
        }
        if(arr2.test($("[name='description']").val())){
            layer.alert(name+"描述不能为空！",{icon:7,closeBtn: 0});
            return 0;
        }

        //数字校验
        var arr = /^\+?[0-9][0-9]?(\.[0-9])?$/;
        var text1 = $("input[name='plantime']").val();
        var text2 = $("input[name='actualtime']").val();
        var text3 = $("input[name='overtime']").val();

        if(!arr.test(text1) || parseFloat(text1)==0){
            layer.alert("计划用时：请输入可带一位小数的浮点数!",{icon:7,closeBtn: 0});
            return 0;
        }
        if(text2){
            if(!arr.test(text2) || parseFloat(text2)==0){
                layer.alert("实际用时：请输入可带一位小数的浮点数!",{icon:7,closeBtn: 0});
                return 0;
            }
        }
        if(text3){
            if(!arr.test(text3) || parseFloat(text3)==0){
                layer.alert("加班用时：请输入可带一位小数的浮点数!",{icon:7,closeBtn: 0});
                return 0;
            }
        }

        //文字长度校验
        if($("[name='supportname']").val().length>20){
            layer.alert(name+"名称不能超过20个字（一个汉字/英文字母算一个字）",{icon:7,closeBtn: 0});
            return 0;
        }
        if($("[name='description']").val().length>400){
            layer.alert(name+"描述不能超过400个字（一个汉字/英文字母算一个字）",{icon:7,closeBtn: 0});
            return 0;
        }

        //解决人字段校验
        if(($("[name='solvername']").val()!="")&&($(".tips").html()=="查无此人")){
            layer.alert("请输入正确的解决人！",{icon:7,closeBtn: 0});
            return 0;
        }

        //项目非空校验
        if($("[name='projectname']").val()=="无"){
            layer.alert("此大区无项目，不能提交！",{icon:7,closeBtn: 0});
            return 0;
        }
        var params={
            supporttype:$("[name='supporttype']:checked").val(),
            areaname:$("[name='areaname']").val(),
            projectname:$("[name='projectname']").val(),
            field:$("[name='field']").val(),
            creator:$("[name='creator']").val(),
            creatorname:$("[name='creatorname']").val(),
            solvername:$("[name='solvername']").val().trim(),
            supportname:$("[name='supportname']").val().trim(),
            description:$("[name='description']").val().replace(/\n/g,'~@~@~').trim(),
            plantime:$("[name='plantime']").val().trim(),
            finishtime:$("[name='finishtime']").val().trim(),
            actualtime:$("[name='actualtime']").val().trim(),
            overtime:$("[name='overtime']").val().trim(),
            image1:$("[name='image1']").val(),
            image2:$("[name='image2']").val(),
            image3:$("[name='image3']").val(),
            namemobile:$(".tips").html()
        };

        //记录本次的type、大区、项目、领域，下次添加时默认
        switch($("[name='supporttype']:checked").val()){
            case "bug":
                sessionStorage.idName="bug";
                break;
            case "demand":
                sessionStorage.idName="demand";
                break;
        }
        sessionStorage.areaname=params.areaname;
        sessionStorage.projectname=params.projectname;
        sessionStorage.field=params.field;
        //console.log(params);
        $.post(localStorage.location+"adddhsupport",params,function(data){
            if(data.status=='success'){
                layer.alert("添加成功！",{icon:1,closeBtn: 0},function(index){
                    window.location.href="../index.html";
                    layer.close(index);
                });
            }else if(data.status=='error'){
                layer.alert("添加失败！",{icon:2,closeBtn: 0});
                return 0;
            }
        });
    });

    //日期选择插件
    var opt_date = {
        preset: 'date', //日期date
        theme: 'default', //皮肤样式
        dateFormat: 'yy-mm-dd', // 日期格式
        setText: '确定', //确认按钮名称
        cancelText: '取消', //取消按钮
        dateOrder: 'yymmdd', //面板中日期排列格式
        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
    };
    $('#finishtime').mobiscroll(opt_date)
});
$(function(){//上传图片
    connectWebViewJavascriptBridge(function (YonYouJSBridge) {
        YonYouJSBridge.init(function (message, responseCallback) {
            //console.log('init bridge');
        });
    });

    connectWebViewJavascriptBridge(function (YonYouJSBridge) {
        //alert(YonYouJSBridge);
        var data = {
            function: 'selectAttachment',
            parameters: {
                'type': 1,
                'maxselectnum' : 3//最大可选择照片数量
            }
        };

        var imgBig = [];
        $('#upload').click(function (){
            //if($(".img-box").length==0){
            //    imgBig = [];
            //}
            var length=imgBig.length;
            data.parameters.maxselectnum=3-length;
            YonYouJSBridge.send(JSON.stringify(data), function (responseData) {
                var imgInfo = JSON.parse(responseData);
                var dataImg = imgInfo.data;

//              上传图片数量
                var n = 3;
//              上传图片限制
                for(var i = 0;i<dataImg.length;i++){
                    var length=$(".img-box").length;
                    imgBig.push(dataImg[i].path);
                    $('.img-chose').append(
                        '<div class="img-box">' +
                        '<img src="'+imgBig[length]+'.square.thumb.jpg" alt="" id="img'+(length+1)+'" style="width:50px;"/>' +
                        '</div>'
                    );
                    $("input[name='image"+(length+1)+"']").val(imgBig[length]);
                }
                if($(".img-box").length==3){
                    $("#upload").hide();
                }else{
                    $("#upload").show();
                }
                $(".img-box").off("click")
                //图片删除功能
                $(".img-box").on("click",function(){
                    var _this=this;
                    layer.confirm("是否要删除这张照片？",{icon:3},function(index1){
                        var index=$(_this).index();
                        //删除的这张图片之后的图片依次向前移一位
                        for(var i=index;i<imgBig.length-1;i++){
                            imgBig[i]=imgBig[i+1];
                            $("input[name='image"+(i+1)+"']").val(imgBig[i]);
                        }
                        $("input[name='image"+imgBig.length+"']").val("");
                        imgBig.pop();
                        //从3张删到2张时，显示+号
                        if(imgBig.length==2){
                            $('.upload').css('display','inline-block');
                        }
                        //移除该图片所在的div
                        $(_this).remove();
                        layer.close(index1);
                    })
                });

            });
        });
    });
});
function connectWebViewJavascriptBridge(callback){
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge);
        }, false);
    }
}