// Generated by Haxe 4.0.5
(function ($global) { "use strict";
var Creator = function() { };
Creator.main = function() {
	window.onload = function() {
		window.document.onkeyup = function(e) {
			if(e.key == "Escape") {
				electron_renderer_Remote.getCurrentWindow().close();
			}
		};
		window.document.getElementById("name").oninput = function(e1) {
			Creator.$name = e1.target.value;
		};
		Creator.templateContainer = window.document.getElementById("templates");
		Creator.exampleContainer = window.document.getElementById("examples");
		var toggleCollapse = function(container) {
			var collapsed = container.style.maxHeight == "0px";
			container.style.maxHeight = collapsed ? "" : "0px";
			var arrow = container.previousElementSibling.firstElementChild;
			arrow.setAttribute("src",collapsed ? "arrow_down.svg" : "arrow_right.svg");
		};
		Creator.templateContainer.previousElementSibling.onclick = function() {
			toggleCollapse(Creator.templateContainer);
		};
		Creator.exampleContainer.previousElementSibling.onclick = function() {
			toggleCollapse(Creator.exampleContainer);
		};
		Creator.addTemplate(Creator.templateContainer,"2d.png","2D","Empty 2D Scene");
		Creator.addTemplate(Creator.templateContainer,"3d.png","3D","Empty 3D Scene");
		Creator.addTemplate(Creator.exampleContainer,"2d.png","Example #0","Example Project #0");
		Creator.addTemplate(Creator.exampleContainer,"3d.png","Example #1","Example Project #1");
		Creator.addTemplate(Creator.exampleContainer,"3d.png","Example #2","Example Project #2");
		Creator.addTemplate(Creator.exampleContainer,"2d.png","Example #3","Example Project #3");
		Creator.addTemplate(Creator.exampleContainer,"3d.png","Example #4","Example Project #4");
		Creator.addTemplate(Creator.exampleContainer,"3d.png","Example #5","Example Project #5");
		Creator.addTemplate(Creator.exampleContainer,"2d.png","Example #6","Example Project #6");
		Creator.addTemplate(Creator.exampleContainer,"3d.png","Example #7","Example Project #7");
		Creator.addTemplate(Creator.exampleContainer,"3d.png","Example #8","Example Project #8");
		Creator.addTemplate(Creator.exampleContainer,"2d.png","Example #9","Example Project #9");
		var location = window.document.getElementById("location");
		var create = window.document.getElementById("create");
		var onInput = function(path) {
			Creator.path = path;
			location.setAttribute("value",path);
			if(path.length == 0) {
				create.setAttribute("disabled","");
			} else {
				create.removeAttribute("disabled");
			}
		};
		onInput("C:\\Projects");
		location.oninput = function(e2) {
			onInput(e2.target.value);
		};
		window.document.getElementById("location-icon").onclick = function() {
			var path1 = location.getAttribute("value");
			var path2 = require("electron").remote.dialog.showOpenDialogSync(null,{ title : "Choose Project Location", defaultPath : path1, properties : ["openDirectory"]});
			if(path2 != null) {
				onInput(path2);
			}
		};
		window.document.getElementById("cancel").onclick = function() {
			electron_renderer_Remote.getCurrentWindow().close();
		};
		var sendCreate = function() {
			electron_renderer_IpcRenderer.sendSync("create",{ name : Creator.$name, path : Creator.path});
		};
		create.onclick = sendCreate;
	};
};
Creator.addTemplate = function(container,image,name,title) {
	var button = window.document.createElement("button");
	button.classList.add("template-button");
	button.setAttribute("title",title);
	if(Creator.buttons.push(button) == 1) {
		button.classList.add("button-active");
	}
	button.onclick = function() {
		var _g = 0;
		var _g1 = Creator.buttons;
		while(_g < _g1.length) {
			var template = _g1[_g];
			++_g;
			template.classList.remove("button-active");
		}
		button.classList.add("button-active");
	};
	container.append(button);
	var icon = window.document.createElement("img");
	icon.setAttribute("src",image);
	button.appendChild(icon);
	button.innerHTML += name;
};
var electron_renderer_IpcRenderer = require("electron").ipcRenderer;
var electron_renderer_Remote = require("electron").remote;
Creator.$name = "New Cake Project";
Creator.buttons = [];
Creator.main();
})({});