/**
 * author: nfwyst
 * date: 2017/5/25
 * update date: 2018/5/18 20:39
 */

'use strict';

var util = {};

//////////////////////////////// global ///////////////////
var def_arr = function(k, v) {
  Object.defineProperty(Array.prototype, k, {
    configurable: true,
    writable: true,
    value: v,
    enumerable: false
  });
  Object.defineProperty(Array, k, {
    configurable: true,
    writable: true,
    value: v,
    enumerable: false
  });
};
var def_log = function(k, v) {
  console[k] = v;
};
var def_str = function(k, v) {
  Object.defineProperty(Object.prototype, k, {
    configurable: true,
    writable: true,
    value: v,
    enumerable: false
  });
};
var def_obj = function(k, v) {
  Object.defineProperty(Object.prototype, k, {
    configurable: true,
    writable: true,
    value: v,
    enumerable: false
  });
};
var def_fun = function(k, v) {
  Object.defineProperty(Function.prototype, k, {
    configurable: true,
    writable: true,
    value: v,
    enumerable: false
  });
}
// get correct type of variable
def_obj('type', function(o) {
  return Object.prototype.toString.call(o).replace(/^\[\w+ (.+)\]$/, '$1').toLowerCase();
});
// init result variable by argument
function getResult(arg) {
  var result = undefined;

  if (type(arg) === 'string') {
    result = '';
  } else if (type(arg) === 'array') {
    result = [];
  } else if (type(arg) === 'object') {
    result = {};
  } else {
    throw new Error('tyep error: getResult');
  }

  return result;
}
// validate type
function validate(arg) {
  var t = type(arg);
  if (t !== 'array' && t !== 'string' && t !== 'object') {
    throw new Error('tyep error: validate');
  }
}
///////////////////////////////////// core //////
//////////// base instructure
// useage: console.red('number: ', 1234); for modern web browser
def_log('red', function() {
  if (type(arguments[0]) !== 'string' || typeof window === undefined) {
    console.log(...arguments);
  } else {
    var str = arguments[0];
    var re = [];
    for (var i = 1; i < arguments.length; i++) {
      re.push(arguments[i]);
    }
    console.log('%c ' + str, 'background: #000; color: red; padding-right: 5px', ...re);
  }
});
def_log('green', function() {
  if (type(arguments[0]) !== 'string' || typeof window === undefined) {
    console.log(...arguments);
  } else {
    var str = arguments[0];
    var re = [];
    for (var i = 0; i < arguments.length; i++) {
      re.push(arguments[i]);
    }
    console.log('%c ' + str, 'background: #000; color: green; padding-right: 5px', ...re);
  }
});
def_log('orange', function() {
  if (type(arguments[0]) !== 'string' || typeof window === undefined) {
    console.log(...arguments);
  } else {
    var str = arguments[0];
    var re = [];
    for (var i = 0; i < arguments.length; i++) {
      re.push(arguments[i]);
    }
    console.log('%c ' + str, 'background: #000; color: orange; padding-right: 5px', ...re);
  }
});
def_log('bold', function() {
  if (type(arguments[0]) !== 'string' || typeof window === undefined) {
    console.log(...arguments);
  } else {
    var str = arguments[0];
    var re = [];
    for (var i = 0; i < arguments.length; i++) {
      re.push(arguments[i]);
    }
    console.log('%c ' + str, ' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em', ...re);
  }
});
def_log('rainbow', function() {
  if (type(arguments[0]) !== 'string' || typeof window === undefined) {
    console.log(...arguments);
  } else {
    var str = arguments[0];
    var re = [];
    for (var i = 0; i < arguments.length; i++) {
      re.push(arguments[i]);
    }
    console.log('%c ' + str, 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;', ...re);
  }
});
// each function, for array | string | object, accept breack function
def_obj('each', function(cb) {
  var self = this,
    need_break = false,
    t = type(self),
    message = undefined;

  validate(self);

  for (var item in self) {
    if (self.hasOwnProperty(item)) {
      if (t === 'string') {
        item = self.substr(item, 1);
      }
      cb.call(null, self[item], item, self, function break_func(msg) {
        message = msg;
        need_break = true;
      });
      if (need_break) {
        return {value: self[item], key: item, context: self, msg: message}
      }
    }
  }
});
// map function, for string | object, accept break function
def_obj('map', function(cb) {
  var self = this,
    result = getResult(self),
    t = type(self),
    need_break = false,
    message = undefined;

  validate(self);

  for (var item in self) {
    if (self.hasOwnProperty(item)) {
      if (t === 'string') {
        item = Number(item);
      }
      var v = cb.call(null, self[item], item, self, function break_func(msg) {
        message = msg;
        need_break = true;
      });
      if (t === 'string') {
        result += v;
      } else {
        result[item] = v;
      }
      if (need_break) {
        return {value: result, key: item, context: self, msg: message}
      }
    }
  }

  return result;
});
// fix map for array
Array.prototype.map = function(cb) {
  var self = this,
    result = [],
    t = type(self),
    need_break = false,
    message = undefined;

  if (t !== 'array') {
    console.red('usage: ', 'type must be array');
    return false;
  }

  for (var item in self) {
    if (self.hasOwnProperty(item)) {
      item = Number(item);
      var v = cb.call(null, self[item], item, self, function break_func(msg) {
        message = msg;
        need_break = true;
      });
      result[item] = v;
      if (need_break) {
        return {value: result, key: item, context: self, msg: message}
      }
    }
  }

  return result;
}
// replaceOne_by_index, for array | string | object
//  specially for object, you can use: 'key.key.key' to operate nested value
def_obj('replaceOne_by_index', function(id, value) {
  var self = this,
    t = type(self);

  validate(self);
  if (id === undefined && value === undefined) {
    console.red('usage: ', 'provide an index and element value to replace!');
    return false;
  }

  if (t === 'array') {
    self.splice(id, 1, value);
  } else if (t === 'object') {
    // for nested object
    var path = id.split('.');

    if (path.length <= 1) {
      if (!self[id]) {
        console.red('no such a property on object!');
        return false;
      } else {
        self[id] = value;
      }
    } else {
      var rec = self[path[0]];
      for (var i = 1; i < path.length - 1; i++) {
        rec = rec[path[i]];
      }
      rec[path[path.length - 1]] = value;
    }
  } else if (t === 'string') {
    var res = '';
    var replaced = false;
    self.each(function(item, idx, obj, cb) {
      if (idx === id && !replaced) {
        res += value;
        replaced = true;
      } else {
        res += item;
      }
    });
    return res;
  }

  return self;
});
// replace all by value, for array | stirng | object
def_obj('replaceAll', function(src, dest) {
  var self = this,
    t = type(self),
    res = '';

  validate(self);
  for (var item in self) {
    if (self.hasOwnProperty(item)) {
      if (self[item] === src && t !== 'string') {
        self[item] = dest;
      } else if (t === 'string') {
        if (self[item] !== src) {
          res += self[item];
        } else {
          res += dest;
        }
      }
    }
  }

  if (t === 'string') {
    return res;
  } else {
    return self;
  }
});
//////////////////////////////////// util
// call_one time
util.call_one = function(func, item, id, obj) {
  return function() {
    return func(item, id, obj);
  }
};
util.max = function(m, n) {
  return m > n
    ? m
    : n;
}
util.min = function(m, n) {
  return m < n
    ? m
    : n;
}
/////////////////////////////////// only for array
// get a random item from array
def_arr('getOne', function() {
  var self = this;

  var id = Math.floor(Math.random() * self.length);

  return self[id];
});
// initialize an array by length and value
def_arr('init', function(l, v) {
  var res = [];
  if (!l) {
    console.red('useage: ', 'provide base length!');
  }
  if (v) {
    for (var i = 0; i < l; i++) {
      res.push(v);
    }
  } else {
    for (var i = 0; i < l; i++) {
      res.push(i);
    }
  }
  return res;
});
// insert element
def_arr('insert', function(id, value) {
  var self = this;
  self.splice(id, 0, value);

  return self;
});

// return keys
def_obj('keys', function() {
  var self = this,
    t = type(self),
    res = [];

  validate(self);

  self.each(function(item, id, arr) {
    res.push(id);
  });

  return res;
});
// fix keys for array
Array.prototype.keys = function() {
  var self = this,
    res = [];

  validate(self);

  self.each(function(item, id, arr) {
    res.push(id);
  });

  return res;
}
// return an array that includes all values of object
def_obj('values', function() {
  var self = this,
    re = [];

  validate(self);

  for (var item in self) {
    if (self.hasOwnProperty(item)) {
      re.push(self[item]);
    }
  }

  return re;
});
// deep clone
def_obj('clone', function() {
  var self = this,
    re = {};
  validate(self);

  function _clone(re, obj) {
    for (var item in obj) {
      if (obj.hasOwnProperty(item)) {
        var t = type(obj[item]);
        if (t === 'object') {
          re[item] = {};
          _clone(re[item], obj[item]);
        } else if (t === 'array') {
          re[item] = [];
          _clone(re[item], obj[item]);
        } else {
          re[item] = obj[item];
        }
      }
    }
  }

  _clone(re, self);

  return re;
});
// return all keys of object
def_obj('keys_all', function() {
  var self = this,
    res = [];

  validate(self);

  for (var item in self) {
    res.push(item);
  }

  return res;
});
///////////////////////////////// event /////
// Limit the frequency of events happen
util.debounce = function(context, func, wait, immediate) {
  var timeout;
  wait = wait || 20;
  immediate = immediate || true;
  target = target || this;

  return function() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  }
};
// This function will be executed only once, no matter how many times
// it is called.
util.once = function(func, context/* other arguments */) {
  var args = [];
  if (arguments.length >= 3) {
    for (var i = 2; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
  }
  var called = false;

  return (function(func, args) {
    if (!called) {
      if (args.length >= 1) {
        func.apply(context, args);
      } else {
        func.apply(context);
      }
      called = true;
    } else {
      return false;
    }
  })(func, args);
}

/////////////////////////////// CSS /////////
// margin-top ==> marginTop
util.toCamel = function(str) {
  return str.replace(/-(\w)/g, function(str, item) {
    return item.toUpperCase()
  });
};
/////////////////////////////// Time ////////
// translate Date to standard time object
util.timeTranslate = function(ti) {
  var t = new Date(ti),
    year = t.getFullYear(),
    month = t.getMonth(),
    date = t.getDate(),
    hh = t.getHours(),
    mm = t.getMinutes(),
    ss = t.getSeconds();
  return {
    year: year,
    month: month,
    date: date,
    hh: hh,
    mm: mm,
    ss: ss
  };
};
// accept time object
util.timeFormat = function(t) {
  var month = t.month + 1 < 10
      ? "0" + (
      t.month + 1)
      : t.month + 1,
    date = t.date < 10
      ? "0" + t.date
      : t.date,
    hh = t.hh < 10
      ? "0" + t.hh
      : t.hh,
    mm = t.mm < 10
      ? "0" + t.mm
      : t.mm,
    ny = new Date().getFullYear();
  if (ny === t.year) {
    return month + "月" + date + "日 " + hh + ":" + mm + "";
  } else {
    return t.year + "年" + month + "月" + date + "日";
  }
};
// filter : get all element that returned by cb
def_obj('filter', function(cb) {
  var self = this,
    result = getResult(self),
    t = type(self);

  validate(self);

  self.each(function(item, id, obj, br) {
    var res = cb(item, id, obj);
    if ((t === 'object' || t === 'array') && res) {
      result[id] = item;
    } else if (t === 'string' && res) {
      result += item;
    }
  });

  return result;
});
// find : find an item
def_obj('find', function(cb) {
  var self = this,
    result = getResult(self),
    t = type(self);

  validate(self);

  self.each(function(item, id, obj, br) {
    if (cb(item, id, obj)) {
      if (t === 'string') {
        result += item;
        br(null);
      } else {
        result[id] = item;
        br(null);
      }
    }
  });

  return result;
});
// fix find for Array
def_arr('find', function(cb) {
  var self = this,
    result = getResult(self),
    t = type(self);

  validate(self);

  self.each(function(item, id, obj, br) {
    if (cb(item, id, obj)) {
      if (t === 'string') {
        result += item;
        br(null);
      } else {
        result[id] = item;
        br(null);
      }
    }
  });

  return result;
});
// every member match condition
def_obj('every', function(cb) {
  var self = this,
    result = getResult(self),
    t = type(self),
    pass = true;

  validate(self);

  self.each(function(item, id, obj, br) {
    if (!cb(item, id, obj)) {
      pass = false;
      br(null);
    }
  });

  return pass;
});

// return true while some element in current context
def_obj('some', function(cb) {
  var self = this,
    pass = false;

  validate(self);

  self.each(function(item, id, obj, br) {
    if (cb(item, id, obj)) {
      pass = true;
      br(null);
    }
  });

  return pass;
});

// return true while include one item
def_obj('includes', function(arg) {
  var self = this,
    has = false,
    t = type(self);

  validate(self);

  if (t === 'object') {
    self.each(function(item, id, obj, br) {
      if (arg === id) {
        has = true;
        br(null);
      }
    });
  } else if (t === 'array') {
    self.each(function(item, id, obj, br) {
      if (arg === item) {
        has = true;
        br(null);
      }
    });
  } else if (t === 'string' && type(arg) === 'string') {
    var l = arg.length;
    for (var i = 0; i < self.length - arg.length; i++) {
      if (self.substring(i, i + l - 1) === arg) {
        has = true;
        break;
      }
    }
  } else {
    throw new Error('...something wrong...');
  }

  return has;
});
/////////////////////////////////// Only For Array ///////
// if size is 2, src = [1,2,3,4,5], will be [[1,2],[3,4],5]
def_arr('to_group', function(size) {
  var self = this,
    result = getResult(self),
    start = 0,
    end;

  validate(self);

  while (true) {
    end = start + size;

    if (end > self.length) {
      end = self.length;
    }

    var item = self.slice(start, end);
    if (item.length === 1) {
      item = item[0];
    }

    result.push(item);

    start += size;

    if (start >= self.length) {
      break;
    }
  }

  return result;
});
def_arr('max', function() {
  var self = this,
    t = type(self);

  if (t !== 'array') {
    throw new Error('sorry, type missing Array');
  }

  var res = -999999;
  self.each(function(item, id, obj) {
    if (type(item) === 'object') {
      if (res < item.value) {
        res = item.value;
      }
    } else {
      res = res < item
        ? item
        : res;
    }
  });

  return res;
});
// sortBy cb : 自定义排序
def_arr('sortBy', function(cb) {
  var self = this,
    t = type(self);

  if (t !== 'array') {
    throw new Error('sorry, type missing Array');
  }
  // check callback
  cb = cb
    ? cb
    : function(i) {
      return i
    };

  for (var j = 0; j < self.length; j++) {
    for (var i = 0; i < self.length - 1 - j; i++) {
      var curr = cb(self[i], i, self),
        next = cb(self[i + 1], i + 1, self);
      curr = type(curr) === 'object'
        ? curr.value
        : curr;
      next = type(next) === 'object'
        ? next.value
        : next;
      if (curr !== undefined && next !== undefined && curr > next) {
        var tmp = self[i];
        self[i] = self[i + 1];
        self[i + 1] = tmp;
      }
    }
  }

  return self;
});
// groupBy 分组
def_obj('groupBy', function(cb) {
  var self = this,
    t = type(self),
    res = {};

  validate(self);

  if (type(cb) === 'string' && t !== 'string') {
    self.each(function(item, id, obj) {
      if (!res[item[cb]] && item[cb]) {
        res[item[cb]] = [];
        res[item[cb]].push(item);
      } else if (item[cb]) {
        res[item[cb]].push(item);
      }
    });
  } else if (type(cb) === 'function') {
    self.each(function(item, id, obj) {
      if (!res[cb(item)] && cb(item)) {
        res[cb(item)] = [];
        res[cb(item)].push(item);
      } else if (cb(item)) {
        res[cb(item)].push(item);
      }
    });
  } else {
    throw new Error('argument must be string or function...');
  }

  return res;
});

////////////////////////// DOM Element
// 判断一个对象是否是 DOM 元素
def_obj('isDOM', function() {
  var self = this;
  if (typeof HTMLElement === 'object') {
    if (self instanceof HTMLElement) {
      return true;
    } else {
      return false;
    }
  } else {
    return self.nodeType === 1 && typeof self.nodeName === 'string';
  }
});

// 触发一个 DOM 的class
def_obj('toggle', function(className) {
  var self = this;
  var isDom = self.isDOM();
  if (isDom) {
    if (self.classList.contains(className)) {
      self.classList.remove(className);
    } else {
      self.classList.add(className);
    }
  }
});

// 获取一个 XMLHTTP : delay function
var XMLHttpCreator = function() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
    XMLHttpCreator = function() {
      return new XMLHttpRequest();
    }
  } else if (window.ActiveXObject) {
    return new ActiveXObject('Microsoft.XMLHTTP');
    XMLHttpCreator = function() {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }
  } else {
    throw Error('cant create xmlhttp object');
  }
}

