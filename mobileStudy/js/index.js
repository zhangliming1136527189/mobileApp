//1rem=100px;
document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var DefaultRoute = ReactRouter.DefaultRoute;
var Redirect = ReactRouter.Redirect;
var Link = ReactRouter.Link;
var StateMixin = ReactRouter.State;

var MobileStudy=React.createClass({
	render:function(){
		return (
			<RouteHandler />
		);
	}
});
var CourseMain=React.createClass({
	getInitialState:function(){
		return {
			lessons:[],
			type:1
		}
	},
	getLessons:function(type){
		this.setState({
			type:type
		});
		if(type==1){
			this.setState({
				lessons:[{
					id:1,
					title:"什么是变革管理什么是变革管理什么是变革管理什么是变革管理",
					teacher:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
					time:"10101010101010101010101010101010",
					studyNum:"1000",
					commentNum:"2000",
					score:"3"
				}]
			});
		}else if(type==2){
			this.setState({
				lessons:[{
					id:2,
					title:"你该如何面对艰难选择",
					teacher:"bbb",
					time:"20",
					studyNum:"200",
					commentNum:"40",
					score:"4"
				}]
			});
		}else if(type==3){
			this.setState({
				lessons:[{
					id:5,
					title:"解读好莱坞",
					teacher:"ccc",
					time:"30",
					studyNum:"300",
					commentNum:"60",
					score:"5"
				}]
			});
		}
	},
	componentWillMount:function(){
		this.setState({
			lessons:[{
				id:1,
				title:"什么是变革管理什么是变革管理什么是变革管理什么是变革管理",
				teacher:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
				time:"10101010101010101010101010101010",
				studyNum:"1000",
				commentNum:"2000",
				score:"3"
			}]
		});
	},
	render:function(){
		return (
			<div id="CourseMain">
				<StudyHeader/>
				<Search/>
				<hr/>
				<ul className="tab">
					<li className="hot active" onClick={this.getLessons.bind(this,1)}>热门</li>
					<li className="new" onClick={this.getLessons.bind(this,2)}>最新</li>
					<li className="myCourse" onClick={this.getLessons.bind(this,3)}>推荐</li>
				</ul>
				<div className="hr"></div>
				<div id="main">
					<HotCourse type={this.state.type} />
					{this.state.lessons.map(function(lesson,i){
						return (<Course data={lesson} key={i} />);
					})}
				</div>
				<StudyFooter/>
			</div>
		);
	},
	componentDidMount:function(){
		$("#header").find(" .title").html("课程");
		$("#header").find(" .back span").html("应用");
		$("#header").find(" .back").attr("href","#");
		$("#footer").show();
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$("#footer").height()-$("#CourseMain .tab").height()-$("#search").height()-3;
		$("#main").height(height);
		$("#CourseMain .tab").find("li").width(document.documentElement.clientWidth/3);
		$("#CourseMain .tab").find("li").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
		});
	}
});
var CourseDetail=React.createClass({
	mixins: [StateMixin],
	getInitialState:function(){
		return {
			lesson:{},
			coursewares:[],
			comments:[]
		}
	},
	componentWillMount:function(){
		var courseId=this.getParams().courseId;//根据id获取课程、课件、评论信息
		this.setState({
			lesson:{
				id:5,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5",
				summary:"课程简介"
			},
			coursewares:[{
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
			}],
			comments:[{
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
			}]
		});
	},
	render:function() {
		var courseId=this.getParams().courseId;
		var type=this.getParams().type;
		!type?type="content":"";
		if(type=="content"){
			var route=(
				<Content content={this.state.lesson.summary}/>
			);
		}else if(type=="courseware"){
			var route= this.state.coursewares.map(function(courseware,i){
				return (<Courseware data={courseware} key={i} />);
			}.bind(this));
		}else if(type=="comment"){
			var route=this.state.comments.map(function(comment,i){
				return (<Comment data={comment} key={i} />);
			}.bind(this));
		}
		return (
			<div id="courseDetail">
				<StudyHeader />
				<Course data={this.state.lesson} />
				<Collect />
				<CourseTab courseId={courseId} type={type}/>
				<div id="comment">
					{route}
				</div>
				<Apply />
			</div>
		);
	},
	componentDidMount:function(){
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$(".apply").height()-$(".lesson").height()-$("#courseDetail .collect").height()-$("#courseDetail .tab").height()-3;
		$("#comment").height(height);

		$("#header .title").html("课程详情");
		$("#header .back span").html("返回");
		$("#header .back").attr("href","index.html#/courseMain");
	}
});
var StudyDetail=React.createClass({
	mixins: [StateMixin],
	getInitialState:function(){
		return {
			lesson:{},
			coursewares:[],
			comments:[],
			wares:[]
		}
	},
	componentWillMount:function(){
		var courseId=this.getParams().courseId;//根据id获取课程、课件、评论信息
		this.setState({
			lesson:{
				id:5,
				title:"解读好莱坞",
				teacher:"ccc",
				time:"30",
				studyNum:"300",
				commentNum:"60",
				score:"5",
				summary:"课程简介"
			},
			coursewares:[{
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
			}],
			comments:[{
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
			}],
			wares:[
				{fileName:"资料1.zip",size:"5M"},
				{fileName:"资料2.docx",size:"5.5M"},
				{fileName:"资料3.xlsx",size:"15M"},
				{fileName:"资料4.docx",size:"3M"},
				{fileName:"资料5.jpg",size:"6M"},
				{fileName:"资料6.pdf",size:"9M"},
				{fileName:"资料7.ppt",size:"100M"}
			]
		});
	},
	render:function() {
		var courseId=this.getParams().courseId;
		var type=this.getParams().type;
		var route1=(
			<div className="box">
				<Study data={this.state.lesson} />
				<Collect />
			</div>
		);
		!type?type="content":"";
		if(type=="content"){
			var route2=(
				<Content content={this.state.lesson.summary}/>
			);
		}else if(type=="courseware"){
			route1=(
				<video className="box" src="http://www.laikabase.de/videos/Shift.mp4" controls="controls" id="video" />
			);
			var route2= this.state.coursewares.map(function(courseware,i){
				return (<Courseware data={courseware} key={i} />);
			}.bind(this));
		}else if(type=="comment"){
			var route2=this.state.comments.map(function(comment,i){
				return (<Comment data={comment} key={i} />);
			}.bind(this));
		}else if(type=="ware"){
			var route2=this.state.wares.map(function(ware,i){
				return (<Ware data={ware} key={i} />);
			}.bind(this));
		}
		return (
			<div id="courseDetail">
				<StudyHeader />
				{route1}
				<StudyTab courseId={courseId} type={type} />
				<div id="comment">
					{route2}
				</div>
				<Apply />
			</div>
		);
	},
	componentDidMount:function(){
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$(".apply").height()-$(".box").outerHeight(true)-$("#courseDetail .tab").height();
		$("#comment").height(height);
		$("#header .title").html("课程详情");
		$("#header .back span").html("返回");
		$("#header .back").attr("href","index.html#/studyMain");
	},
	componentDidUpdate:function(){
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$(".apply").height()-$(".box").outerHeight(true)-$("#courseDetail .tab").height();
		$("#comment").height(height);
	}
});
var TypeMain=React.createClass({
	mixins: [StateMixin],
	getInitialState:function(){
		return {
			types:[]
		}
	},
	componentWillMount:function(){
		this.setState({
			types:[{
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
			}]
		});
	},
	render:function() {
		return (
			<div id="typeMain">
				<StudyHeader />
				<div id="main" ref="main">
					{this.state.types.map(function (type, i) {
						return (
							<ManageMoudle data={type} key={i} />
						)
					})}
				</div>
				<StudyFooter />
			</div>
		);
	},
	componentDidMount:function(){
		var height=document.documentElement.clientHeight-$("#header").height()-$("#footer").height();
		$(this.refs.main).height(height);

		$("#header .title").html("分类");
		$("#header .back span").html("应用");
		$("#header .back").attr("href","#");
		//还原footer
		$("#footer li:nth-of-type(1) i").removeClass("course_active").addClass("course");
		$("#footer li div").removeClass("active");
		$("#footer li:nth-of-type(2) div").addClass("active");
		$("#footer li:nth-of-type(2) i").addClass("classify_active");
	}
});
var TypeDetail=React.createClass({
	getInitialState:function(){
		return {
			lessons:[]
		}
	},
	componentWillMount:function(){
		this.setState({
			lessons:[{
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
			}]
		});
	},
	getNewCourses:function(type,rank){
		console.log(type,rank);
	},
	render:function(){
		return (
			<div>
				<StudyHeader/>
				<NavoptionMoudle getNewCourses={this.getNewCourses}/>
				<Search />
				<div className="content">
					{this.state.lessons.map(function (lesson, i) {
						return (<Course data={lesson} key={i} />);
					})}
				</div>
			</div>
		);
	},
	componentDidMount:function(){
		$("#header .title").html("分类");
		$("#header .back span").html("返回");
		$(" #header .back").attr("href","index.html#/typeMain");
		var height=document.documentElement.clientHeight;
		height=height-$("#header").height()-$(".navlist").height()-$(".search").closest("div").height();
		$(".content").height(height);
	}
});
var StudyMain=React.createClass({
	getInitialState:function(){
		return {
			lessons:[]
		}
	},
	componentWillMount:function(){
		this.setState({
			lessons:[{
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
			}]
		});
	},
	render:function(){
		return (
			<div id="studyMain">
				<StudyHeader />
				<div id="tab">
					<ul ref="ul">
						<li className="active"> 全部</li>
						<li>正在学习</li>
						<li>已完成</li>
						<li>审批中</li>
					</ul>
				</div>
				{this.state.lessons.map(function(lesson,i){
					return (<Study data={lesson} key={i} />);
				})}
				<StudyFooter />
			</div>
		);
	},
	componentDidMount:function(){
		var liWidth=($(this.refs.ul).width()-3)/4;
		$(this.refs.ul).find("li").width(liWidth);

		$("#tab li").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(this);
		});
		//还原footer
		$("#footer li:nth-of-type(1) i").removeClass("course_active").addClass("course");
		$("#footer li div:nth-of-type(1)").removeClass("active");
		$("#footer li:nth-of-type(3) div").addClass("active");
		$("#footer li:nth-of-type(3) i").addClass("user_active");
		$("#footer").show();

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
				<MyCollect />
			);
		}else if(!type){
			var route=(
				<div>
					<MyBanner />
					<MyList />
				</div>
			);
		}
		return (
			<div id="mine">
				<StudyHeader />
				{route}
				<StudyFooter />
			</div>
		);
	}
});






