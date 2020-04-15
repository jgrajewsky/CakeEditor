import js.html.Element;
import electron.renderer.IpcRenderer;
import electron.renderer.Remote;
import js.Browser.window;
import js.Browser.document;
import js.Lib.require;

class Creator {
	private static var name:String = "New Cake Project";
	private static var path:String;
	private static var templateContainer:Element;
	private static var exampleContainer:Element;
	private static var buttons:Array<Element> = new Array<Element>();

	private static function main() {
		window.onload = function() {
			document.onkeydown = function(e) {
				if (e.which == 27) {
					Remote.getCurrentWindow().close();
				}
			};
			document.getElementById("name").oninput = function(e) {
				name = e.target.value;
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
			addTemplate(templateContainer, "2d.png", "2D", "Empty 2D Scene");
			addTemplate(templateContainer, "3d.png", "3D", "Empty 3D Scene");
			addTemplate(exampleContainer, "2d.png", "Example #0", "Example Project #0");
			addTemplate(exampleContainer, "3d.png", "Example #1", "Example Project #1");
			addTemplate(exampleContainer, "3d.png", "Example #2", "Example Project #2");
			addTemplate(exampleContainer, "2d.png", "Example #3", "Example Project #3");
			addTemplate(exampleContainer, "3d.png", "Example #4", "Example Project #4");
			addTemplate(exampleContainer, "3d.png", "Example #5", "Example Project #5");
			addTemplate(exampleContainer, "2d.png", "Example #6", "Example Project #6");
			addTemplate(exampleContainer, "3d.png", "Example #7", "Example Project #7");
			addTemplate(exampleContainer, "3d.png", "Example #8", "Example Project #8");
			addTemplate(exampleContainer, "2d.png", "Example #9", "Example Project #9");
			var location = document.getElementById("location");
			var create = document.getElementById("create");
			function onInput(path:String) {
				Creator.path = path;
				location.setAttribute("value", path);
				if (path.length == 0) {
					create.setAttribute("disabled", "");
				} else {
					create.removeAttribute("disabled");
				}
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
			create.onclick = function sendCreate() {
				IpcRenderer.sendSync("create", {name: name, path: path});
			};
		};
	}

	private static function addTemplate(container:Element, image:String, name:String, title:String) {
		var button = document.createElement("button");
		button.classList.add("template-button");
		button.setAttribute("title", title);
		if (buttons.push(button) == 1) {
			button.classList.add("button-active");
		}
		button.onclick = function() {
			for (template in buttons) {
				template.classList.remove("button-active");
			}
			button.classList.add("button-active");
		};
		container.append(button);
		var icon = document.createElement("img");
		icon.setAttribute("src", image);
		button.appendChild(icon);
		button.innerHTML += name;
	}
}
