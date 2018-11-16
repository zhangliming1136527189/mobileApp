$(function() {
	sessionStorage.grouptype = 1;
	sessionStorage.historyGrouptype = "";
	sessionStorage.title = "大区";
	sessionStorage.data = localStorage.data;
	sessionStorage.userid = localStorage.userid;
	sessionStorage.groupid = localStorage.groupid;
	localStorage.data = "";
	localStorage.userid = "";
	localStorage.groupid = "";

	//刚刚载入页面时画的图
	updateChartSize();

	//画图

	//sessionStorage.data = "电脑电脑电脑电脑电脑电脑电1脑电脑电脑电脑电脑电脑电脑电^4516^654^789;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689;手机手机^5516^354^689";
	//sessionStorage.data="";
	if (sessionStorage.data) {
		var data = strToArr(sessionStorage.data);
		//默认itemid
		sessionStorage.itemid = data[0][3];
	} else {
		var data = "";
	}
	draw(data);

	//滚动条

	$("#title").html(sessionStorage.title);
	//内容区content
	$("#um-list-pie").on("click", function() {
		$("#pie").show().siblings().hide();
		UM.sidebar.close();
	});
	$("#um-list-bar").on("click", function() {
		$("#column").show().siblings().hide();
		UM.sidebar.close();
	});
	$("#um-list-list").on("click", function() {
		$("#table").show().siblings().hide();
		UM.sidebar.close();
	});
	$("#um-list-statsup").on("click", function() {
		$("#line").show().siblings().hide();
		UM.sidebar.close();
	});

	//脚部区域footer
	var date = new Date();
	var YY = date.getFullYear();
	var MM = date.getMonth() + 1;
	var day = date.getDate() - 1;
	if (day == 0) {
		MM--;
		if (MM == 0) {
			YY--;
			MM = 12;
			day = getDays(YY, MM);
		} else {
			if (MM < 10) {
				MM = "0" + parseInt(MM);
			}
			day = getDays(YY, MM);
		}
	}
	if (MM < 10) {
		MM = "0" + parseInt(MM);
	}
	if (day < 10) {
		day = "0" + parseInt(day);
	}
	var yesterday = YY + "-" + MM + "-" + day;
	// var yesterday="2016-06-23";
	var id = ["", "", "", "", ""];
	sessionStorage.str = $("#temp").html();
	$("#foot a").on("click", function() {
		$("#temp").html(sessionStorage.str);
		$("#up,#down").hide();
		$("#back").hide();
		switch($(this).attr("id")) {
		case "item0":
			sessionStorage.title = "大区";
			var grouptype = 1;
			break;
		case "item1":
			sessionStorage.title = "项目";
			var grouptype = 2;
			break;
		case "item2":
			sessionStorage.title = "领域";
			var grouptype = 3;
			break;
		}
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		$("#title").html(sessionStorage.title);
		qry(grouptype, id, $("#date").val());
		sessionNULL();
		sessionStorage.grouptype = grouptype;
		$("#temp ul li a").each(function() {
			if ($(this).text() == sessionStorage.title) {
				$(this).closest("li").empty();
			}
		});
		$("#pop").popover("destroy");
		$("#pop").popover({
			content : $("#temp").html(),
			width : 140,
			animation : "pop",
			delay : {
				show : 100,
				hide : 100
			}
		});
	});
	//弹出框
	$("#temp ul li a").each(function() {
		if ($(this).text() == sessionStorage.title) {
			$(this).closest("li").remove();
		}
	});
	$("#pop").popover({
		content : document.getElementById("temp").innerHTML,
		width : 140,
		animation : "pop",
		delay : {
			show : 100,
			hide : 100
		}
	});
	$("#arrow").on("click", function() {
		if ($(this).hasClass("action")) {
			$(".um-footer").animate({
				bottom : '-51px'
			}, 200, "linear");
			$(this).removeClass("action ti-angle-double-down").addClass("ti-angle-double-up");
		} else {
			$(".um-footer").animate({
				bottom : '0px'
			}, 200, "linear");
			$(this).addClass("action ti-angle-double-down").removeClass("ti-angle-double-up");
		}
	});

	$("#item5").on("click", function() {
		//window.location = "settings.html";
		summer.openWin({
			id : 'settings',
			url : 'html/settings.html'
		});
	});

	$("#btn-header-left").on("click", function openLeftSidebar() {
		UM.sidebar.open('#left_sidebar', "left");
	})
	//日历实现
	var _date = document.getElementById('date');
	var left = document.getElementById('left');
	var right = document.getElementById('right');
	left.onclick = function() {
		day--;
		if (day < 1) {
			MM--;
			if (MM < 10) {
				MM = "0" + parseInt(MM);
			}
			if (MM < 1) {
				MM = 12;
				YY--;
			}
			day = getDays(YY, MM);

		}
		if (MM < 10) {
			MM = "0" + parseInt(MM);
		}
		if (day < 10) {
			day = "0" + parseInt(day);
		}
		_date.value = YY + "-" + MM + "-" + day;
		qry3(sessionStorage.grouptype, getID(), _date.value);

	};
	right.onclick = function click_right() {
		var Day = date.getDate();
		var yy = date.getFullYear();
		var mm = date.getMonth() + 1;
		//今天
		if (MM < 10) {
			MM = "0" + parseInt(MM);
		}
		var days = getDays(YY, MM);

		if (Day != 1 && day == Day - 1 && MM == mm && YY == yy) {
			datePicker.open();
		} else if (Day == 1 && day == days && MM == mm - 1 && YY == yy) {
			datePicker.open();
		} else if (Day == 1 && day == 31 && mm == 1 && YY == yy - 1 && MM == 12) {
			datePicker.open();
		} else {
			day++;
			if (day > days) {
				day = "01";
				if (MM == 12) {
					MM = "01";
					YY++;
				} else {
					MM++;

				}
			}
			if (MM < 10) {
				MM = "0" + parseInt(MM);
			}
			if (day < 10) {
				day = "0" + parseInt(day);
			}
			_date.value = YY + "-" + MM + "-" + day;
			qry3(sessionStorage.grouptype, getID(), _date.value);

		}
	};

	//	document.write(getDays(2012,6));
	//  给input 赋初始值
	_date.value = yesterday;
	//	弹出框赋值
	var datePicker = new window.DatePicker({
		confirmCbk : function(data) {
			var Day = date.getDate();
			var yy = date.getFullYear();
			var mm = date.getMonth() + 1;
			//今天
			if ((data.year == yy && data.month == mm && data.day > Day - 1) || (data.year == yy && data.month > mm) || (data.year > yy)) {
				if (Day == 1) {
					if (mm == 1) {
						YY = yy - 1;
						MM = 12;
						day = 31;
					} else {
						YY = yy;
						MM = mm - 1;
						if (MM < 10) {
							MM = "0" + parseInt(MM);
						}
						day = getDays(YY, MM);
					}
				} else {
					day = Day - 1;
					YY = yy;
					MM = mm;
				}
				alert("日期超出查询范围！");
			} else {
				day = data.day;
				YY = data.year;
				MM = data.month;
			}
			if (MM < 10) {
				MM = "0" + parseInt(MM);
			}
			if (day < 10) {
				day = "0" + parseInt(day);
			}
			_date.value = YY + '-' + MM + '-' + day;
			qry3(sessionStorage.grouptype, getID(), _date.value);

		}
	});
	_date.onfocus = function(e) {
		_date.blur();
		datePicker.open();
	};
})
function qry(grouptype, id, qrydate) {//id=[productlineid,brandid,channeltypeid,saleorgid,customerid]
	layer.msg('正在加载', {
		icon : 16
	});
	var myParam = {
		"userid" : sessionStorage.userid,
		"groupid" : sessionStorage.groupid,
		"grouptype" : grouptype,
		"productlineid" : id[0],
		"brandid" : id[1],
		"channeltypeid" : id[2],
		"saleorgid" : id[3],
		"customerid" : id[4],
		"qrydate" : qrydate
	}
	$service.callAction({
		"viewid" : "salesanalysis.controller.NCSalesAnalysisController", //后台带包名的Controller名
		"action" : "qryDayAnalysis", //方法名,
		"callback" : "successQry()", //请求回来后执行的ActionID
		"error" : "errorCallNC()", //失败回调的ActionId
		"autoDataBinding" : false,
		"timeout" : "60000",
		"sync" : "true",
		"myParam" : myParam,
		"contextmapping" : "list_dailyreport_fromnc"	// 查询回来的数据存储在此字段中
	});
}

