$(function () {
    var width = ($("#draw-type ul").width() - 2) / 3;
    $("#draw-type ul li").width(width);
    init();
    $("#lookBug").bind("click", function () {
        $(".backProject").html("");
        $(".field").html("");
        sessionStorage.type = 'region';
        sessionStorage.supporttype = "bug";
        sessionStorage.pieTitle = "Bug";
        k1 = false;
        k2 = true;
        k3 = false;
        var params = {
            "supporttype": "bug"
        };
        $.post(localStorage.location + "countbyareaname", params, function (data) {
            sessionStorage.paixu = JSON.stringify(data);
            sessionStorage.supporttype = "bug";
            paixu(1, 'big')
        });
    });
    $("#lookNeeds").bind("click", function () {
        $(".backProject").html("");
        $(".field").html("");
        sessionStorage.type = 'region';
        sessionStorage.supporttype = "demand";
        sessionStorage.pieTitle = "需求";
        k1 = false;
        k2 = true;
        k3 = false;
        var params = {
            "supporttype": "demand"
        };
        $.post(localStorage.location + "countbyareaname", params, function (data) {
            sessionStorage.paixu = JSON.stringify(data);
            paixu(1, 'big')
        });
    });
    $("#table-type").bind("click", function () {
        $("#table").css({"display": "block"}).siblings().css({"display": "none"});
        k1 = false;
        k2 = true;
        k3 = false;
        paixu(1, 'big')
        /*sessionStorage.sorts = "table";*/
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
        $(this).css({"background": "#00a1ea", "color": "#fff"}).siblings().css({"background": "#eee", "color": "#000"})
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
        $("#pie-2017").hide();
        $("#pie-2016").hide();
        $("#pie-2018").show();
    })
    $(".backProject").on("click", function () {
        $(".field").html("");
        k1 = false;
        k2 = true;
        k3 = false;
        var params = {
            "supporttype": sessionStorage.supporttype,
            "areaname": sessionStorage.areaname,
        };
        $.post(localStorage.location + "countbyproject", params, function (data) {
            sessionStorage.paixu = JSON.stringify(data);
            paixu(1, 'big');
            sessionStorage.type = "project";
        });
    });
    $(".backArea").on("click", function () {
        $(".backProject").html("");
        $(".field").html("");
        $("#back").css({"display": "none"});
        k1 = false;
        k2 = true;
        k3 = false;
        var params = {
            "supporttype": sessionStorage.supporttype,
        };
        $.post(localStorage.location + "countbyareaname", params, function (data) {
            sessionStorage.paixu = JSON.stringify(data);
            paixu(1, 'big');
        });
        sessionStorage.type = "region";
        return 0;
    });

});

