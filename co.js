/**
 * author: nfwyst
 * date: 2017/5/25
 * update date: 2017/6/2 8:20
 */

'use strict';

var util = { };

//////////////////////////////// global /////////////////////////////////////
var def_arr = function( k, v ) {
	Object.defineProperty(
		Array.prototype,
		k,
		{
			configurable: true,
			writable: true,
			value: v,
			enumerable: false,
		}
	);
	Object.defineProperty(
		Array,
		k,
		{
			configurable: true,
			writable: true,
			value: v,
			enumerable: false,
		}
	);
};
var def_log = function( k, v ) {
	console[k] = v;
};
var def_str = function( k, v ) {
	Object.defineProperty(
		Object.prototype,
		k,
		{
			configurable: true,
			writable: true,
			value: v,
			enumerable: false,
		}
	);
};
var def_obj = function( k, v ) {
	Object.defineProperty(
		Object.prototype,
		k,
		{
			configurable: true,
			writable: true,
			value: v,
			enumerable: false,
		}
	);
};
// get correct type of variable
def_obj( 'type', function( o ) {
	return Object.prototype
				.toString
				.call( o )
				.replace( /^\[\w+ (.+)\]$/, '$1' )
				.toLowerCase();
} );
// init result variable by argument
function getResult( arg ) {
	var result = undefined;

	if ( type( arg ) === 'string' ) {
		result = '';
	} else if ( type( arg ) === 'array' ) {
		result = [];
	} else if ( type( arg ) === 'object' ) {
		result = {};
	} else {
		throw new Error( 'tyep error: getResult' );
	}

	return result;
}
// validate type
function validate( arg ) {
	var t = type( arg );
	if ( t !== 'array' && t !== 'string' && t !== 'object' ) {
		throw new Error( 'tyep error: validate' );
	}
}
///////////////////////////////////// core ////////////////////////////////
//////////// base instructure
// useage: console.red('number: ', 1234); for modern web browser
def_log( 'red', function() {
	if ( type( arguments[0] ) !== 'string' || typeof window === undefined ) {
		console.log( ...arguments );
	} else {
		var str = arguments[0];
		var re = [];
		for( var i = 1; i < arguments.length; i++ ) {
			re.push( arguments[i] );
		}
		console.log( '%c ' + str, 'background: #000; color: red; padding-right: 5px', ...re );
	}
});
def_log( 'green', function() {
	if ( type( arguments[0] ) !== 'string' || typeof window === undefined ) {
		console.log( ...arguments );
	} else {
		var str = arguments[0];
		var re = [];
		for( var i = 0; i < arguments.length; i++ ) {
			re.push( arguments[i] );
		}
		console.log( '%c ' + str, 'background: #000; color: green; padding-right: 5px', ...re );
	}
} );
def_log( 'orange', function() {
	if ( type( arguments[0] ) !== 'string' || typeof window === undefined ) {
		console.log( ...arguments );
	} else {
		var str = arguments[0];
		var re = [];
		for( var i = 0; i < arguments.length; i++ ) {
			re.push( arguments[i] );
		}
		console.log( '%c ' + str, 'background: #000; color: orange; padding-right: 5px', ...re );
	}
} );
def_log( 'bold', function() {
	if ( type( arguments[0] ) !== 'string' || typeof window === undefined ) {
		console.log( ...arguments );
	} else {
		var str = arguments[0];
		var re = [];
		for( var i = 0; i < arguments.length; i++ ) {
			re.push( arguments[i] );
		}
		console.log( '%c ' + str, ' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em', ...re );
	}
} );
def_log( 'rainbow', function() {
	if ( type( arguments[0] ) !== 'string' || typeof window === undefined ) {
		console.log( ...arguments );
	} else {
		var str = arguments[0];
		var re = [];
		for( var i = 0; i < arguments.length; i++ ) {
			re.push( arguments[i] );
		}
		console.log( '%c ' + str, 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;', ...re );
	}
} );
// each function, for array | string | object, accept breack function
def_obj( 'each', function( cb ) {
	var self = this,
		need_break = false,
		t = type( self ),
		message = undefined;

	validate( self );

	for( var item in self ) {
		if ( self.hasOwnProperty( item ) ) {
			if ( t === 'string' ) {
				item = Number(item);
			}
			cb.call( null, self[item], item, self, function break_func( msg ) {
				message = msg;
				need_break = true;
			} );
			if ( need_break ) {
				return {
					value: self[item],
					key: item,
					context: self,
					msg: message
				}
			}
		}
	}
} );
// map function, for string | object, accept break function
def_obj( 'map', function( cb ) {
	var self = this,
		result = getResult( self ),
		t = type( self ),
		need_break = false,
		message = undefined;

	validate( self );

	for( var item in self ) {
		if ( self.hasOwnProperty( item ) ) {
			if ( t === 'string' ) {
				item = Number(item);
			}
			var v = cb.call( null, self[item], item, self, function break_func( msg ) {
				message = msg;
				need_break = true;
			} );
			if ( t === 'string' ) {
				result += v;
			} else {
				result[item] = v;
			}
			if( need_break ) {
				return {
					value: result,
					key: item,
					context: self,
					msg: message
				}
			}
		}
	}

	return result;
} );
// fix map for array
Array.prototype.map =  function( cb ) {
	var self = this,
		result = [],
		t = type( self ),
		need_break = false,
		message = undefined;

	if ( t !== 'array' ) {
		console.red('usage: ', 'type must be array');
		return false;
	}

	for( var item in self ) {
		if ( self.hasOwnProperty( item ) ) {
			item = Number(item);
			var v = cb.call( null, self[item], item, self, function break_func( msg ) {
				message = msg;
				need_break = true;
			} );
			result[item] = v;
			if( need_break ) {
				return {
					value: result,
					key: item,
					context: self,
					msg: message
				}
			}
		}
	}

	return result;
}
// replaceOne_by_index, for array | string | object
//  specially for object, you can use: 'key.key.key' to operate nested value
def_obj( 'replaceOne_by_index', function( id, value ) {
	var self = this,
		t = type( self );

	validate( self );
	if( id === undefined && value === undefined ) {
		console.red('usage: ', 'provide an index and element value to replace!');
		return false;
	}

	if ( t === 'array' ) {
		self.splice( id, 1, value );
	} else if ( t === 'object' ) {
		// for nested object
		var path = id.split('.');

		if ( path.length <= 1 ) {
			if ( !self[id] ) {
				console.red('no such a property on object!');
				return false;
			} else {
				self[id] = value;
			}
		} else {
			var rec = self[path[0]];
			for ( var i = 1; i < path.length - 1; i++ ) {
				rec = rec[path[i]];
			}
			rec[path[path.length - 1]] = value;
		}
	} else if ( t === 'string' ) {
		var res = '';
		var replaced = false;
		self.each( function( item, idx, obj, cb ) {
			if ( idx === id  && !replaced ) {
				res += value;
				replaced = true;
			} else {
				res += item;
			}
		} );
		return res;
	}

	return self;
} );
// replace all by value, for array | stirng | object
def_obj( 'replaceAll', function( src, dest ) {
	var self = this,
		t = type( self ),
		res = '';

	validate( self );
	for( var item in self ) {
		if ( self.hasOwnProperty( item ) ) {
			if ( self[item] === src && t !== 'string' ) {
				self[item] = dest;
			} else if ( t === 'string' ) {
				if ( self[item] !== src ) {
					res += self[item];
				} else {
					res += dest;
				}
			}
		}
	}

	if( t === 'string' ) {
		return res;
	} else {
		return self;
	}
} );
//////////////////////////////////// util //////////////////////////
// call_one time
util.call_one = function( func, item, id, obj ) {
	return function() {
		return func( item, id, obj );
	}
};
util.max = function( m, n ) {
	return m > n ? m : n;
}
util.min = function( m, n ) {
	return m < n ? m : n;
}
/////////////////////////////////// only for array //////////////////
// get a random item from array
def_arr( 'getOne', function() {
	var self = this;

	var id = Math.floor(Math.random() * self.length);

	return self[id];
} );
// initialize an array by length and value
def_arr( 'init', function( l, v ) {
	var res = [];
	if ( !l ) {
		console.red('useage: ', 'provide base length!');
	}
	if ( v ) {
		for( var i = 0; i < l; i++ ) {
			res.push( v );
		}
	} else {
		for ( var i = 0; i < l; i++ ) {
			res.push( i );
		}
	}
	return res;
} );
// insert element
def_arr( 'insert', function( id, value ) {
	var self = this;
	self.splice( id, 0, value );

	return self;
} );

// return keys
def_obj( 'keys', function() {
	var self = this,
		t = type( self ),
		res = [];

	validate( self );

	self.each( function( item, id, arr ) {
		res.push( id );
	} );

	return res;
} );
// fix keys for array
Array.prototype.keys = function() {
	var self = this,
		res = [];

	validate( self );

	self.each( function( item, id, arr )  {
		res.push( id );
	} );

	return res;
}
// return an array that includes all values of object
def_obj( 'values', function() {
	var self = this,
		re = [];

	validate( self );

	for( var item in self ) {
		if ( self.hasOwnProperty( item ) ) {
			re.push( self[item] );
		}
	}

	return re;
} );
// deep clone
def_obj( 'clone', function() {
	var self = this,
		re = {};
	validate( self );

	function _clone( re, obj ) {
		for( var item in obj ) {
			if ( obj.hasOwnProperty( item ) ) {
				var t = type( obj[item] );
				if( t === 'object' ) {
					re[item] = {};
					_clone(re[item], obj[item]);
				} else if ( t === 'array' ) {
					re[item] = [];
					_clone(re[item], obj[item]);
				} else {
					re[item] = obj[item];
				}
			}
		}
	}

	_clone( re, self );

	return re;
} );
// return all keys of object
def_obj( 'keys_all', function() {
	var self = this,
		res = [];

	validate( self );

	for ( var item in self ) {
		res.push( item );
	}

	return res;
} );
///////////////////////////////// event ///////////////////////////////
// Limit the frequency of events happen
util.debounce = function ( context, func, wait, immediate ) {
    var timeout;
    wait = wait || 20;
    immediate = immediate || true;
    target = target || this;

    return function() {
    	var args = [];
    	for ( var i = 0; i < arguments.length; i++ ) {
    		args.push( arguments[i] );
    	}

    	var later = function() {
    		timeout = null;
    		if( !immediate ) {
    			func.apply( context, args );
    		}
    	}

    	var callNow = immediate && !timeout;
    	clearTimeout( timeout );
    	timeout = setTimeout( later, wait );
    	if ( callNow ) {
    		func.apply( context, args );
    	}
    }
};
// This function will be executed only once, no matter how many times
// it is called.
util.once = function( func, context /* other arguments */ ) {
	var args = [];
	if ( arguments.length >= 3 ) {
		for ( var i = 2; i < arguments.length; i++ ) {
			args.push( arguments[i] );
		}
	}
	var called = false;

	return (function(func, args) {
		if ( !called ) {
			if ( args.length >= 1 ) {
				func.apply( context, args );
			} else {
				func.apply( context );
			}
			called = true;
		} else {
			return false;
		}
	})(func, args);
}

/////////////////////////////// CSS ///////////////////////////////////
// margin-top ==> marginTop
util.toCamel = function ( str ) {
    return str.replace(/-(\w)/g,  function ( str, item ) {
        return item.toUpperCase()
    } );
};
/////////////////////////////// Time //////////////////////////////////
// translate Date to standard time object
util.timeTranslate = function( ti ){
    var t     = new Date( ti ),
    	year  = t.getFullYear(),
    	month = t.getMonth(),
    	date  = t.getDate(),
    	hh    = t.getHours(),
    	mm    = t.getMinutes(),
    	ss    = t.getSeconds();
    return {
    	year: year,
    	month: month,
    	date: date,
    	hh: hh,
    	mm: mm,
    	ss: ss,
    };
};
// accept time object
util.timeFormat = function( t ) {
    var month = t.month + 1 < 10 ? "0" + (t.month + 1) : t.month + 1,
    	date  = t.date < 10 ? "0" + t.date : t.date,
    	hh    = t.hh < 10 ? "0" + t.hh : t.hh,
    	mm    = t.mm < 10 ? "0" + t.mm : t.mm,
    	ny = new Date().getFullYear();
    if( ny === t.year ){
      return  month + "月" + date + "日 " + hh + ":" + mm + "";
    } else {
      return  t.year + "年" + month + "月" + date + "日";
    }
};
// filter : get all element that returned by cb
def_obj( 'filter', function( cb ) {
	var self = this,
		result = getResult( self ),
		t = type( self );

	validate( self );

	self.each( function( item, id, obj, br ) {
		var res = cb( item, id, obj );
		if ( (t === 'object' || t === 'array') && res ) {
			result[id] = item;
		} else if ( t === 'string' && res ) {
			result += item;
		}
	} );

	return result;
} );
// find : find an item
def_obj( 'find', function( cb ) {
	var self = this,
		result = getResult( self ),
		t = type( self );

	validate( self );


	self.each( function( item, id, obj, br ) {
		if ( cb ( item, id, obj ) ) {
			if ( t === 'string' ) {
				result += item;
				br(null);
			} else {
				result[id] = item;
				br(null);
			}
		}
	} );

	return result;
} );
// fix find for Array
def_arr( 'find', function( cb ) {
	var self = this,
		result = getResult( self ),
		t = type( self );

	validate( self );


	self.each( function( item, id, obj, br ) {
		if ( cb ( item, id, obj ) ) {
			if ( t === 'string' ) {
				result += item;
				br(null);
			} else {
				result[id] = item;
				br(null);
			}
		}
	} );

	return result;
} );
// every member match condition
def_obj( 'every', function( cb ) {
	var self = this,
		result = getResult( self ),
		t = type( self ),
		pass = true;

	validate( self );

	self.each( function( item, id, obj, br ) {
		if ( !cb( item, id, obj) ) {
			pass = false;
			br(null);
		}
	});

	return pass;
} );

// return true while some element in current context
def_obj( 'some', function( cb ) {
	var self = this,
		pass = false;

	validate( self );


	self.each( function( item, id, obj, br ) {
		if ( cb(item, id, obj) ) {
			pass = true;
			br(null);
		}
	});

	return pass;
});

// return true while include one item
def_obj( 'includes', function( arg ) {
	var self = this,
		has = false,
		t = type( self );

	validate( self );

	if ( t === 'object' ) {
		self.each( function( item, id, obj, br ) {
			if ( arg === id ) {
				has = true;
				br(null);
			}
		});
	} else if ( t === 'array' ) {
		self.each( function( item, id, obj, br ) {
			if ( arg === item ) {
				has = true;
				br(null);
			}
		});
	} else if ( t === 'string' && type( arg ) === 'string'  ) {
		var l = arg.length;
		for( var i = 0; i < self.length - arg.length; i++ ) {
			if ( self.substring(i, i + l - 1) === arg ) {
				has = true;
				break;
			}
		}
	} else {
		throw new Error('...something wrong...');
	}

	return has;
});
/////////////////////////////////// Only For Array /////////////////////////////////
// if size is 2, src = [1,2,3,4,5], will be [[1,2],[3,4],5]
def_arr( 'to_group', function( size ){
	var self = this,
		result = getResult( self ),
		start = 0,
		end;

	validate( self );

    while( true ){
      end = start + size;

      if( end > self.length ){
      	end = self.length;
      }

      var item = self.slice( start, end );
      if ( item.length === 1 ) {
      	item = item[0];
      }

      result.push( item );

      start += size;

      if( start >= self.length ){
        break;
      }
    }

    return result;
});
def_arr( 'max', function() {
	var self = this,
			t = type( self );

	if ( t !== 'array' ) {
		throw new Error('sorry, type missing Array');
	}

	var res = -999999;
	self.each( function( item, id, obj ) {
		if ( type( item ) === 'object' ) {
			if ( res < item.value ) {
				res = item.value;
			}
		} else {
			res = res < item ? item : res;
		}
	});

	return res;
});
// sortBy cb : 自定义排序
def_arr( 'sortBy', function( cb ) {
	var self = this,
			t = type( self );

	if ( t !== 'array' ) {
		throw new Error('sorry, type missing Array');
	}
	// check callback
	cb = cb ? cb : function( i ) { return i };

	for ( var j = 0; j < self.length; j++ ) {
		for ( var i = 0; i < self.length - 1 - j; i++ ) {
			var curr = cb( self[i], i, self ),
					next = cb( self[i + 1], i + 1, self );
			curr = type( curr ) === 'object' ? curr.value : curr;
			next = type( next ) === 'object' ? next.value : next;
			if ( curr !== undefined && next !== undefined && curr > next ) {
				var tmp = self[i];
				self[i] = self[i + 1];
				self[i + 1] = tmp;
			}
		}
	}

	return self;
} );
// groupBy 分组
def_obj( 'groupBy', function( cb ) {
	var self = this,
			t = type( self ),
			res = {};

	validate( self );

	if ( type( cb ) === 'string' && t !== 'string' ) {
		self.each( function( item, id, obj ) {
			if ( !res[item[cb]] && item[cb] ) {
				res[item[cb]] = [];
				res[item[cb]].push(item);
			} else if ( item[cb] ) {
				res[item[cb]].push(item);
			}
		});
	} else if ( type( cb ) === 'function' ) {
		self.each( function( item, id, obj) {
			if ( !res[cb(item)] && cb(item) ) {
				res[cb(item)] = [];
				res[cb(item)].push(item);
			} else if ( cb(item) ) {
				res[cb(item)].push(item);
			}
		});
	} else {
		throw new Error('argument must be string or function...');
	}

	return res;
});

////////////////////////// DOM Element ////////////////////////
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

// 获取一个 XMLHTTP
var XMLHttpCreator = function() {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			return new ActiveXObject('Microsoft.XMLHTTP');
		} else {
			throw Error('cant create xmlhttp object');
		}
}


// 对象之间通信 responseWay 自定义
def_obj('call_obj', function(obj, msg, cb) {
		return obj.receiveMsg(msg).response(cb);
});

def_obj('receiveMsg', function(msg){
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
			return {
				msg: null
			};
		}
});

///////// map object //////////
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