function successQry(args) {
	layer.closeAll();
	
	if ($summer.os == "android") {
		var des=$stringToJSON(args)['resultctx'][0]['des'];
		var saledatalist=$stringToJSON(args)['resultctx'][0]['saledatalist'];
	} else if ($summer.os == "ios") {
		var des=$stringToJSON(args)[0]['des'];
		var saledatalist=$stringToJSON(args)[0]['saledatalist'];
	}
	
	if (des) {
		sessionStorage.data = "";
	} else if (saledatalist) {
		var saledata = saledatalist;
		var data = "";
		for (var i = 0; i < saledata.length; i++) {
			if (data == "") {
				var sep = "";
			} else {
				var sep = ";"
			}
			data = data + sep + saledata[i]['itemname'] + "^" + saledata[i]['money'] + "^" + saledata[i]['amount'] + "^" + saledata[i]['itemid'];
		}
		sessionStorage.data = data;
	} else {
		layer.alert(args, {
			icon : 5
		});
		return 0;
	}
	if (sessionStorage.data) {
		var data = strToArr(sessionStorage.data);
		//默认itemid
		sessionStorage.itemid = data[0][3];
		$("#detail").html(data[0][0] + "销售金额：" + setDemical(data[0][1]));
	} else {
		var data = "";
	}

	draw(data);
	if (sessionStorage.historyGrouptype.length == 4 || data == "") {
		$("#pop").hide();
	} else {
		$("#pop").show();
	}

}

