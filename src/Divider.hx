import js.Browser.document;
import js.Browser.window;
import js.html.Element;
import Resizable.Direction;

class Divider {
	public var element:Element;
	public var connected1:Resizable;
	public var connected2:Resizable;

	private var direction:Direction;

	public function new(connected1:Resizable, connected2:Resizable) {
		this.connected1 = connected1;
		this.connected2 = connected2;
		direction = connected1.direction;
		element = createDivider();
		updatePosition();
	}

	public function updatePosition():Void {
		var rect1 = connected1.element.getBoundingClientRect();
		var rect2 = connected2.element.getBoundingClientRect();
		element.style.left = 'calc(${rect2.x / window.innerWidth * 100.0}%${direction == Direction.Vertical ? "" : " - 6px"})';
		var size = (rect2.y - 30.0) / (window.innerHeight - 30.0) * 100.0;
		element.style.top = 'calc(${size}% + ${30.0 * (1.0 - size / 100.0) - (direction == Direction.Horizontal ? 0.0 : 6.0)}px)';
		if (direction == Direction.Vertical) {
			element.style.width = '${rect1.width / window.innerWidth * 100.0}%';
		} else {
			var size = rect1.height / (window.innerHeight - 30.0) * 100.0;
			element.style.height = 'calc(${size}% - ${30.0 * size / 100.0}px)';
		}
	}

	private function createDivider():Element {
		var divider = document.createElement("div");
		divider.classList.add("divider");
		divider.classList.add(direction == Direction.Vertical ? "divider-horizontal" : "divider-vertical");
		var inside = document.createElement("div");
		divider.appendChild(inside);
		divider.onmousedown = function() {
			Cursor.setCursor('${direction == Direction.Vertical ? "s" : "w"}-resize');
			document.onmousemove = function onMouseMove(event) {
				var rect1 = connected1.element.getBoundingClientRect();
				var rect2 = connected2.element.getBoundingClientRect();
				var both = connected1.size + connected2.size;
				var size = 0.0;
				if (direction == Direction.Vertical) {
					size = (event.clientY - rect1.y) / (rect1.height + rect2.height);
				} else {
					size = (event.clientX - rect1.x) / (rect1.width + rect2.width);
				}
				size *= both;
				var other = both - size;
				var a = (direction == Direction.Vertical ? rect1.height : rect1.width) * size / connected1.size >= connected1.minimumSize(size * both,
					connected1.direction);
				var b = (direction == Direction.Vertical ? rect2.height : rect2.width) * other / connected2.size >= connected2.minimumSize(other,
					connected2.direction);
				if ((a && b) || (a && other > connected2.size) || (b && size > connected1.size)) {
					connected1.setSize(size);
					connected2.setSize(other);
				}
			};
			document.onmouseup = function() {
				Cursor.setCursor("");
				document.body.removeAttribute("style");
				document.onmouseup = document.onmousemove = null;
			};
		}
		connected1.parent.element.insertBefore(divider, connected2.element);
		return divider;
	}
}