// 对象之间通信 responseWay 自定义
def_obj('call_obj', function(obj, msg, cb) {
  return obj.receiveMsg(msg).response(cb);
});

def_obj('receiveMsg', function(msg) {
  var self = this;
  self.res_msg = msg;
  return self;
});

def_obj('response', function(w) {
  var self = this;
  if (self.res_msg) {
    if (self.responseWay) {
      return self.responseWay(w);
    }
  } else {
    return {msg: null};
  }
});

///////// map object
var helper = {};
function set(obj, key, value) {
  if (!helper[obj]) {
    helper[obj] = {};
  }
  helper[obj].key = value;
}

function get(obj, key) {
  return helper[obj] && helper[obj][key];
}

////////////////// extend the function
////////////////// fn.before(before_callback).after(after_callback)(callback, argumentListOf_fn)
////////////////// and the callback should be callback(before_callback_result, after_callback_result)
/////////// the origin function return value is data.data
/////////// forexample there is a test function, we get how much time the function cost: test = function(n) {n = n||1000000000;for(var i = 0; i<n; i++){console.log(i);}}
/////////// test.after(function(){return Date.now()}).before(function(){return Date.now()})(function(preTime, nextTime){return nextTime-preTime;}, 1000000000000000000000);
def_fun('before', function(callback) {
  var self = this;
  return function() {
    var before_result = callback.apply(this, Array.prototype.slice.call(arguments, 1));
    var self_result = self.apply(self, Array.prototype.slice.call(arguments, 1));
    var cb = Array.prototype.slice.call(arguments, 0, 1)[0];
    if (cb instanceof Function) {
      cb(before_result, self_result.after);
    }
    return {before: before_result, data: self_result};
  }
});
def_fun('after', function(callback) {
  var self = this;
  return function() {
    var self_result = self.apply(self, Array.prototype.slice.call(arguments, 1));
    var after_result = callback.apply(this, Array.prototype.slice.call(arguments, 1));
    var cb = Array.prototype.slice.call(arguments, 0, 1)[0];
    if (cb instanceof Function) {
      cb(self_result.before, after_result);
    }
    return {data: self_result, after: after_result};
  }
});

