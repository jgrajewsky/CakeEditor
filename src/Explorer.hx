import electron.renderer.IpcRenderer;
import electron.renderer.Remote;
import js.html.Element;
import js.Browser.document;

class Explorer {
	private static var selectedPath:String;
	private static var projectContainer:Element;
	private static var buttons:Array<Element> = new Array<Element>();

	private static function main() {
		document.onkeydown = function(e) {
			if (e.which == 27) {
				Remote.getCurrentWindow().close();
			}
		};
		projectContainer = document.getElementById("projects");
		addProject("C:\\Projects\\TestFPS");
		addProject("C:\\Projects\\GunRun");
		addProject("C:\\Projects\\DickSplash");
		addProject("C:\\Projects\\MMORPG");
		var open = document.getElementById("open");
		document.getElementById("cancel").onclick = function() {
			Remote.getCurrentWindow().close();
		};
		open.onclick = function sendCreate() {
			IpcRenderer.sendSync("open", selectedPath);
		};
	}

	private static function addProject(path:String) {
		var button = document.createElement("button");
		buttons.push(button);
		button.classList.add("project");
		button.onclick = function() {
			selectedPath = path;
			button.classList.add("button-active");
			document.getElementById("open").removeAttribute("disabled");
		};
		var name = document.createElement("div");
		name.classList.add("name");
		var split = path.split("\\");
		name.innerHTML = '<b>${split[split.length - 1]}</b><br>${path}';
		var version = document.createElement("div");
		version.classList.add("version");
		version.innerHTML = "1.0.0";
		var platform = document.createElement("div");
		platform.classList.add("platform");
		platform.innerHTML = "Desktop";
		var date = document.createElement("div");
		date.classList.add("date");
		date.innerHTML = "2 hours ago";
		var options = document.createElement("div");
		options.classList.add("options");
		button.oncontextmenu = options.onclick = function(e) {
			IpcRenderer.send("explorerContext", path);
		};
		button.append(name);
		button.append(version);
		button.append(platform);
		button.append(date);
		button.append(options);
		projectContainer.append(button);
	}
}
