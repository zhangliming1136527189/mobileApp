var saleout, saleoutsize = 0,
	userid;
var myobj;
var myScroll,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
$(document).ready(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	userid = GetQueryString("userid")
	var hostpart = window.location.host;
	var url1 = 'http://' + hostpart + '/sale/SaleOutList?userid=' + userid;
	var url2 = 'http://127.0.0.1:9082/sale/SaleOutList?userid=' + userid;
	//跨域请求实例	         
	$.getJSON(url1, function(data) {
		saleout = data.saleout;
		if (saleout == "NORESULT") {
			$('#list').append('<span class="cust">没有查询到待签收的订单</span>');
			return
		} else {
			myobj = eval(saleout);
			saleoutsize = myobj.length
			for (var i = 0; i < 2; i++) {
				generatedCount++
				var hid = myobj[i].hid
				var billcode = myobj[i].billcode
				var billdate = myobj[i].billdate
				var kind = myobj[i].kind
				var ntotalnum = myobj[i].ntotalnum
				$('#list').append('<ul>');
				$("#list").append("<li class='inin' onclick='forSaleOutCard(\"" + hid + "\");' ><span class='billcode'>" + billcode + "</span><span class='billdate'> " + billdate + "</span><br /> <span class='kindtext'\>商品种类：</span><span class='kind'>" + kind + "</span> <span class='ntotalnum'> 总数量：" + ntotalnum + "</span>");
				$('#list').append('</li>');
				var bvo = eval(myobj[i].bvo); {
					var bvosize;
					if (bvo.length > 5) {
						bvosize = 5
					} else {
						bvosize = bvo.length
					}
					for (var j = 0; j < bvosize; j++) {
						var materielname = bvo[j].materielname
						var specification = bvo[j].specification
						var nnum = bvo[j].nnum
						var unit =  bvo[j].unit
							//	$('#list').append('<li class="in" onclick="forSaleOutCard(' + hid + ')"><span class="materielname"> ' + materielname + '</span> <span class="specification"> ' + specification + '</span><span class="nnum"> ' + nnum + '</span>');
						$("#list").append("<li class='in' onclick='forSaleOutCard(\"" + hid + "\")'><span class='materielname'> " + materielname + "</span> <span class='specification'> " + specification + "</span><span class='nnum'> " + nnum +unit+ "</span>");
						$('#list').append(' </li>');
					}
					if (bvo.length > 5) {
						$("#list").append("<li class='in' onclick='forSaleOutCard(\"" + hid + "\")'><span class='specification'> 更多物料……</span> ");
						$('#list').append(' </li>');
					}
				}
				$('#list').append('</ul>');

			}
			$('#pullUp').append('<span id="icon-image"class = "pullUpIcon" ></span><span id="icon-text" class="pullUpLabel" >上拉加载更多...</span>');
		}

	});
});


/**  
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction() {
	setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
		var begin = generatedCount
		var end = generatedCount + 1

		if (end > saleoutsize) {
			end = saleoutsize
		}
		for (var i = begin; i < end; i++) {
			generatedCount++
			var hid = myobj[i].hid
			var billcode = myobj[i].billcode
			var billdate = myobj[i].billdate
			var kind = myobj[i].kind
			var ntotalnum = myobj[i].ntotalnum
			$('#list').append('<ul>');
			$("#list").append("<li class='inin' onclick='forSaleOutCard(\"" + hid + "\");' ><span class='billcode'>" + billcode + "</span><span class='billdate'> " + billdate + "</span><br /> <span class='kindtext'\>商品种类:</span><span class='kind'>" + kind + "</span> <span class='ntotalnum'> 总数量:" + ntotalnum + "</span>");
			$('#list').append('</li>');
			var bvo = eval(myobj[i].bvo); {
				for (var j = 0; j < bvo.length; j++) {
					var materielname = bvo[j].materielname
					var specification = bvo[j].specification
					var nnum = bvo[j].nnum
						//	$('#list').append('<li class="in" onclick="forSaleOutCard(' + hid + ')"><span class="materielname"> ' + materielname + '</span> <span class="specification"> ' + specification + '</span><span class="nnum"> ' + nnum + '</span>');
					$("#list").append("<li class='in' onclick='forSaleOutCard(\"" + hid + "\")'><span class='materielname'> " + materielname + "</span> <span class='specification'> " + specification + "</span><span class='nnum'> " + nnum + "</span>");
					$('#list').append(' </li>');
				}
			}
			$('#list').append('</ul>');
		}
		if (generatedCount == saleoutsize) {
			document.getElementById('icon-image').hidden = "hidden"
			document.getElementById('icon-text').hidden = "hidden"
			document.getElementById('pullUp').hidden = "hidden"
		}
		myScroll.refresh(); // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 初始化iScroll控件
 */
function loaded() {
	pullUpAction();
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar',
		/* 重要样式 */
		scrollbars: true, //滚动条可见
		useTransition: false,
		/* 此属性不知用意，本人从true改为false */
		onRefresh: function() {
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function() {
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function() {
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				pullUpAction(); // Execute custom function (ajax call?)
			}
		}
	});

	setTimeout(800);
}

//初始化绑定iScroll控件 
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);