function errorCallNC(args) {
	layer.closeAll();
	layer.alert(args, {
		icon : 5
	});
}

function qry2(grouptype, id, qrydate) {//获取上个页面的数据，以此形成上下箭头和后退箭头
	var myParam = {
		"userid" : sessionStorage.userid,
		"groupid" : sessionStorage.groupid,
		"grouptype" : grouptype,
		"productlineid" : id[0],
		"brandid" : id[1],
		"channeltypeid" : id[2],
		"saleorgid" : id[3],
		"customerid" : id[4],
		"qrydate" : qrydate
	}
	$service.callAction({
		"viewid" : "salesanalysis.controller.NCSalesAnalysisController", //后台带包名的Controller名
		"action" : "qryDayAnalysis", //方法名,
		"callback" : "successQry2()", //请求回来后执行的ActionID
		"error" : "errorCallNC2()", //失败回调的ActionId
		"autoDataBinding" : false,
		"timeout" : "60000",
		"sync" : "true",
		"myParam" : myParam,
		"contextmapping" : "list_dailyreport_fromnc"	// 查询回来的数据存储在此字段中
	});
}

function errorCallNC2(args) {
	layer.alert(args, {
		icon : 5
	});
}

function successQry2(args) {//根据上个页面的数据创建箭头
	if (sessionStorage.historyGrouptype == "") {//如果是第一个页面
		$("#back,#up,#down").hide();
		//隐藏所有箭头
		switch(sessionStorage.grouptype) {//根据grouptype改title
		case "1":
			$("#title").html("产品线");
			break;
		case "2":
			$("#title").html("品牌");
			break;
		case "3":
			$("#title").html("销售渠道");
			break;
		case "4":
			$("#title").html("销售组织");
			break;
		case "5":
			$("#title").html("客户");
			break;
		}
	} else {//不是第一个页面
	
		if ($summer.os == "android") {
			var des=$stringToJSON(args)['resultctx'][0]['des'];
			var saledatalist=$stringToJSON(args)['resultctx'][0]['saledatalist'];
		} else if ($summer.os == "ios") {
			var des=$stringToJSON(args)[0]['des'];
			var saledatalist=$stringToJSON(args)[0]['saledatalist'];
		}
	
		if (des || sessionStorage.data == "") {//上个页面没有值或者这个页面没有值
			$("#back,#up,#down").hide();
			//隐藏所有箭头
		} else if (saledatalist) {//上个页面有值
			var saledata = saledatalist;
			var data = "";
			for (var i = 0; i < saledata.length; i++) {
				if (data == "") {
					var sep = "";
				} else {
					var sep = ";"
				}
				data = data + sep + saledata[i]['itemname'] + "^" + saledata[i]['money'] + "^" + saledata[i]['amount'] + "^" + saledata[i]['itemid'];
			}
			//得到上个页面的数据
			sessionStorage.historyData = data;

			data = strToArr(data);
			$("#back").show();
			var length = data.length;
			$("#up,#down").show();
			for (var i = 0; i < length; i++) {
				if (data[i][3] == sessionStorage.itemidHistory) {
					//标题回到上个页面的状态
					$("#title").html(data[i][0]);
					sessionStorage.i = i;
					if (i == 0) {
						$("#up").hide();
					}
					if (i == (length - 1)) {
						$("#down").hide();
					}
				}
			}

		} else {
			layer.alert(args, {
				icon : 5
			});
			return 0;
		}
	}

}

