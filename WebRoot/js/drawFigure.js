$(function() {
	//上下按钮
	$("#up").on("click", function() {
		var historyData = strToArr(sessionStorage.historyData);
		var length = historyData.length;
		sessionStorage.i--;
		if (sessionStorage.i == (length - 2)) {
			$("#down").show();
		}
		var itemid = historyData[sessionStorage.i][3];
		var title = historyData[sessionStorage.i][0];
		setID(sessionStorage.historyGrouptype.slice(-1), itemid);
		qry(sessionStorage.grouptype, getID(), $("#date").val());
		//alert("正在加载！");

		$("#title").html(title);
		if (sessionStorage.i == 0) {
			$("#up").hide();
			$("#down").show();
		}

	});
	$("#down").on("click", function() {
		var historyData = strToArr(sessionStorage.historyData);
		var length = historyData.length;
		sessionStorage.i++;
		if (sessionStorage.i == 1) {
			$("#up").show();
		}
		var itemid = historyData[sessionStorage.i][3];

		var title = historyData[sessionStorage.i][0];
		setID(sessionStorage.historyGrouptype.slice(-1), itemid);
		qry(sessionStorage.grouptype, getID(), $("#date").val());
		//alert("正在加载！");

		$("#title").html(title);
		if (sessionStorage.i == (length - 1)) {
			$("#up").show();
			$("#down").hide();
		}
	});

	//后退按钮
	$("#back").on("click", function() {
		var deleteID = sessionStorage.historyGrouptype.slice(-1);
		//上个页面的grouptype
		sessionStorage.grouptype = deleteID;

		//上个页面的数据
		switch(deleteID) {
		case "1":
			sessionStorage.title = "产品线";
			sessionStorage.pid = "";
			var _id = "pl";
			break;
		case "2":
			sessionStorage.title = "品牌";
			sessionStorage.bid = "";
			var _id = "b";
			break;
		case "3":
			sessionStorage.title = "销售渠道";
			sessionStorage.ctid = "";
			var _id = "sc";
			break;
		case "4":
			sessionStorage.title = "销售组织";
			sessionStorage.sid = "";
			var _id = "so";
			break;
		case "5":
			sessionStorage.title = "客户";
			sessionStorage.cid = "";
			var _id = "c";
			break;
		}
		
		$("#temp").html(sessionStorage.str);
		var historyGrouptype = sessionStorage.historyGrouptype.split("");
		for (var i = 0; i < historyGrouptype.length; i++) {//popover返回到上个页面的状态
			switch(historyGrouptype[i]) {
			case "1":
				var text = "产品线";
				break;
			case "2":
				var text = "品牌";
				break;
			case "3":
				var text = "销售渠道";
				break;
			case "4":
				var text = "销售组织";
				break;
			case "5":
				var text = "客户";
				break;
			}
			$("#temp ul li a").each(function() {
				if ($(this).text() == text) {
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
		}
		
		//上下箭头回到上个页面的状态
		sessionStorage.historyGrouptype = sessionStorage.historyGrouptype.split(deleteID)[0];
		//上上个页面的grouptype
		qry3(deleteID, getID(), $("#date").val());
	});
});

function updateChartSize() {
	var height = $(".um-content").height() - $(".um-input-search").height() - $("#detail").height() - 15;
	var width = $(".um-content").width();
	$("#column").height(height);
	$("#column").width(width);
	$("#pie").height(height);
	$("#pie").width(width);
	$("#table").height(height);//有20px的margin-top
	$("#table").width(width);
	$("#line").height(height);
	$("#line").width(width);
	$("#left_sidebar").height(height);
	$(".um-content .um-list").height(height);
}

function popClick(obj) {//点击弹出层
	var id = obj.id;
	setID(sessionStorage.grouptype, sessionStorage.itemid);
	var data = strToArr(sessionStorage.data);
	var title = "";
	for (var i = 0; i < data.length; i++) {
		if (data[i][3] == sessionStorage.itemid) {
			//存储上个页面的itemid索引值
			sessionStorage.i = i;
			title = data[i][0];
		}
	}
	//存储上个页面的itemid
	sessionStorage.itemidHistory = sessionStorage.itemid;

	//存储上个页面的data
	sessionStorage.historyData = sessionStorage.data;

	//存储上个页面的grouptype
	sessionStorage.historyGrouptype += sessionStorage.grouptype;

	switch(id) {
	case "pl":
		sessionStorage.grouptype = 1;
		sessionStorage.title = "产品线";
		//代表下个页面
		break;
	case "so":
		sessionStorage.grouptype = 4;
		sessionStorage.title = "销售组织";
		break;
	case "sc":
		sessionStorage.grouptype = 3;
		sessionStorage.title = "销售渠道";
		break;
	case "b":
		sessionStorage.grouptype = 2;
		sessionStorage.title = "品牌";
		break;
	case "c":
		sessionStorage.grouptype = 5;
		sessionStorage.title = "客户";
		break;
	}
	$("#title").html(title);
	$("#pop").popover("hide");
	$(obj).closest("li").remove();
	history();
	$("#back").show();
	qry(sessionStorage.grouptype, getID(), $("#date").val());
}

function history() {
	var idHistory = getIdHistory();
	if (idHistory != undefined) {
		var historyData = strToArr(sessionStorage.historyData);
		var length = historyData.length;
		$("#up,#down").show();
		if (length == 1) {
			$("#up,#down").hide();
		} else {
			for (var i = 0; i < length; i++) {
				if (historyData[i][3] == sessionStorage.itemidHistory) {
					// alert(i);
					sessionStorage.i = i;
					if (i == 0) {
						$("#up").hide();
					}
					if (i == (length - 1)) {
						$("#down").hide();
					}
				}
			}
		}

	}
};
