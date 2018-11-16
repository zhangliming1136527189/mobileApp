/**
 * Created by zhanglmg on 2016/9/26.
 */


$(function () {
    //http://10.11.115.100:5050/    10.11.115.39:5050
    localStorage.location = 'https://ncapp.yyuap.com/fiwechat/';
	//localStorage.location = 'http://123.103.9.198:8901/fiwechat/';
    //localStorage.location = 'http://10.11.115.39:5050/fiwechat/';
    $('input, textarea').placeholder({customClass:'my-placeholder'});
    $("#username").bind("blur", function () {
        
         localStorage.username = $("#username").val();
           
       
    });
     if(localStorage.userCode){
         $('#username').val(localStorage.userCode)
     } else{
         $('#username').val('')
     }
    if(localStorage.userid){
        window.location.href="../index.html"
    } else{

    }
    $("#forget-password-inner").bind("click", function () {
        localStorage .countdown=60;
        $("#find-password-page").css({"display": "block"}).siblings().css({"display": "none"});
        $("#find-direction").html("");
        $("#find-direction").html("输入要找回的用户和用户邮箱，点击“下一步”将向邮箱发送验证码")
        $("#find-content-inner").show().siblings().hide();
    });
    $("#cancle").bind("click", function () {
        if (confirm("是否确定要取消")) {
            window.location.reload();
          
        }
    }) ;
    $("#find-email").bind("blur",function(){
        var oEmail=$("#find-email").val().split('@');
        if(oEmail[1]=="yonyou.com"){
            $(".emailTips").html("");
        }else{
            $(".emailTips").html("请输入yonyou格式的邮箱")
        }
    });
    //
    $("#btn").val("重新获取");
    $("#once-step").bind("click", function () {
        $("#btn").val("重新获取");
        $("#infoTips").html("");
        $("#time-direction").html("");
        $("#codeTips").html("");
        if ($("#find-username").val()||$("#find-email").val()) {
            var oEmail=$("#find-email").val().split('@');
            if ( $("#find-username").val()==oEmail[0]&&oEmail[1]=="yonyou.com") {
                $("#find-direction").html("");
                var iNum = parseInt(Math.random() * 100000);
                while (iNum < 100000) {
                    iNum = parseInt(Math.random() * 1000000)
                }
                localStorage.iNum=iNum;
                var params = {
                    "usercode": $("#find-username").val(),
                    "email":$("#find-email").val(),
                    "verificationcode":localStorage.iNum
                };
              
                $.post(localStorage.location+"senddhverificationcode", params, function(data) {
                       

                });

                $("#btn").attr("disabled",true);
                $("#identifying-wrap").show().siblings().hide();
                var number = 60;
                var timer = setInterval(function(){
                    $("#time-direction").html("");
                    $("#time-direction").append("<span>验证码已发送到您绑定好的邮箱内，请查收,如果超过</span><span class=\"number\">" + number + "s</span><span>还没收到邮件，请点击重新获取</span>")
                    localStorage .number = 60;
                    if (number == 0) {
                        clearInterval(timer);
                        localStorage .number = number;
                        $("#btn").attr("disabled",false);
                        localStorage .countdown=60;
                    }
                    number--;
                }, 1000);
            }

            else{
                $("#infoTips").html("用户名和邮箱不匹配");
            }
        }
        else{
            $("#infoTips").html("请填写完整信息");
        }
    });
    //
    $("#identifying-code").bind("blur", function () {
        var codeReg = /["^\d{6}]/g;
        //^\d{6}$
        if (codeReg.test($("#identifying-code").val())) {
            $("#codeTips").html("");
            return true;
        } else {
            $("#codeTips").html("验证码只能为数字");
        }
    });
    //
    $("#next-step").bind("click",function(){
        if($("#identifying-code").val()==localStorage.iNum){
            $("#reset-password-page").show().siblings().hide();
        }else{
            $("#codeTips").html("验证码输入错误")
        }

    });
    //
    $("#next-cancle").bind("click",function(){
        if (confirm("是否确定要取消")) {
            window.location.reload()
                /*$("#username").val("");
                 $("#password").val("");
                 $("#login-inner").css({"display": "block"}).siblings().css({"display": "none"});
                 $("#infoTips").html("输入要找回的用户和用户邮箱，点击“下一步”将向邮箱发送验证码");*/
            ;
        }
    });
    //
    $('#new-password').bind("blur", function () {
      
        var opasswordRe = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
        if (opasswordRe.test($('#new-password').val())) {
            $("#new-errors").html("");
            return true;
        } else {
            $("#new-errors").html("请输入6至22位字母或数字");
        }
    });
    //
    $("#confirm-password").bind("blur",function(){
        if($('#new-password').val()==$('#confirm-password').val()){
            $("#error-password").html("");
        }else{
            $("#error-password").html("密码不一致");
        }
    });
    //
    $("#reset-step").bind("click",function(){
        $("#password-infor").html("");
        if(!$('#new-password').val()||!$('#confirm-password').val()){
            $("#password-infor").html("请填写完整的密码");
        }else{
            if($('#new-password').val()==$('#confirm-password').val()){
                var params = {
                    "usercode": $("#find-username").val(),
                    "password":$('#confirm-password').val()
                };
                $.post(localStorage.location+"resetpassword", params, function(data) {

                    if(data.status=="success"){
                        $("#password-infor").html("");
                         layer.alert("重置密码成功");
                         $("#username").val("");
                         $("#password").val("");
                         $("#login-inner").css({"display": "block"}).siblings().css({"display": "none"});
                    }else if(data.status=="error"){
                        $("#password-infor").html("修改密码错误");
                    }

                });

            }else{

                $("#password-infor").html("密码不一致");
            }
        }

    });
    //
    $("#reset-cancle").bind("click", function () {
        if (confirm("是否确定要取消")) {
            window.location.reload();
            /*$("#username").val("");
             $("#password").val("");
             $("#login-inner").css({"display": "block"}).siblings().css({"display": "none"});

             $("#infoTips").html("输入要找回的用户和用户邮箱，点击“下一步”将向邮箱发送验证码")*/
        }
    }) ;

    //登录
    $("#login-button").bind("click",function(){
        enter();
    })  ;
    $("#password").on("keypress", function (event) {
        if (event.keyCode == "13") {
           enter();
        }
    });
    function enter(){
        $("#loginTips").html("");
        if(!$("#username").val()||!$("#password").val()){
            $("#loginTips").html("请填写完整信息");
        }else{
            var params = {
                "usercode": $("#username").val(),
                "password":$("#password").val()
            };
        
            var url = localStorage.location+"dhweblogin";
            
            $.post(localStorage.location+"dhweblogin", params, function(data) {
                if (data.status == "success") {
                    localStorage.setItem('userCode', $("#username").val());
                    localStorage.setItem('userName', data.username);
                    localStorage.setItem('userid', data.userid);
                    window.location.href="../index.html"
                } else if (data.status == "error") {
                    $("#loginTips").html(data.message);
                }
            });
           
        }
    }
});
//
function settime(obj) {
    obj.setAttribute("disabled", true);
    if (localStorage .number == 0) {
        $("#time-direction").html("");
        if(localStorage .countdown==60){
            var iNum = parseInt(Math.random() * 100000);
            while (iNum < 100000) {
                iNum = parseInt(Math.random() * 1000000)
            }
            localStorage.iNum=iNum;
            var params = {
                "usercode": $("#find-username").val(),
                "email":$("#find-email").val(),
                "verificationcode":localStorage.iNum
            };
            $.post(localStorage.location+"senddhverificationcode", params, function(data) {

            });

        }
        if (localStorage .countdown == 0) {
            obj.removeAttribute("disabled");
            obj.value = "重新获取";
            localStorage .countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            obj.value = "重新发送(" + localStorage .countdown + ")";
            localStorage .countdown--;
        }
        setTimeout(function () {
                settime(obj)
            }
            , 1000)
    }

}