var StudyHeader=React.createClass({
	render: function () {
		return (
			<div id="header" ref="header">
				<a href="#" className="back"><i className="icon_back" /><span>应用</span></a>
				<span className="title">课程</span>
			</div>
		);
	}
});
var Search=React.createClass({
	render:function(){
		return (
			<div id="search">
				<Link to="searchPage">
					<input type="text" className="search" placeholder="搜索"/>
				</Link>
			</div>
		);
	}
});
var SearchPage=React.createClass({
	cancel:function(){
		$("#search .search").val("");
	},
	render:function(){
		return (
			<div id="searchPage">
				<Search />
				<hr/>
				<Link to="searchResult" className="">
					<span className="button">搜索</span>
				</Link>
				<span className="cancel" onClick={this.cancel} />
				<div className="cover">
					<p className="title">搜索历史</p>
					<ul className="history">
						<li>搜索历史1</li>
						<li>搜索历史2</li>
						<li>搜索历史3</li>
					</ul>
					<span className="del">删除记录</span>
				</div>
			</div>
		);
	},
	componentDidMount:function(){
	var height=document.documentElement.clientHeight-$("#header").height()-$(".search").closest("div").height();
	$(".cover").height(height);
	var marginTop=$("#header").height()+$(".search").closest("div").height();
	$(".cover").css({
		top:marginTop
	});
	$("#SearchPage .history li").on("click",function(){
		var html=$(this).html();
		$("#search .search").val(html);
	});
	$("#search .search").css({
		width:"2.55rem",
		backgroundPosition:"0.12rem center"
	});
}
});
var SearchResult=React.createClass({
	render:function(){
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
		return (
			<div id="searchResult">
				<Search />
				<hr/>
				<Link to="searchResult">
					<span className="button">取消</span>
				</Link>
				{lessons.map(function(lesson,i){
					return (<Course data={lesson} key={i} />);
				})}
			</div>
		);
	},
	componentDidMount:function(){
		$("#search .search").css({
			width:"2.55rem",
			backgroundPosition:"0.12rem center"
		});
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
			var route=(<span>推荐</span>);
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
				<Link to="courseDetail" params={{courseId:this.props.data.id}}>
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
var Study=React.createClass({
	render:function(){
		return (
			<div className='lesson'>
				<Link to="studyDetail" params={{courseId:this.props.data.id}}>
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
			<ul className="myList">
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
		height=height-$("#header").outerHeight(true)-$(".share").outerHeight(true)-$(".author-detail").outerHeight(true);
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
				<ul className="time-range-list" ref="ul">
					<li>今日</li>
					<li className="active">本周</li>
					<li>本月</li>
				</ul>
				<div className="author-info">
					<ul className="author-info-list">
						<li><i className="user_pic2" /></li>
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
			$(this).addClass("active").siblings().removeClass("active");
		});
		$(this.refs.ul).find("li").width(($(this.refs.ul).width()-2)/3);
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
var Ware=React.createClass({
	getInitialState:function(){
		return {
			src:""
		}
	},
	componentWillMount:function(){
		var zip=/.zip$/;
		var docx=/.docx$/;
		var xlsx=/.xlsx$/;
		var jpg=/.jpg/;
		var pdf=/.pdf$/;
		var ppt=/.ppt$/;
		var fileName=this.props.data.fileName;
		zip.test(fileName)?this.setState({src:"img/icon/icon_zip.png"}):"";
		docx.test(fileName)?this.setState({src:"img/icon/icon_word.png"}):"";
		xlsx.test(fileName)?this.setState({src:"img/icon/icon_xlsx.png"}):"";
		jpg.test(fileName)?this.setState({src:"img/icon/icon_jpg.png"}):"";
		pdf.test(fileName)?this.setState({src:"img/icon/icon_pdf.png"}):"";
		ppt.test(fileName)?this.setState({src:"img/icon/icon_ppt.png"}):"";
	},
	render:function(){
		var style={"backgroundImage":"url('"+this.state.src+"')"};
		return (
			<div className="ware clearfix">
				<i className="ware_pic" style={style} />
				{this.props.data.fileName}
				<span className="size">{this.props.data.size}</span>
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
				<ul className="tab" ref="ul">
					<Link to="courseDetail" params={{courseId:this.props.courseId,type:"content"}}>
						<li className="active" name="content">课程简介</li>
					</Link>
					<Link to="courseDetail" params={{courseId:this.props.courseId,type:"courseware"}}>
						<li name="courseware">课件</li>
					</Link>
					<Link to="courseDetail" params={{courseId:this.props.courseId,type:"comment"}}>
						<li name="comment">评论</li>
					</Link>
				</ul>
				<div className="hr"></div>
			</div>
		);
	},
	componentDidMount:function(){
		var type=this.props.type;
		console.log(type);
		$(this.refs.ul).find("li").removeClass("active");
		$(this.refs.ul).find("li[name='"+type+"']").addClass("active");
		var width=$("#courseDetail .tab").width();
		$("#courseDetail .tab li").width(width/3);

	},
	componentDidUpdate:function(){
		var type=this.props.type;
		$(this.refs.ul).find("li").removeClass("active");
		$(this.refs.ul).find("li[name='"+type+"']").addClass("active");
	}
});
var StudyTab=React.createClass({
	render:function(){
		return (
			<div>
				<ul className="tab" ref="ul">
					<Link to="studyDetail" params={{courseId:this.props.courseId,type:"content"}}>
						<li className="active" name="content">课程简介</li>
					</Link>
					<Link to="studyDetail" params={{courseId:this.props.courseId,type:"courseware"}}>
						<li name="courseware">课件</li>
					</Link>
					<Link to="studyDetail" params={{courseId:this.props.courseId,type:"ware"}}>
						<li name="ware">资料</li>
					</Link>
					<Link to="studyDetail" params={{courseId:this.props.courseId,type:"comment"}}>
						<li name="comment">评论</li>
					</Link>
				</ul>
				<div className="hr"></div>
			</div>
		);
	},
	componentDidMount:function(){
		var type=this.props.type;
		$(this.refs.ul).find("li").removeClass("active");
		$(this.refs.ul).find("li[name='"+type+"']").addClass("active");
		var width=$("#courseDetail .tab").width();
		$("#courseDetail .tab li").width(width/4);
	},
	componentDidUpdate:function(){
		var type=this.props.type;
		$(this.refs.ul).find("li").removeClass("active");
		$(this.refs.ul).find("li[name='"+type+"']").addClass("active");
	}
});
var Content=React.createClass({
	render:function(){
		return (
			<div className="summary">{this.props.content}</div>
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
			parentType:[],
			childType:[],
			rankings:[
				{
					id:1,
					ranking:'评论数从高到低'
				},
				{
					id:2,
					ranking:'收藏数从高到低'
				},
				{
					id:3,
					ranking:'观看数从高到低'
				},
				{
					id:4,
					ranking:'星级数从高到低'
				}
			],
			nowType:"",
			nowRanking:""
		}
	},
	componentWillMount:function(){
		this.setState({
			parentType:["管理类","专业职能类","蓝血文化"],
			childType:["管理类1","管理类2","管理类3","管理类4","管理类5","管理类6"],
			nowType:"管理类",
			nowRanking:"评论数从高到低"
		});
	},
	getChildType:function(type){
		if(type=="管理类"){
			this.setState({
				childType:["管理类1","管理类2","管理类3","管理类4","管理类5","管理类6"]
			});
		}
		if(type=="专业职能类"){
			this.setState({
				childType:["专业职能类1","专业职能类2","专业职能类3","专业职能类4","专业职能类5","专业职能类6"]
			});
		}
		if(type=="蓝血文化"){
			this.setState({
				childType:["蓝血文化1","蓝血文化2","蓝血文化3","蓝血文化4","蓝血文化5","蓝血文化6"]
			});
		}
	},
	changeTab:function(type){
		this.setState({
			nowType:type
		});
		this.props.getNewCourses(type,this.state.nowRanking);
	},
	changeRanking:function(rank){
		this.setState({
			nowRanking:rank
		});
		this.props.getNewCourses(this.state.nowType,rank);
	},
	render:function(){
		return(
			<div className="navlist">
				<i className="line_cut" />
				<ul className="tab">
					<li className="type" ref="type">{this.state.nowType}</li>
					<li className="rank" ref="rank">{this.state.nowRanking}</li>
				</ul>

				<div className="ulFather" style={{width:"100%",backgroundColor:"#fff"}}>
					<ul className="options">
						<li>全部</li>
						{this.state.parentType.map(function(ele,i){
							return (
								<li key={i} onClick={this.getChildType.bind(this,ele)}>
									{ele}
								</li>
							);
						}.bind(this))}

					</ul>
					<ul className="sortsDetail">
						{this.state.childType.map(function(ele,i){
							return <li key={i} onClick={this.changeTab.bind(this,ele)}>{ele}</li>;
						}.bind(this))}
					</ul>
				</div>
				<ul className="rankings">
					{this.state.rankings.map(function(ele,i){
						return(<li key={i} onClick={this.changeRanking.bind(this,ele.ranking)}>{ele.ranking}</li>)
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
			<li onClick={this.liclick}>{this.props.data}</li>
		);
	},
	componentDidMount:function(){
		$(".options").children("li").on("click",function(){
			$(this).css({"background":"#f6f6f6"}).siblings().css({"background":"#fff"});
		});
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
	<Route handler={MobileStudy}>
		<Route name="courseMain" path="/courseMain" handler={CourseMain} />
		<Route name="courseDetail" path="/courseDetail/:courseId?/:type?" handler={CourseDetail} />
		<Route name="mineMain" path="/mineMain/:type?" handler={MineMain} />
		<Route name="typeMain" handler={TypeMain} />
		<Route name="typeDetail" path="/typeDetail/:type?" handler={TypeDetail} />
		<Route name="studyMain" path="studyMain" handler={StudyMain} />
		<Route name="studyDetail" path="studyDetail/:courseId?/:type?" handler={StudyDetail} />
		<Route name="searchPage" handler={SearchPage} />
		<Route name="searchResult" handler={SearchResult} />

		<Redirect to="courseMain" />
	</Route>
);
Router.run(routes, function(MobileStudy){
	ReactDOM.render(<MobileStudy />, document.getElementById("study"));
});