function qry3(grouptype, id, qrydate) {
	layer.msg('正在加载', {
		icon : 16
	});
	var myParam = {
		"userid" : sessionStorage.userid,
		"groupid" : sessionStorage.groupid,
		"grouptype" : grouptype,
		"productlineid" : id[0],
		"brandid" : id[1],
		"channeltypeid" : id[2],
		"saleorgid" : id[3],
		"customerid" : id[4],
		"qrydate" : qrydate
	}
	$service.callAction({
		"viewid" : "salesanalysis.controller.NCSalesAnalysisController", //后台带包名的Controller名
		"action" : "qryDayAnalysis", //方法名,
		"callback" : "successQry3()", //请求回来后执行的ActionID
		"error" : "errorCallNC3()", //失败回调的ActionId
		"autoDataBinding" : false,
		"timeout" : "60000",
		"sync" : "true",
		"myParam" : myParam,
		"contextmapping" : "list_dailyreport_fromnc"	// 查询回来的数据存储在此字段中
	});
}

function successQry3(args) {
	layer.closeAll();
	
	if ($summer.os == "android") {
		var des=$stringToJSON(args)['resultctx'][0]['des'];
		var saledatalist=$stringToJSON(args)['resultctx'][0]['saledatalist'];
	} else if ($summer.os == "ios") {
		var des=$stringToJSON(args)[0]['des'];
		var saledatalist=$stringToJSON(args)[0]['saledatalist'];
	}
	
	if (des) {
		sessionStorage.data = "";
	} else if (saledatalist) {
		var saledata = saledatalist;
		var data = "";
		for (var i = 0; i < saledata.length; i++) {
			if (data == "") {
				var sep = "";
			} else {
				var sep = ";"
			}
			data = data + sep + saledata[i]['itemname'] + "^" + saledata[i]['money'] + "^" + saledata[i]['amount'] + "^" + saledata[i]['itemid'];
		}
		sessionStorage.data = data;
	} else {
		layer.alert(args, {
			icon : 5
		});
		return 0;
	}
	if (sessionStorage.data) {
		var data = strToArr(sessionStorage.data);
		//默认itemid
		sessionStorage.itemid = data[0][3];
		$("#detail").html(data[0][0] + "销售金额：" + setDemical(data[0][1]));
	} else {
		var data = "";
	}

	draw(data);
	if (sessionStorage.historyGrouptype.length == 4 || data == "") {
		$("#pop").hide();
	} else {
		$("#pop").show();
	}
	var historyGrouptype = sessionStorage.historyGrouptype.slice(-1);
	var id = getID();
	sessionStorage.itemidHistory = id[historyGrouptype - 1];
	id[historyGrouptype - 1] = "";
	qry2(historyGrouptype, id, $("#date").val());
}

function errorCallNC3(args) {
	layer.closeAll();
	layer.alert(args, {
		icon : 5
	});
}

