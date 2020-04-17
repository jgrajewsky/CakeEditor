import electron.renderer.IpcRenderer;
import electron.renderer.Remote;
import js.html.Element;
import js.Browser.document;
import js.Lib.require;

class Explorer {
	private static var selectedPath:String;
	private static var projectContainer:Element;
	private static var openButton:Element;
	private static var buttons:Array<Element> = new Array<Element>();

	private static function main() {
		document.onkeydown = function(e) {
			if (e.which == 27) {
				Remote.getCurrentWindow().close();
			}
		};
		document.getElementById("add").onclick = function() {
			var path = require("electron").remote.dialog.showOpenDialogSync(Remote.getCurrentWindow(), {
				title: "Select Project Folder",
				properties: ["openDirectory"]
			});
		};
		projectContainer = document.getElementById("projects");
		addProject("C:\\Projects\\TestFPS");
		addProject("C:\\Projects\\GunRun");
		addProject("C:\\Projects\\aaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbb");
		addProject("C:\\Projects\\MMORPG");
		openButton = document.getElementById("open");
		document.getElementById("cancel").onclick = function() {
			Remote.getCurrentWindow().close();
		};
		openButton.onclick = function sendCreate() {
			IpcRenderer.sendSync("open", selectedPath);
		};
	}

	private static function addProject(path:String) {
		var button = document.createElement("button");
		buttons.push(button);
		button.classList.add("project");
		button.onmousedown = function(e) {
			e.preventDefault();
		};
		button.onclick = function() {
			selectedPath = path;
			for (project in buttons) {
				project.classList.remove("button-active");
			}
			button.classList.add("button-active");
			openButton.removeAttribute("disabled");
		};
		var name = document.createElement("div");
		name.classList.add("name");
		var split = path.split("\\");
		name.innerHTML = '<b>${split[split.length - 1]}</b><br>${path}<br>Cake Version: 1.0.0';
		var platform = document.createElement("div");
		platform.classList.add("platform");
		platform.innerHTML = "Desktop";
		var date = document.createElement("div");
		date.classList.add("date");
		date.innerHTML = "2 hours ago";
		var options = document.createElement("div");
		options.classList.add("options");
		options.setAttribute("tabindex", "0");
		options.onkeypress = function(e) {
			if (e.which == 13) {
				options.click();
			}
		}
		button.oncontextmenu = function(e) {
			IpcRenderer.send("explorerContext", path);
		};
		options.onclick = function(e) {
			var rect = options.getBoundingClientRect();
			IpcRenderer.send("explorerContext", path, Math.round(rect.x + 12.5), Math.round(rect.y + 12.5));
			e.stopPropagation();
		};
		button.append(name);
		button.append(platform);
		button.append(date);
		button.append(options);
		projectContainer.append(button);
	}
}