///// curry the function
///// like fn(a,b,c) should be fn(a)(b)(c);
///// like fn(a,b,c) could be fn(a), fn(b), fn(c)
//// like fn(a,b,c) could be var i = fn(a)(b), i(c)
def_fun('curry', function(argNum, args) {
  var self = this;
  if (!args) {
    var args = [];
  }
  if (!argNum) {
    var argNum = 0;
  }
  return function(a) {
    args.push(a);

    if (argNum <= 1) {
      // return self(...args);
      return self.apply(self, args);
    } else {
      return self.curry(--argNum, args);
    }
  }

});

///////// obj for server /
/////// event('/path/to/server')(cb1,cb2,cb3)
function event(url) {
  try {
    var el = new EventSource(url);
  } catch (e) {
    console.red(e.message);
  } finally {
    //
  }

  return function(op, me, er) {
    el.onopen = op;
    el.onmessage = me;
    el.onerror = er;
  }
}

////////// thread /
function getWork(fileName, onmessage, message) {
  var w = new Worker(fileName);
  w.onmessage = function(data) {
    return onmessage(data.data);
  }
  w.postMessage(message);
}

//////////// getElementSize
//////////// get the size of HTMLElement
def_obj('size', function() {
  var self = this;
  if (!self.isDOM) {
    throw Error(`sorry about it's size`);
  }
  var ors = Math.floor(self.offsetWidth);
  var paddingList = getComputedStyle(self).padding.replace(/px/g, '').split(' ');
  if (paddingList.length === 1) {
    ors -= Number(paddingList[0]);
  } else {
    for (var i = 0; i < paddingList.length; i++) {
      if (i % 2 === 0) {
        continue;
      }
      ors -= Number(paddingList[i]);
    }
  }

  return ors;
});

///////////////// getChildByClass
///////////////// parent: HTMLElement
function getChildElementsByClass(parent, className) {
  var res = [];
  var children = parent.getElementsByTagName("*");
  for (var i = 0; i < children.length; i++) {
    if (children[i].className == className) {
      res.push(children[i]);
    }
  }

  return res;
}

