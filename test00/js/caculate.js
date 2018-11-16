$(function () {
    $(".a_add").on("click", function () {
        $.post(localStorage.location + "mobilecheckauthority", {userid: sessionStorage.token}, function (data) {
            if (data.status == "success") {
                window.location = "add.html";
            } else if (data.status == "error") {
                window.location = "sorry.html";
            }
        });
    });
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    var height = document.documentElement.clientHeight - $("#tab").outerHeight() - $("#footer").outerHeight();
    $("#studyMain").height(height);
    var figureHeight = height - $("#draw-type").outerHeight();
    $("#figure").height(figureHeight);
    $("#pie,#column,#table").height(figureHeight);
    $("#table-detail").height(figureHeight - $("#table-nav").height());
    var width = ($("#draw-type ul").width() - 2) / 3;
    $("#draw-type ul li").width(width);
    init();
    $("#lookBug").bind("click", function () {
        $(".backProject").html("");
        $(".field").html("");
        sessionStorage.type = 'region';
        sessionStorage.supporttype = "bug";
        sessionStorage.pieTitle = "Bug";
        var params = {
            "supporttype": "bug"
        };
        $.post(localStorage.location + "countbyareaname", params, function (data) {
            sessionStorage.supporttype = "bug";
            console.log(data);
            Resolve = eval(data.resolvedCnts.join('+'));
            unResolve = eval(data.unresolvedCnts.join('+'));
            zResolve = Resolve + unResolve - 0;
            draw(data);
        });
    });
    $("#lookNeeds").bind("click", function () {
        $(".backProject").html("");
        $(".field").html("");
        sessionStorage.type = 'region';
        sessionStorage.supporttype = "demand";
        sessionStorage.pieTitle = "需求";
        var params = {
            "supporttype": "demand"
        };
        $.post(localStorage.location + "countbyareaname", params, function (data) {
            console.log(data);
            Resolve = eval(data.resolvedCnts.join('+'));
            unResolve = eval(data.unresolvedCnts.join('+'));
            zResolve = Resolve + unResolve - 0;
            draw(data);
        });
    });
    $("#table-type").bind("click", function () {
        $("#table").css({"display": "block"}).siblings().css({"display": "none"});
        /*sessionStorage.sorts = "table";*/
        height = $("#table").height() - $(".classify").outerHeight();
        $(".tableMain").height(height);
    });

    $("#pie-type").bind("click", function () {
        $("#pie").css({"display": "block"}).siblings().css({"display": "none"});
        /*sessionStorage.sorts = "table";*/
    });
    $("#column-type").bind("click", function () {
        $("#column").css({"display": "block"}).siblings().css({"display": "none"});
        /*sessionStorage.sorts = "table";*/
    });

    $("#draw-type ul li").bind("click", function () {
        $(this).css({"background": "#00a1ea", "color": "#fff"}).siblings().css({"background": "#fff", "color": "#000"})
    });
    //查看2016
    $("#pie #pie-nav span:eq(0)").bind("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#pie-2016").show();
        $("#pie-2017").hide();
        $("#pie-2018").hide();
    });
    //查看2017
    $("#pie #pie-nav span:eq(1)").bind("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#pie-2017").show();
        $("#pie-2016").hide();
        $("#pie-2018").hide();
    })
    //查看2018
    $("#pie #pie-nav span:eq(2)").bind("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("#pie-2018").show();
        $("#pie-2017").hide();
        $("#pie-2016").hide();
    })
    /*$(".backProject").on("click", function () {
     $(".field").html("");
     var params = {
     "supporttype": sessionStorage.supporttype,
     "areaname": sessionStorage.areaname,
     };
     $.post("http://"+localStorage.location+"/fiwechat/countbyproject", params, function (data) {
     draw(data);
     Resolve = eval(data.resolvedCnts.join('+'));
     unResolve = eval(data.unresolvedCnts.join('+'));
     zResolve =  Resolve+ unResolve-0;
     sessionStorage.type = "project";
     });
     });
     $(".backArea").on("click", function () {
     $(".backProject").html("");
     $(".field").html("");
     $("#back").css({"display": "none"})
     var params = {
     "supporttype": sessionStorage.supporttype,
     };
     $.post("http://"+localStorage.location+"/fiwechat/countbyareaname", params, function (data) {
     Resolve = eval(data.resolvedCnts.join('+'));
     unResolve = eval(data.unresolvedCnts.join('+'));
     zResolve =  Resolve+ unResolve-0;
     draw(data);
     });
     sessionStorage.type = "region";
     return 0;
     });*/

});

