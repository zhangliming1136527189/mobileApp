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
	var url1 = 'http://' + hostpart + '/fiwechat/SearchListInfo?userid=' + userid + '&id=' + id ;
	/*alert("TestURL:"+url1);*/
	//跨域请求实例
	$.getJSON(url1, function(data) {
		var topics = data.topics;
		if (topics == "NORESULT" ) {
			$('#list').append('<span class="version">没有查询到订单</span>');
		} else {
			
			var myobj = eval(topics);
			for (var i = 0; i < myobj.length; i++) {
				generatedCount++
				/*var theme = myobj[i].theme
				var id = myobj[i].id
				var version = myobj[i].version
				var statue = myobj[i].statue
				var publishtime = myobj[i].publishtime
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
				if(issue_date=="null"){
					issue_date=""
				}
				var description = myobj[i].description
				if(description=="null"){
					description="无"
				}
				var manager = myobj[i].manager
				if(manager=="null"){
					manager="无"
				}
				var salematerial = myobj[i].salematerial
				if(salematerial=="null"){
					salematerial="无"
				}
				/*alert(salematerial=="null")*/
				var studymaterial = myobj[i].studymaterial
				if(studymaterial=="null"){
					studymaterial="无"
				}
				var downloadtime = myobj[i].downloadtime
				if(downloadtime=="null"){
					downloadtime=0
				}
				var judge = myobj[i].judge
				if(judge=="null"){
					judge="无"
				}
				
				var li = ''
//					li +="<li><span class='version'></span><span class='theme'><b>" + theme+
//					"</b></span><br/><span class='version'>版本：</span><span class='version'>" + version +
//					"</span><br /><span class='type'>类型:</span> <span class='type'>" + type + "</span>"+
//					"</span><br /><span class='statue'>状态:</span> <span class='statue'>" + statue + "</span>"+
//					"</span><br /><span class='publishtime'>发布时间:</span> <span class='publishtime'>" + publishtime + "</span>"+
//					"</span><br /><span class='explain'>说明:</span> <span class='explain'>" + explain + "</span>"
//					li += '</li>'
					/*li +="<li align='center'><b>" + theme+
					"</b><br/>版本：" + version +
					"<br />类型:" + type + 
					"<br />状态:" + statue+
					"<br />发布时间:" + publishtime + 
					"<br />说明:" + explain 
					li += '</li>'*/
						
					li +="<li align='left' ><b>" + theame+
					"</b><br />领域:" + field + 
					"<br />版本:" + version+
					"<br />类型:" + type + 
					"<br />状态:" + status + 
					"<br />发布时间:" + issue_date + 
					"<br />负责人:" + manager + 
					"<br />销售资料:" + salematerial + 
					"<br />学习资料:" + studymaterial + 
					"<br />下载次数:" + downloadtime + 
					"<br />评价:" + judge+
					"<br />说明:" +	description 
					li += '</li>'
						
					/*li += "<li class='aa'><a herf=#>版本：" + version +"</a></li>"+
					"<li class='aa'><a herf=#>类型：" + type +"</a></li>"+
					"<li class='a'><a herf=#>说明：" + explain +"</a></li>"*/
				
				$('#list').append('<ul>' + li + '</ul>');
				
			}
			/*$('#list').append('<span class="empty-item">没有查询到订单</span>');*/
		}

		var jobCount = generatedCount;
		$('.list-count').text(''+jobCount + '');

	});
});