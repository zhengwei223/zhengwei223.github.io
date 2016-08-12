var duoshuoQuery = {short_name:"lanqiao2016"};
function addDuoshuo(){
  if ( $('.ds-thread').length > 0 ) { 
    if (typeof DUOSHUO !== 'undefined') {
      DUOSHUO.EmbedThread('.ds-thread');
    }else{
      $.getScript("//static.duoshuo.com/embed.js");
    } 
  }
  if ( $('.ds-share').length > 0 ) { 
    if (typeof DUOSHUO !== 'undefined') {
      DUOSHUO.initSelector('.ds-share',{type:'ShareWidget'});
    }else{
      $.getScript("//static.duoshuo.com/embed.js");
    } 
  }
}
/* 控制导航按钮动作 */
function nav_click(is_show) {
  if (is_show) {
    /* 显示左侧aside */
    $('.aside')
      .addClass('visible-md visible-lg visible-sm visible-xs')  
      .removeClass('hidden-md hidden-lg hidden-sm hidden-xs')  
    /* 调整右侧内容 */
    $('.aside3')
      .removeClass('col-md-13 col-lg-13')  
      .addClass('col-md-8 col-lg-8');   //调整为半屏，如果在手机上因为aside会满屏，所以实际上右侧内容被隐藏了
    /* 调整文字内容格式 */
    $('.aside3-content')
      .removeClass('col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2')
      .addClass('col-md-13');  //在显示菜单的情况下填满整行
	  
  } else {
    /* 隐藏左侧aside */
    $('.aside')
      .removeClass('visible-md visible-lg visible-sm visible-xs')
      .addClass('hidden-md hidden-lg hidden-sm hidden-xs');//隐藏左侧
    /* 右侧内容最大化 */
    $('.aside3')
      .removeClass('col-md-8 col-lg-8')
      .addClass('col-md-13 col-lg-13');//右侧最大化
    /* 修改文字排版 */
    $('.aside3-content')
      .removeClass('col-md-13')
      .addClass('col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2'); 
	
  }  /*col-md-offset-1 col-lg-offset-2*/
  $("#nav_btn").data('clicked',is_show);
}
/* 控制文章章节列表按钮 */
function content_click(is_show){
  if (is_show) {
    $('#content_table').show();
    $('#content_btn i').removeClass('fa-plus').addClass('fa-minus');
  } else {
    $('#content_table').hide();
    $('#content_btn i').removeClass('fa-minus').addClass('fa-plus');
  }
}
//生成table of content
function contentEffects(){
  //remove the asidebar
  //$('.row-offcanvas').removeClass('active');
  var titles = $("#content > h1,#content > h2");
  if($("#nav").length > 0 && titles.length>0){
    //只显式1,2级标题
    titles.each(function(i) {
        var current = $(this);
        current.attr("id", "title" + i);
        tag = current.prop('tagName').substr(-1);
        $("#nav").append("<div style='margin-left:"+15*(tag-1)+"px'><a id='link" + i + "' href='javascript:void(0);'>" + current.html() + "</a></div>");
        $('#link'+i).click(function(){
          // console.log('toc link clicked---'+current.offset().top);
          // current.scrollTop(0);
          $('body').animate({scrollTop:current.offset().top-64}, 1000);
        });
    }); 
    $('#content_btn').show();
  }else{
    $('#content_btn').hide();
  }
  // 图片居中
  $('#content img').addClass('img-thumbnail').parent('p').addClass('center');
  
  // 代码高亮 b
  $("pre").addClass("prettyprint linenums");
  $("code").addClass("prettyprint");
  prettyPrint();
  // 代码高亮 e 
}
//生成table of content  end

$(document).ready(function() {
  /* 导航菜单按钮监听事件，控制左侧 aside 的动作 */
  // $("#nav_btn").on('click', function() {
  //   isClicked = $(this).data('clicked');

  //   nav_click(!isClicked);

  //   // $(this).data('clicked', !isClicked);
  // });



// 这句话是绑定本页面所有.pjaxlink标签，链接点击之后，替换#pjax容器的内容为新内容#pjax，ajax超时时间为10秒；
  $(document).pjax('.pjaxlink', '#pjax', { fragment: "#pjax", timeout: 10000 });
  
  // pjax.end 在pjax ajax结束时调用 
  // pjax.complete 在装载完成后调用 
  //迫使多说生效
  $(document).on("pjax:complete", function() {
    $('#content a').attr('target','_blank');
    $('.aside3').scrollTop(0);//回到顶部
    addListener();//给回到顶部和toc按钮加监听
    addDuoshuo();//添加多说评论和分享框
    contentEffects();//生成toc
    $("#content table").addClass("table table-condensed table-bordered table-striped table-hover");
  });

  $('#content a').attr('target','_blank');
  addListener();
  contentEffects();
  addDuoshuo();
  $("#content table").addClass("table table-condensed table-bordered table-striped table-hover");
  /* For cell text alignment */
  // $("table td:first-child, table th:first-child").addClass("first");
  /* For removing the last border */
  // $("table td:last-child, table th:last-child").addClass("last");
});

function addListener(){
  //展示本文目录
  $("#content_btn").on('click', function(){
    isClicked = $(this).data('clicked');
    content_click(!isClicked);
    $(this).data('clicked',!isClicked);
  });
  //回到顶部
  $('#scrolltop_btn').on("click", function() {
    // $('.aside3').scrollTop(0);
    $('body').animate({scrollTop:$('.aside3-title').offset().top-64}, 500);
  });

}

