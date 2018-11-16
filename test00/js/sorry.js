/**
 * Created by liyxt on 2016/10/18.
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
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    var height=document.documentElement.clientHeight-$("#footer").outerHeight();
    $(".sorry").height(height);
});
