//1rem=100px;
document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';

var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var DefaultRoute = ReactRouter.DefaultRoute;
var Redirect = ReactRouter.Redirect;
var Link = ReactRouter.Link;
var StateMixin = ReactRouter.State;

var Study=React.createClass({
	render:function(){
		return (
			<div>
				<StudyHeader></StudyHeader>
				<RouteHandler></RouteHandler>
				<StudyFooter></StudyFooter>
			</div>
		);
	}
});
var CourseMain=React.createClass({
	mixins: [StateMixin],
	render:function(){
		var type=this.getParams().type;
		if(!type){
			type=1
		}
		if(type==1){
			var lessons=[{
				id:1,
				title:"什么是变革管理什么是变革管理什么是变革管理什么是变革管理",
				teacher:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
				time:"10101010101010101010101010101010",
				studyNum:"1000",
				commentNum:"2000",
				score:"3"
			},{
				id:2,
				title:"你该如何面对艰难选择",
				teacher:"bbb",
				time:"20",
				studyNum:"200",
				commentNum:"40",
				score:"4"
			},{
				id:3,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:4,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:5,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			}];
		}else if(type==2){
			var lessons=[{
				id:1,
				title:"什么是变革管理什么是变革管理什么是变革管理什么是变革管理",
				teacher:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
				time:"10101010101010101010101010101010",
				studyNum:"1000",
				commentNum:"2000",
				score:"3"
			},{
				id:2,
				title:"你该如何面对艰难选择",
				teacher:"bbb",
				time:"20",
				studyNum:"200",
				commentNum:"40",
				score:"4"
			}];
		}else if(type==3){
			var lessons=[{
				id:5,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:4,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:12,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"301",
				studyNum:"300",
				commentNum:"601",
				score:"5"
			},{
				id:4,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:12,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"301",
				studyNum:"300",
				commentNum:"601",
				score:"5"
			},{
				id:4,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:12,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"301",
				studyNum:"300",
				commentNum:"601",
				score:"5"
			}];
		}
		return (
			<div id="CourseMain">
				<MainTab></MainTab>
				<Search></Search>
				<hr/>
				<div id="main">
					<HotCourse type={type}></HotCourse>
					{lessons.map(function(lesson,i){
						return (<Course data={lesson} key={i}></Course>);
					})}
				</div>
			</div>
		);
	},
	componentDidMount:function(){
		$("#header .title").html("课程");
		$("#header .back span").html("应用");
		$("#header .back").attr("href","#");
		$("#footer").show();
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$("#footer").height()-$(".tab").height()-$(".search").closest("div").height()-3;
		$("#main").height(height);
	}
});
var StudyHeader=React.createClass({
	render: function () {
		return (
			<div id="header">
				<a href="#" className="back"><i className="icon_back"></i><span>应用</span></a>
				<span className="title">课程</span>
			</div>
		);
	}
});
var MainTab=React.createClass({
	render:function(){
		return (
			<div>
			<ul className="tab">
				<Link to="courseMain" params={{type:1}}>
					<li className="hot active">热门</li>
				</Link>
				<Link to="courseMain" params={{type:2}}>
					<li className="new">最新</li>
				</Link>
				<Link to="courseMain" params={{type:3}}>
					<li className="myCourse">我的课程体系</li>
				</Link>
			</ul>
			<div className="hr"></div>
			</div>
		);
	},
	componentDidMount:function(){
		var width=$(".tab").width();
		$(".tab li").width(width/3);

		$("#CourseMain .tab a").on("click",function(){
			$(this).siblings("a").find("li").removeClass("active");
			$(this).find("li").addClass("active");
		});
	}
});
var Search=React.createClass({
	render:function(){
		return (
			<div>
				<input type="text" className="search" placeholder="搜索"/>
			</div>

		);
	}
});
var HotCourse=React.createClass({
	render:function(){
		var type=this.props.type;
		if(type==1){
			var route=(<span>热门课程</span>);
		}else if(type==2){
			var route=(<span>最新</span>);
		}else if(type==3){
			var route=(<span>我的课程体系</span>);
		}else{
			var route=(<span>123</span>);
		}
		var style={
			marginLeft:"0.10rem",
			marginTop: "0.09rem"
		};
		return (
			<div>
				<i className="hot_course" style={style} />
				{route}
			</div>
		);
	}
});
var Course=React.createClass({
	render:function(){
		return (
			<div className='lesson'>
				<Link to="courseDetail" params={{id:this.props.data.id}}>
					<img alt='暂无图片' title='暂无图片' src="img/lesson_pic.png" />
					<div className='lessonDetail'>
						<div className='lessonTitle'>{this.props.data.title}</div>
						<div className='teacher'>讲师：&nbsp;{this.props.data.teacher}</div>
						<div className='time'>学时：&nbsp;{this.props.data.time}小时</div>
						<ul>
							<li><i className='studyNum'></i><span className='num'>{this.props.data.studyNum}</span></li>
							<li><i className='comment_pic'></i><span className='num'>{this.props.data.commentNum}</span></li>
							<li className={this.props.data.score} ref="score"></li>
						</ul>
					</div>
				</Link>
			</div>
		);
	},
	componentDidMount:function(){
		var score=this.props.data.score;
		for(var i=0;i<score;i++){
			$(this.refs.score).append("<i class='star'></i>");
		}
		for(var i=0;i<5-score;i++){
			$(this.refs.score).append("<i class='no_star'></i>");
		}
		$(".num").each(function(){
			if(parseInt($(this).html())>999){
				$(this).html("999+")
			}
		});

	}
});