////////////// get avgSize of child Element
function getAvgSize(parent, num) {
  return Math.floor(Number(parent.size() / num)) + 'px';
}

//////////// get element name with id and class /////
////// <div class="question" id="question"></div> => div#question.question
def_obj('names', function() {
  var self = this;
  if (!self.isDOM) {
    throw Error('only HTMLElement');
  }
  var res = self.localName || self.tagName.toLowerCase() || self.nodeName.toLowerCase();
  var id = self.id || self.getAttribute('id');
  var classList = self.classList;
  if (id) {
    res += '#' + id;
  }
  if (classList.length > 0) {
    res += '.' + classList.value.replace(' ', '.');
  }
  return res;
});

///////////// just element name <div class="question" id="question"></div> => div
def_obj('pureName', function() {
  var self = this;
  if (!self.isDOM) {
    throw Error('only HTMLElement');
  }
  return self.localName || self.tagName.toLowerCase() || self.nodeName.toLowerCase();
});

///////////// get tree view of structure element like div /
def_obj('toTree', function() {
  var self = this;
  if (!self.isDOM()) {
    throw Error('only HTMLElement can parse tree');
  }

  var blackList = ['noscript'];
  var result = {
    name: self.names(),
    children: []
  };

  var childCollection = self.children;
  var childCount = self.childElementCount;
  var isBlock = false;
  var inWhiteList = false;
  var item;
  for (var i = 0; i < childCount; i++) {
    item = childCollection.item(i);
    isBlock = getComputedStyle(item).display === 'block';
    inWhiteList = !blackList.includes(item.pureName());
    if (isBlock && inWhiteList) {
      result.children.push(self.toTree.apply(item));
    }
  }

  // (function parse(node) {
  //   console.log(`${node.name}\n`);
  //   if (node.children.length == 0) {
  //     return;
  //   }
  //   for(var i = 0; i < node.children.length; i++) {
  //     parse(node.children[i]);
  //   }
  // }(result));

  return result;
});

/////////// query an element by css selector or by parent scope
function query(child, parent) {
  if (typeof child !== 'string') {
    throw Error('argument must be css selector');
  }
  if (parent && !parent.isDOM()) {
    throw Error('parent must be HTMLElement');
  }
  if (parent) {
    return parent.querySelectorAll(child);
  } else {
    return document.querySelectorAll(child);
  }
}
//////////////////////// set all attribute for current object /
//////////////////////// config: {key: value}
def_obj('setAttributes', function(config) {
  var self = this;
  if (!config || typeof config !== 'object') {
    return self;
  } else {
    var keys = Object.keys(config) || config.keys();
    keys.forEach(function(item, index) {
      var value = config[item];
      self.setAttribute(item, value);
    });
  }
  return self;
});

////////////////////// create element by template string, that's easy to create an Element
function createElementHTML(content) {
  if (typeof content !== 'string') {
    throw Error('missing: string');
  }
  var div = document.createElement('div');
  var el;
  div.insertAdjacentHTML('beforeend', content);
  el = div.firstChild;
  div.removeChild(el);
  div = null;
  return el;
}

//////////////////////// canvas /////////

/////////////////// draw triangle /
/////////////////// fill or stroke
///////////////////  argument only can be object : {x: integer, y: integer}
if (CanvasRenderingContext2D) {
  CanvasRenderingContext2D.prototype.triangle = function(start, p1, p2) {
    var self = this;
    try {
      // self.moveTo(...start);
      self.moveTo(start.x, start.y);
      self.lineTo(p1.x, p1.y);
      self.lineTo(p2.x, p2.y);
      self.lineTo(start.x, start.y);
    } catch (e) {
      throw Error('arguments must be coordinate number')
    }
  }
  CanvasRenderingContext2D.prototype.strokeTriangle = function(start, p1, p2, style) {
    var self = this;
    self.triangle(start, p1, p2);
    self.strokeStyle = style;
    self.stroke();
    return self;
  }
  CanvasRenderingContext2D.prototype.fillTriangle = function(start, p1, p2, style) {
    var self = this;
    self.triangle(start, p1, p2);
    self.fillStyle = style;
    self.fill();
    return self;
  }
  /////////////// clear canvas and it's 2d context
  CanvasRenderingContext2D.prototype.clear = function() {
    var self = this;
    var width = self.width;
    var height = self.height;
    self.clearRect(0, 0, width, height);
  }
}

// change the style of pseudo element
// eg: selector:  '.logo::before', value: 'content: #'
// change the ::before ::after pseudo element or other style
function setPseudoElement(selector, value) {
  var stylesheet = document.styleSheets[0];
  if (typeof selector !== 'string' || typeof value !== 'string') {
    throw Error('type error: string');
  } else if (stylesheet) {
    return stylesheet.addRule(selector, value, 0);
  } else {
    var style = createElementHTML('<style></style');
    document.head.insertAdjacentElement('afterbegin', style);
    var sheet = style.sheet;

    return sheet.addRule(selector, value, 0);
  }
}

////////////////////////// validate form-control: input /////////////
def_obj('isEmail', function() {
  var self = this;
  if (!self.isDOM() && self.pureName() !== 'input') {
    throw Error('type error: HTMLElement input');
  }
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (self.isDOM() && self.pureName() === 'input' && self.getAttribute('type') === 'text' || self.getAttribute('type') === 'email') {
    return regex.test(self.value);
  }
  return false;
});

def_obj('validPassword', function() {
  var self = this;
  if (!self.isDOM() && self.pureName() !== 'input') {
    throw Error('type error: HTMLElement input');
  }
  return self.value.length >= 6;
});

def_obj('validPhone', function() {
  var self = this;
  if (!self.isDOM() && self.pureName() !== 'input') {
    throw Error('type error: HTMLElement input');
  }
  return /^\d+$/.test(self.value) && self.value.length >= 6;
});

def_obj('validate', function() {
  var self = this;
  var self.setInvalid = self.setInvalid || function() {};
  if (!self.isDOM()) {
    throw Error('type error: string');
  }
  if (!self.isEmail() && self.getAttribute('id') === 'email') {
    self.setInvalid();
  } else if (!self.validPassword() && self.getAttribute('id') === 'password') {
    self.setInvalid();
  } else if (!self.validPhone() && self.getAttribute('id') === 'phone') {
    self.setInvalid();
  } else {
    return true;
  }
});

//////////////////////// add wrapper //////////////////
///////////// <img id="guide"> ==> <div id="guide-wrapper"><img></div>
///////////// default by id, or by tag name
def_obj('addWrapper', function() {
  var self = this;
  if (!self.isDOM()) {
    throw Error('type error: HTMLElement');
  }
  var id = self.getAttribute('id');
  var name = id
    ? id
    : self.pureName();

  var div = createElementHTML('<div id="' + name + '-wrapper"></div>');
  self.insertAdjacentElement('beforebegin', div);

  div.appendChild(self);
  return self;
});

