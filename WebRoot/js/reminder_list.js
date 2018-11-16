var generatedCount=0;
$(document).ready(function() {
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	var userid = GetQueryString("userid");
	var id = GetQueryString("id");
	var hostpart = window.location.host;
	var url1 = 'http://' + hostpart + '/fiwechat/ReminderBillList?userid=' + userid + '&id=' + id ;
	alert("TestURL:"+url1);
	//跨域请求实例
	$.getJSON(url1, function(data) {
		var saleorder = data.saleorder;
		if (saleorder == "NORESULT") {
			$('#list').append('<span class="cust">没有查询到订单</span>');
		} else {
			var myobj = eval(saleorder);
			for (var i = 0; i < myobj.length; i++) {

				var dategroup = myobj[i].dategroup
				var data = eval(myobj[i].data);
				var li = ''
				for (var j = 0; j < data.length; j++) {
					generatedCount++
					var invoiceno = data[j].invoiceno
					if(invoiceno == null || invoiceno == 'null') {
						invoiceno = '';
					}
					var billdate = data[j].billdate
					var money = data[j].money
					li += "<li class='in'><span class='cust'>发票号：</span><span class='cust'>" + invoiceno + "</span><br /><span class='kind'>金额:</span> <span class='kind'>" + money + "</span>"
					li += '</li>'
				}
				$('#list').append('<details open ><summary class="date" > ' + dategroup + '</summary> <ul>' + li + '</ul></details>');
			}
			$('#list').append('<span class="empty-item">没有查询到订单</span>');
		}

		var jobCount = generatedCount;
		$('.list-count').text(jobCount + ' 张订单');
		$('#search-text').keyup(function() {
			var searchTerm = $('#search-text').val();
			var listItem = $('#list').children('li');
			var searchSplit = searchTerm.replace(/ /g, '\'):containsi(\'');
			$.extend($.expr[':'], {
				'containsi': function(elem, i, match, array) {
					return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
				}
			});
			$('#list li').not(':containsi(\'' + searchSplit + '\')').each(function(e) {
				$(this).addClass('hiding out').removeClass('in');
				setTimeout(function() {
					$('.out').addClass('hidden');
				}, 300);
			});
			$('#list li:containsi(\'' + searchSplit + '\')').each(function(e) {
				$(this).removeClass('hidden out').addClass('in');
				setTimeout(function() {
					$('.in').removeClass('hiding');
				}, 1);
			});
			var jobCount = $('#list .in').length;
			$('.list-count').text(jobCount + ' 张订单');
			if (jobCount == '0') {
				$('#list').addClass('empty');
			} else {
				$('#list').removeClass('empty');
			}
		});
	});
});