function strToArr(data) {
	// alert(sessionStorage.data);
	//var data = "手机^123^321^111;手机^123^321^111";

	var arr = [];
	var arr1 = data.split(";");
	for (var i = 0; i < arr1.length; i++) {
		var arr2 = arr1[i].split("^");
		arr[i] = new Array();
		arr[i][0] = arr2[0];
		arr[i][1] = parseFloat(arr2[1]);
		arr[i][2] = arr2[2];
		arr[i][3] = arr2[3];
	}
	return arr;
}

function sessionNULL() {
	sessionStorage.pid = "";
	sessionStorage.bid = "";
	sessionStorage.ctid = "";
	sessionStorage.sid = "";
	sessionStorage.cid = "";
	sessionStorage.historyData = "";
	sessionStorage.historyGrouptype = "";
	sessionStorage.itemidHistory = "";
}

function getID() {//获取要传到后台的各个id
	var pid = sessionStorage.pid ? sessionStorage.pid : "";
	//产品线时点击的itemid
	var bid = sessionStorage.bid ? sessionStorage.bid : "";
	//品牌时点击的itemid
	var ctid = sessionStorage.ctid ? sessionStorage.ctid : "";
	var sid = sessionStorage.sid ? sessionStorage.sid : "";
	var cid = sessionStorage.cid ? sessionStorage.cid : "";
	return [pid, bid, ctid, sid, cid];
}

function setID(status, itemid) {//给传去后台的参数赋值
	switch(status) {
	case "5":
		sessionStorage.cid = itemid;
		break;
	case "2":
		sessionStorage.bid = itemid;
		break;
	case "4":
		sessionStorage.sid = itemid;
		break;
	case "3":
		sessionStorage.ctid = itemid;
		break;
	case "1":
		sessionStorage.pid = itemid;
		break;
	}
}

function getIdHistory() {
	if (sessionStorage.historyGrouptype != "") {
		var id = getID();
		switch(sessionStorage.historyGrouptype.slice(-1)) {
		case "1":
			id[0] = "";
			break;
		case "2":
			id[1] = "";
			break;
		case "3":
			id[2] = "";
			break;
		case "4":
			id[3] = "";
			break;
		case "5":
			id[4] = "";
			break;

		}
		return id;
	} else {
		return undefined;
	}
}

function setDemical(num) {
	if (num.toString().split(".")[1] && num.toString().split(".")[1] < 9) {
		toFixedMoney = num.toFixed(2);
	} else if (!num.toString().split(".")[1]) {
		toFixedMoney = num.toFixed(2);
	} else {
		toFixedMoney = num;
	}
	return toFixedMoney;
}