function draw(args) {
    var _name = args.areanames || args.projectnames || args.fields;
    var _resolvedCnts_2016 = args.resolvedCnts_2016;
    var _resolvedCnts_2017 = args.resolvedCnts_2017;
    var _resolvedCnts = args.resolvedCnts;
    var _unresolvedCnts_2016 = args.unresolvedCnts_2016;
    var _unresolvedCnts_2017 = args.unresolvedCnts_2017;
    var _unresolvedCnts = args.unresolvedCnts;
    var ranking = [];
    for (var i = 0; i < _resolvedCnts.length; i++) {
        var oranking = [_name[i], _resolvedCnts[i], _unresolvedCnts[i], _resolvedCnts_2017[i], _unresolvedCnts_2017[i], _resolvedCnts_2016[i], _unresolvedCnts_2016[i]]
        ranking.push(oranking);
    }
    ranking.sort(function (a, b) {
        return b[1] - a[1];
    });
    var name = [];
    var resolvedCnts_2016 = [];
    var resolvedCnts_2017 = [];
    var unresolvedCnts_2016 = [];
    var unresolvedCnts_2017 = [];
    var resolvedCnts = [];
    var unresolvedCnts = [];
    for (var i = 0; i < ranking.length; i++) {
        name.push(ranking[i][0]);
        resolvedCnts.push(ranking[i][1]);
        unresolvedCnts.push(ranking[i][2]);
        resolvedCnts_2017.push(ranking[i][3]);
        unresolvedCnts_2017.push(ranking[i][4]);
        resolvedCnts_2016.push(ranking[i][5]);
        unresolvedCnts_2016.push(ranking[i][6]);
    }
    var piedata = [];
    var piedata_2016 = [];
    var piedata_2017 = [];
    for (var i = 0; i < name.length; i++) {
        piedata[i] = new Array();
        if (parseInt(resolvedCnts[i]) == 0) {
            piedata[i][0] = null;
            piedata[i][1] = null;
        } else {
            piedata[i][0] = name[i];
            piedata[i][1] = parseInt(resolvedCnts[i]);
        }
    }
    ;
    for (var i = 0; i < name.length; i++) {
        piedata_2017[i] = new Array();
        if (parseInt(resolvedCnts_2017[i]) == 0) {
            piedata_2017[i][0] = null;
            piedata_2017[i][1] = null;
        } else {
            piedata_2017[i][0] = name[i];
            piedata_2017[i][1] = parseInt(resolvedCnts_2017[i]);
        }
    }
    for (var i = 0; i < name.length; i++) {
        piedata_2016[i] = new Array();
        if (parseInt(resolvedCnts_2016[i]) == 0) {
            piedata_2016[i][0] = null;
            piedata_2016[i][1] = null;
        } else {
            piedata_2016[i][0] = name[i];
            piedata_2016[i][1] = parseInt(resolvedCnts_2016[i]);
        }
    }
    $('#pie-2016').highcharts(peiFun(piedata_2016));

    $('#pie-2017').highcharts(peiFun(piedata_2017));
    $('#pie-2018').highcharts(peiFun(piedata));
    $('#column').highcharts({
        chart: {
            type: 'bar',//bar,column
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: name,
            labels: {
                rotation: -45,  //逆时针旋转45°，标签名称太长。
                align: 'right'  //设置右对齐
            }
        },
        yAxis: {
            min: 0,
            allowDecimals: false,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'center',
            x: 0,
            verticalAlign: 'bottom',
            y: 0,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            bar: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    allowOverlap: true, // 允许数据标签重叠
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                },

                events: {
                    click: function (e) {
                        /*layer.load(2);
                         if (sessionStorage.type == "region") {
                         sessionStorage.areaname = e.point.category;
                         $(".backProject").html(">"+sessionStorage.areaname);
                         var params = {
                         "supporttype": sessionStorage.supporttype,
                         "areaname": sessionStorage.areaname
                         };
                         $.post("http://"+localStorage.location+"/fiwechat/countbyproject", params, function (data) {
                         Resolve = eval(data.resolvedCnts.join('+'));
                         unResolve = eval(data.unresolvedCnts.join('+'));
                         zResolve =  Resolve+ unResolve-0;
                         draw(data);
                         layer.closeAll();
                         });
                         sessionStorage.type = "project";

                         return 0;
                         } else if (sessionStorage.type == "project") {
                         sessionStorage.project = e.point.category;
                         $(".field").html(">"+sessionStorage.project);
                         var params = {
                         "supporttype": sessionStorage.supporttype,
                         "areaname": sessionStorage.areaname,
                         "projectname": sessionStorage.project,
                         };
                         $.post("http://"+localStorage.location+"/fiwechat/countbyfield", params, function (data) {
                         Resolve = eval(data.resolvedCnts.join('+'));
                         unResolve = eval(data.unresolvedCnts.join('+'));
                         zResolve =  Resolve+ unResolve-0;
                         draw(data);
                         layer.closeAll();
                         });
                         sessionStorage.type = "field";

                         return 0;
                         }
                         layer.closeAll();*/
                    }
                }
            }
        },
        series: [{
            name: '2018已解决',
            data: resolvedCnts,
            stack: '2018'
        },
            {
                name: '2018未解决',
                data: unresolvedCnts,
                stack: '2018',
                visible: false
            }, {
                name: '2017已解决',
                data: resolvedCnts_2017,
                stack: '2017',
                visible: false
            },
            {
                name: '2017未解决',
                data: unresolvedCnts_2017,
                stack: '2017',
                visible: false
            }, {
                name: '2016已解决',
                data: resolvedCnts_2016,
                stack: '2016',
                visible: false
            }, {
                name: '2016未解决',
                data: unresolvedCnts_2016,
                stack: '2016',
                visible: false
            },
        ],
    });
    $("#table #table-detail").html("");
    //rules='rows
    if (sessionStorage.supporttype == "bug") {
        $("#table-detail").append("<div class='classify'><span class='classify_A'>分类<br>&nbsp;</span><span class='classify_B'><p>Bug总数</p><p>(<span>" + zResolve_2017 + "</span>)<span>(" + zResolve + ")</span></p></span><span class='classify_C'><p>已解决</p><p>(<span>" + Resolve_2017 + "</span>)(<span>" + Resolve + "</span>)</p></span><span class='classify_D'><p>未解决</p><p>(<span>" + unResolve_2017 + "</span>)(<span>" + unResolve + "</span>)</p></span></div><div class='tableMain'><table id='categories' border='1' cellspacing='0' cellpadding='0' style='background:#e9eaec;border-color:#fefefe'></table></div>");
    } else if (sessionStorage.supporttype == "demand") {
        $("#table-detail").append("<div class='classify'><span  class='classify_A'>分类<br>&nbsp;</span><span  class='classify_B'><p>需求总数</p><p>(<span>" + zResolve_2017 + "</span>)(<span>" + zResolve + "</span>)</p></span><span class='classify_C'><p>已解决</p><p>(<span>" + Resolve_2017 + "</span>)(<span>" + Resolve + "</span>)</p></span><span class='classify_D'><p>未解决</p><p>(<span>" + unResolve_2017 + "</span>)(<span>" + unResolve + "</span>)</p></span></div><div class='tableMain'><table  id='categories' border='1' cellspacing='0' cellpadding='0' style='background:#e9eaec;border-color:#fefefe'></table></div>");
    }
    height = $("#studyMain").height() - $("#draw-type").outerHeight();
    $(".tableMain").height(height);
    for (var j = 0; j < name.length; j++) {
        var sum_2017 = resolvedCnts_2017[j] + unresolvedCnts_2017[j];
        var sum_2018 = resolvedCnts[j] + unresolvedCnts[j];
        $("#table-detail table").append("<tr id='" + j + "'><td class=\"tablerow\">" + name[j] + "</td><td><span>" + sum_2017 + "</span><span>" + sum_2018 + "</span></td><td id='tableNumber'><span>" + resolvedCnts_2017[j] + "</span><span>" + resolvedCnts[j] + "</span></td><td><span>" + unresolvedCnts_2017[j] + "</span><span>" + unresolvedCnts[j] + "</span></td></tr>");
        // $("#table-detail table").append("<tr id='" + j + "'><td class=\"tablerow\">" + name[j] + "</td><td><span>"+sum_2016+"</span><span>"+sum_2017+"</span></td><td id='tableNumber'><span>" + resolvedCnts_2016[j] + "</span><span>" + resolvedCnts[j] + "</span></td><td><span>"+unresolvedCnts_2016[j]+"</span><span>"+unresolvedCnts[j]+"</span></td></tr>");
        $(".classify_C").css({
            background: "url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",
            backgroundSize: "13% 41%"
        })
        /*$("tr[id='" + j + "']").bind("click", function () {
         layer.load(2);
         if (sessionStorage.type == "region") {
         sessionStorage.areaname = $(this).find(".tablerow").html();
         $(".backProject").html(">"+sessionStorage.areaname);
         var params = {
         "supporttype": sessionStorage.supporttype,
         "areaname": sessionStorage.areaname
         };
         $.post("http://"+localStorage.location+"/fiwechat/countbyproject", params, function (data) {
         Resolve_2016 = eval(data.resolvedCnts_2016.join('+'));
         unResolve_2016 = eval(data.unresolvedCnts_2016.join('+'));
         zResolve_2016 =  Resolve_2016+ unResolve_2016-0;
         Resolve = eval(data.resolvedCnts.join('+'));
         unResolve = eval(data.unresolvedCnts.join('+'));
         zResolve =  Resolve+ unResolve-0;
         draw(data);
         layer.closeAll();
         });

         sessionStorage.type = "project";
         return 0;
         } else if (sessionStorage.type == "project") {
         sleep(100);
         sessionStorage.project = $(this).find(".tablerow").html();
         $(".field").html(">"+sessionStorage.project);
         var params = {
         "supporttype": sessionStorage.supporttype,
         "areaname": sessionStorage.areaname,
         "projectname": sessionStorage.project,
         };
         $.post("http://"+localStorage.location+"/fiwechat/countbyfield", params, function (data) {
         Resolve_2016 = eval(data.resolvedCnts_2016.join('+'));
         unResolve_2016 = eval(data.unresolvedCnts_2016.join('+'));
         zResolve_2016 =  Resolve_2016+ unResolve_2016-0;
         Resolve = eval(data.resolvedCnts.join('+'));
         unResolve = eval(data.unresolvedCnts.join('+'));
         zResolve =  Resolve+ unResolve-0;
         draw(data);
         layer.closeAll();
         });

         sessionStorage.type = "field";
         return 0;
         }
         layer.closeAll();

         });*/
    }
    var styleC = true;
    var styleD = true;
    var styleB = true;
    $(".classify_C").on("click", function () {
        styleC = !styleC;
        $(".classify_D").css({backgroundImage: "none"});
        $(".classify_B").css({backgroundImage: "none"});
        if (styleC == true) {
            $(".classify_C").css({
                background: "url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",
                backgroundSize: "13% 41%"
            })
            tableSort("c", styleC);
        } else {
            $(".classify_C").css({
                background: "url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",
                backgroundSize: "13% 41%"
            });
            tableSort("c", styleC);
        }

    });
    $(".classify_B").on("click", function () {
        styleB = !styleB;
        $(".classify_C").css({backgroundImage: "none"});
        $(".classify_D").css({backgroundImage: "none"});
        if (styleB == true) {
            $(".classify_B").css({
                background: "url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",
                backgroundSize: "13% 41%"
            })

            tableSort("b", styleB);
        } else {
            $(".classify_B").css({
                background: "url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",
                backgroundSize: "13% 41%"
            });
            tableSort("b", styleB);
        }

    });
    $(".classify_D").on("click", function () {
        styleD = !styleD;
        $(".classify_C").css({backgroundImage: "none"});
        $(".classify_B").css({backgroundImage: "none"});
        if (styleD == true) {
            $(".classify_D").css({
                background: "url(../img/ranking2.png) no-repeat 94% 50% #e9eaec",
                backgroundSize: "13% 41%"
            })
            tableSort("d", styleD);
        } else {
            $(".classify_D").css({
                background: "url(../img/ranking1.png) no-repeat 94% 50% #e9eaec",
                backgroundSize: "13% 41%"
            });
            tableSort("d", styleD);
        }

    });


}
function tableSort(type, style) {
    var ranking = [];
    $("#categories tr").each(function (i) {
        ranking[i] = [$(this).find("td:nth-of-type(1)").html(), $(this).find("td:nth-of-type(2)").find("span:nth-of-type(1)").html(), $(this).find("td:nth-of-type(2)").find("span:nth-of-type(2)").html(), $(this).find("td:nth-of-type(3)").find("span:nth-of-type(1)").html(), $(this).find("td:nth-of-type(3)").find("span:nth-of-type(2)").html(), $(this).find("td:nth-of-type(4)").find("span:nth-of-type(1)").html(), $(this).find("td:nth-of-type(4)").find("span:nth-of-type(2)").html()];
    });
    if (style == true) {
        switch (type) {
            case "b":
                var sortFun = function (a, b) {
                    return a[2] - b[2];
                };
                break;
            case "c":
                var sortFun = function (a, b) {
                    return a[4] - b[4];
                };
                break;
            case "d":
                var sortFun = function (a, b) {
                    return a[6] - b[6];
                };
                break;
        }
    } else {
        switch (type) {
            case "b":
                var sortFun = function (a, b) {
                    return b[2] - a[2];
                };
                break;
            case "c":
                var sortFun = function (a, b) {
                    return b[4] - a[4];
                };
                break;
            case "d":
                var sortFun = function (a, b) {
                    return b[6] - a[6];
                };
                break;

        }
    }
    ranking.sort(sortFun);
    $("#categories").html("");
    for (var i = 0; i < ranking.length; i++) {
        $("#categories").append("<tr id='" + i + "'><td class=\"tablerow\">" + ranking[i][0] + "</td><td><span>" + ranking[i][1] + "</span><span>" + ranking[i][2] + "</span></td><td id='tableNumber'><span>" + ranking[i][3] + "</span><span>" + ranking[i][3] + "</span></td><td><span>" + ranking[i][5] + "</span><span>" + ranking[i][6] + "</span></td></tr>");
        /*$("tr[id='" + i + "']").bind("click", function () {
         layer.load(2);
         if (sessionStorage.type == "region") {
         sessionStorage.areaname = $(this).find(".tablerow").html();
         $(".backProject").html(">"+sessionStorage.areaname);
         var params = {
         "supporttype": sessionStorage.supporttype,
         "areaname": sessionStorage.areaname
         };
         $.post("http://"+localStorage.location+"/fiwechat/countbyproject", params, function (data) {
         Resolve_2016 = eval(data.resolvedCnts_2016.join('+'));
         unResolve_2016 = eval(data.unresolvedCnts_2016.join('+'));
         zResolve_2016 =  Resolve_2016+ unResolve_2016-0;
         Resolve = eval(data.resolvedCnts.join('+'));
         unResolve = eval(data.unresolvedCnts.join('+'));
         zResolve =  Resolve+ unResolve-0;
         draw(data);
         layer.closeAll();
         });

         sessionStorage.type = "project";
         return 0;
         } else if (sessionStorage.type == "project") {
         sleep(100);
         sessionStorage.project = $(this).find(".tablerow").html();
         $(".field").html(">"+sessionStorage.project);
         var params = {
         "supporttype": sessionStorage.supporttype,
         "areaname": sessionStorage.areaname,
         "projectname": sessionStorage.project,
         };
         $.post("http://"+localStorage.location+"/fiwechat/countbyfield", params, function (data) {
         Resolve_2016 = eval(data.resolvedCnts_2016.join('+'));
         unResolve_2016 = eval(data.unresolvedCnts_2016.join('+'));
         zResolve_2016 =  Resolve_2016+ unResolve_2016-0;
         Resolve = eval(data.resolvedCnts.join('+'));
         unResolve = eval(data.unresolvedCnts.join('+'));
         zResolve =  Resolve+ unResolve-0;
         draw(data);
         layer.closeAll();
         });

         sessionStorage.type = "field";
         return 0;
         }
         layer.closeAll();

         });*/
    }

}
var Resolve_2017;
var Resolve;
var unResolve_2017;
var unResolve;
var zResolve_2017;
var zResolve;
function init() {
    sessionStorage.type = 'region';
    sessionStorage.supporttype = "bug";
    sessionStorage.pieTitle = "Bug";
    var params = {
        "supporttype": "bug"
    };
    $.post(localStorage.location + "countbyareaname", params, function (data) {
        sessionStorage.supporttype = "bug";
        Resolve_2017 = eval(data.resolvedCnts_2017.join('+'));
        unResolve_2017 = eval(data.unresolvedCnts_2017.join('+'));
        zResolve_2017 = Resolve_2017 + unResolve_2017 - 0;
        Resolve = eval(data.resolvedCnts.join('+'));
        unResolve = eval(data.unresolvedCnts.join('+'));
        zResolve = Resolve + unResolve - 0;
        draw(data);
    });
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}


