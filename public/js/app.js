var ListItem = React.createClass({
	render:function(){
		return (
			<li>
				<a href={this.props.url} onClick={this.click(this.props.url)}>{this.props.text}</a>
				{this.getChildren()}
			</li>	
		);
	},
	getChildren:function(){
		if(this.props.children.length){
			var subList = this.props.children.map(function(item){
				return (
					<li><a href={item.url} onClick={this.click(item.url)}>{item.text}</a></li>
				);
			});
			return (
				<ul className="nav">
					{subList}
				</ul>
			);
		}else{
			return "";
		}
	},
	click:function(url){
		$('body,html').animate({scrollTop:$(url).offset().top-60}, 1000);
	}
});
var SidebarUL = React.createClass({
	getInitialState:function(){
		return {data:[]};
	},
	componentDidMount:function(){
	  var $h1List ;
	  if ($("#content").length) {
	    $h1List = $("#content > h1");
	  }else{
	    $h1List = $("#page-content > h1");
	  }
	  var lenOfH1 = $h1List.length;
	  var $nav = $('.doc-sidebar > .nav');
	  // 判断有侧边栏&&有一级标题
	  //生成侧边栏目录 b
	  if($(".doc-sidebar").length > 0 && lenOfH1>0){
	    for(var i = 0; i < lenOfH1; i++){
	      let $current = $($h1List[i]);
	      let id = "section" + i;
	      $current.attr("id", id);
	      let li = {url:'#'+id,text:$current.html()};
	      
	      // 处理h2
	      let $h2List;
	      if(i==lenOfH1-1){
	        $h2List = $current.nextAll('h2');
	      } else{
	        $h2List = $current.nextUntil('h1','h2');
	      }
	      if($h2List.length>0){
	        let children=[];
	        $h2List.each(function(j,v){
	          let id = 'section'+i+'-'+j;
	          let $currentH2 = $(this);
	          $currentH2.attr('id', id);
	          children.push({url:'#'+id,text:$(this).html()});
	        });
	        li.children=children;
	      }
	      this.state.data.push(li);
	    }
	  }
	  this.setState({data:this.state.data});
	},
	render:function(){
		var listItem = this.state.data.map(function(item){
			return (
				<ListItem key={item.url} url={item.url} text={item.text} 
					children={item.children|[]} />
			);
		});
		return (
			<ul className="nav nav-pills nav-stacked">
				{listItem}
            </ul>	
		);
	}
});

var ScrollTop = React.createClass({
	render:function(){
		return (
			<div className="text-center">
	          <button className="btn btn-primary scrolltop-btn">
	            <i className="icon fa fa-angle-double-up"></i>
	          </button>
	        </div>
		);
	}

});

var NavContainer = React.createClass({
	render:function(){
		return (
			<nav className="doc-sidebar hidden-print hidden-sm hidden-xs affix-top"> 
      			<SidebarUL />
      			<ScrollTop />
      		</nav>
		);
	}
});	
ReactDOM.render(<NavContainer />,document.getElementById('doc-side-container'));	