////////////////////// canvas draw polygon
////////////////////// context: context 2d
////////////////////// n: number of sides
////////////////////// x0,y0: origin point
////////////////////// size: the length between origin point and fixed point
////////////////////// config: {color: value, fill: boolean, stroke: boolean}
def('createPolygon', function(context, n, x0, y0, size, config) {
  var self = this;

  if (!(self instanceof CanvasRenderingContext2D)) {
    throw Error('need canvas context object');
  }
  self.beginPath();
  var degree = (2 * Math.PI) / n;
  var x, y;

  for (var i = 0; i < n; i++) {
    x = Math.cos(i * degree);
    y = Math.sin(i * degree);
    context.lineTo(x * size + x0, y * size + y0);
  }

  self.closePath();

  if (config && config.color) {
    if (config.fill) {
      self.fillStyle = config.color;
      self.fill();
    } else if (config.stroke) {
      self.strokeStyle = config.color;
      self.stroke();
    }
  } else {
    return self;
  }
}

////////////////////// get client width //////////////
function clientWidth() {
  var body = document.body;
  var el = document.documentElement;
  return body.offsetWidth || body.clientWidth || el.offsetWidth || el.clientWidth;
}

///////////////////// get user location by api: https ///////
function getLocation(location, url, options) {
  var loc;
  if (typeof location !=== 'object') {
    return;
  } else if (navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var xhr = XMLHttpCreator();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            return loc = JSON.stringify(xhr.responseText);
          } else {
            return {message: 'error'};
          }
        }
      };
      xhr.open('GET', url + '&lat=' + position.coords.latitude + '&lng=' + position.coords.longitude);
      xhr.send();
    }, function(error) {
      console.table(error);
    }, options);
    return loc;
  }
}

//////////////////// DOM ready event ////////////
window.ready = function(callback) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
      document.removeEventListener('DOMContentLoaded', arguments.callee, false);
      return callback();
    }, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadytstatechange', function() {
      if (document.readyState == "complete") {
        document.detachEvent("onreadystatechange", arguments.callee);
        return callback();
      }
    });
  }
}

///////////////////// convert rgb(a) to hex value and opacity cant convert //////////////
function rgb2(rgb) {
  if (typeof rgb !== 'string') {
    throw Error('rgb value must be string');
  }
  var convert = function(value) {
    return ("0" + parseInt(value, 10).toString(16)).slice(-2);
  }
  var regular = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
  rgb = rgb
    ? rgb.match(regular)
    : '';

  if (rgb && rgb.length === 4) {
    return "#" + convert(rgb[1]) + convert(rgb[2]) + convert(rgb[3]);
  } else {
    return rgb;
  }
}

/////////////////////////////////////// the first letter of word to lowerCase ////////////////////////////
def_str('toLower', function(word) {
  if (!word || typeof word !== 'string') {
    throw Error('need string');
  }
  return Array.from(word).map(function(item, index) {
    return !index ? item.toLowerCase() : item
  }).join('');
});

////////////////////////////////////// get document scrollTop / scrollLeft ///////////////////////////////////////
function scroll(left, top) {
  if (left) {
    return document.body.scrollLeft + document.documentElement.scrollLeft;
  } else if (top) {
    return document.body.scrollTop + document.documentElement.scrollTop;
  } else if(left && top)  {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  } else {
    throw new Error('must specify left or top: boolean');
  }
}

////////////////////////////////// get offset position of element based on parent element /////////////////////////////
def_obj('parentOffset', function() {
  var self = this;
  if (!self.isDOM()) {
    throw Error('element must be document element')
  }
  return {
    x: self.offsetLeft,
    y: self.offsetTop
  }
});

//////////////////////////////////// get document position of elelment its an absolute position
//////////////////////////////////// { x: Number, y: Number }/////////////////////////////////////////
def_obj('offset', function() {
  var self = this;

  // we just need scroll position size plus the viewport position size in fact
  // for chrome and safari
  if (window.pageXOffset && window.pageYOffset) {
    var pos = self.position()
    return {
      x: pos.x + window.pageXOffset,
      y: pos.y + window.pageYOffset
    }
  }

  var offsetX = self.offsetLeft;
  var offsetY = self.offsetTop;
  if (!self.isDOM()) {
    throw new Error('element must be document Element');
  }
  (function() {
    var _self = this;
    if (_self.offsetParent) {
      // var res = arguments.callee.call(_self.offsetParent);
      // offsetX += res.x;
      // offsetY += res.y;
      var res = _self.offsetParent.parentOffset();
      offsetX += res.x;
      offsetY += res.y;
      arguments.callee.call(_self.offsetParent);
    }

    return _self.parentOffset();
    // return {
    //   x: _self.offsetLeft,
    //   y: _self.offsetTop
    // }
  }).call(this);

  return {
    x: offsetX,
    y: offsetY
  }
});

///////////////////////////////////// get viewport position of element, not jquery's relative position ///////////////////////
def_obj('position', function() {
  var self = this;
  if (!self.isDOM()) {
    throw Error('element must be document Element');
  }
  var rect = self.getBoundingClientRect();
  return {
    x: rect.x,
    y: rect.y
  }
});

///////////////////////////////////// reduce : get information from array, and specify the context position
///////////////////////////////////// array.reduce(callback, sta, startPoint, endPoint);
///////////////////////////////////// this can use to compose function like
///////////////////////////////////// filter find map curry to reduce the amount of the code
def_arr('reduce', function(callback, b, startId, endId) {
  var self = this;
  if(type(self) !== 'array') {
    throw Error('reduce can not apply to object that not is array');
  }
  if (type(callback) !== 'function') {
    throw Error('reduce need callback to get result');
  }
  if (!b && b !== 0) {
    throw Error('sorry, start point missing');
  }

  if (startId && endId && type(startId) === 'number' && type(endId) === 'number' && startId <= endId) {
    self.forEach(function(item, k, arr) {
      if (k >= startId && k <= endId) {
        b = callback(b, item);
      }
    });
  } else {
    self.forEach(function(item, k, arr) {
      b = callback(b, item);
    });
  }

  return b;
});

/////////////////////////////////////////////////// get all children which includes grandchildren ///////////////////
def_obj('allChildren', function () {
  var self = this;
  if(!self.isDOM()) {
    throw Error('the object must be dom element');
  }
  return self.getElementsByTagName('*');
});
/////////////////////////////////////////////////// bind event /////////////////////////////////////////////////
///////////////////////         事件代理
def_obj('on', function(names, delegateTarget /* = undefined */, callback) {
  var self = this;
  self.eventList = self.eventList ? self.eventList : {
    length: 0
  };
  if(!self.isDOM()) {
    throw Error('event need a dom target')
  }
  if(!names || typeof names !== 'string' || typeof callback !== 'function') {
    return false;
  }
  names.forEach(function(name, index) {
    if(!delegateTarget || delegateTarget === null) {
      self.addEventListener(/*`${name}`*/ name, callback);
      self.eventList[name] ? self.eventList[name].push({
        fn: callback,
        name: callback.fnName()
      }) : self.eventList[name] = [];
      self.eventList.length++;
    } else if(typeof delegateTarget === 'string'){
      self.addEventListener(name, function(e) {
        var target = e.target;
        var childrens = self.allChildren();
        for(child of childrens) {
          var childNames = child.names();
          if(childNames.includes(delegateTarget) && target === child) {
            callback(child);
          }
        }
      });
      self.eventList[name] ? self.eventList[name].push({
        fn: callback,
        name: callback.fnName()
      }) : self.eventList[name] = [];
      self.eventList.length++;
    }
  });
  return self;
})