function draw(data) {
	// var data="";
	$("#pop").show();
	if (!data) {
		$("#pop").hide();
		var html = "<span class='html'>当前页面无数据！</span>";
		$("#pie,#column,#line,#table").html(html);
		$("#detail").html("");
		return 0;
	} else {
		for (var i = 0; i < data.length; i++) {
			if (data[i][1] >= 0) {
				$("#detail").html(data[i][0] + "销售金额：" + setDemical(data[i][1]));
				break;
			} else {
				$("#detail").html("");
			}
		}
	}

	//饼状图
	var shortData = ''
	for (var i = 0; i < data.length; i++) {
		if (!shortData) {
			var sep = "";
		} else {
			var sep = ","
		}
		if (data[i][1] > 0) {
			shortData = shortData + sep + "{name:\"" + data[i][0] + "\",y:" + data[i][1] + "}";
			var msg = "";

		} else {
			var msg = "非正数金额在饼状图中未显示";
		}

	}

	shortData = "[" + shortData + "]";
	shortData = $stringToJSON(shortData);
	$('#pie').highcharts({
		plotOptions : {
			pie : {
				dataLabels : {
					enabled : true,
					useHTML : true, // 一定要加上
					formatter : function() {
						return "<b style='max-width: 60px; display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + this.point.name + "</b>";
						// 重点在white-space:pre-wrap
					}
				},
				events : {
					click : function(e) {//点的时候取itemid
						for (var i = 0; i < data.length; i++) {
							if (data[i][0] == e.point.name) {
								var sale = setDemical(data[i][1])
							}
						}

						$("#table table td:contains(" + e.point.name + ")").closest("tr").addClass("active").siblings().removeClass("active");

						$("#detail").html(e.point.name + "销售金额：" + sale);
						for (var i = 0; i < data.length; i++) {
							if (data[i][0] == e.point.name) {
								sessionStorage.itemid = data[i][3];
							}
						}
					}
				}
			}
		},
		chart : {
			type : 'pie'
		},
		title : {
			text : '<span style="font-size:16px;color:#aaa;">' + msg + '</span>'
		},
		tooltip : {
			pointFormat : '{point.percentage:.2f}%'
		},
		series : [{
			type : 'pie',
			name : '销售金额',
			data : shortData

		}]
	});

	//柱状图
	var categories = [];
	for (var i = 0; i < data.length; i++) {
		categories[i] = data[i][0];
	}
	var data2 = [];
	for (var i = 0; i < data.length; i++) {
		data2[i] = data[i][1];
	}
	$('#column').highcharts({
		plotOptions : {
			column : {
				events : {
					click : function(e) {//点的时候取itemid
						var name = categories[e.point.x];
						$("#table table td:contains(" + name + ")").closest("tr").addClass("active").siblings().removeClass("active");
						$("#detail").html(name + "销售金额：" + setDemical(e.point.y));
						for (var i = 0; i < data.length; i++) {
							if (data[i][0] == name) {
								sessionStorage.itemid = data[i][3];
							}
						}
					}
				}
			}
		},
		chart : {
			type : 'column'
		},
		title : {
			text : '' //指定图表标题
		},
		xAxis : {
			categories : categories //指定x轴分组
		},
		yAxis : {
			title : {
				text : '' //指定y轴的标题
			}
		},
		tooltip : {
			pointFormat : '<b>{point.y}</b><br/>'
		},
		legend : {
			enabled : false
		},
		series : [{
			name : '销售金额',
			data : data2
		}]
	});

	//列表
	$("#table").html("");
	var appendStr = "<table><tr><th></th><th></th><th></th></tr></table>";
	$("#table").append(appendStr);
	$("#table table th:nth-child(1)").html(sessionStorage.title);
	$("#table table th:nth-child(2)").html("销售数量");
	$("#table table th:nth-child(3)").html("销售金额");
	for (var i = 0; i < data.length; i++) {
		appendStr = "<tr><td>" + categories[i] + "</td><td>" + data[i][2] + "</td><td style='text-align:right;'>" + setDemical(data2[i]) + "</td></tr>";
		$("#table table").append(appendStr);
	}
	$("#table table tr:nth-of-type(2)").addClass("active");
	$("#table table tr td").on("click", function() {
		$(this).closest("tr").addClass("active").siblings().removeClass("active");
		var firstTd = $(this).closest("tr").find("td:nth-of-type(1)");
		$("#detail").html(firstTd.html() + "销售金额：" + setDemical(parseFloat(firstTd.closest("tr").find("td:nth-child(3)").html())));
		for (var i = 0; i < data.length; i++) {
			if (data[i][0] == firstTd.html()) {
				sessionStorage.itemid = data[i][3];
			}
		}
	});
	//折线图
	$('#line').highcharts({
		plotOptions : {
			line : {
				events : {
					click : function(e) {//点的时候取itemid
						var name = categories[e.point.x];
						$("#table table td:contains(" + name + ")").closest("tr").addClass("active").siblings().removeClass("active");
						$("#detail").html(name + "销售金额：" + setDemical(e.point.y));
						for (var i = 0; i < data.length; i++) {
							if (data[i][0] == name) {
								sessionStorage.itemid = data[i][3];
							}
						}
					}
				}
			}
		},
		chart : {
			type : 'line'
		},
		title : {
			text : '' //指定图表标题
		},
		xAxis : {
			categories : categories //指定x轴分组
		},
		yAxis : {
			title : {
				text : '' //指定y轴的标题
			}
		},
		tooltip : {
			pointFormat : '<b>{point.y}</b><br/>'
		},
		legend : {
			enabled : false
		},
		series : [{
			name : '销售金额',
			data : data2
		}]
	});
}