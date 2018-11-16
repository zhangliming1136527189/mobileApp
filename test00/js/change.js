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
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    var height=document.documentElement.clientHeight-$("#footer").outerHeight();
    $("#change").height(height);


    //获取问题id
    var pk_support=window.location.search.split("pk_support=")[1];
    $("input[name='pk_support']").val(pk_support);

    //获取当前登录人信息，存入修改人字段
    $.post(localStorage.location+"getMyData",{userId:sessionStorage.token},function(data){
        var name=data.data.username;
        $("input[name='modifier']").val(sessionStorage.token).prev(".text").html(name);
        $("input[name='modifiername']").val(name);
    });

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

    //查询此条记录的信息，并显示出来
    var params={
        beginindex:1,
        endindex:1,
        param:JSON.stringify({pk_support:pk_support})
    };
    $.post(localStorage.location+"alldhsupports",params,function(data){
        var data=data.data[0];
        //console.log(data);
        sessionStorage.type=data.supporttype;

        //根据type修改字段名称
        switch(data.supporttype){
            case "bug":
                $("textarea[name='supportname']").prev("span").html("BUG名称");
                $("textarea[name='description']").prev("span").html("BUG描述");
                $("input[name='plantime']").next("span").html("小时");
                $("input[name='actualtime']").next("span").html("小时");
                break;
            case "demand":
                $("textarea[name='supportname']").prev("span").html("需求名称");
                $("textarea[name='description']").prev("span").html("需求描述");
                $("input[name='plantime']").next("span").html("人/天");
                $("input[name='actualtime']").next("span").html("人/天");
                break;
        }

        //如果各个字段有值，初始化
        if(data.supportname){
            $("[name='supportname']").val(data.supportname);
        }
        if(data.description){
            $("textarea[name='description']").html(data.description.replace(/~@~@~/g,"\n"));
        }
        if(data.plantime){
            $("input[name='plantime']").val(data.plantime);
        }
        if(data.finishtime){
            $("input[name='finishtime']").val(data.finishtime);
        }
        if(data.actualtime){
            $("input[name='actualtime']").val(data.actualtime);
        }
        if(data.overtime){
            $("input[name='overtime']").val(data.overtime);
        }
        if(data.areaname){
            $("select[name='areaname']").val(data.areaname);
        }
        if(data.solvername){
            $("input[name='solvername']").val(data.solvername);
        }
        if(data.namemobile){
            $(".tips").html(data.namemobile).css("color","dodgerblue");
        }
        if(data.field){
            $("select[name='field']").val(data.field);
        }
        if(data.creatorname){
            $("input[name='creatorname']").val(data.creatorname).prev(".text").html(data.creatorname);
        }


        var pro=data.projectname;
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
                //给项目初始化
                $("[name='projectname']").val(pro);
            }
        });

        //大区-项目二级联动
        $("[name='areaname']").change(function(){
            var val=$(this).val();
            $.post(localStorage.location+"getdhprojectname",{areaname:val},function(data){
                //console.log(data);
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

        //如果图片有值，则显示图片div
        if(data.image1){
            $(".img-chose").append(
                '<div class="img-box">' +
                '<img src="'+data.image1+'.square.thumb.jpg" alt="" id="img1" style="width:50px;"/>' +
                '</div>'
            );
            $("input[name='image1']").val(data.image1);
            $("#upload").show();
        }
        if(data.image2){
            $(".img-chose").append(
                '<div class="img-box">' +
                '<img src="'+data.image2+'.square.thumb.jpg" alt="" id="img2" style="width:50px;"/>' +
                '</div>'
            );
            $("input[name='image2']").val(data.image2);
            $("#upload").show();
        }
        if(data.image3){
            $(".img-chose").append(
                '<div class="img-box">' +
                '<img src="'+data.image3+'.square.thumb.jpg" alt="" id="img3" style="width:50px;"/>' +
                '</div>'
            );
            $("input[name='image3']").val(data.image3);
            $("#upload").hide();
        }

        //删除图片
        $(".img-box").off("click")
        $(".img-box").on("click",function(){
            var _this=this;
            layer.confirm('是否要删除这张照片？',{icon:3}, function(index1){
                var index=$(_this).index();
                var length=$(".img-box").length;
                for(var i=index;i<length-1;i++){
                    $("input[name='image"+(i+1)+"']").val($("input[name='image"+(i+2)+"']").val());
                }
                $("input[name='image"+length+"']").val("");
                if(length==3){
                    $('.upload').css('display','inline-block');
                }
                $(_this).remove();

                layer.close(index1);
            });
        });
    });

    //textarea输入长度限制
    $("[name='supportname']").on("keypress",function(){
        if($(this).val().length>=20){
            return false;
        }
    });
    $("[name='description']").on("keypress",function(){
        if($(this).val().length>=400){
            return false;
        }
    });

    //清空计划完成日期
    $(".close").on("click",function(){
        $("#finishtime").val("");
    });

    //提交按钮
    $(".button").on("click",function(){
        switch(sessionStorage.type){
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

        //数字格式校验
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

        if($("[name='supportname']").val().length>20){
            layer.alert(name+"名称不能超过20个字（一个汉字/英文字母算一个字）",{icon:7,closeBtn: 0});
            return 0;
        }
        if($("[name='description']").val().length>400){
            layer.alert(name+"描述不能超过400个字（一个汉字/英文字母算一个字）",{icon:7,closeBtn: 0});
            return 0;
        }
        if(($("[name='solvername']").val()!="")&&($(".tips").html()=="查无此人")){
            layer.alert("请输入正确的解决人！",{icon:7,closeBtn: 0});
            return 0;
        }
        if($("[name='projectname']").val()=="无"){
            layer.alert("此大区无项目，不能提交！",{icon:7,closeBtn: 0});
            return 0;
        }

        var params={
            pk_support:$("[name='pk_support']").val(),
            areaname:$("[name='areaname']").val(),
            projectname:$("[name='projectname']").val(),
            field:$("[name='field']").val(),
            creatorname:$("[name='creatorname']").val(),
            solvername:$("[name='solvername']").val().trim(),
            supportname:$("[name='supportname']").val().trim(),
            description:$("[name='description']").val().replace(/\n/g,'~@~@~').trim(),
            plantime:$("[name='plantime']").val().trim(),
            finishtime:$("[name='finishtime']").val().trim(),
            actualtime:$("[name='actualtime']").val().trim(),
            modifier:$("[name='modifier']").val(),
            modifiername:$("[name='modifiername']").val(),
            image1:$("[name='image1']").val(),
            image2:$("[name='image2']").val(),
            image3:$("[name='image3']").val(),
            namemobile:$(".tips").html(),
            overtime:$("[name='overtime']").val().trim()
        };

        $.post(localStorage.location+"editdhsupport",params,function(data){
            if(data.status=='success'){
                layer.alert("修改成功！",{icon:1,closeBtn: 0},function(index){
                    window.location.href="mine.html";
                    layer.close(index);
                });
            }else{
                layer.alert("修改失败！",{icon:2,closeBtn: 0},function(index){

                    layer.close(index);
                });
            }
        });
    });

    //删除功能
    $(".delete").on("click",function(){
        layer.confirm("是否要删除这条记录？",{icon:3},function(index){
            $.post(localStorage.location+"deletedhsupport",{pk_support:pk_support},function(data){
                if(data.status=='success'){
                    layer.alert("删除成功！",{icon:1,closeBtn: 0},function(index){
                        window.location.href="mine.html";
                        layer.close(index);
                    });
                }
            });
            layer.close(index);
        });

    });
});
$(function(){
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
$(function(){
    //上传图片
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
                'maxselectnum' : 3
            }
        };
        var imgBig=[];
        $('#upload').click(function (){
            var imgBig=[];
            $(".img-upload input").each(function(){
                if($(this).val()){
                    imgBig.push($(this).val());
                }
            });
            var length=imgBig.length;
            data.parameters.maxselectnum=3-length;
            //初始化,(页面中只能初始化一次，不可多次)
            YonYouJSBridge.send(JSON.stringify(data), function (responseData) {
//                sessionStorage.setItem("imgData", responseData);
//                var imgInfo = JSON.parse(sessionStorage.getItem("imgData"));
                var imgInfo = JSON.parse(responseData);
//                var imgSrc = imgInfo.data[0].thumb;
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
                $(".img-box").on("click",function(){
                    var _this=this;
                    layer.confirm("是否要删除这张照片？",{icon:3},function(index1){
                        var index=$(_this).index();
                        for(var i=index;i<imgBig.length-1;i++){
                            imgBig[i]=imgBig[i+1];
                            $("input[name='image"+(i+1)+"']").val(imgBig[i+1]);
                        }
                        $("input[name='image"+imgBig.length+"']").val("");
                        imgBig.pop();
                        if(imgBig.length==2){
                            $('.upload').css('display','inline-block');
                        }
                        $(_this).remove();
                        layer.close(index1)
                    })
                });

            });
            sessionStorage.imgBig=imgBig;
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
function connectWebViewJavascriptBridge(callback){
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge);
        }, false);
    }
}