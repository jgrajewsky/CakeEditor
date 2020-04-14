import electron.renderer.IpcRenderer;
import electron.renderer.Remote;
import js.Browser.document;

class Explorer {
	private static function main() {
        var open = document.getElementById("open");
		document.getElementById("cancel").onclick = function() {
			Remote.getCurrentWindow().close();
		};
		open.onclick = function sendCreate() {
			// IpcRenderer.sendSync("create", {name: name, path: path});
		};
	}
}
