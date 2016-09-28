
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
    } ;
  }
}

//生成table of content
function contentEffects(){
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
      var $current = $($h1List[i]);
      var id = "section" + i;
      $current.attr("id", id);
      var $li = $('<li><a href="#'+id+'">'+$current.html()+'</a></li>');
      if (i==0) {
        $li.addClass('active');
      };
      //定义侧边导航链接点击行为，做适当偏移
      //匿名闭包函数，以持有i
      (function(id){
        $li.find('a').click(function(event){
          event.preventDefault();
          $('body,html').animate({scrollTop:$('#'+id).offset().top-60}, 1000);
          $('#sidebar').collapse('toggle')
        });
      })(id);
      $nav.append($li);

      // 处理h2
      var $h2List;
      if(i==lenOfH1-1){
        $h2List = $current.nextAll('h2');
      } else{
        $h2List = $current.nextUntil('h1','h2');
      }
      if($h2List.length>0){
        var $subUl = $('<ul class="nav"></ul>');
        $h2List.each(function(j,v){
          var h2id = 'section'+i+'-'+j;
          var $currentH2 = $(this);
          $currentH2.attr('id', h2id);
          var $subLi = $('<li><a href="#'+h2id+'">'+$(this).html()+'</a></li>');
          //定义侧边导航链接点击行为，做适当偏移
          (function(id){
            $subLi.click(function(event){
              event.preventDefault();
              $('body,html').animate({scrollTop:$('#'+h2id).offset().top-60}, 1000);
              $('#sidebar').collapse('toggle')
            });
          })(h2id);
          $subUl.append($subLi);
        });
        $li.append($subUl);
      }
    }
    // titles.each(function(i) {
    //     var current = $(this);
    //     tag = current.prop('tagName').substr(-1);
    //     $("#nav").append("<div style='margin-left:"+15*(tag-1)+"px'><a id='link" 
    //         + i + "' href='javascript:void(0);'>" 
    //         + current.html() + "</a></div>");
    //     $('#link'+i).click(function(){
    //       // console.log('toc link clicked---'+current.offset().top);
    //       // current.scrollTop(0);
    //       $('body').animate({scrollTop:current.offset().top-64}, 1000);
    //     });
    // }); 
  }
  //生成侧边栏目录 e

  $('#content a').attr('target','_blank');
  
  // 图片居中
  var $imgParent = $('#content img')
    .addClass('img-thumbnail content-img')
    .parent('p');
  $imgParent.addClass('text-center');
  $imgParent.next('p').has('em').addClass('text-center');
  
  // 代码高亮 b
  $("pre").addClass("prettyprint linenums");
  $("code").addClass("prettyprint");

  // Config ZeroClipboard
  $('pre.prettyprint').each(function () {
      var txt = $(this).text();
      var $span = $('<span class="clip_button" '
        // +'data-clipboard-text="'+ txt  +'" '
        +'data-placement="left" title="复制到剪贴板"'
        +'>复制</span>').data('clipboard-text',txt);

      var $btnDiv = $('<div class="zero-clipboard"></div>').append($span);
     
      $(this).before($btnDiv)
  });
  //添加提示效果
  $('.clip_button').tooltip({
    delay: { "show": 100, "hide": 500 }
  });
  var client = new ZeroClipboard( $('.clip_button') );
  // Handlers for ZeroClipboard
  client.on( 'ready', function(event) {

        client.on( 'copy', function(event) {
          event.clipboardData
            .setData('text/plain', 
              $(event.target).data('clipboard-text'));
        } );

        client.on( 'aftercopy', function(event) {
          $(event.target)
            //.data('placement', 'left')
            .attr('title', '复制成功!')
            .tooltip('fixTitle')
            .tooltip('show')
            .attr('title', '复制到剪贴板')
            .tooltip('fixTitle');
        } );
  } );

  client.on( 'error', function(event) {
        // console.log( 'ZeroClipboard error of type "' + event.name + '": ' 
          // + event.message );
        ZeroClipboard.destroy();
  } );

  prettyPrint();
  $('.prettyprint>.pln').each(
    function(){
      var txt = $(this).text();
      // if($.trim(txt).length==0){
        $(this).text(txt.replace(/\s/g,' '));
      // }
    }
  );
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



// 这句话是绑定本页面所有.pjaxlink标签，链接点击之后，
// 替换#pjax容器的内容为新内容#pjax，ajax超时时间为10秒；
  $(document).pjax('.pjaxlink', '#pjax', { fragment: "#pjax", timeout: 10000 });
  
  // pjax.end 在pjax ajax结束时调用 
  // pjax.complete 在装载完成后调用 
  //迫使多说生效
  $(document).on("pjax:complete", function() {
    addListener();//给回到顶部和toc按钮加监听
    contentEffects();//生成toc
    addDuoshuo();//添加多说评论和分享框
    addTableStyle();  
    addScrollspyAndAffix();
    otherConfig();
  });

  addListener();
  contentEffects();
  addDuoshuo();
  addTableStyle();
  addScrollspyAndAffix();
  otherConfig();
});
function otherConfig(){
  $('[data-toggle="tooltip"]').tooltip();
}
function addListener(){

  //回到顶部
  $('.scrolltop-btn').on("click", function() {
    //65=h1的上外边距（25）+导航条的高度（40）
    $('body,html').animate({scrollTop:$('.doc-title').offset().top-65}, 500);
    $('#sidebar').collapse('toggle') //隐藏目录
  });
//侧边栏隐藏时，按钮样式为展开
  $('#sidebar').on('hidden.bs.collapse', function () {
    $('.sidebar-toggle>i').removeClass('icon-zhankai').addClass('icon-shouqi');
  })
  //侧边栏显示时，按钮样式为收起
  $('#sidebar').on('shown.bs.collapse', function () {
    $('.sidebar-toggle>i').removeClass('icon-shouqi').addClass('icon-zhankai');
  })
}

function addTableStyle(){
  // 响应式表格
  if($("#content table").parents('.table-responsive').size()==0){
    $("#content table").wrap('<div class="table-responsive" ></div>');
  }
  $("#content table")
    .addClass("table table-condensed table-bordered table-striped table-hover");
}

function addScrollspyAndAffix(){
  // Scrollspy
  var $window = $(window);
  var $body   = $(document.body);
  var off = $('.navbar').height()-1+25;
  $body.scrollspy({
    target: '.doc-side-container',
    offset: off
  });
  
  $body.scrollspy('refresh');
  var $sidebarToggle=$('.sidebar-toggle');
  //仅在大屏幕上affix
  if(!$sidebarToggle||$sidebarToggle.css('display')==='none'){
    var $sideBar = $('.doc-sidebar');
  // 指定开关阈值，滚动到top时，将元素固定在顶部，滚动到bottom时，停止固定
    $sideBar.affix({
      offset:{
        top : function () {
          var offsetTop      = $sideBar.offset().top
          var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
          var navOuterHeight = $('.navbar').height()
          var topValue = offsetTop - navOuterHeight - sideBarMargin;

          return (this.top = topValue);
        }
        ,
        bottom: function () {
          var heightOfFooter = $('footer').outerHeight(true);
          return (this.bottom = heightOfFooter);
        }
      }
    });
  }
}

function iFrameHeight(obj){
  var subWeb = document.frames ? document.frames[0].document : obj.contentDocument;   
  if(obj != null && subWeb != null) {
    obj.height = subWeb.body.scrollHeight;
    obj.width = subWeb.body.scrollWidth;
  }   
}



