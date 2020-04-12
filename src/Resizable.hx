import js.html.Element;

class Resizable {
	public var parent:Container;
	public var element:Element;
	public var size:Float = 100.0;
	public var direction:Direction;

	public function new(parent:Container, element:Element) {
		this.parent = parent;
		this.element = element;
		direction = parent == null || parent.element.classList.contains("container-vertical") ? Direction.Vertical : Direction.Horizontal;
	}

	public function setSize(size:Float):Void {
		this.size = size;
		if (direction == Direction.Vertical) {
			element.style.height = size + "%";
		} else {
			element.style.width = size + "%";
		}
		parent.updateDividers();
	}

	public function minimumSize(size:Float, direction:Direction):Float {
		return 100.0;
	}

	private function updateDividers():Void {}
}

enum Direction {
	Vertical;
	Horizontal;
}
