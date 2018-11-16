/**
 * Created by wangshhj on 2017/9/22.
 */
$(function () {
    if (!localStorage.token) {
        layer.alert('请先登录', {closeBtn: 0, icon: 7}, function (index) {
            window.location.href = 'login.html';
            layer.close(index)
        });
    }
    $('.enter').click(function () {
        localStorage.token = '';
        localStorage.userid = '';
        window.location.href = 'login.html'
    });
    $('.userName').html(localStorage.userName);
    //=====================================================================
    var rankingData = null;
    $.post(localStorage.location + "timeAndCountByProject", function (data) {
        if(data.status == "success"){
            rankingData = data.data;
            for(var i=0; i<rankingData.length; i++){
                rankingData[i].demandtime = Number(rankingData[i].demandtime) * 1000 * 8 /1000;
                rankingData[i].totaltime = (Number(rankingData[i].bugtime)*1000 + rankingData[i].demandtime*1000)/1000;
            }
            initRanking(rankingData,"totaltime","BToS",0);
            // console.log(rankingData);
        }else{
            layer.alert("请求错误")
        }
    });

    // var a =[
    //     {
    //         projectname:"北京分公司",
    //         bugcnt:22,
    //         bugtime:333,
    //         demandcnt:44,
    //         demandtime:444,
    //         totaltime:666
    //     },
    //     {
    //         projectname:"广州分公司",
    //         bugcnt:11,
    //         bugtime:111,
    //         demandcnt:22,
    //         demandtime:222,
    //         totaltime:123
    //     },
    //     {
    //         projectname:"东北分公司",
    //         bugcnt:66,
    //         bugtime:321,
    //         demandcnt:2311,
    //         demandtime:434,
    //         totaltime:5633
    //     },
    //     {
    //         projectname:"北京分公司",
    //         bugcnt:22,
    //         bugtime:333,
    //         demandcnt:44,
    //         demandtime:444,
    //         totaltime:666
    //     },
    //     {
    //         projectname:"广州分公司",
    //         bugcnt:11,
    //         bugtime:111,
    //         demandcnt:22,
    //         demandtime:222,
    //         totaltime:123
    //     },
    //     {
    //         projectname:"东北分公司",
    //         bugcnt:66,
    //         bugtime:321,
    //         demandcnt:2311,
    //         demandtime:434,
    //         totaltime:5633
    //     },
    //     {
    //         projectname:"北京分公司",
    //         bugcnt:22,
    //         bugtime:333,
    //         demandcnt:44,
    //         demandtime:444,
    //         totaltime:666
    //     },
    //     {
    //         projectname:"广州分公司",
    //         bugcnt:11,
    //         bugtime:111,
    //         demandcnt:22,
    //         demandtime:222,
    //         totaltime:123
    //     },
    //     {
    //         projectname:"东北分公司",
    //         bugcnt:66,
    //         bugtime:321,
    //         demandcnt:2311,
    //         demandtime:434,
    //         totaltime:5633
    //     },
    //     {
    //         projectname:"北京分公司",
    //         bugcnt:22,
    //         bugtime:333,
    //         demandcnt:44,
    //         demandtime:444,
    //         totaltime:666
    //     },
    //     {
    //         projectname:"广州分公司",
    //         bugcnt:11,
    //         bugtime:111,
    //         demandcnt:22,
    //         demandtime:222,
    //         totaltime:123
    //     },
    //     {
    //         projectname:"东北分公司",
    //         bugcnt:66,
    //         bugtime:321,
    //         demandcnt:2311,
    //         demandtime:434,
    //         totaltime:5633
    //     },
    //     {
    //         projectname:"北京分公司",
    //         bugcnt:22,
    //         bugtime:333,
    //         demandcnt:44,
    //         demandtime:444,
    //         totaltime:666
    //     },
    //     {
    //         projectname:"广州分公司",
    //         bugcnt:11,
    //         bugtime:111,
    //         demandcnt:22,
    //         demandtime:222,
    //         totaltime:123
    //     },
    //     {
    //         projectname:"东北分公司",
    //         bugcnt:66,
    //         bugtime:321,
    //         demandcnt:2311,
    //         demandtime:434,
    //         totaltime:5633
    //     },
    //     {
    //         projectname:"北京分公司",
    //         bugcnt:22,
    //         bugtime:333,
    //         demandcnt:44,
    //         demandtime:444,
    //         totaltime:666
    //     },
    //     {
    //         projectname:"广州分公司",
    //         bugcnt:11,
    //         bugtime:111,
    //         demandcnt:22,
    //         demandtime:222,
    //         totaltime:123
    //     },
    //     {
    //         projectname:"东北分公司",
    //         bugcnt:66,
    //         bugtime:321,
    //         demandcnt:2311,
    //         demandtime:434,
    //         totaltime:5633
    //     },
    //     {
    //         projectname:"北京分公司",
    //         bugcnt:22,
    //         bugtime:333,
    //         demandcnt:44,
    //         demandtime:444,
    //         totaltime:666
    //     },
    //     {
    //         projectname:"广州分公司",
    //         bugcnt:11,
    //         bugtime:111,
    //         demandcnt:22,
    //         demandtime:222,
    //         totaltime:123
    //     },
    //     {
    //         projectname:"东北分公司",
    //         bugcnt:66,
    //         bugtime:321,
    //         demandcnt:2311,
    //         demandtime:434,
    //         totaltime:5633
    //     },
    // ];

    var num = 0;//分页加载页码
    /*
     *   对象数组排序
     * */
    function defineSoft(data,field,type) {
        function arrSoft(obj1,obj2) {
            var val1 = Number(obj1[field]);
            var val2 = Number(obj2[field]);

            if(val1 < val2){
                if(type == "SToB"){
                    return -1
                }else{
                    return 1;
                }
            }else if(val1 > val2){
                if(type == "SToB"){
                    return 1
                }else{
                    return -1;
                }
            }else{
                return 0
            }
        }
        return data.sort(arrSoft)
    }


    var domCon = "<div class='rankingCon'>" +
        "<div class='rankingTop'>" +

        "<div class='rankingHead'>" +
        "<span>项目名称</span>" +
        "</div>" +
        "<div class='rankingHead rankingHeadSort' pk='bugcnt'>" +
        "<span>已解决BUG数</span>" +
        "<span class='sortIcon'></span>" +
        "</div>" +
        "<div class='rankingHead rankingHeadSort' pk='bugtime'>" +
        "<span>BUG解决用时(小时)</span>" +
        "<span class='sortIcon '></span>" +
        "</div>" +
        "<div class='rankingHead rankingHeadSort' pk='demandcnt'>" +
        "<span>已解决需求数</span>" +
        "<span class='sortIcon'></span>" +
        "</div>" +
        "<div class='rankingHead rankingHeadSort' pk='demandtime'>" +
        "<span>需求解决用时(小时)</span>" +
        "<span class='sortIcon'></span>" +
        "</div>" +
        "<div class='rankingHead rankingHeadSort' pk='totaltime'>" +
        "<span>总用时(小时)</span>" +
        "<span class='sortIcon sortUp'></span>" +
        "</div>" +

        "</div>"+

        "<div id='rankingBodyBox'><ul id='rankingBody'></ul></div>"+
        "</div>";

    $("#rankingDom").append(domCon);

    /*
     *   分页添加数据
     * */
    function initPage(data,num) {
        var scrollType = true;
        for (var i = num * 30; i < ( num + 1 ) * 30; i++){
            if(i < data.length){
                var projectname = data[i].projectname;
                var bugcnt = data[i].bugcnt;
                var bugtime = data[i].bugtime;
                var demandcnt = data[i].demandcnt;
                var demandtime = data[i].demandtime;
                var totaltime = data[i].totaltime;
                // var totaltime = Number(bugtime) + Number(demandtime) * 8;

                var domBody = "<li class='bodyList'>" +
                    "<span class='bodyprojectname'>"+ projectname +"</span>" +
                    "<span class='bodybugcnt'>"+ bugcnt +"</span>" +
                    "<span class='bodybugtime'>"+ bugtime +"</span>" +
                    "<span class='bodydemandcnt'>"+ demandcnt +"</span>" +
                    "<span class='bodydemandtime'>"+ demandtime +"</span>" +
                    "<span class='bodyTT'>"+ totaltime +"</span>" +
                    "</li>";
                $("#rankingBody").append(domBody);
            }else{
                scrollType = false;
                break
            }
        }
        if(scrollType){
            ScrollListening();
        }
    }

    /*
     *   排序后初始化排行
     * */
    function initRanking(data,field,type,num) {
        defineSoft(data,field,type);
        initPage(data,num);
    }

    /*
     *   监听滚动条事件
     * */
    function ScrollListening() {
        $("#rankingBodyBox").on("scroll",function (e) {
            var scrollTop = e.target.scrollTop;
            var rankingBodyBoxH = $(this).height();
            var rankingBodyH = $("#rankingBody").height();
            var res = rankingBodyH - rankingBodyBoxH;
            if(scrollTop > res - 20){
                $(this).off();
                num ++;
                initPage(rankingData,num,true);
            }
        })
    }
    ScrollListening();

    /*
     *   排序事件
     * */
    $(function () {
        var sortObj = {
            bugcnt:{
                sort:"BToS",    //排序方式
                onlyOne:true    //第一次排序
            },
            bugtime:{
                sort:"BToS",
                onlyOne:true
            },
            demandcnt:{
                sort:"BToS",
                onlyOne:true
            },
            demandtime:{
                sort:"BToS",
                onlyOne:true
            },
            totaltime:{
                sort:"SToB",
                onlyOne:true
            }
        }; //每列排序状态

        /*
         *   初始化非当前列排序状态
         * */
        function initSortObj(field){
            for(var key in sortObj){
                if(key !== field){
                    sortObj[key].sort = "BToS";
                    sortObj[key].onlyOne = true;
                }
            }
        }

        $(".rankingHeadSort").click(function () {
            num = 0;
            $("#rankingBody").empty();
            $(".sortIcon").removeClass("sortUp");
            $(".sortIcon").removeClass("sortDown");

            var pk = $(this).attr("pk");
            var sort = sortObj[pk].sort;
            var onlyOne = sortObj[pk].onlyOne;
            if(onlyOne){
                initSortObj(pk);
                sortObj[pk].onlyOne = false;
            }
            initRanking(rankingData,pk,sort,0);
            $("#rankingBodyBox").scrollTop(0);
            if(sort == "BToS"){
                sortObj[pk].sort = "SToB";
                $(this).children(".sortIcon").addClass("sortUp");
            }else{
                sortObj[pk].sort = "BToS";
                $(this).children(".sortIcon").addClass("sortDown");
            }
        })
    })
});