function draw(args) {
    var piedata = [];
    var piedata_2016 = [];
    var piedata_2017 = [];
    var name = args.areanames || args.projectnames || args.fields;
    var resolvedCnts = args.resolvedCnts;
    var resolvedCnts_2017 = args.resolvedCnts_2017;
    var resolvedCnts_2016 = args.resolvedCnts_2016;
    var unresolvedCnts = args.unresolvedCnts;
    var unresolvedCnts_2017 = args.unresolvedCnts_2017;
    var unresolvedCnts_2016 = args.unresolvedCnts_2016;
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
    $('#pie-2016').highcharts(createPie(piedata_2016))
    $('#pie-2017').highcharts(createPie(piedata_2017))
    $('#pie-2018').highcharts(createPie(piedata))
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
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                },

                // events: {
                //     click: function (e) {
                //         layer.load(2);
                //         if (sessionStorage.type == "region") {
                //             sessionStorage.areaname = e.point.category;
                //             $(".backProject").html(">"+sessionStorage.areaname);
                //             var params = {
                //                 "supporttype": sessionStorage.supporttype,
                //                 "areaname": sessionStorage.areaname
                //             };
                //             $.post(localStorage.location+"countbyproject", params, function (data) {
                //                 Resolve = eval(data.resolvedCnts.join('+'));
                //                 unResolve = eval(data.unresolvedCnts.join('+'));
                //                 zResolve =  Resolve+ unResolve-0;
                //                 sessionStorage.paixu = JSON.stringify(data);
                //                 draw(data);
                //                 layer.closeAll();
                //             });
                //             sessionStorage.type = "project";
                //
                //             return 0;
                //         } else if (sessionStorage.type == "project") {
                //             sessionStorage.project = e.point.category;
                //             $(".field").html(">"+sessionStorage.project);
                //             var params = {
                //                 "supporttype": sessionStorage.supporttype,
                //                 "areaname": sessionStorage.areaname,
                //                 "projectname": sessionStorage.project,
                //             };
                //             $.post(localStorage.location+"countbyfield", params, function (data) {
                //                 Resolve = eval(data.resolvedCnts.join('+'));
                //                 unResolve = eval(data.unresolvedCnts.join('+'));
                //                 zResolve =  Resolve+ unResolve-0;
                //                 sessionStorage.paixu = JSON.stringify(data);
                //                 draw(data);
                //                 layer.closeAll();
                //             });
                //             sessionStorage.type = "field";
                //
                //             return 0;
                //         }
                //         layer.closeAll();
                //     }
                // }
            }
        },
        series: [
        {
                name: '2018已解决',
                data: resolvedCnts,
                stack: '2018'
            },
            {
                name: '2018未解决',
                data: unresolvedCnts,
                stack: '2018',
                visible:false
            },
            {
                name: '2017已解决',
                data: resolvedCnts_2017,
                stack: '2017',
                visible:false
            },
            {
                name: '2017未解决',
                data: unresolvedCnts_2017,
                stack: '2017',
                visible:false
            },
            {
                name: '2016已解决',
                data: resolvedCnts_2016,
                stack: '2016',
                visible:false
            }, {
                name: '2016未解决',
                data: unresolvedCnts_2016,
                stack: '2016',
                visible:false
            },
        ],
    });
    $("#table #table-detail").html("");
    //rules='rows
    if (sessionStorage.supporttype == "bug") {
        $("#table-detail").append("<div class='classify'>" +
            "<span class='classify_A'>分类<br>&nbsp;</span>" +
            "<span class='classify_B'><p>Bug总数</p><p><span class='z_2016'>(" + zResolve_2017 + ")</span><span  class='z_2017'>(" + zResolve + ")</span></p>" +
            "<div class='paixu'><span class='toBig_1'></span></span></div>" +
            "</span>" +

            "<span class='classify_C'><p>已解决</p><p><span class='z_2016'>(" + Resolve_2017 + ")</span><span class='z_2017'>(" + Resolve + ")</span></p>" +
            "<div class='paixu'><span class='toBig_2'></span></span></div>" +
            "</span>" +

            "<span class='classify_D'><p>未解决</p><p><span class='z_2016'>(" + unResolve_2017 + ")</span><span class='z_2017'>(" + unResolve + ")</span></p>" +
            "<div class='paixu'><span class='toBig_3'></span></span></div>" +
            "</span>" +

            "</div>" +

            "<div class='tableMain'><table id='categories' border='1' cellspacing='0' cellpadding='0' style='background:#e9eaec;border-color:#fefefe'></table></div>");


    } else if (sessionStorage.supporttype == "demand") {
        $("#table-detail").append("<div class='classify'>" +

            "<span  class='classify_A'>分类<br>&nbsp;</span>" +

            "<span  class='classify_B'><p>需求总数</p><p><span class='z_2016'>(" + zResolve_2017 + ")</span><span class='z_2017'>(" + zResolve + ")</span></p>" +
            "<div class='paixu'><span class='toBig_1'></span></span></div>" +
            "</span>" +

            "<span class='classify_C'><p>已解决</p><p><span class='z_2016'>(" + Resolve_2017 + ")</span><span class='z_2017'>(" + Resolve + ")</span></p>" +
            "<div class='paixu'><span class='toBig_2'></span></span></div>" +
            "</span>" +

            "<span class='classify_D'><p>未解决</p><p><span class='z_2016'>(" + unResolve_2017 + ")</span><span class='z_2017'>(" + unResolve + ")</span></p>" +
            "<div class='paixu'><span class='toBig_3'></span></span></div>" +
            "</span>" +

            "</div>" +

            "<div class='tableMain'><table  id='categories' border='1' cellspacing='0' cellpadding='0' style='background:#e9eaec;border-color:#fefefe'></table></div>");
    }
    for (var j = 0; j < name.length; j++) {
        var sum_2017 = resolvedCnts_2017[j] + unresolvedCnts_2017[j];
        var sum_2018 = resolvedCnts[j] + unresolvedCnts[j];
        if (j % 2 == 0) {
            $("#table-detail table").append("<tr id='" + j + "' style='background:#fefefe'><td class=\"tablerow\">" + name[j] + "</td><td class=\"bugTd\"><span class=\"bugTd_2016\">" + sum_2017 + "</span><span class=\"bugTd_2017\">" + sum_2018 + "</span></td><td class='tableNumber'><span class=\"bugTd_2016\">" + resolvedCnts_2017[j] + "</span><span class=\"bugTd_2017\">" + resolvedCnts[j] + "</span></td><td><span class=\"bugTd_2016\">" + unresolvedCnts_2017[j] + "</span><span class=\"bugTd_2017\">" + unresolvedCnts[j] + "</span></td></tr>");
        } else {
            $("#table-detail table").append("<tr id='" + j + "' style='background:#e9eaec'><td class=\"tablerow\">" + name[j] + "</td><td class=\"bugTd\"><span class=\"bugTd_2016\">" + sum_2017 + "</span><span class=\"bugTd_2017\">" + sum_2018 + "</span></td><td class='tableNumber'><span class=\"bugTd_2016\">" + resolvedCnts_2017[j] + "</span><span class=\"bugTd_2017\">" + resolvedCnts[j] + "</span></td><td><span class=\"bugTd_2016\">" + unresolvedCnts_2017[j] + "</span><span class=\"bugTd_2017\">" + unresolvedCnts[j] + "</span></td></tr>");
        }

        // $("tr[id='" + j + "']").bind("click", function () {
        //     k1 =  false;
        //     k2 =  true;
        //     k3 =  false;
        //     if (sessionStorage.type == "region") {
        //         sessionStorage.areaname = $(this).find(".tablerow").html();
        //         $(".backProject").html(">" + sessionStorage.areaname);
        //         var params = {
        //             "supporttype": sessionStorage.supporttype,
        //             "areaname": sessionStorage.areaname
        //         };
        //         $.post(localStorage.location + "countbyproject", params, function (data) {
        //             sessionStorage.paixu = JSON.stringify(data);
        //             paixu(1,'big');
        //
        //         });
        //         sessionStorage.type = "project";
        //         return 0;
        //     } else if (sessionStorage.type == "project") {
        //         sessionStorage.project = $(this).find(".tablerow").html();
        //         $(".field").html(">" + sessionStorage.project);
        //         var params = {
        //             "supporttype": sessionStorage.supporttype,
        //             "areaname": sessionStorage.areaname,
        //             "projectname": sessionStorage.project,
        //         };
        //         $.post(localStorage.location + "countbyfield", params, function (data) {
        //             sessionStorage.paixu = JSON.stringify(data);
        //             paixu(1,'big');
        //         });
        //         sessionStorage.type = "item";
        //         return 0;
        //     }
        // });
    }
}
var Resolve;
var unResolve;
var zResolve;
var k1 = false;
var k2 = true;
var k3 = false;
function init() {
    sessionStorage.type = 'region';
    sessionStorage.supporttype = "bug";
    sessionStorage.pieTitle = "Bug";
    var params = {
        "supporttype": "bug"
    };
    $.post(localStorage.location + "countbyareaname", params, function (data) {
        var data = data;
        sessionStorage.paixu = JSON.stringify(data);
        sessionStorage.supporttype = "bug";
        paixu(1, 'big');
    });
    //===============================================

    $('body').on('click', '.classify_B', function () {    //总数
        if (k1 == false) {
            paixu(3, 'big');
            k1 = true;
            $('.toBig_1').css({
                'background': 'url("../img/arrow-down-filling.svg") no-repeat',
                'background-size': '12px',
                'display': 'block'
            })
        } else {
            paixu(3, 'small');
            k1 = false;
            $('.toBig_1').css({
                'background': 'url("../img/arrow-up-filling.svg") no-repeat',
                'background-size': '12px',
                'display': 'block'
            })
        }
        $('.toBig_2').hide();
        k2 = false;
        k3 = false;
    });
    $('body').on('click', '.classify_C', function () {            //已解决
        if (k2 == false) {
            paixu(1, 'big');
            k2 = true;
            $('.toBig_2').css({
                'background': 'url("../img/arrow-down-filling.svg") no-repeat',
                'background-size': '12px',
                'display': 'block'
            })
        } else {
            paixu(1, 'small');
            k2 = false;
            $('.toBig_2').css({
                'background': 'url("../img/arrow-up-filling.svg") no-repeat',
                'background-size': '12px',
                'display': 'block'
            })
        }
        k1 = false;
        k3 = false;
    });
    $('body').on('click', '.classify_D', function () {       //未解决
        if (k3 == false) {
            paixu(2, 'big');
            k3 = true;
            $('.toBig_3').css({
                'background': 'url("../img/arrow-down-filling.svg") no-repeat',
                'background-size': '12px',
                'display': 'block'
            })
        } else {
            paixu(2, 'small');
            k3 = false;
            $('.toBig_3').css({
                'background': 'url("../img/arrow-up-filling.svg") no-repeat',
                'background-size': '12px',
                'display': 'block'
            })
        }
        $('.toBig_2').hide();
        k1 = false;
        k2 = false;
    });

}
//===========================排序=====================
function paixu(pro, or) {     //or为big，由大到小排序；or为small，由小到大排序； pro为3 ，按总数排序；1：已解决排序；2：未解决排序；
    var data = JSON.parse(sessionStorage.paixu);
    var name = data.areanames || data.projectnames || data.fields;
    var arr = [];
    var z = 0;
    var obj = {};
    var areanames = [];
    var resolvedCnts = [];
    var unresolvedCnts = [];
    var res_2016 = [];
    var unRes_2016 = [];
    var res_2017 = [];
    var unRes_2017 = [];
    for (var i = 0; i < name.length; i++) {
        z = data.resolvedCnts[i] + data.unresolvedCnts[i];
        arr.push([name[i], data.resolvedCnts[i], data.unresolvedCnts[i], z, data.resolvedCnts_2017[i], data.unresolvedCnts_2017[i],data.resolvedCnts_2016[i], data.unresolvedCnts_2016[i]]);
    }
    if (or == 'big') {
        arr.sort(function (a, b) {
            return b[pro] - a[pro];
        });
    } else if (or == 'small') {
        arr.sort(function (a, b) {
            return a[pro] - b[pro];
        });
    }
    for (var k = 0; k < arr.length; k++) {
        areanames.push(arr[k][0]);
        resolvedCnts.push(arr[k][1]);
        unresolvedCnts.push(arr[k][2]);
        res_2017.push(arr[k][4]);
        unRes_2017.push(arr[k][5]);
        res_2016.push(arr[k][6]);
        unRes_2016.push(arr[k][7])
    }
    obj.areanames = areanames;
    obj.resolvedCnts = resolvedCnts;
    obj.unresolvedCnts = unresolvedCnts;
    obj.resolvedCnts_2017 = res_2017;
    obj.unresolvedCnts_2017 = unRes_2017;
    obj.resolvedCnts_2016 = res_2016;
    obj.unresolvedCnts_2016 = unRes_2016;

    Resolve_2016 = eval(data.resolvedCnts_2016.join('+'));
    unResolve_2016 = eval(data.unresolvedCnts_2016.join('+'));
    zResolve_2016 = Resolve_2016 + unResolve_2016 - 0;
    Resolve_2017 = eval(data.resolvedCnts_2017.join('+'));
    unResolve_2017 = eval(data.unresolvedCnts_2017.join('+'));
    zResolve_2017 = Resolve_2017 + unResolve_2017 - 0;
    Resolve = eval(data.resolvedCnts.join('+'));
    unResolve = eval(data.unresolvedCnts.join('+'));
    zResolve = Resolve + unResolve - 0;
    draw(obj);
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
            colors: ['#00bfff', '#ec7a7a', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
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
function createPie(pieData){
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width: 925
        },
        title: {
            text: '已解决' + sessionStorage.pieTitle,
        },
        tooltip: {
            pointFormat: ' <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    useHTML: true, // 一定要加上
                    formatter: function () {
                        return "<b style='max-width: 60px; display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + this.point.name + "</b><br/><b>" + this.point.percentage.toFixed(2) + "%</b>";
                        // 重点在white-space:pre-wrap
                    },
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                // events: {
                //     click: function (e) {
                //         if (sessionStorage.type == "region") {
                //             sessionStorage.areaname = name[e.point.x];
                //
                //             $(".backProject").html(">" + sessionStorage.areaname);
                //             var params = {
                //                 "supporttype": sessionStorage.supporttype,
                //                 "areaname": name[e.point.x]
                //             };
                //
                //             $.post(localStorage.location + "countbyproject", params, function (data) {
                //                 sessionStorage.paixu = JSON.stringify(data);
                //                 Resolve = eval(data.resolvedCnts.join('+'));
                //                 unResolve = eval(data.unresolvedCnts.join('+'));
                //                 zResolve = Resolve + unResolve - 0;
                //                 draw(data);
                //             });
                //             sessionStorage.type = "project";
                //             return 0;
                //         } else if (sessionStorage.type == "project") {
                //             sessionStorage.project = name[e.point.x];
                //             $(".field").html(">" + sessionStorage.project);
                //             var params = {
                //                 "supporttype": sessionStorage.supporttype,
                //                 "areaname": sessionStorage.areaname,
                //                 "projectname": sessionStorage.project,
                //             };
                //             $.post(localStorage.location + "countbyfield", params, function (data) {
                //                 sessionStorage.paixu = JSON.stringify(data);
                //                 Resolve = eval(data.resolvedCnts.join('+'));
                //                 unResolve = eval(data.unresolvedCnts.join('+'));
                //                 zResolve = Resolve + unResolve - 0;
                //                 draw(data);
                //             });
                //             sessionStorage.type = "item";
                //             return 0;
                //         }
                //     }
                // }
            }
        },
        series: [{
            type: 'pie',
            name: '',
            data: pieData
        }],
    }

}