////////////////////////////////////////////////// get function name ////////////////////////////////////////
def_obj('fnName', function() {
  var self = this;
  if(typeof self !== 'function') {
    throw Error('just function has fnName: function name');
  }
  if (self.name) {
    return self.name
  } else {
    return self.toString().match(/\w+ (\w+)/)[1];
  }
});

////////////////////////////////////////////////// off event listener /////////////////////////////////////////
// if done thats ok , or return false, if no fnName, all event list would be deleted
def_obj('off', function(type, fnName) {
  var self = this;
  if(self.isDOM() && self.eventList.length > 0 && typeof type === 'string') {
    var list = self.eventList[type];
    list.each(function(event, key) {
      if(fnName && typeof fnName === 'string') {
        if(fnName === event.name)  {
          self.removeEventListener(type, event.fn);
          delete list[key];
        }
      } else {
        self.removeEventListener(type, event.fn);
        delete list[key];
      }
    });
    return true;
  } else {
    return false;
  }
});
////////////////////////////////////////////////// get the relative position according to mouse ////////////////
// callback return a boolean to determine off event or continue watch relative position
def_obj('cursorPosition', function(callback) {
  var self = this;
  // var el = self.query(selector);
  if(!self.isDOM())  {
    throw Error('sorry, this cant be bind to position');
  } else {
    self.on('mousemove', function(e) {
      var px = e.pageX;
      var py = e.pageY;
      var position = {
        x: px - self.position().x,
        y: py - self.position().y
      }
      var off = callback(position);
      if (off) {
        self.off('mousemove');
      }
    });
  }
});

//////////////////////////////////// check a child element ///////////////////////
// eg: document.body.hasChild('#footer') => boolean;
def_obj('hasChild', function(el) {
  var self = this;
  var childs = null;
  if(!self.isDOM()) {
    throw Error('the object must be an elment');
  }
  if (el) {
    if (typeof el === 'string') {
      el = query(el);
      if (el.length > 1) {
        el = el[0];
      }
    }
    if (!el.isDOM()) {
      return false;
    }
    if (self.contains) {
      return self.contains(el);
    } else {
      childs = self.allChildren();
      for(item of childs) {
        if (item === el) {
          return true;
        }
      }
    }
  }
  return false;
}

////////////////////////////////// init requestAnimationFrame ////////////////////
function getRequestAnimationFrame() {
  if (window.requestAnimationFrame) {
    return;
  } else {
    var prefix =
      ['webkit', 'moz', 'ms', 'o'].map(function(prefix, index) {
        if (window[`${prefix}RequestAnimationFrame`]) {
          return prefix;
        } else {
          return '';
        }
      }).join('');
    window.requestAnimationFrame = window[`${prefix}RequestAnimationFrame`];
  }
}
/////////////////////////////////// request AnimationFrame ///////////////////////
function clearTimeouts(ids) {
  ids.map(function(id, index)) {
    window.clearTimeout(id);
  }
  return true;
}

/////////////////////////////////// fade animation ///////////////////////////////
def_obj('fade', function(name) {
  var ids = [];
  var self = this;
  getRequestAnimationFrame();
  if(!self.isDOM()) {
    throw Error('the fade target is not an element');
  }
  if (typeof name === 'string' && name === 'in') {
    self.style.opacity = 0;
    var curtime = +new Date();
    (function() {
      self.style.opacity += (new Date() - curtime) / 400;
      curtime = +new Date();

      if (self.style.opacity < 1) {
        if (window.requestAnimationFrame) {
          requestAnimationFrame(arguments.callee);
        } else {
          ids.push(setTimeout(arguments.callee, 16));
        }
      } else {
        clearTimeouts(ids);
      }
    }());
  } else if (typeof name === 'string' && name === 'out') {
    self.style.opacity = 1;
    var curtime = +new Date();
    (function() {
      self.style.opacity -= (new Date() - curtime) / 400;
      curtime = +new Date();
      if (self.style.opacity > 0) {
        if (window.requestAnimationFrame) {
          requestAnimationFrame(arguments.callee);
        } else {
          ids.push(setTimeout(arguments.callee, 16));
        }
      } else {
        clearTimeouts(ids);
      }
    }());
  }
});

//////////////////////////////////// prepend new element to current object //////////////////
///// insert inside its not native prepend(that will prepend a node)
def_obj('prependElement', function(el) {
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be doc element');
  }
  if (typeof el === 'string') {
    el = createElementHTML(el);
  }
  self.insertBefore(el, self.firstChild);
});

////////////////////////////////////////////// trigger event /////////////////////////////////
def_obj('trigger', function(type, canBubble, canCancel){
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be doc element');
  }
  if (typeof type !== 'string') {
    throw Error('the event name must be string');
  }
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, canBubble? canBubble : true, canCancel? canCancel: false);
  self.dispatchEvent(e);
});

// shuffle array
def_obj('shuffle', function () {
  var self = this;
  if (self.type() !== 'array') {
    throw Error('the object must be a array');
  }
  return self.sort(function () {
    // return -1 1 0
    return 0.5 - Math.random();
  });
});

////////////////////////////////////// some structure //////////////////////////////////////
////// iterator
util.symbolize = function(arr) {
  var type = arr.type();
  var a = null;
  if (type !== 'array' && type === 'number') {
    a = [];
    for(var i = 0; i < arr; i++) {
      a.push(i);
    }
    arr = a;
  }
  var id = 0;
  return {
    [Symbol.iterator]: function () {
      return {
        next: function () {
          if (id < arr.length) {
            return {
              value: arr[id++],
              done: false
            }
          } else {
            return {
              done: true
            }
          }
        }
      }
    }
  }
}

