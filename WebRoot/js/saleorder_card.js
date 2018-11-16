var a = [];
$(document).ready(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	var hid = GetQueryString("hid")
	var hostpart = window.location.host;
	var url1 = 'http://' + hostpart + '/sale/SaleOrderCard?opration=card&hid=' + hid;
	var url2 = 'http://127.0.0.1:9082/sale/SaleOrderCard?opration=card&hid=' + hid;
	//跨域请求实例	
	$.getJSON(url1, function(data) {
		var saleorder = data.saleorder;
		if (saleorder == "NORESULT") {
			$('#form').append('<span class="cust">没有查询到订单</span>');
		} else {
			var myobj = eval(saleorder);
			for (var i = 0; i < myobj.length; i++) {
				var hid = myobj[i].hid
				var billcode = myobj[i].billcode
				var billstatus = myobj[i].billstatus
				var billstatusclass = ''
				if (billstatus == '全部发货') {
					billstatusclass = 'outstatus'
				} else { 
					billstatusclass = 'unoutstatus'
				}
				var customer = myobj[i].customer
					//var billdate = myobj[i].billdate
				var kind = myobj[i].kind
				var ntotalmuy = myobj[i].ntotalmuy
				$('#form').append('<form id="sign"  method="post">');
				$('#form').append('<ul>');
				$('#form').append('<li class="inin"> <input hidden id="hid" type="text" value="' + hid + '" /><span class="billcode">' + billcode + '</span><input class="' + billstatusclass + '" type="button" value="' + billstatus + '" /><br /> <span class="cust">商品数量：</span><span class="cust">' + customer + '</span><br /> <span class="kind">商品种类：</span><span class="kind">' + kind + '</span> <span class="nmuy"> ￥:' + ntotalmuy + '</span>');
				$('#form').append('</li>');
				$('#form').append('</ul>');
				$('#form').append('<ul>');
				var bvo = eval(myobj[i].bvo); {
					for (var j = 0; j < bvo.length; j++) {
						var bid = bvo[j].bid
						var materielname = bvo[j].materielname
						var price = bvo[j].price
						var specification = bvo[j].specification
						var nnum = bvo[j].nnum
						var ntotaloutnum=bvo[j].ntotaloutnum
						var ntotalinvoicenum=bvo[j].ntotalinvoicenum
						var nmuy = bvo[j].nmuy
						a[j] = bid
						$('#form').append('<li class="in"><span class="materielname"> ' + materielname + '</span> <span class="price"> ￥:' + price + '</span><br /><span class="specification"> ' + specification + '</span><span class = "nnum" > ' + nnum + '</span><br/><span class = "specification" >小计：<span><span class = "nmuy" > ￥:' + nmuy + '</span><br /><span class="ntotaloutnum"> 累计出库数量：' + ntotaloutnum + '</span><span class = "ntotalinvoicenum" > 累计开票数量：' + ntotalinvoicenum + '</span>');
						$('#form').append(' </li>');
					}
				}

				$('#form').append('</ul>');
				//$('#form').append('<input  class="sign" type="submit" value="签收" onclick="formSubmit()" />'); 
				$('#form').append('</form>');
			}
		}
	});
});