var MineMain=React.createClass({
	mixins: [StateMixin],
	render:function(){
		var type=this.getParams().type;
		if(type=="billboard"){
			var route=(
				<Billboard></Billboard>
			);
		}else if(type=="talk"){
			var route=(
				<MyTalk></MyTalk>
			);
		}else if(type=="collect"){
			var route=(
				<MyCollect></MyCollect>
			);
		}else if(!type){
			var route=(
				<div id="mine">
					<MyBanner></MyBanner>
					<MyList></MyList>
				</div>
			);
		}
		return route;
	}
});
var MyBanner=React.createClass({
	getInitialState:function(){
		return {
			user:{
				id:"1",
				pic:"img/icon/icon_user.png",
				name:"叫我盖茨就行",
				time:"105"
			}
		}
	},
	render:function(){
		var user_pic={
			background:"url('"+this.state.user.pic+"') center center no-repeat",
			width:61,
			height:61,
			display:"inline-block",
			borderRadius:"50%",
			border:"1px solid #fff",
			marginTop:21,
			marginBottom:6
		};
		return (
			<div className="myBanner">
				<i className="user_pic" style={user_pic}></i>
				<p>{this.state.user.name}</p>
				<p>已学学时{this.state.user.time}小时</p>
			</div>
		);
	}
});
var MyList=React.createClass({
	render:function(){
		return (
			<ul>
				<li>
					<Link to="mineMain" params={{type:"billboard"}} className="clearfix">
						<i className="billboard_pic"></i><span>排行榜</span><i className="details"></i>
					</Link>
				</li>
				<li>
					<Link to="mineMain" params={{type:"talk"}}>
						<i className="talk_pic"></i><span>我的评论<i className="details"></i></span>
					</Link>
				</li>
				<li>
					<Link to="mineMain" params={{type:"collect"}} className="clearfix">
						<i className="collect_pic"></i><span>我的收藏<i className="details"></i></span>
					</Link>
				</li>
			</ul>
		);
	},
	componentDidMount:function(){
		$("#header .title").html("我的");
		$("#header .back span").html("应用");
		$("#header .back").attr("href","#");
		//还原footer
		$("#footer li:nth-of-type(1) i").removeClass("course_active").addClass("course");
		$("#footer li div:nth-of-type(1)").removeClass("active");
		$("#footer li:nth-of-type(4) div").addClass("active");
		$("#footer li:nth-of-type(4) i").addClass("user_active");
		$("#footer").show();
	}
});
var Billboard=React.createClass({
	render:function(){
		return (
			<div>
				<AuthorMoudle />
				<RankingMoudle />
				<div className="share">分享给好友</div>
			</div>
		);
	},
	componentDidMount:function(){
		$("#header .title").html("排行榜");
		$("#header .back span").html("返回");
		$("#header .back").attr("href","index.html#/mineMain/");
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$(".share").height()-$(".author-detail").height()-18;
		$(".content").height(height);
		$("#footer").hide();
	}
});
var AuthorMoudle=React.createClass({
	getInitialState:function(){
		return{
			authorDetail:[
				{
					id:1,
					src:"头像",
					nickname:"叫我盖茨就行",
					time:29,
					ranking:12
				}
			]
		}
	},
	render:function(){
		return(
			<div className="author-detail">
				<ul className="time-range-list">
					<li>今日</li>
					<li>本周</li>
					<li>本月</li>
				</ul>
				<div className="author-info">
					<ul className="author-info-list">
						<li><i className="user_pic2"></i></li>
						<li>{this.state.authorDetail[0].nickname}</li>
						<li><span>{this.state.authorDetail[0].time+"小时"}</span>|<span style={{marginLeft:1}}>{"第"+this.state.authorDetail[0].ranking+"名"}</span></li>
					</ul>
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		$(".author-detail").closest("div").css("margin-top","-1px");
		$(".time-range-list li").on("click",function(){
			$(this).css({"background":"#fff","color":"#5DD1BD"}).siblings().css({"background":"#5DD1BD","color":"#fff"});
		})
	}
});
var RankingMoudle=React.createClass({
	render:function(){
		var ranklists=[
			{
				id:1,
				rank:1,
				img:"头像",
				author:"刘德华",
				studytime:56
			},
			{
				id:2,
				rank:2,
				img:"头像",
				author:"黎明",
				studytime:50
			},
			{
				id:3,
				rank:3,
				img:"头像",
				author:"张学友",
				studytime:45
			},
			{
				id:4,
				rank:4,
				img:"头像",
				author:"郭富城",
				studytime:40
			},
			{
				id:5,
				rank:5,
				img:"头像",
				author:"周润发",
				studytime:38
			},
			{
				id:6,
				rank:6,
				img:"头像",
				author:"梁朝伟",
				studytime:30
			},
			{
				id:7,
				rank:7,
				img:"头像",
				author:"成龙",
				studytime:20
			}
		];
		return(
			<div className="content">
				<ul className="ranking">
					{ranklists.map(function(ele,i){
						return(
							<li key={i} className="clearfix">
								<span className="rankNum">{i>2?ele.rank:""}</span>
								<span><i className="user_pic3" /></span>
								<span>{ele.author}</span>
								<span>{"小时"}</span>
								<span>{ele.studytime}</span>
							</li>
						);
					}.bind(this))}
				</ul>
			</div>
		)
	}
});
var MyTalk=React.createClass({
	getInitialState:function(){
		return {
			comments:[{
				id:1,
				userName:"叫我盖茨就行",
				time:"2016-09-06-18:20",
				text:"听了这节课受益匪浅，受益匪浅，受益匪浅。",
				score:"1",
				agree:"23",
				course:{
					id:2,
					title:"你该如何面对艰难选择",
					teacher:"bbb",
					time:"20",
					studyNum:"200",
					commentNum:"40",
					score:"4"
				}
			},{
				id:1,
				userName:"叫我盖茨就行",
				time:"2016-09-06-18:20",
				text:"听了这节课受益匪浅，受益匪浅，受益匪浅。听了这节课受益匪浅，受益匪浅，受益匪浅。听了这节课受益匪浅，受益匪浅，受益匪浅。",
				score:"1",
				agree:"23",
				course:{
					id:2,
					title:"你该如何面对艰难选择",
					teacher:"bbb",
					time:"20",
					studyNum:"200",
					commentNum:"40",
					score:"4"
				}
			},{
				id:1,
				userName:"叫我盖茨就行",
				time:"2016-09-06-18:20",
				text:"听了这节课受益匪浅，受益匪浅，受益匪浅。听了这节课受益匪浅，受益匪浅，受益匪浅。听了这节课受益匪浅，受益匪浅，受益匪浅。",
				score:"1",
				agree:"23",
				course:{
					id:2,
					title:"你该如何面对艰难选择",
					teacher:"bbb",
					time:"20",
					studyNum:"200",
					commentNum:"40",
					score:"4"
				}
			}]
		}
	},
	render:function(){
		return (
			<div className="myTalkFather">
				{this.state.comments.map(function(comment,i){
					return (
						<div key={i} className="myTalk">
							<Comment data={comment}></Comment>
							<Course data={comment.course}></Course>
						</div>
					);
				})}
			</div>
		);
	},
	componentDidMount:function(){
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height();
		$(".myTalkFather").height(height);
		$("#header .title").html("我的评论");
		$("#header .back span").html("返回");
		$("#header .back").attr("href","index.html#/mineMain/");
		$("#footer").hide();
	}
});
var MyCollect=React.createClass({
	render:function(){
		var courses=[{
			id:2,
			title:"你该如何面对艰难选择",
			teacher:"bbb",
			time:"20",
			studyNum:"200",
			commentNum:"40",
			score:"4"
		},{
			id:2,
			title:"你该如何面对艰难选择",
			teacher:"bbb",
			time:"20",
			studyNum:"200",
			commentNum:"40",
			score:"4"
		},{
			id:2,
			title:"你该如何面对艰难选择",
			teacher:"bbb",
			time:"20",
			studyNum:"200",
			commentNum:"40",
			score:"4"
		},{
			id:2,
			title:"你该如何面对艰难选择",
			teacher:"bbb",
			time:"20",
			studyNum:"200",
			commentNum:"40",
			score:"4"
		},{
			id:2,
			title:"你该如何面对艰难选择",
			teacher:"bbb",
			time:"20",
			studyNum:"200",
			commentNum:"40",
			score:"4"
		},{
			id:2,
			title:"你该如何面对艰难选择",
			teacher:"bbb",
			time:"20",
			studyNum:"200",
			commentNum:"40",
			score:"4"
		},{
			id:2,
			title:"你该如何面对艰难选择",
			teacher:"bbb",
			time:"20",
			studyNum:"200",
			commentNum:"40",
			score:"4"
		}];
		return (
			<div className="content">
				{courses.map(function(course,i){
					return (
						<div key={i} className="myCollect">
							<Course data={course}></Course>
						</div>
					);
				})}
			</div>
		);
	},
	componentDidMount:function(){
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height();
		$(".content").height(height);
		$("#header .title").html("我的收藏");
		$("#header .back span").html("返回");
		$("#header .back").attr("href","index.html#/mineMain/");
		$("#footer").hide();
	}
});
var CourseDetail=React.createClass({
	getInitialState:function(){
		return {
			lesson:{
				id:5,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			}
		}

	},
	mixins: [StateMixin],
	render:function() {
		var type=this.getParams().type;
		var coursewares=[{
			id:1,
			title:"变革管理-1",
			time:"00:20:00"
		},{
			id:2,
			title:"变革管理-2",
			time:"00:20:00"
		},{
			id:3,
			title:"变革管理-3",
			time:"00:20:00"
		},{
			id:4,
			title:"变革管理-4",
			time:"00:20:00"
		},{
			id:2,
			title:"变革管理-2",
			time:"00:20:00"
		},{
			id:3,
			title:"变革管理-3",
			time:"00:20:00"
		},{
			id:4,
			title:"变革管理-4",
			time:"00:20:00"
		},{
			id:2,
			title:"变革管理-2",
			time:"00:20:00"
		},{
			id:3,
			title:"变革管理-3",
			time:"00:20:00"
		},{
			id:4,
			title:"变革管理-4",
			time:"00:20:00"
		},{
			id:2,
			title:"变革管理-2",
			time:"00:20:00"
		},{
			id:3,
			title:"变革管理-3",
			time:"00:20:00"
		},{
			id:4,
			title:"变革管理-4",
			time:"00:20:00"
		}];
		var comments=[{
			id:1,
			userName:"叫我盖茨就行",
			time:"2016-09-06-18:20",
			text:"听了这节课受益匪浅，受益匪浅，受益匪浅。听了这节课受益匪浅，受益匪浅，受益匪浅。听了这节课受益匪浅，受益匪浅，受益匪浅。",
			score:"1",
			agree:"23"
		},{
			id:2,
			userName:"叫我盖茨就行",
			time:"2016-09-06-18:20",
			text:"听了这节课受益匪浅，受益匪浅，受益匪浅。",
			score:"2",
			agree:"23"
		},{
			id:3,
			userName:"叫我盖茨就行",
			time:"2016-09-06-18:20",
			text:"听了这节课受益匪浅，受益匪浅，受益匪浅。",
			score:"3",
			agree:"23"
		},{
			id:4,
			userName:"叫我盖茨就行",
			time:"2016-09-06-18:20",
			text:"听了这节课受益匪浅，受益匪浅，受益匪浅。",
			score:"4",
			agree:"23"
		},{
			id:5,
			userName:"叫我盖茨就行",
			time:"2016-09-06-18:20",
			text:"听了这节课受益匪浅，受益匪浅，受益匪浅。",
			score:"5",
			agree:"23"
		},{
			id:5,
			userName:"叫我盖茨就行",
			time:"2016-09-06-18:20",
			text:"听了这节课受益匪浅，受益匪浅，受益匪浅。",
			score:"5",
			agree:"23"
		},{
			id:5,
			userName:"叫我盖茨就行",
			time:"2016-09-06-18:20",
			text:"听了这节课受益匪浅，受益匪浅，受益匪浅。",
			score:"5",
			agree:"23"
		},{
			id:5,
			userName:"叫我盖茨就行",
			time:"2016-09-06-18:20",
			text:"听了这节课受益匪浅，受益匪浅，受益匪浅。",
			score:"5",
			agree:"23"
		}];
		if(!type || type=="content"){
			var route=(
				<Content />
			);
		}else if(type=="courseware"){
			var route= coursewares.map(function(courseware,i){
				return (<Courseware data={courseware} key={i} />);
			});
		}else if(type=="comment"){
			var route=comments.map(function(comment,i){
				return (<Comment data={comment} key={i} />);
			});
		}
		return (
			<div id="courseDetail">
				<Course data={this.state.lesson} />
				<Collect />
				<CourseTab />
				<div id="comment">
					{route}
				</div>
				<Apply />
			</div>
		);
	},
	componentDidMount:function(){
		$("#footer").hide();
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$(".apply").height()-$(".lesson").height()-$("#courseDetail .collect").height()-$("#courseDetail .tab").height()-3;
		$("#comment").height(height);

		$("#header .title").html("课程详情");
		$("#header .back span").html("返回");
		$("#header .back").attr("href","index.html#/courseMain");
	}
});
var Courseware=React.createClass({
	render:function(){
		return (
			<div className="Courseware clearfix">
				<div className="CoursewareName"><i className="point"></i>{this.props.data.title}</div>
				<div className="CoursewareTime">{this.props.data.time}</div>
			</div>
		);
	}
});
var Comment=React.createClass({
	render:function(){
		return (
			<div className="comment">
				<i className="user_pic"></i>
				<div>
					<ul>
						<li className="clearfix"><span>{this.props.data.userName}</span><span>{this.props.data.agree}</span><i className="agree"></i></li>
						<li className="clearfix"><span>{this.props.data.time}</span><span className="{this.props.data.score}" ref="score"></span></li>
						<li><span>{this.props.data.text}</span></li>
					</ul>
				</div>
			</div>
		);
	},
	componentDidMount:function(){
		var score=this.props.data.score;
		for(var i=0;i<score;i++){
			$(this.refs.score).append("<i class='star'></i>");
		}
		for(var i=0;i<5-score;i++){
			$(this.refs.score).append("<i class='no_star'></i>");
		}
	}
});
var Collect=React.createClass({
	getInitialState:function(){
		return {
			state:false
		}
	},
	visible:function(){
		this.state.state=!this.state.state;
		if(this.state.state){
			$(".collect").html("已收藏").addClass("active");
		}else{
			$(".collect").html("收藏").removeClass("active");
		}
	},
	render:function(){
		return (
			<span className="collect" onClick={this.visible}>收藏</span>
		);
	}
});
var CourseTab=React.createClass({
	render:function(){
		return (
			<div>
				<ul className="tab">
					<Link to="courseDetail" params={{type:"content"}}>
						<li className="active">课程简介</li>
					</Link>
					<Link to="courseDetail" params={{type:"courseware"}}>
						<li>课件</li>
					</Link>
					<Link to="courseDetail" params={{type:"comment"}}>
						<li>评论</li>
					</Link>
				</ul>
				<div className="hr"></div>
			</div>
		);
	},
	componentDidMount:function(){
		var width=$("#courseDetail .tab").width();
		$("#courseDetail .tab li").width(width/3);
		$("#courseDetail .tab li").on("click",function(){
			$(this).closest(".tab").find("li").removeClass("active");
			$(this).addClass("active")
		});
	}
});
var Content=React.createClass({
	render:function(){
		return (
			<div>hello, world</div>
		);
	}
});
var Apply=React.createClass({
	render:function(){
		return (
			<span className="apply">申请学习</span>
		);
	}
});
var TypeMain=React.createClass({
	mixins: [StateMixin],
	render:function() {
		var types = [{
			id: 1,
			type: "管理类",
			stype: [{
				id: 4,
				type_name: '行政管理1'
			}, {
				id: 4,
				type_name: '行政管理2'
			}, {
				id: 4,
				type_name: '行政管理3'
			}, {
				id: 4,
				type_name: '行政管理4'
			}, {
				id: 4,
				type_name: '行政管理5'
			}, {
				id: 4,
				type_name: '行政管理6'
			}]
		}, {
			id: 2,
			type: "专业职能类",
			stype: [{
				id: 4,
				type_name: '团队管理1'
			}, {
				id: 4,
				type_name: '团队管理2'
			}, {
				id: 4,
				type_name: '团队管理3'
			}, {
				id: 4,
				type_name: '团队管理4'
			}, {
				id: 4,
				type_name: '团队管理5'
			}, {
				id: 4,
				type_name: '团队管理6'
			}]
		}, {
			id: 3,
			type: "蓝血文化",
			stype: [{
				id: 4,
				type_name: '企业文化1'
			}, {
				id: 4,
				type_name: '企业文化2'
			}, {
				id: 4,
				type_name: '企业文化3'
			}, {
				id: 4,
				type_name: '企业文化4'
			}, {
				id: 4,
				type_name: '企业文化5'
			}, {
				id: 4,
				type_name: '企业文化6'
			}]
		}];

		return (
			<div>
				{types.map(function (type, i) {
					return (
						<ManageMoudle data={type} key={i} />
					)
				})}
			</div>
		);
	},
	componentDidMount:function(){
		$("#header .title").html("分类");
		$("#header .back span").html("应用");
		$("#header .back").attr("href","#");
		//还原footer
		$("#footer li:nth-of-type(1) i").removeClass("course_active").addClass("course");
		$("#footer li div").removeClass("active");
		$("#footer li:nth-of-type(2) div").addClass("active");
		$("#footer li:nth-of-type(2) i").addClass("classify_active");
		$("#footer").show();
	}
});
var TypeDetail=React.createClass({
	render:function(){
		var lessons = [{
			id: 5,
			title: "解读好莱坞",
			teacher: "ccc",
			time: "30",
			studyNum: "300",
			commentNum: "60",
			score: "5"
		}, {
			id: 4,
			title: "解读好莱坞",
			teacher: "ccc",
			time: "30",
			studyNum: "300",
			commentNum: "60",
			score: "5"
		}, {
			id: 12,
			title: "解读好莱坞",
			teacher: "ccc",
			time: "301",
			studyNum: "300",
			commentNum: "601",
			score: "5"
		}, {
			id: 4,
			title: "解读好莱坞",
			teacher: "ccc",
			time: "30",
			studyNum: "300",
			commentNum: "60",
			score: "5"
		}, {
			id: 12,
			title: "解读好莱坞",
			teacher: "ccc",
			time: "301",
			studyNum: "300",
			commentNum: "601",
			score: "5"
		}, {
			id: 4,
			title: "解读好莱坞",
			teacher: "ccc",
			time: "30",
			studyNum: "300",
			commentNum: "60",
			score: "5"
		}, {
			id: 12,
			title: "解读好莱坞",
			teacher: "ccc",
			time: "301",
			studyNum: "300",
			commentNum: "601",
			score: "5"
		}];
		return (
			<div>
				<NavoptionMoudle />
				<Search />
				<div className="content">
					{lessons.map(function (lesson, i) {
						return (<Course data={lesson} key={i} />);
					})}
				</div>
			</div>
		);
	},
	componentDidMount:function(){
		$("#header .title").html("分类");
		$("#header .back span").html("返回");
		$("#header .back").attr("href","index.html#/typeMain");
		$("#footer").hide();
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$(".navlist").height()-$(".search").closest("div").height();
		$(".content").height(height);
	}
});
var ManageMoudle=React.createClass({
	render:function(){
		return(
			<div className="ManageMoudle moudle">
				<div className="title"><i className="hot_course" /><span>{this.props.data.type}</span></div>
				<ul className="list">
					{this.props.data.stype.map(function(ele,i){
						return(<li key={i}><Link to="typeDetail" params={{id:1}}>{ele.type_name}</Link></li>)
					})}
				</ul>
			</div>
		)
	}
});
var NavoptionMoudle=React.createClass({
	getInitialState:function(){
		return{
			lists:[{
				id:1,
				type:"管理类",
				stype:[{
					id:4,
					stype:'行政管理1'
				},{
					id:4,
					stype:'行政管理2'
				},{
					id:4,
					stype:'行政管理3'
				},{
					id:4,
					stype:'行政管理4'
				},{
					id:4,
					stype:'行政管理5'
				},{
					id:4,
					stype:'行政管理6'
				}]
			},{
				id:2,
				type:"专业职能类",
				stype:[{
					id:4,
					stype:'团队管理1'
				},{
					id:4,
					stype:'团队管理2'
				},{
					id:4,
					stype:'团队管理3'
				},{
					id:4,
					stype:'团队管理4'
				},{
					id:4,
					stype:'团队管理5'
				},{
					id:4,
					stype:'团队管理6'
				}]
			},{
				id:3,
				type:"蓝血文化",
				stype:[{
					id:4,
					stype:'企业文化1'
				},{
					id:4,
					stype:'企业文化2'
				},{
					id:4,
					stype:'企业文化3'
				},{
					id:4,
					stype:'企业文化4'
				},{
					id:4,
					stype:'企业文化5'
				},{
					id:4,
					stype:'企业文化6'
				}]
			}],
			index:0,
			rankings:[
				{
					id:1,
					details:'评论数从高到低'
				},
				{
					id:2,
					details:'收藏数从高到低'
				},
				{
					id:3,
					details:'观看数从高到低'
				},
				{
					id:4,
					details:'星级数从高到低'
				}
			]

		}
	},
	onclick:function(index){
		this.setState({index:index});
	},
	render:function(){
		var index=this.state.index;
		return(
			<div className="navlist">
				<i className="line_cut" />
				<ul className="tab">
					<li className="type">管理类</li>
					<li className="rank">智能排序</li>
				</ul>

				<div className="ulFather" style={{width:375,backgroundColor:"#fff"}}>
					<ul className="options">
						<li>全部</li>
						{this.state.lists.map(function(list,i){
							return (
								<Li data={list} index={i} key={i} LiClick={this.onclick} />
							);
						}.bind(this))}

					</ul>
					<ul className="sortsDetail">
						{this.state.lists[index].stype.map(function(ele,i){
							return <li key={i}>{ele.stype}</li>;
						})}
					</ul>
				</div>
				<ul className="rankings">
					{this.state.rankings.map(function(ele,i){
						return(<li key={i}>{ele.details}</li>)
					}.bind(this))}
				</ul>
				<div className="cover"></div>
			</div>
		)
	},
	componentDidMount:function(){
		//给默认分类添加颜色
		$(".options li:nth-of-type(2)").addClass("active");
		//div之间有空隙
		$(".navlist").closest("div").css("margin-top","-2px");
		//计算高度实现滚动条效果
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height();
		$(".cover").height(height);
		//tab点击事件
		$(".type").on("click",function(){
			$(".ulFather,.cover").show();
			$(this).addClass("up");
			$(".rank").removeClass("up");
			$(".rankings").hide();
		});
		$(".rank").on("click",function(){
			$(".rankings,.cover").show();
			$(this).addClass("up");
			$(".ulFather").hide();
			$(".type").removeClass("up");
		});
		$(".options li").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
		});
		$(".rankings li,.cover").on("click",function(){
			$(".rank").removeClass("up");
			$(".rankings,.cover").hide();
		});
		$(".sortsDetail,.cover").on("click",function(){
			$(".ulFather,.cover").hide();
			$(".type").removeClass("up");
		});
	}
});
var Li=React.createClass({
	liclick:function(){
		var index=this.props.index;
		this.props.LiClick(index);
	},
	render:function(){
		return (
			<li onClick={this.liclick}>{this.props.data.type}</li>
		);
	},
	componentDidMount:function(){
		$(".options").children("li").on("click",function(){
			$(this).css({"background":"#f6f6f6"}).siblings().css({"background":"#fff"});
		});
	}

});
var StudyMain=React.createClass({
	mixins: [StateMixin],
	render:function(){
		var type=this.getParams().type;
		var id=this.getParams().id;
		if(!id){
			id="all";
		}
		if(type=="applied"){
			var route=(<AppliedModule id={id}></AppliedModule>);
		}else if(type=="reviewing"){
			var route=(<ReviewingCourseModule></ReviewingCourseModule>);
		}
		return (
			<div id="studyMain">
				<div id="tab">
					<ul>
						<Link to="studyMain" params={{type:"applied",id:"all"}} id="applied"><li className="active">已申请课程</li></Link>
						<Link to="studyMain" params={{type:"reviewing",id:""}} id="reviewing"><li>审批中课程</li></Link>
					</ul>
				</div>
				{route}
			</div>
		);
	},
	componentDidMount:function(){
		$("#tab li").on("click",function(){
			$(this).closest("a").siblings().find("li").removeClass("active");
			$(this).addClass("active");
		});
		//还原footer
		$("#footer li:nth-of-type(1) i").removeClass("course_active").addClass("course");
		$("#footer li div:nth-of-type(1)").removeClass("active");
		$("#footer li:nth-of-type(3) div").addClass("active");
		$("#footer li:nth-of-type(3) i").addClass("user_active");
		$("#footer").show();

	}
});
var AppliedModule = React.createClass({
	mixins: [StateMixin],
	render: function () {
		var id=this.props.id;
		if(id=="all"){
			var lessons=[{
				id:1,
				title:"什么是变革管理什么是变革管理什么是变革管理什么是变革管理",
				teacher:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
				time:"10101010101010101010101010101010",
				studyNum:"1000",
				commentNum:"2000",
				score:"3"
			},{
				id:2,
				title:"你该如何面对艰难选择",
				teacher:"bbb",
				time:"20",
				studyNum:"200",
				commentNum:"40",
				score:"4"
			},{
				id:3,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:3,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:3,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:3,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			},{
				id:3,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			}];
		}else if(id=="learning"){
			var lessons=[{
				id:1,
				title:"什么是变革管理什么是变革管理什么是变革管理什么是变革管理",
				teacher:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
				time:"10101010101010101010101010101010",
				studyNum:"1000",
				commentNum:"2000",
				score:"3"
			}];
		}else if(id=="finished"){
			var lessons=[{
				id:2,
				title:"你该如何面对艰难选择",
				teacher:"bbb",
				time:"20",
				studyNum:"200",
				commentNum:"40",
				score:"4"
			},{
				id:3,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5"
			}];
		}
		return (
			<div>
				<ul id="list">
					<Link to="studyMain" params={{type:"applied",id:"all"}}><li className="active"> 全部</li></Link>
					<Link to="studyMain" params={{type:"applied",id:"learning"}}><li>正在学习</li></Link>
					<Link to="studyMain" params={{type:"applied",id:"finished"}}><li>已完成</li></Link>
				</ul>
				<hr/>
				<div className="content">
					{lessons.map(function(lesson,i){
						return (<Course data={lesson} key={i}></Course>)
					})}
				</div>
			</div>
		);
	},
	componentDidMount : function(){
		$("#list li").on("click",function(){
			$(this).closest("a").siblings().find("li").removeClass("active");
			$(this).addClass("active");
		});
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$("#footer").height()-$("#tab").height()-$("#list").height()-14;
		$(".content").height(height);
	}
});
var ReviewingCourseModule=React.createClass({
	render : function() {
		var lessons=[{
			id:1,
			title:"什么是变革管理什么是变革管理什么是变革管理什么是变革管理",
			teacher:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			time:"10101010101010101010101010101010",
			studyNum:"1000",
			commentNum:"2000",
			score:"3"
		},{
			id:2,
			title:"你该如何面对艰难选择",
			teacher:"bbb",
			time:"20",
			studyNum:"200",
			commentNum:"40",
			score:"4"
		},{
			id:3,
			title:"解读好莱坞",
			teacher:"ccc",
			time:"30",
			studyNum:"300",
			commentNum:"60",
			score:"5"
		},{
			id:3,
			title:"解读好莱坞",
			teacher:"ccc",
			time:"30",
			studyNum:"300",
			commentNum:"60",
			score:"5"
		},{
			id:3,
			title:"解读好莱坞",
			teacher:"ccc",
			time:"30",
			studyNum:"300",
			commentNum:"60",
			score:"5"
		},{
			id:3,
			title:"解读好莱坞",
			teacher:"ccc",
			time:"30",
			studyNum:"300",
			commentNum:"60",
			score:"5"
		},{
			id:3,
			title:"解读好莱坞",
			teacher:"ccc",
			time:"30",
			studyNum:"300",
			commentNum:"60",
			score:"5"
		}];
		return (
			<div className="content">
				{lessons.map(function(lesson,i){
					return (<Course data={lesson} key={i}></Course>);
				})}
			</div>
		);
	},
	componentDidMount:function(){
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$("#footer").height()-$("#tab").height()-13;
		$(".content").height(height);
	}
});

