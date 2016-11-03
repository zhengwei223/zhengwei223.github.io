// -----------------------------------------------------
// | 版权所有: 蓝桥 - 教研部                                                                                 |
// -----------------------------------------------------

/**
 * 所有页面依赖的js
 *
 * @Author zhengwei
 * @Date 2016-09-30
 */
var duoshuoQuery = {short_name:"lanqiao2016"};
var app = function($){
  var renderDuoShuo = function(){
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
  };
  var renderToc = function(){
    var $h1List ;
    if ($("#content").length) {
      $h1List = $("#content > h1");
    }else{
      $h1List = $("#page-content > h1");
    }

    var lenOfH1 = $h1List.length;
    var $nav = $('.doc-sidebar > .nav');
    // 判断有侧边栏&&有一级标题
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
            $('body,html').animate({scrollTop:$('#'+id).offset().top-50}, 1000);
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
                $('body,html').animate({scrollTop:$('#'+h2id).offset().top-50}, 1000);
                $('#sidebar').collapse('toggle')
              });
            })(h2id);
            $subUl.append($subLi);
          });
          $li.append($subUl);
        }
      }
    }     
  };
  var renderCode = function(){
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
  };
  var renderImg = function(){
    // 图片居中
    var $imgParent = $('#content img')
      .addClass('img-thumbnail content-img')
      .parent('p');
    $imgParent.addClass('text-center');
    $imgParent.next('p').has('em').addClass('text-center');
  };
  var renderLink = function(){
    $('#content a').attr('target','_blank');
  };
  var renderTable = function(){
    // 响应式表格
    if($("#content table").parents('.table-responsive').size()==0){
      $("#content table").wrap('<div class="table-responsive" ></div>');
    }
    $("#content table")
      .addClass("table table-condensed table-bordered table-striped table-hover");
  };
  var tooltipAll = function(){
    $('[data-toggle="tooltip"]').tooltip();
  };
  var bindEvents = function(){
    //回到顶部
    $('.scrolltop-btn').on("click", function() {
      //65=h1的上外边距（25）+导航条的高度（40）
      $('body,html').animate({scrollTop:$('.doc-title').offset().top-65}, 500);
      $('#sidebar').collapse('toggle') //隐藏目录
    })
    //侧边栏隐藏时，按钮样式为展开
    $('#sidebar').on('hidden.bs.collapse', function () {
      $('.sidebar-toggle>i').removeClass('icon-zhankai').addClass('icon-shouqi');
    })
    //侧边栏显示时，按钮样式为收起
    $('#sidebar').on('shown.bs.collapse', function () {
      $('.sidebar-toggle>i').removeClass('icon-shouqi').addClass('icon-zhankai');
    })
    $('body').on('keyup',function(e){
      if(e.which===37)
        $('.btn-pre').click()
      if(e.which===39)
        $('.btn-next').click()
    })
    var MQL = 992;
    // 中大屏幕上，点击下拉列表无效，采用鼠标滑入展开下拉列表
    $('.dropdown>a,.dropdown-sub>a').on('click.dropdown',function(e){
      if ($(window).width() >= MQL) {
        e.preventDefault()
        e.stopPropagation()
      }        
    })
    // 二级导航按钮，点击有效
    $('.dropdown-sub>a').on('click.dropdown',function(e){
      if ($(window).width() < MQL) {
        e.preventDefault()
        e.stopPropagation()
        var $menu = $('.dropdown-menu',$(this).parent())
        var isDisplay = $menu.css('display')||'none'
        $menu.css('display',isDisplay=='none'?'block':'none')
      }        
    })
    // 中大屏幕上，鼠标滑入无效，点击有效
    $('.dropdown>a,.dropdown-sub>a').on('mouseover.dropdown',function(e){
      if ($(window).width() < MQL) {
        e.preventDefault()
        e.stopPropagation()
      }        
    })
  };
  var scrollspy = function(){
    // Scrollspy
    var $window = $(window);
    var $body   = $(document.body);
    var offset = $('.navbar').height()+20;
    
    $body.scrollspy({
      target: '.doc-side-container',
      offset: offset
    });
    
    $body.scrollspy('refresh');
  };
  var affixSidebar = function(){
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
            return (this.bottom = heightOfFooter+300);
          }
        }
      });
    }
  };
  var bindPjax = function(){
    // 这句话是绑定本页面所有.pjaxlink标签，链接点击之后，
    // 替换#pjax容器的内容为新内容#pjax，ajax超时时间为10秒；
    $(document).pjax('.pjaxlink', '#pjax', { fragment: "#pjax", timeout: 10000 });
    // pjax.end 在pjax ajax结束时调用 
    // pjax.complete 在装载完成后调用 
    $(document).on("pjax:complete", function() {
      init();
    });
  };
  var init = function(){
    renderCode();renderImg();renderTable();renderLink();tooltipAll();
    renderToc();
    scrollspy();affixSidebar();
    bindEvents();
    renderDuoShuo();
  };
  return {
    init: init,
    bindPjax:bindPjax
  };
}(jQuery);

(function($){
 $(function(){
  app.init();
  app.bindPjax();
 });
})(jQuery);