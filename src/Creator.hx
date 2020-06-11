import sys.FileSystem;
import js.html.Element;
import electron.renderer.IpcRenderer;
import electron.renderer.Remote;
import js.Browser.document;
import js.Lib.require;

class Creator {
	private static var name:String = "New Cake Project";
	private static var path:String;
	private static var template:Int = -1;
	private static var templateContainer:Element;
	private static var exampleContainer:Element;
	private static var createButton:Element;
	private static var buttons:Array<Element> = new Array<Element>();

	private static function main() {
		document.onkeydown = function(e) {
			if (e.which == 27) {
				Remote.getCurrentWindow().close();
			}
		};
		document.getElementById("name").oninput = function(e) {
			name = e.target.value;
			updateCreate();
		};
		templateContainer = document.getElementById("templates");
		exampleContainer = document.getElementById("examples");
		function toggleCollapse(container:Element) {
			var collapsed = container.style.maxHeight == "0px";
			container.style.maxHeight = collapsed ? "" : "0px";
			var arrow = container.previousElementSibling.firstElementChild;
			arrow.setAttribute("src", collapsed ? "arrow_down.svg" : "arrow_right.svg");
		};
		var templateCollapse = templateContainer.previousElementSibling;
		templateCollapse.onclick = function() {
			toggleCollapse(templateContainer);
		};
		templateCollapse.onkeypress = function(e) {
			if (e.which == 13) {
				templateCollapse.click();
			}
		};
		var exampleCollapse = exampleContainer.previousElementSibling;
		exampleCollapse.onclick = function() {
			toggleCollapse(exampleContainer);
		};
		exampleCollapse.onkeypress = function(e) {
			if (e.which == 13) {
				exampleCollapse.click();
			}
		};
		addTemplate(templateContainer, "grid.svg", "2D", "Empty 2D Scene");
		addTemplate(templateContainer, "landscape.svg", "3D", "Empty 3D Scene");
		addTemplate(exampleContainer, "category.svg", "Example #0", "Example Project #0");
		addTemplate(exampleContainer, "category.svg", "Example #1", "Example Project #1");
		addTemplate(exampleContainer, "category.svg", "Example #2", "Example Project #2");
		addTemplate(exampleContainer, "category.svg", "Example #3", "Example Project #3");
		addTemplate(exampleContainer, "category.svg", "Example #4", "Example Project #4");
		addTemplate(exampleContainer, "category.svg", "Example #5", "Example Project #5");
		addTemplate(exampleContainer, "category.svg", "Example #6", "Example Project #6");
		addTemplate(exampleContainer, "category.svg", "Example #7", "Example Project #7");
		addTemplate(exampleContainer, "category.svg", "Example #8", "Example Project #8");
		addTemplate(exampleContainer, "category.svg", "Example #9", "Example Project #9");
		var location = document.getElementById("location");
		createButton = document.getElementById("create");
		function onInput(path:String) {
			Creator.path = path;
			location.setAttribute("value", path);
			updateCreate();
		};
		onInput("C:\\Projects");
		location.oninput = function(e) {
			onInput(e.target.value);
		};
		var locationIcon = document.getElementById("location-icon");
		locationIcon.onclick = function() {
			var path = require("electron").remote.dialog.showOpenDialogSync(Remote.getCurrentWindow(), {
				title: "Choose Project Location",
				defaultPath: location.getAttribute("value"),
				properties: ["openDirectory"]
			});
			if (path != null) {
				onInput(path);
			}
		};
		locationIcon.onkeypress = function(e) {
			if (e.which == 13) {
				locationIcon.click();
			}
		}
		document.getElementById("cancel").onclick = function() {
			Remote.getCurrentWindow().close();
		};
		createButton.onclick = function sendCreate() {
			if (updateCreate()) {
				IpcRenderer.sendSync("create", path, name);
			}
		};
	}

	private static function addTemplate(container:Element, image:String, name:String, title:String) {
		var button = document.createElement("button");
		button.classList.add("template-button");
		button.setAttribute("title", title);
		button.onmousedown = function(e) {
			e.preventDefault();
		};
		var index = buttons.push(button) - 1;
		button.onclick = function() {
			template = index;
			for (template in buttons) {
				template.classList.remove("button-active");
			}
			button.classList.add("button-active");
			updateCreate();
		};
		container.append(button);
		var icon = document.createElement("img");
		icon.setAttribute("src", image);
		button.appendChild(icon);
		button.innerHTML += name;
	}

	private static function updateCreate():Bool {
		if (template == -1 || name.length == 0 || path.length == 0 || FileSystem.exists('${path}\\${name}')) {
			createButton.setAttribute("disabled", "");
			return false;
		} else {
			createButton.removeAttribute("disabled");
			return true;
		}
	}
}
