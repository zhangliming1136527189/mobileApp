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
	var url1 = 'http://' + hostpart + '/sale/SaleOutCard?opration=card&hid=' + hid;
	var url2 = 'http://127.0.0.1:9082/sale/SaleOutCard?opration=card&hid=' + hid;
	//跨域请求实例	 
	$.getJSON(url1, function(data) {
		var saleout = data.saleout;
		if (saleout == "NORESULT") {
			$('#form').append('<span class="cust">最近三个月没有要签收的业务</span>');
		} else {
			var myobj = eval(saleout);
			for (var i = 0; i < myobj.length; i++) {
				var hid = myobj[i].hid
				var hts = myobj[i].hts
				var billcode = myobj[i].billcode
				var billdate = myobj[i].billdate
				var kind = myobj[i].kind
				var ntotalnum = myobj[i].ntotalnum
				$('#form').append('<form id="sign"  method="post">');
				$('#form').append('<ul>');
				$('#form').append('<li class="inin"> <input hidden id="hid" disabled type="text" value="' + hid + '" /><input hidden disabled id="hts" type="text" value="' + hts + '" /><span class="billcode">' + billcode + '</span> <span class="billdate"> ' + billdate + '</span><br /> <span class="kindtext">商品种类：</span><span class="kind">' + kind + '</span> <span class="ntotalnum"> 总数量：' + ntotalnum + '</span>');
				$('#form').append('</li>');
				$('#form').append('</ul>');
				$('#form').append('<ul>');
				var bvo = eval(myobj[i].bvo); {
					for (var j = 0; j < bvo.length; j++) {
						var bts = bvo[j].bts
						var materielname = bvo[j].materielname
						var specification = bvo[j].specification
						var nnum = bvo[j].nnum
						var unit = bvo[j].unit
							//子表pk
						var bid = bvo[j].bid
						a[j] = bid
							//$('#form').append('<li class="in"><span class="materielname"> ' + materielname + '</span> <span class="specification"> ' + specification + '</span><br /><div class="signtext" ><span >签收数量</span><input id="max' + bid + '" hidden type="text" value="' + nnum + '" /> <input id="min' + bid + '" onclick="minus(' + bid + ')" class="min" name="" type="button" value="-" /><input  id="' + bid + '"class="text_box" type="text" value="' + nnum + '" /><input id="add' + bid + '"  onclick="add(' + bid + ')" disabled="ture" class="add" name="" type="button" value="+" /><span class="num"> 台</span></div>');
						$("#form").append("<li class='in'><input hidden  disabled id='bts" + bid + "' type='text' value='" + bts + "' /><span class='materielname'> " + materielname + "</span> <span class='specification'> " + specification + "</span> <br /> <span class='waitsign'>待签收数量：" + nnum + "</span> <br /><div class='signtext' ><input class='maxsign' disabled hidden id='max" + bid + "' type='text' value='" + nnum + "' /><span >签收数量</span> <input id='min" + bid + "' onclick='minus(\"" + bid + "\")' class='min' name='' type='button' value='-' /><input  id='" + bid + "'class='text_box' type='number' value='" + nnum + "' /><input id='add" + bid + "'  onclick='add(\"" + bid + "\")' disabled='ture' class='add' name='' type='button' value='+' /><span class='num'> " + unit + "</span></div>");

						$('#form').append(' </li>');
					}
				}

				$('#form').append('</ul>');
				$('#form').append('<input  class="sign" type="submit" value="签收" onclick="formSubmit()" />');
				$('#form').append('</form>');
			}
		}

	});



});


function formSubmit() {
	var hostpart = window.location.host;
	$.MsgBox.Confirm("", "是否确认签收此订单？", function() {
		var signinfo = ''
		signinfo += '{"hid":"'
		signinfo += document.getElementById('hid').value
		signinfo += '","ts":"'
		signinfo += document.getElementById('hts').value
		signinfo += '", "body":['

		for (var j = 0; j < a.length; j++) {
			signinfo += '{"bid":"'
			signinfo += a[j]
			signinfo += '", "signnum":"'
			signinfo += document.getElementById(a[j]).value
			signinfo += '","ts":"'
			signinfo += document.getElementById('bts' + a[j]).value
			signinfo += '"},'
		}
		var hostpart = window.location.host;

		document.getElementById("sign").action = "http://" + hostpart + "/sale/SaleOutCard?opration=sign&signinfo=" + signinfo
		//document.getElementById("sign").action = "http://127.0.0.1:9082/nc/SaleOutCard?opration=sign&signinfo=" + signinfo
		document.getElementById("sign").submit();
	});
}


function minus(bid) {
	//数量减少操作
	var max = document.getElementById('max' + bid).value
	var n = document.getElementById(bid).value

	var num = parseInt(n) - 1;

	if (num == 0) {
		document.getElementById('min' + bid).disabled = true;
	}
	if (num != max) {
		document.getElementById('add' + bid).disabled = false;
	}
	document.getElementById(bid).value = num
}

function add(bid) {
	//数量减少操作 
	var max = document.getElementById('max' + bid).value
	var n = document.getElementById(bid).value

	var num = parseInt(n) + 1;
	if (num == max) {
		document.getElementById('add' + bid).disabled = true;

	}
	if (num != 0) {
		document.getElementById('min' + bid).disabled = false;
	}
	document.getElementById(bid).value = num
}