var StudyFooter=React.createClass({
	render:function(){
		return (
			<ul id="footer">
				<li>
					<Link to="courseMain">
						<i className="course_active"></i><div className="active">课程</div>
					</Link>
				</li>
				<li>
					<Link to="typeMain">
						<i className="classify"></i><div>分类</div>
					</Link>
				</li>
				<li>
					<Link to="studyMain" params={{type:"applied"}}>
						<i className="study"></i><div>学习</div>
					</Link>
				</li>
				<li>
					<Link to="mineMain">
						<i className="user"></i><div>我的</div>
					</Link>
				</li>
			</ul>
		);
	},
	componentDidMount:function(){
		$("#footer li").on("click",function(){
			$("#footer li i[class$='_active']").each(function(){
				var iClass=$(this).attr("class");
				$(this).removeClass(iClass);
				iClass=iClass.split("_active")[0];
				$(this).addClass(iClass);
			});
			var iClass=$(this).find("i").attr("class");
			$(this).find("i").removeClass(iClass).addClass(iClass+"_active");
			$(this).find("div").addClass("active");
			$(this).siblings().find("div").removeClass("active");
			$("#header .title").html($(this).find("div").html());
		});
	}
});

var routes = (
	<Route handler={Study}>
		<Route name="courseMain" path="/courseMain/:type?" handler={CourseMain} />
		<Route name="courseDetail" path="/courseDetail/:type?" handler={CourseDetail} />
		<Route name="mineMain" path="/mineMain/:type?" handler={MineMain} />
		<Route name="typeMain" handler={TypeMain} />
		<Route name="typeDetail" path="/typeDetail/:type?" handler={TypeDetail} />
		<Route name="studyMain" path="studyMain/:type?/:id?/:courseId?" handler={StudyMain} />

		<Redirect to="courseMain" />
	</Route>
);
Router.run(routes, function(Study){
	ReactDOM.render(<Study />, document.getElementById("study"));
});

