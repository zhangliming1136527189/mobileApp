/**
 * Created by liyxt on 2016/10/9.
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
    $("#detail").height(height);
//判断是从查看过来的还是从我的过来的，改变footer的颜色
    if(sessionStorage.which=="index"){
        $("#footer li:nth-of-type(1)").addClass("active");
    }else if(sessionStorage.which=="mine"){
        $("#footer li:nth-of-type(4)").addClass("active");
    }
//获取问题id
    var pk_support=window.location.search.split("pk_support=")[1];

    var params={
        beginindex:1,
        endindex:1,
        param:JSON.stringify({pk_support:pk_support})
    };
    $.post(localStorage.location+"alldhsupports",params,function(data){
        var data=data.data[0];
        //console.log(data);
        switch(data.supporttype){
            case "bug":
                var name="BUG";
                break;
            case "demand":
                var name="需求";
                break;
        }
        var appendStr=
            '<ul>'+
                '<li>'+
                    '<span class="title">录单时间:</span>'+
                    '<span class="text">'+(data.creationtime?data.creationtime:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">状态:</span>'+
                    (data.supportstatus=="已解决"?'<span class="state">'+data.supportstatus+'</span>':"")+
                    (data.supportstatus=="进行中"?'<span class="state doing">'+data.supportstatus+'</span>':"")+
                    (data.supportstatus=="未开始"?'<span class="state notStart">'+data.supportstatus+'</span>':"")+
                '</li>'+
                '<li>'+
                    '<span class="title">大区:</span>'+
                    '<span class="text">'+(data.areaname?data.areaname:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">项目名称:</span>'+
                    '<span class="text">'+(data.projectname?data.projectname:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">领域:</span>'+
                    '<span class="text">'+(data.field?data.field:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">录单人:</span>'+
                    '<span class="text">'+(data.creatorname?data.creatorname:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">解决人:</span>'+
                    '<span class="text">'+(data.namemobile?data.namemobile:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">修改人:</span>'+
                    '<span class="text">'+(data.modifiername?data.modifiername:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title name">'+name+'名称:</span>'+
                    '<span class="text">'+(data.supportname?data.supportname:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title describe">'+name+'描述:</span>'+
                    '<span class="text">'+(data.description?data.description.replace(/~@~@~/g,"<br/>"):"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">计划用时:</span>'+
                    '<span class="text">'+(data.plantime?data.plantime+data.timeunits:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">计划完成日期:</span>'+
                    '<span class="text">'+(data.finishtime?data.finishtime:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">实际用时:<br/>(不含加班)</span>'+
                    '<span class="text">'+(data.actualtime?data.actualtime+data.timeunits:"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">加班用时:</span>'+
                    '<span class="text">'+(data.overtime?data.overtime+"小时":"")+'</span>'+
                '</li>'+
                '<li>'+
                    '<span class="title">图片:</span>'+
                    '<span class="text">'+
                    (data.image1?'<img id="image1" src="'+data.image1+".square.thumb.jpg"+'" alt="">':"")+
                    (data.image2?'<img id="image2" src="'+data.image2+".square.thumb.jpg"+'" alt="">':"")+
                    (data.image3?'<img id="image3" src="'+data.image3+".square.thumb.jpg"+'" alt="">':"")+
                    ((!data.image1)&&(!data.image2)&&(!data.image3)?'暂无图片':"")+
                    '</span>'+
                '</li>'+
            '</ul>';
        $("#detail").append(appendStr);
        //图片点击放大效果
        $("img").on("click",function(){
            var srcBig=$(this).attr("src").split(".square")[0];
            $(".bigImg").show();
            $(".bigImg").css("backgroundImage","url("+srcBig+")");
        });

    });
    $(".bigImg").on("click",function(){
        $(this).hide();
    });
});

