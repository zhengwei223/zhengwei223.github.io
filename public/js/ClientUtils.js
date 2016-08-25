(function e(t,n,r){
	function s(o,u){
		if(!n[o]){
			if(!t[o]){
				var a=typeof require=="function"&&require;
				if(!u&&a)return a(o,!0);
				if(i)return i(o,!0);
				var f=new Error("Cannot find module '"+o+"'");
				throw f.code="MODULE_NOT_FOUND",f
			}
			var l=n[o]={exports:{}};
			t[o][0].call(l.exports,function(e){
			var n=t[o][1][e];return s(n?n:e)},
			l,l.exports,e,t,n,r)
		}

		return n[o].exports
	}
		
	var i=typeof require=="function"&&require;
	for(var o=0;o<r.length;o++)
		s(r[o]);return s
})

({1:
	[function(require,module,exports){
var api = {
  
};

module.exports = api;

},{}]

,2:[function(require,module,exports){
var Supports = function(){
 
};

module.exports = new Supports();

},{}],

3:[
function(require,module,exports){
var api = require('./api');
var supports = {};
supports._api = api;

function runTest(key){
  if (key === 'class') key = 'classes';
  if (supports._api[key].dependencies) {
    for(var i = 0; i < supports._api[key].dependencies.length; i++){
      var depKey = supports._api[key].dependencies[i];
      if (runTest(depKey) === false) return false;
    }
  }

  if (supports._api[key].passes) {
    return tryPassFail(supports._api[key].passes);
  } else if (supports._api[key].fails) {
    return !tryPassFail(supports._api[key].fails);
  } else if (supports._api[key].is) {
    return tryReturn(supports._api[key].is);
  } else if (supports._api[key].not) {
    return !tryReturn(supports._api[key].not);
  }
}

function tryPassFail(code) {
  try {
    runIt(code);
    return true;
  }
  catch (err) {
    return false;
  }
}

function tryReturn(code) {
  try {
    return runIt(code);
  }
  catch (err) {
    return false;
  }
}

function runIt(code) {
  return (new Function(code))();
}

module.exports =  runTest;

},{"./api":1}],

4:[function(require,module,exports){
var supports = require('../../lib/interface');
var api = require('../../lib/api');
var runTest = require('../../lib/runtest');

global = window;
for (var key in supports){
  supports[key] = runTest(supports[key]);
}

supports._api = api;
window.Supports = supports;

},{"../../lib/api":1,"../../lib/interface":2,"../../lib/runtest":3}]
},
{},[4]);