/**
 * @license Highcharts JS v5.0.0 (2016-09-29)
 *
 * (c) 2009-2016 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function (Highcharts) {
    (function (Highcharts) {
        /**
         * (c) 2010-2016 Torstein Honsi
         *
         * License: www.highcharts.com/license
         *
         * Grid-light theme for Highcharts JS
         * @author Torstein Honsi
         */

        'use strict';
        /* global document */
        // Load the fonts
        Highcharts.createElement('link', {
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

        Highcharts.theme = {
            colors: ['#9ACD32', '#EE6363', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
            ],
            chart: {
                backgroundColor: null,
                style: {
                    fontFamily: 'Dosis, sans-serif'
                }
            },
            title: {
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }
            },
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'rgba(219,219,216,0.8)',
                shadow: false
            },
            legend: {
                itemStyle: {
                    fontWeight: 'bold',
                    fontSize: '13px'
                }
            },
            xAxis: {
                gridLineWidth: 1,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yAxis: {
                minorTickInterval: 'auto',
                title: {
                    style: {
                        textTransform: 'uppercase'
                    }
                },
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            plotOptions: {
                candlestick: {
                    lineColor: '#404048'
                }
            },


            // General
            background2: '#F0F0EA'

        };

        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);

    }(Highcharts));
}));
function peiFun(piedata) {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: '已解决' + sessionStorage.pieTitle,
            floating: true
        },
        tooltip: {
            pointFormat: ' <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    useHTML: true, // 一定要加上
                    formatter: function () {
                        return "<b style='max-width: 60px; font-size:10px; display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + this.point.name + "</b><br/><b>" + this.point.percentage.toFixed(2) + "%</b>";
                        // 重点在white-space:pre-wrap
                    },
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },

                events: {
                    click: function (e) {
                        /*layer.load(2);
                         if (sessionStorage.type == "region") {
                         sessionStorage.areaname = name[e.point.x];
                         $(".backProject").html(">"+sessionStorage.areaname);
                         var params = {
                         "supporttype": sessionStorage.supporttype,
                         "areaname": name[e.point.x]
                         };
                         $.post("http://"+localStorage.location+"/fiwechat/countbyproject", params, function (data) {
                         Resolve = eval(data.resolvedCnts.join('+'));
                         unResolve = eval(data.unresolvedCnts.join('+'));
                         zResolve =  Resolve+ unResolve-0;
                         draw(data);
                         layer.closeAll();
                         });
                         sessionStorage.type = "project";

                         return 0;
                         } else if (sessionStorage.type == "project") {
                         //sleep(300);
                         sessionStorage.project = name[e.point.x];
                         $(".field").html(">"+sessionStorage.project);
                         var params = {
                         "supporttype": sessionStorage.supporttype,
                         "areaname": sessionStorage.areaname,
                         "projectname": sessionStorage.project,
                         };
                         $.post("http://"+localStorage.location+"/fiwechat/countbyfield", params, function (data) {
                         Resolve = eval(data.resolvedCnts.join('+'));
                         unResolve = eval(data.unresolvedCnts.join('+'));
                         zResolve =  Resolve+ unResolve-0;
                         draw(data);
                         layer.closeAll();
                         });
                         sessionStorage.type = "field";
                         return 0;
                         }
                         layer.closeAll();*/
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '',
            data: piedata
        }]

    }
}