/////////////////////////////////////////// se structure //////////////////////
/////////////////////////////////////////// union the data
// just for simple value now
util.se = function(in = []) {
  let datas = {};
  this.size = 0;
  if (in.length && in.length > 0) {
    in.map(function(item, id) {
      return this.add(item);
    });
  }
  // op
  this.has = function (val) {
    if (datas.hasOwnProperty(val)) {
      return datas[val];
    } else {
      return false;
    }
  }
  this.add = function (val) {
    if (!this.has(val)) {
      datas[val] = val;
      return this.size++;
    }
    return false;
  }
  this.delete = function (val) {
    if (this.has(val)) {
      delete datas[val];
      return true;
    } else {
      return false;
    }
  }
  this.clear = function () {
    datas = {};
    this.size = 0;
  }
  this.entries = function() {
    var sy = util.symbolize(this.size);
    var keys = this.keys();
    var values = this.values();

    sy.map(function(item, id) {
      return {
        key: keys[item],
        value: values[item]
      }
    });
  }
  this.keys = function () {
    return Object.keys ? Object.keys(this).shuffle() : this.keys().shuffle();
  }
  this.values = function () {
    return Object.values ? Object.values(this).shuffle() : this.values().shuffle();
  }
  this.size = function () {
    return this.size;
  }
  this.forEach = function (callback, br) {
    var sy = util.symbolize(this.size);
    var keys = this.keys();
    var values = this.values();
    for(id of sy) {
      var res = callback(null, keys[id], values[id], this);
      if (res) {
        break;
      } else {
        continue;
      }
    }
  }
  // for union and intersection
  this.union = function(b) {
    if (!b instanceof se) {
      throw Error('argument must be a union object');
    }
    var res = new se();
    var values = this.values();
    values.map(function(item, id) {
      res.add(item);
    });
    b.values().map(function(item, id) {
      if (!this.has(item)) {
        res.add(item);
      }
    });

    return res;
  }
  this.intersection = function(b) {
    if (!b instanceof se) {
      throw Error('argument must be a union object');
    }
    return b.values().filter(function(item, id) {
      return this.has(item);
    });
  }
}
///////////////////////////////////////////// for mobile device adapter /////////////////////////////
// simple extend
def_obj('extend', function (o) {
  var self = this;
  if (!o.type() || o.type() !== 'object') {
    return false;
  }
  for (var key in o) {
    if (o.hasOwnProperty(key)) {
      self[key] = o[key];
    }
  }
  return true;
});
// deep extend
def_obj('deepExtend', function (o) {
  var self = this;
  if (!o.type() || o.type() !== 'object') {
    return false;
  }
  for (var key in o) {
    if (o.hasOwnProperty(key)) {
      if (typeof o[key] === 'object') {
        self.deepExtend(o[key]);
      } else {
        self[key] = o[key];
      }
    }
  }
  return true;
});
// basic method for change prototype
def_obj('proto',function (fn) {
  var self = this;
  var type = self.type();
  // get prototype
  if (!fn) {
    if (type === 'function') {
      return self.prototype;
    } else {
      return self.constructor.prototype;
    } // set prototype for function
  } else if(fn.type && fn.type() === 'function') {
    var name = fn.fnName();
    if (type === 'function') {
      self.prototype[name] = fn;
    } else if (type === 'object') {
      var _proto = Object.getPrototypeOf(self);
      if (!_proto) {
        _proto = {};
      }
      _proto[name] = fn;
      Object.setPrototypeOf(self, _proto);
    } // set prototype for object
  } else if(fn.type && fn.type() === 'object') {
    if (type === 'function') {
      self.prototype = fn;
    } else if (type === 'object') {
      var _proto = Object.getPrototypeOf(self);
      if (!_proto) {
        _proto = {};
      }
      // just simple extend for outside control
      _proto.extend(fn);
      Object.setPrototypeOf(self, _proto);
    }
  }
});

// change the fontSize for root element
// basic font size is 100px
// device namespace
var device = util.device = {};
// init common method
device.proto(function htmlSize() {
  return getComputedStyle(query('html').item(0)).fontSize;
});
device.whatchRem = function (designWidth) {
  var el = document.documentElement;
  var event = null;
  var fn = function () {
    var width = clientWidth();
    width = width < 320 ? 320 : width;
    width = width > 640 ? 640 : width;
    if (width) {
      el.style.fontSize = Number(100 / designWidth * width).toFixed(3) + 'px';
    } else {
      return false;
    }
  }
  if ('onorientationchange' in window) {
    event = 'onorientationchange';
  } else {
    event 'resize'
  }

  window.on(event, fn, false);
  window.on('DOMContentLoaded', fn, false);
}

// dynamic change the ratio for viewport
device.whatchRatio = function (designWidth) {
  var el = query('meta[name="viewport"]').item(0);
  var ratio = designWidth / clientWidth();
  var event = null;
  var fn = function () {
    var viewport = el.getAttribute('content')
      .split(',')
      .map(function (item, index) {
        if (/minimum-\w+=/.test(item)) {
          return 'minimum-scale=' + ratio;
        } else if (/maximum-\w+=/.test(item)) {
          return 'maximum-scale=' + ratio;
        } else if(/initial-\w+=/.test(item)) {
          return 'initial-scale=' + ratio;
        }
      }).join(',');

    el.setAttribute('content', viewport);
  }

  if ('onorientationchange' in window) {
    event = 'onorientationchange';
  } else {
    event 'resize'
  }

  window.on(event, fn, false);
  window.on('DOMContentLoaded', fn, false);
  // window.on(`DOMContentLoaded,${event}`, fn, false);
}

// translate between px and rem units
device.px2rem = function (px) {
  var rs = this.htmlSize();
  return px / rs + 'rem';
}
device.rem2px = function (rem) {
  var rs = this.htmlSize();
  return rem * rs + 'px';
}

//////////////////////////////////////// device event: just use fn not on //////////////////////
//////////////////////////////////////// single click, then skip the default click event
def_obj('tap', function(fn) {
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be an element');
  }
  var tartTime = null;
  var endTime = null;
  function f1(e) {
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
        startTime = new Date().getTime();
        break;
      case 'touchend':
        endTime = new Date().getTime();
        if (endTime - startTime < 500) {
          fn.call(self, e);
        }
        break;
    }
  }
  self.on('touchstart, touchend', f1);
});

// double tap
def_obj('doubleTap', function(fn) {
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be an element');
  }
  var tartTime = null;
  var endTime = null;
  function f1(e) {
    var touches = e.targetTouches;
    var chtou = e.changedTouches;
    e.preventDefault();
    if (touches.length !== 2 || chtou.length !== 2) {
      return false;
    }
    switch (e.type) {
      case 'touchstart':
        startTime = new Date().getTime();
        break;
      case 'touchend':
        endTime = new Date().getTime();
        if (endTime - startTime < 500) {
          fn.call(self, e);
        }
        break;
    }
  }
  self.on('touchstart, touchend', f1);
})

/////////////////////// long tap //////////////////////////////
def_obj('longTap', function(fn) {
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be an element');
  }
  var id;
  function f1(e) {
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
        id = setTimeout(function() {
          fn.call(self, e);
        }, 500);
        break;
      case 'touchmove':
        clearTimeout(id);
        break;
      case 'touchend':
        clearTimeout(id);
        break;
    }
  }
  self.on('touchstart, touchmove, touchend', f1);
});

///////////////////////////////////////// slide/swipe event ////////////////////////////////
///////////////////////////////////////// to left
def_obj('slideLeft', function(fn) {
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be an element');
  }
  var sx = sy = ex = ey = null;
  function f1(e) {
    var firstTouch = e.changedTouches.item(0);
    e.preventDefault();
    switch (e.type){
      case 'touchstart':
        sx = firstTouch.pageX;
        sy = firstTouch.pageY;
        break;
      case 'touchend':
        ex = firstTouch.pageX;
        ey = firstTouch.pageY;
        if (Math.abs(ex - sx) >= Math.abs(ey - sy) && sx - ex >= 25) {
          fn.call(self, e);
        }
    }
  }
  self.on('touchstart, touchend', f1);
});

