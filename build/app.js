// Generated by Haxe 4.0.5
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() { };
App.__name__ = true;
App.main = function() {
	window.onload = function() {
		Cursor.cursor = window.document.getElementById("cursor");
		var playButton = window.document.getElementById("play-button");
		playButton.onclick = function() {
			playButton.classList.add("toolbar-active");
		};
		var pauseButton = window.document.getElementById("pause-button");
		pauseButton.onclick = function() {
			pauseButton.classList.add("toolbar-selected");
		};
		var stepButton = window.document.getElementById("step-button");
		stepButton.onclick = function() {
		};
		var mainContainer = new Container(Direction.Vertical,null,window.document.getElementById("main-container"));
		mainContainer.addView();
	};
};
var Resizable = function(parent,element) {
	this.size = 100.0;
	this.parent = parent;
	this.element = element;
	this.direction = parent == null || parent.element.classList.contains("container-vertical") ? Direction.Vertical : Direction.Horizontal;
};
Resizable.__name__ = true;
Resizable.prototype = {
	setSize: function(size) {
		this.size = size;
		if(this.direction == Direction.Vertical) {
			this.element.style.height = size + "%";
		} else {
			this.element.style.width = size + "%";
		}
		this.parent.updateDividers();
	}
	,minimumSize: function(size,direction) {
		return 100.0;
	}
	,updateDividers: function() {
	}
};
var Container = function(type,parent,container) {
	this.dividers = new Array(0);
	this.children = [];
	if(container == null) {
		container = window.document.createElement("div");
		container.classList.add("container");
		container.classList.add(type == Direction.Vertical ? "container-vertical" : "container-horizontal");
	}
	Resizable.call(this,parent,container);
};
Container.__name__ = true;
Container.__super__ = Resizable;
Container.prototype = $extend(Resizable.prototype,{
	addView: function() {
		var view = new View(this);
		this.addElement(view);
		return view;
	}
	,minimumSize: function(size,direction) {
		if(this.direction != direction) {
			var sum = 0.0;
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				var childSize = child.minimumSize(size,direction);
				sum += childSize;
			}
			return sum;
		} else {
			var max = 0.0;
			var _g2 = 0;
			var _g11 = this.children;
			while(_g2 < _g11.length) {
				var child1 = _g11[_g2];
				++_g2;
				var childSize1 = child1.minimumSize(size,direction);
				if(childSize1 > max) {
					max = childSize1;
				}
			}
			return max;
		}
	}
	,addElement: function(element) {
		this.element.append(element.element);
		this.children.push(element);
		this.createDividers();
		var size = 1.0 / this.children.length * 100.0;
		var _g = 0;
		var _g1 = this.children.length;
		while(_g < _g1) {
			var i = _g++;
			this.children[i].setSize(size);
		}
	}
	,createDividers: function() {
		var _g = 0;
		var _g1 = this.dividers;
		while(_g < _g1.length) {
			var divider = _g1[_g];
			++_g;
			divider.element.remove();
		}
		var this1 = new Array(this.children.length - 1);
		this.dividers = this1;
		var _g2 = 0;
		var _g3 = this.dividers.length;
		while(_g2 < _g3) {
			var i = _g2++;
			this.dividers[i] = new Divider(this.children[i],this.children[i + 1]);
		}
	}
	,updateDividers: function() {
		var _g = 0;
		var _g1 = this.dividers;
		while(_g < _g1.length) {
			var divider = _g1[_g];
			++_g;
			divider.updatePosition();
		}
		var _g2 = 0;
		var _g3 = this.children;
		while(_g2 < _g3.length) {
			var child = _g3[_g2];
			++_g2;
			child.updateDividers();
		}
	}
});
var Cursor = function() { };
Cursor.__name__ = true;
Cursor.setCursor = function(cursor) {
	Cursor.cursor.style.cursor = cursor;
	Cursor.cursor.style.pointerEvents = cursor.length == 0 ? "none" : "all";
};
var Divider = function(connected1,connected2) {
	this.connected1 = connected1;
	this.connected2 = connected2;
	this.direction = connected1.direction;
	this.element = this.createDivider();
	this.updatePosition();
};
Divider.__name__ = true;
Divider.prototype = {
	updatePosition: function() {
		var rect1 = this.connected1.element.getBoundingClientRect();
		var rect2 = this.connected2.element.getBoundingClientRect();
		this.element.style.left = "calc(" + rect2.x / window.innerWidth * 100.0 + "%" + (this.direction == Direction.Vertical ? "" : " - 6px") + ")";
		var size = (rect2.y - 30.0) / (window.innerHeight - 30.0) * 100.0;
		this.element.style.top = "calc(" + size + "% + " + (30.0 * (1.0 - size / 100.0) - (this.direction == Direction.Horizontal ? 0.0 : 6.0)) + "px)";
		if(this.direction == Direction.Vertical) {
			this.element.style.width = "" + rect1.width / window.innerWidth * 100.0 + "%";
		} else {
			var size1 = rect1.height / (window.innerHeight - 30.0) * 100.0;
			this.element.style.height = "calc(" + size1 + "% - " + 30.0 * size1 / 100.0 + "px)";
		}
	}
	,createDivider: function() {
		var _gthis = this;
		var divider = window.document.createElement("div");
		divider.classList.add("divider");
		divider.classList.add(this.direction == Direction.Vertical ? "divider-horizontal" : "divider-vertical");
		var inside = window.document.createElement("div");
		divider.appendChild(inside);
		divider.onmousedown = function() {
			Cursor.setCursor("" + (_gthis.direction == Direction.Vertical ? "s" : "w") + "-resize");
			var onMouseMove = function(event) {
				var rect1 = _gthis.connected1.element.getBoundingClientRect();
				var rect2 = _gthis.connected2.element.getBoundingClientRect();
				var both = _gthis.connected1.size + _gthis.connected2.size;
				var size = 0.0;
				if(_gthis.direction == Direction.Vertical) {
					size = (event.clientY - rect1.y) / (rect1.height + rect2.height);
				} else {
					size = (event.clientX - rect1.x) / (rect1.width + rect2.width);
				}
				size *= both;
				var other = both - size;
				var a = (_gthis.direction == Direction.Vertical ? rect1.height : rect1.width) * size / _gthis.connected1.size >= _gthis.connected1.minimumSize(size * both,_gthis.connected1.direction);
				var b = (_gthis.direction == Direction.Vertical ? rect2.height : rect2.width) * other / _gthis.connected2.size >= _gthis.connected2.minimumSize(other,_gthis.connected2.direction);
				if(a && b || a && other > _gthis.connected2.size || b && size > _gthis.connected1.size) {
					_gthis.connected1.setSize(size);
					_gthis.connected2.setSize(other);
				}
			};
			window.document.onmousemove = onMouseMove;
			window.document.onmouseup = function() {
				Cursor.setCursor("");
				window.document.body.removeAttribute("style");
				window.document.onmouseup = window.document.onmousemove = null;
			};
		};
		this.connected1.parent.element.insertBefore(divider,this.connected2.element);
		return divider;
	}
};
Math.__name__ = true;
var Direction = $hxEnums["Direction"] = { __ename__ : true, __constructs__ : ["Vertical","Horizontal"]
	,Vertical: {_hx_index:0,__enum__:"Direction",toString:$estr}
	,Horizontal: {_hx_index:1,__enum__:"Direction",toString:$estr}
};
var View = function(parent) {
	this.activeTab = 0;
	this.tabs = [];
	var _gthis = this;
	var view = window.document.createElement("div");
	view.classList.add("view");
	this.tabContainer = window.document.createElement("div");
	this.tabContainer.classList.add("tabs");
	this.tabContainer.onwheel = function(e) {
		_gthis.tabContainer.scrollLeft += e.deltaY;
	};
	view.appendChild(this.tabContainer);
	this.windowContainer = window.document.createElement("div");
	this.windowContainer.classList.add("windows");
	view.appendChild(this.windowContainer);
	Resizable.call(this,parent,view);
	this.updateActive();
};
View.__name__ = true;
View.__super__ = Resizable;
View.prototype = $extend(Resizable.prototype,{
	updateActive: function() {
		var _g = 0;
		var _g1 = this.tabs.length;
		while(_g < _g1) {
			var i = _g++;
			if(i == this.activeTab) {
				this.tabs[i].classList.add("tab-active");
				this.tabs[i].classList.add("tab-focus");
			} else {
				this.tabs[i].classList.remove("tab-active");
				this.tabs[i].classList.remove("tab-focus");
			}
		}
	}
});
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g3 = 0;
			var _g11 = o.length;
			while(_g3 < _g11) {
				var i = _g3++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = ((e1) instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
App.main();
})({});