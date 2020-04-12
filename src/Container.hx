import haxe.ds.Vector;
import js.html.Element;
import js.Browser.document;
import Resizable.Direction;

class Container extends Resizable {
	public var children:Array<Resizable> = new Array();

	private var dividers:Vector<Divider> = new Vector(0);

	public function new(type:Direction, parent:Container, container:Element = null) {
		if (container == null) {
			container = document.createElement("div");
			container.classList.add("container");
			container.classList.add(type == Direction.Vertical ? "container-vertical" : "container-horizontal");
		}
		super(parent, container);
	}

	public function addContainer(type:Direction):Container {
		var container = new Container(type, this);
		addElement(container);
		return container;
	}

	public function addView():View {
		var view = new View(this);
		addElement(view);
		return view;
	}

	public override function minimumSize(size:Float, direction:Direction):Float {
		if (this.direction != direction) {
			var sum = 0.0;
			for (child in children) {
				var childSize = child.minimumSize(size, direction);
				sum += childSize;
			}
			return sum;
		} else {
			var max = 0.0;
			for (child in children) {
				var childSize = child.minimumSize(size, direction);
				if (childSize > max) {
					max = childSize;
				}
			}
			return max;
		}
	}

	private function addElement(element:Resizable):Void {
		this.element.append(element.element);
		children.push(element);
		createDividers();
		var size = 1.0 / children.length * 100.0;
		for (i in 0...children.length) {
			children[i].setSize(size);
		}
	}

	private function createDividers():Void {
		for (divider in dividers) {
			divider.element.remove();
		}
		dividers = new Vector(this.children.length - 1);
		for (i in 0...dividers.length) {
			dividers[i] = new Divider(children[i], children[i + 1]);
		}
	}

	private override function updateDividers():Void {
		for (divider in dividers) {
			divider.updatePosition();
		}
		for (child in children) {
			child.updateDividers();
		}
	}
}
