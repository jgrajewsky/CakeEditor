// Generated by Haxe 4.0.5
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	electron_main_App.on("ready",function(e) {
		Main.app = new electron_main_BrowserWindow({ title : "Cake", minWidth : 800, minHeight : 600, backgroundColor : "#191919", show : false, webPreferences : { nodeIntegration : true}});
		Main.app.loadFile("app.html");
		Main.app.once("ready-to-show",function() {
			electron_main_Menu.setApplicationMenu(electron_main_Menu.buildFromTemplate([new electron_main_MenuItem({ label : "File", submenu : [new electron_main_MenuItem({ label : "New Project...", accelerator : "Ctrl+N", click : Main.newProject}),new electron_main_MenuItem({ label : "Open Project...", accelerator : "Ctrl+O", click : Main.openProject}),new electron_main_MenuItem({ type : "separator"}),new electron_main_MenuItem({ label : "Exit", click : Main.quit})]}),new electron_main_MenuItem({ label : "View", submenu : [new electron_main_MenuItem({ label : "Zoom In", accelerator : "Ctrl+numadd", click : Main.zoomIn}),new electron_main_MenuItem({ label : "Zoom Out", accelerator : "Ctrl+numsub", click : Main.zoomOut}),new electron_main_MenuItem({ label : "Reset Zoom", accelerator : "Ctrl+num0", click : Main.resetZoom})]}),new electron_main_MenuItem({ label : "Debug", submenu : [new electron_main_MenuItem({ label : "Developer tools", accelerator : "Ctrl+Shift+J", click : Main.devTools})]})]));
			Main.app.maximize();
			Main.app.show();
		});
		Main.app.on("closed",function() {
			Main.quit();
		});
	});
	electron_main_IpcMain.on("create",function(e1,data) {
		Main.projectName = data.name;
		Main.projectPath = data.path + "\\" + data.name;
		if(!sys_FileSystem.exists(Main.projectPath)) {
			sys_FileSystem.createDirectory(Main.projectPath);
			sys_FileSystem.createDirectory(Main.projectPath + "\\Assets");
			sys_FileSystem.createDirectory(Main.projectPath + "\\Builds");
			sys_FileSystem.createDirectory(Main.projectPath + "\\Scripts");
			var ignore = new sys_io_FileOutput(js_node_Fs.openSync(Main.projectPath + "\\.gitignore","w"));
			ignore.writeString("/[Bb]uild/\n/[Bb]uilds/\ndebug.log");
			ignore.close();
			Main.makeProjectXml();
			Main.creator.close();
		}
	});
};
Main.makeProjectXml = function() {
	var file = new sys_io_FileOutput(js_node_Fs.openSync(Main.projectPath + "\\project.xml","w"));
	file.writeString("<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n\t\t<project>\r\n\t\t<meta title=\"" + Main.projectName + "\" package=\"com.company." + Main.projectName + "\" version=\"1.0.0\" company=\"Company Name\" />\r\n\t\t<app main=\"Main\" path=\"Builds\" file=\"" + Main.projectName + "\" />\r\n\t\t<source path=\"Source\" />\r\n\t\t<haxelib name=\"cake\" />\r\n\t\t<assets path=\"Assets\" rename=\"assets\" />\r\n\t\t</project>\r\n\t\t");
	file.close();
};
Main.zoomIn = function() {
	Main.setZoom(0.1);
};
Main.zoomOut = function() {
	Main.setZoom(-0.1);
};
Main.setZoom = function(delta) {
	Main.app.webContents.zoomFactor = Math.min(Math.max(Main.app.webContents.zoomFactor + delta,0.5),2.5);
};
Main.resetZoom = function() {
	Main.app.webContents.zoomFactor = 1.0;
};
Main.newProject = function() {
	if(Main.explorer != null) {
		Main.creator.close();
	}
	if(Main.creator == null) {
		Main.creator = new electron_main_BrowserWindow({ title : "Project Creator", parent : Main.app, width : 750, height : 500, minWidth : 750, minHeight : 500, minimizable : false, backgroundColor : "#383838", show : false, webPreferences : { nodeIntegration : true}});
		Main.creator.loadFile("creator.html");
		Main.creator.setMenu(null);
		Main.creator.webContents.openDevTools();
		Main.creator.on("ready-to-show",function() {
			Main.creator.webContents.zoomFactor = Main.app.webContents.zoomFactor;
			Main.creator.show();
		});
		Main.creator.on("close",function() {
			Main.creator = null;
			Main.app.focus();
		});
	}
	Main.creator.focus();
};
Main.openProject = function() {
	if(Main.creator != null) {
		Main.creator.close();
	}
	if(Main.explorer == null) {
		Main.explorer = new electron_main_BrowserWindow({ title : "Project Explorer", parent : Main.app, width : 750, height : 500, minWidth : 750, minHeight : 500, minimizable : false, backgroundColor : "#383838", show : false, webPreferences : { nodeIntegration : true}});
		Main.explorer.loadFile("explorer.html");
		Main.explorer.setMenu(null);
		Main.explorer.on("ready-to-show",function() {
			Main.explorer.webContents.zoomFactor = Main.app.webContents.zoomFactor;
			Main.explorer.show();
		});
		Main.explorer.on("close",function() {
			Main.explorer = null;
			Main.app.focus();
		});
	}
	Main.explorer.focus();
};
Main.devTools = function() {
	Main.app.webContents.openDevTools();
};
Main.quit = function() {
	electron_main_App.quit();
};
Math.__name__ = true;
var electron_main_App = require("electron").app;
var electron_main_BrowserWindow = require("electron").BrowserWindow;
var electron_main_IpcMain = require("electron").ipcMain;
var electron_main_Menu = require("electron").Menu;
var electron_main_MenuItem = require("electron").MenuItem;
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i1 = 0;
	while(i1 < s.length) {
		var c1 = s.charCodeAt(i1++);
		if(55296 <= c1 && c1 <= 56319) {
			c1 = c1 - 55232 << 10 | s.charCodeAt(i1++) & 1023;
		}
		if(c1 <= 127) {
			a.push(c1);
		} else if(c1 <= 2047) {
			a.push(192 | c1 >> 6);
			a.push(128 | c1 & 63);
		} else if(c1 <= 65535) {
			a.push(224 | c1 >> 12);
			a.push(128 | c1 >> 6 & 63);
			a.push(128 | c1 & 63);
		} else {
			a.push(240 | c1 >> 18);
			a.push(128 | c1 >> 12 & 63);
			a.push(128 | c1 >> 6 & 63);
			a.push(128 | c1 & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__ : true, __constructs__ : ["UTF8","RawNative"]
	,UTF8: {_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"]
	,Blocked: {_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_.__params__ = ["e"],$_)
};
var haxe_io_Output = function() { };
haxe_io_Output.__name__ = true;
haxe_io_Output.prototype = {
	writeByte: function(c) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeString: function(s,encoding) {
		var b = haxe_io_Bytes.ofString(s,encoding);
		this.writeFullBytes(b,0,b.length);
	}
};
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
var js_node_Fs = require("fs");
var js_node_Path = require("path");
var js_node_buffer_Buffer = require("buffer").Buffer;
var sys_FileSystem = function() { };
sys_FileSystem.__name__ = true;
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _ ) {
		var _1 = ((_) instanceof js__$Boot_HaxeError) ? _.val : _;
		return false;
	}
};
sys_FileSystem.createDirectory = function(path) {
	try {
		js_node_Fs.mkdirSync(path);
	} catch( e ) {
		var e1 = ((e) instanceof js__$Boot_HaxeError) ? e.val : e;
		if(e1.code == "ENOENT") {
			sys_FileSystem.createDirectory(js_node_Path.dirname(path));
			js_node_Fs.mkdirSync(path);
		} else {
			var stat;
			try {
				stat = js_node_Fs.statSync(path);
			} catch( _ ) {
				var _1 = ((_) instanceof js__$Boot_HaxeError) ? _.val : _;
				throw e1;
			}
			if(!stat.isDirectory()) {
				throw e1;
			}
		}
	}
};
var sys_io_FileOutput = function(fd) {
	this.fd = fd;
	this.pos = 0;
};
sys_io_FileOutput.__name__ = true;
sys_io_FileOutput.__super__ = haxe_io_Output;
sys_io_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(b) {
		var buf = new js_node_buffer_Buffer(1);
		buf[0] = b;
		js_node_Fs.writeSync(this.fd,buf,0,1,this.pos);
		this.pos++;
	}
	,writeBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var wrote = js_node_Fs.writeSync(this.fd,buf,pos,len,this.pos);
		this.pos += wrote;
		return wrote;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
});
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
Main.main();
})({});
