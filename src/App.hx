import js.Browser.document;
import Resizable.Direction;

class App {
	public static var zoomDelta:Float = 0.0;

	static var mainContainer:Container;

	static function main() {
		Cursor.cursor = document.getElementById("cursor");

		var playButton = document.getElementById("play-button");
		playButton.onclick = function() {
			playButton.classList.add("toolbar-active");
		};
		var pauseButton = document.getElementById("pause-button");
		pauseButton.onclick = function() {
			pauseButton.classList.add("toolbar-selected");
		};
		var stepButton = document.getElementById("step-button");
		stepButton.onclick = function() {};

		var mainContainer = new Container(Direction.Vertical, null, document.getElementById("main-container"));
		mainContainer.addView();
		// var a = mainContainer.addContainer(Direction.Horizontal);
		// mainContainer.addView();
		// var b = a.addContainer(Direction.Vertical);
		// var c = b.addContainer(Direction.Horizontal);
		// c.addView();
		// c.addView();
		// c.addView();
		// b.addView();
		// a.addView();
	}
}
