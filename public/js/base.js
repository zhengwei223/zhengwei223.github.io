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

$(document).ready(function() {
  /* 导航菜单按钮监听事件，控制左侧 aside 的动作 */
  $("#nav_btn").on('click', function() {
    isClicked = $(this).data('clicked');

    nav_click(!isClicked);

    // $(this).data('clicked', !isClicked);
  });
  //toc监听事件，toggle content_table及改变按钮样式
  $("#content_btn").on('click', function(){
    isClicked = $(this).data('clicked');
    content_click(!isClicked);
    $(this).data('clicked',!isClicked);
  });

  $(document).pjax('.pjaxlink', '#pjax', { fragment: "#pjax", timeout: 10000 });
  
  $(document).on("pjax:end", function() {
    //?
    // if($("body").find('.container').width() < 992)
    //   $('#nav_btn').click();

    $('.aside3').scrollTop(0);
    contentEffects();
  });

  $('body').on('click', '.show-commend', function(){
    var ds_loaded = false;
    window.disqus_shortname = $('.show-commend').attr('name');
    $.ajax({
      type: "GET",
      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
  });

  contentEffects();

  //文章目录超链接上的监听：隐藏该目录
  // $("#content_table div #nav div a").click(function(){
  //   $("#content_btn").click();
  // });
  //侧边栏的直接链接，隐藏菜单
  $(".aside1 .pjaxlink ").click(function(){
    $('#nav_btn').click();
  });
  //文章超链接上的监听：隐藏菜单
  $(".aside2 .tab_href ").click(function(){
    $('#nav_btn').click();
  });
  //文章超链接，隐藏左侧菜单
  $(".aside2 .box_href ").click(function(){
    $('#nav_btn').click();
  });
  
  /* For zebra striping */
  $("table tr:nth-child(odd)").addClass("odd-row");
  /* For cell text alignment */
  $("table td:first-child, table th:first-child").addClass("first");
  /* For removing the last border */
  $("table td:last-child, table th:last-child").addClass("last");
});

//生成table of content
function contentEffects(){
  //remove the asidebar
  $('.row-offcanvas').removeClass('active');
  var titles = $("#content > h1,#content > h2");
  if($("#nav").length > 0 && titles.length>0){
    //只显式2级标题及以上
    titles.each(function(i) {
        var current = $(this);
        current.attr("id", "title" + i);
        tag = current.prop('tagName').substr(-1);
        $("#nav").append("<div style='margin-left:"+15*(tag-1)+"px'><a id='link" + i + "' href='#title" +i + "'>" + current.html() + "</a></div>");
    }); 
    $("pre").addClass("prettyprint");
    prettyPrint(); 
    $('#content img').addClass('img-thumbnail').parent('p').addClass('center');
    $('#content_btn').show();
  }else{
    $('#content_btn').hide();
  }
}
//生成table of content  end