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
	var description = GetQueryString("description");
	
	var pk_theame = GetQueryString("pk_theame")
	var version = GetQueryString("version")
	var type = GetQueryString("type")
	var status = GetQueryString("status")
	var field = GetQueryString("field")
	
	var hostpart = window.location.host;
	var faultAddr = encodeURI(description);
/*	alert("version:"+version);*/
	var url1 = 'http://' + hostpart + '/fiwechat/SearchQueryList?userid=' + userid + '&id=' + id +'&description='+faultAddr+'&version='+version+'&type='+type+'&status='+status+'&field='+field;
	/*alert("TestURL:"+url1);*/
	//跨域请求实例
	$.getJSON(url1, function(data) {
		
		var topics = data.topics;
		//alert("topics:"+topics);
		if (topics == "NORESULT") {
			$('#list').append('<span class="version">没有查询到订单</span>');
		} else {
			var myobj = eval(topics);
			
			for (var i = 0; i < myobj.length; i++) {
				generatedCount++
				/*var theme = myobj[i].theme
				var id = myobj[i].id
				var version = myobj[i].version
				var explain = myobj[i].explain
				var type = myobj[i].type
				var data = eval(myobj[i].data);*/
				
				var pk_theame = myobj[i].pk_theame
				var theame = myobj[i].theame
				var field = myobj[i].field
				var version = myobj[i].version
				var type = myobj[i].type
				var status = myobj[i].status
				var issue_date = myobj[i].issue_date
				var description = myobj[i].description
				if(description=="null"){
					description="无"
				}
				var manager = myobj[i].manager
				var salematerial = myobj[i].salematerial
				var studymaterial = myobj[i].studymaterial
				var downloadtime = myobj[i].downloadtime
				var judge = myobj[i].judge
				id=pk_theame
				/*alert("pk_theame:"+pk_theame);*/
//				var li = ''
//					li +="<li onclick='forSearchInfo(\""+id+"\");'><span class='version'></span><span class='theme' font=1><b>" + theme+
//					"</b></span><br /><span class='version'>版本：</span><span class='version'>" + version +
//					"</span><br /><span class='type'>类型:</span> <span class='type'>" + type + "</span>"+
//					"</span><br /><span class='explain'>说明:</span> <span class='explain'><font color='red' size='3'>" + explain + "</span>"
//					li += '</li>'
				var li = ''
					li +="<li class='grey' onclick='forSearchInfo(\""+id+"\");' ><span class='version'></span><span class='theme' font=1><b>" +generatedCount+"、"+theame+
					"</b></span><br /><span class='version'>版本：</span><span class='version'>" + version +
					"</span><br /><span class='type'>类型:</span> <span class='type'>" + type + "</span>"+
					"</span><br /><span class='description'>说明:</span> <span class='description'>" + description + "</span>"
					li += '</li>'
					
						
				
				$('#list').append('<ul>' + li + '</ul>');
				
			}
			
			/*$('#list').append('<span class="empty-item">没有查询到订单</span>');*/
		}

		var jobCount = generatedCount;
		$('.list-count').text(''+jobCount + '');

	});
});