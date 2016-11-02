var Index = function($){
	var courses = [
		{imgSrc:'/public/img/courses/java8.jpg',
			title:'初学者的第一套Java教程',
			link:'/pages/courses/初学者的第一套Java教程.html'},
		{imgSrc:'/public/img/courses/html-css-js-basics.jpg',
			title:'Web前端入门教程',
			link:'/pages/courses/Web前端入门教程.html'},
		{imgSrc:'/public/img/courses/boots.jpg',
			title:'Bootstrap入门教程',
			link:'/pages/courses/Bootstrap入门实例教学.html'},	
		{imgSrc:'/public/img/courses/easyui.jpg',
			title:'jQuery-easyui基础教程',
			link:'/pages/courses/jQuery-easyui基础教程.html'},	
		{imgSrc:'/public/img/courses/tools.jpeg',
			title:'常用工具使用教程',
			link:'/pages/courses/常用工具使用教程.html'},
		{imgSrc:'/public/img/courses/interview.jpg',
			title:'JavaEE面试',
			link:'/pages/courses/JavaEE面试.html'},
		{imgSrc:'/public/img/courses/algorithm.jpg',
			title:'数据结构与算法',
			link:'/pages/courses/数据结构与算法.html'},
		{imgSrc:'/public/img/courses/jsp.jpg',
			title:'JSP-Servlet教程',
			link:'/pages/courses/JSP-Servlet教程.html'}
	];

	var getDom = function(course){
		return [
			'<div class="col-sm-6 col-md-4">',
		  '  <div class="thumbnail">',
		  '    <img src="'+course.imgSrc+'" alt="..." class="img-responsive hidden-sm hidden-xs">',
		  '    <div class="caption">',
		  '      <h3>'+course.title+'</h3>',
		  '      <p>',
		  '        <a href="'+course.link+'" class="btn btn-primary pull-right pjaxlink" role="button">',
		  '        进入<span class="icon fa fa-arrow-circle-right"></span>',
		  '        </a>',
		  '      </p>',
		  '    </div>',
		  '  </div>',
		  '</div>'
		].join("");
	};
	var sameHeight = function(){
		var defereds = []
		var $imgs = $('img')
		$imgs.each(function() {
		    var dfd = $.Deferred();
		    defereds.push(dfd);
				// 如果图片已经存在于浏览器缓存，考虑兼容性ie上有缓存时，不执行load，通过complete可以判断
				if(this.complete){
					dfd.resolve()
				}else{
					$(this).load(function(){
						dfd.resolve()
					});
				}
		    
		})

		$.when.apply(null, defereds).done(function() {
	    var $cols = $('.indexContent .row div[class^="col-"')
			var heights = $cols.map(function(){
				return $(this).height()
			}).get()

			var maxHeight = Math.max.apply(null,heights);
			$cols.height(maxHeight);
		})
	}
	return {
		init:function(){
			$('.indexContent .row').append(courses.map(course=>getDom(course)).join(""));
		},
		sameHeight:sameHeight
	};

}(jQuery);

(function($){
	$(function(){
		Index.init();
		Index.sameHeight();
	});
})(jQuery);