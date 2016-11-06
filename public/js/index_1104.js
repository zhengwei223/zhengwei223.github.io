var Index = function($) {
  var courses = [{
    imgSrc: '/public/img/courses/java8.jpg',
    title: '初学者的第一套Java教程',
    link: '/pages/courses/初学者的第一套Java教程.html'
  }, {
    imgSrc: '/public/img/courses/html-css-js-basics.jpg',
    title: 'Web前端入门教程',
    link: '/pages/courses/Web前端入门教程.html'
  }, {
    imgSrc: '/public/img/courses/boots.jpg',
    title: 'Bootstrap入门教程',
    link: '/pages/courses/Bootstrap入门实例教学.html'
  }, {
    imgSrc: '/public/img/courses/easyui.jpg',
    title: 'jQuery-easyui基础教程',
    link: '/pages/courses/jQuery-easyui基础教程.html'
  }, {
    imgSrc: '/public/img/courses/tools.jpeg',
    title: '常用工具使用教程',
    link: '/pages/courses/常用工具使用教程.html'
  }, {
    imgSrc: '/public/img/courses/interview.jpg',
    title: 'JavaEE面试',
    link: '/pages/courses/JavaEE面试.html'
  }, {
    imgSrc: '/public/img/courses/algorithm.jpg',
    title: '数据结构与算法',
    link: '/pages/courses/数据结构与算法.html'
  }, {
    imgSrc: '/public/img/courses/jsp.jpg',
    title: 'JSP-Servlet教程',
    link: '/pages/courses/JSP-Servlet教程.html'
  }];

  var getDom = function(course) {
    return [
      '<div class="col-sm-6 col-md-4">',
      '  <div class="thumbnail">',
      '    <img src="' + course.imgSrc + '" alt="..." class="img-responsive hidden-sm hidden-xs">',
      '    <div class="caption">',
      '      <h3>' + course.title + '</h3>',
      '      <p>',
      '        <a href="' + course.link + '" class="btn btn-primary pull-right pjaxlink" role="button">',
      '        进入<span class="icon fa fa-arrow-circle-right"></span>',
      '        </a>',
      '      </p>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join("");
  };
  var sameHeight = function() {
    var defereds = []
    var $imgs = $('img')
    $imgs.each(function() {
      var dfd = $.Deferred();
      defereds.push(dfd);
      // 如果图片已经存在于浏览器缓存，考虑兼容性ie上有缓存时，不执行load，通过complete可以判断
      if(this.complete) {
        dfd.resolve()
      } else {
        $(this).load(function() {
          dfd.resolve()
        });
      }

    })

    $.when.apply(null, defereds).done(function() {
      var $cols = $('.indexContent .row div[class^="col-"')
      var heights = $cols.map(function() {
        return $(this).height()
      }).get()

      var maxHeight = Math.max.apply(null, heights);
      $cols.height(maxHeight);
    })
  }
  'use strict';

  var aps = Array.prototype.slice;

  var segue = function(cb, repeat) {

    // both `repeat` and `cb` are optional
    if(typeof cb === 'boolean') {
      repeat = cb;
    }
    cb = cb || function() {}; // default to no op
    repeat = repeat === true || false; // default to `false`

    var i = -1;
    var queue = [];
    var running = false;
    var nextArgs = [];

    var next = function() {
      var args = aps.call(arguments);
      var err = args.shift();
      if(err || !running || (!repeat && i === queue.length - 1)) {
        if(err) {
          cb(err);
        }
        nextArgs = args;
        running = false;
        return;
      }
      i = (i + 1) % queue.length;
      queue[i][0].apply(next, nextArgs.concat(args, queue[i][1]));
      nextArgs = [];
    };

    var enqueue = function() {
      var args = aps.call(arguments);
      var fn;
      if(args.length === 0) { // toggle `running` state
        if(!running && queue.length) {
          running = true;
          next();
        } else {
          running = false;
        }
      } else { // add `fn` and `args` to the function `queue`
        fn = args.shift();
        queue.push([fn, args]);
        if(!running) {
          running = true;
          setTimeout(function() {
            next();
          }, 0); // call the first `fn` only after all other functions have been enqueued
        }
      }
      return enqueue;
    };

    return enqueue;

  };

  var malarkey = function(elem, opts) {

    // defaults
    opts.loop = opts.loop || false;
    opts.typeSpeed = opts.typeSpeed || 50;
    opts.deleteSpeed = opts.deleteSpeed || 50;
    opts.pauseDelay = opts.pauseDelay || 2000;
    opts.postfix = opts.postfix || '';

    // cache `postfix` length
    var postfixLen = opts.postfix.length;

    // initialise the function `queue`
    var queue = segue(opts.loop);

    /**
     * Check if `obj` is an integer.
     *
     * @param {Object} obj
     * @return {Boolean}
     * @api private
     */
    var isInteger = function(obj) {
      return parseInt(obj, 10) === obj;
    };

    /**
     * Check if `str` ends with `suffix`.
     *
     * @param {String} str
     * @param {String} suffix
     * @return {Boolean}
     * @api private
     */
    var endsWith = function(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };

    /**
     * Types the `str` at the given `speed`.
     *
     * @param {String} str
     * @param {Number} speed Time in milliseconds to type a single character
     * @api public
     */
    var type = function(str, speed) {
      var done = this;
      var len = str.length;
      if(len === 0) {
        return done();
      }
      var t = function(i) {
        setTimeout(function() {
          elem.innerHTML += str[i];
          i += 1;
          if(i < len) {
            t(i);
          } else {
            done();
          }
        }, speed);
      };
      t(0);
    };

    /**
     * Deletes `str` or `n` number of characters at the given `speed`.
     *
     * @param {String|Number} arg If `null` or `-1`, deletes entire contents of `elem`.
     * Else if number, deletes `arg` number of characters from `elem`. Else deletes
     * `arg` from `elem` if and only if the last string that was typed ends with `arg`.
     * @param {Number} speed Time in milliseconds to type a single character
     * @api public
     */
    var _delete = function(arg, speed) {
      var done = this;
      var curr = elem.innerHTML;
      var count = curr.length; // default to deleting entire contents of `elem`
      var d;
      if(typeof arg !== 'undefined' && arg !== null) {
        if(isInteger(arg)) {
          if(arg > -1) {
            count = arg > count ? count : arg;
          }
        } else { // assumes `arg` is String
          // delete `arg` from `elem` if the last string typed ends with `arg`
          if(endsWith(curr, arg + opts.postfix)) {
            count = arg.length + postfixLen;
          } else {
            count = 0;
          }
        }
      }
      if(count === 0) {
        return done();
      }
      d = function(count) {
        setTimeout(function() {
          var curr = elem.innerHTML;
          if(count) {
            elem.innerHTML = curr.substring(0, curr.length - 1); // drop last char
            d(count - 1);
          } else {
            done();
          }
        }, speed);
      };
      d(count);
    };

    /**
     * Clears the contents of `elem`.
     *
     * @api public
     */
    var clear = function() {
      elem.innerHTML = '';
      this();
    };

    /**
     * Do nothing for `delay`.
     *
     * @param {Number} delay Time in milliseconds
     * @api public
     */
    var pause = function(delay) {
      var done = this;
      setTimeout(function() {
        done();
      }, delay);
    };

    /**
     * Invokes the given `fn`, passing in `elem` as the first argument.
     *
     * @param {Function} fn
     * @api public
     */
    var call = function(fn) {
      var done = this;
      var cb = function() {
        done();
      };
      fn.call(cb, elem);
    };

    // expose public API
    this.type = function(str, speed) {
      queue(type, str + opts.postfix, speed || opts.typeSpeed);
      return this;
    };
    this.delete = function(arg, speed) {
      queue(_delete, arg, speed || opts.deleteSpeed);
      return this;
    };
    this.clear = function() {
      queue(clear);
      return this;
    };
    this.pause = function(delay) {
      queue(pause, delay || opts.pauseDelay);
      return this;
    };
    this.call = function(fn) {
      queue(call, fn);
      return this;
    };
  };

  var what_lanqiao_is_for = function() {
    var el = document.querySelector('#what-lanqiao-is-for');
    if(!el) return;
    var initialText = el.textContent;
    var pause = 800
    var opts = {
      speed: 40,
      loop: false,
      postfix: ''
    };

    var typist = new malarkey(el, opts)

    typist
      .pause(1000).delete(initialText.length)
      .type('更加友好').pause(pause).delete(4)
      .type('更加专业').pause(pause).delete(4)
      .type('更加领先').pause(pause).delete(4)
      .type('网络教材').pause(8)
      .call(function() {
        $(el).addClass("disabled")
      });
  }

  var particleground = function() {
    $('#particles').particleground({
      dotColor: '#5cbdaa',
      lineColor: '#5cbdaa',
      proximity: 120,
      parallax: true,
      parallaxMultiplier: 5
    });
  }
  return {
    init: function() {
      $('.indexContent .row').append(courses.map(course => getDom(course)).join(""));
    },
    sameHeight: sameHeight,
    what_lanqiao_is_for: what_lanqiao_is_for,
    particleground: particleground
  };

}(jQuery);

(function($) {
  $(function() {
    Index.particleground();
    // 小设备不跳动字幕
    if ($(window).width()>991) {
      Index.what_lanqiao_is_for();
    }
    Index.init();
    Index.sameHeight();
  });
})(jQuery);