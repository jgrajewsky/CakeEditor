import js.html.Element;

class Cursor {
	public static var cursor:Element;

	public static function setCursor(cursor:String) {
		Cursor.cursor.style.cursor = cursor;
		Cursor.cursor.style.pointerEvents = cursor.length == 0 ? "none" : "all";
	}
}