// to right
def_obj('slideRight',function(fn) {
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be an element');
  }
  var sx = sy = ex = ey = null;
  function f1(e) {
    var firstTouch = e.changedTouches.item(0);
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
        sx = firstTouch.pageX;
        sy = firstTouch.pageY;
        break;
      case 'touchend':
        ex = firstTouch.pageX;
        ey = firstTouch.pageY;
        if (Math.abs(ex - sx) >= Math.abs(ey - sy) && ex - sx >= 25) {
          fn.call(self, e);
        }
    }
  }
  self.on('touchstart, touchend');
});

// swipe to up
def_obj('swipeUp', function() {
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be an element');
  }
  var sx = sy = ex = ey = null;
  function f1(e) {
    var firstTouch = e.changedTouches.item(0);
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
        sx = firstTouch.pageX;
        sy = firstTouch.pageY;
        break;
      case 'touchend':
        ex = firstTouch.pageX;
        ey = firstTouch.pageY;
        if (Math.abs(ex - sx) <= Math.abs(ey - sy) && sy - ey >= 25) {
          fn.call(self, e);
        }
    }
  }
  self.on('touchstart, touchend');
});

// swipe to down
def_obj('swipeDown', function() {
  var self = this;
  if (!self.isDOM()) {
    throw Error('the object must be an element');
  }
  var sx = sy = ex = ey = null;
  function f1(e) {
    var firstTouch = e.changedTouches.item(0);
    e.preventDefault();
    switch (e.type) {
      case 'touchstart':
        sx = firstTouch.pageX;
        sy = firstTouch.pageY;
        break;
      case 'touchend':
        ex = firstTouch.pageX;
        ey = firstTouch.pageY;
        if (Math.abs(ex - sx) <= Math.abs(ey - sy) && ey - sy >= 25) {
          fn.call(self, e);
        }
    }
  }
  self.on('touchstart, touchend');
});

/////////////////////////////////////// URI ///////////////////////////
util.getUrlParams = function(key) {
  key = key || 'kw';
  var regular = new RegExp(key + '=([^&]*)');
  var result = location.href.match(regular);
  return result ? decodeURI(result[1]) : null;
}

/////////////////////////////// new Log System //////////////////////////////////////
window.Log = new function() {
  // tool
  this.type = function (o) {
    Object.prototype.toString.call(o).replace(/^\[\w+ (.+)\]$/, '$1').toLowerCase();
  }
  // Canvas container
  this.Canvas = function (name = '', style) {
    this.elements = [];
    this.style = Log.type(style) === 'array' ? style : [];
    this.name = name.toString();
  }
  this.Canvas.prototype.add = function (el) {
    if(!el || Object.is(el, null)) return false;
    el.belong = this;

    if (el.belong !== this) {
      return false;
    }

    if (el.isContainer && el.elements) {
      el.elements.forEach(function(element, index) {
        this.elements.push(element);
      });
    } else {
      this.elements.push(el);
    }
  }
  // element
  this.Element = function(values = [[]], style = [], zIndex = 1, position) {
    // every element has the only single id
    this.id = Number(Math.random().toString().substr(2, 1) + Date.now()).toString(36);
    this.values = values;
    this.style = this.type(style) === 'array' ? style : [];
    this.zIndex = zIndex;
    this.scale_X = 1;
    this.scale_Y = 1;
    this.position = {
      x: position && position.x ? position.x : 0,
      y: position && position.y ? position.y : 0
    },
    this.container = null;
    this.belong = null;
  }
  this.Element.prototype.clone = function() {
    return new this.constructor(JSON.parse(JSON.stringify(this.values)), this.style.concat([]), this.zIndex, this.position);
  }
  this.Element.prototype.remove = function() {
    var canvas = this.container ? this.container.belong : this.belong;
    var index = canvas.elements.findIndex(function(el) {
      return el.id === this.id;
    });
    if (index >= 0) {
      canvas.elements.splice(index, 1);
    }
  }
  // cut width not increment width or get the max width
  this.Element.prototype.width = function(width) {
    width = parseInt(width);
    if (width && width > 0) {
      this.values.forEach(function(item, index) {
        item.splice(width);
      });
      return width;
    } else {
      return Math.max.apply(null, this.values.map(function(item, index) {
        return item.length;
      }));
    }
  }
  // its same with width
  this.Element.prototype.height = function(height) {
    height = parseInt(height);
    if (height && height > 0) {
      this.values.splice(height);
      return height;
    } else {
      return this.values.length;
    }
  }
  this.Element.prototype.scaleX = function(multiple, flag) {
    var scaleY = this.scale_Y;
    multiple = +multiple;
    if (this.valuesCopy) {
      this.values = JSON.parse(JSON.stringify(this.valuesCopy));
    } else {
      this.valuesCopy = JSON.parse(JSON.stringify(this.values));
    }

    if (!flag) {
      this.scaleY(scaleY, true);
    }
    if (multiple < 1 || multiple > 1) { // scale_X
      this.values.forEach(function(item, index1) {
        item.forEach(function(val, index2) {
          item[Math.ceil(index2 * multiple)] = val;
          item[index2] = ' ';
        });
      });
      this.scale_X = multiple;
    } else {
      this.scale_X = 1;
      return this;
    }

    if (multiple < 1) {
      this.values.forEach(function(item, index) {
        item.splice(Math.ceil(item.length * multiple));
      });
    } else if (multiple > 1) {
      // fix length bug
      for(var i = 0; i < this.values.length; i++) {
        for(var j = 0; j < this.values[i].length; j++) {
          if (this.values[i][j] === undefined) {
            this.values[i][j] = ' ';
          }
        }
      }
    }

    return this;
  }
  this.Element.prototype.scaleY = function (multiple, flag) {
    var scaleX = this.scale_X;
    var length = this.width();
    multiple = +multiple;
    if (this.valuesCopy) {
      this.values = JSON.parse(JSON.stringify(this.valuesCopy));
    } else {
      this.valuesCopy = JSON.parse(JSON.stringify(this.values));
    }

    if (!flag) {
      this.scaleX(scaleX, true);
    }

    if (multiple < 1 || multiple > 1) {
      this.values.forEach(function(item, index1) {
        item.forEach(function(val, index2) {
          if (!this.values[Math.floor(index1 * multiple)]) {
            this.values[Math.floor(index1 * multiple)] = [];
          }
          this.values[Math.floor(index1 * multiple)][index2] = val;
          this.values[index1][index2] = ' ';
        });
      });
      this.scale_Y = multiple;
    } else {
      this.scale_Y = 1;
      return this;
    }

    if(multiple < 1) {
      this.values.splice(Math.ceil(this.values.length * multiple));
    } else if (multiple > 1) {
      for(var i = 0; i < this.values.length; i++) {
        if (this.values[i]) {
          for(var j = 0; j < this.values[i].length; j++) {
            if (this.values[i][j] === undefined) {
              this.values[i].splice(j);
              break;
            }
          }
        } else {
          this.values[i] = [' '];
        }
      }
    }

    return this;
  }
  this.Element.prototype.scale = function(x, y) {
    this.scaleX(+x).scaleY(+y);
  }
  this.Container = function() {
    this.isContainer = true;
    this.elements = [];
    this.position = {
      x: 0,
      y: 0
    }
    this.zIndex = 0;
  }
  // TODO
}
