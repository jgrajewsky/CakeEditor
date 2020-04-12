import js.Browser.document;
import js.html.Element;

class View extends Resizable {
	private static var draggedTab:Element;

	private var tabContainer:Element;
	private var windowContainer:Element;
	private var tabs:Array<Element> = new Array();
	private var activeTab:Int = 0;

	public function new(parent:Container) {
		var view = document.createElement("div");
		view.classList.add("view");
		tabContainer = document.createElement("div");
		tabContainer.classList.add("tabs");
		tabContainer.onwheel = function(e) {
			tabContainer.scrollLeft += e.deltaY;
		}
		view.appendChild(tabContainer);
		windowContainer = document.createElement("div");
		windowContainer.classList.add("windows");
		view.appendChild(windowContainer);
		super(parent, view);
		updateActive();
	}

	private function addTab(image:String, name:String):Void {
		var tab = document.createElement("div");
		tab.classList.add("tab");
		tabContainer.appendChild(tab);
		tabs.push(tab);
		var drop = document.createElement("div");
		drop.classList.add("tab-drag-drop");
		drop.setAttribute("draggable", "true");
		drop.onmousedown = function() {
			activeTab = tabs.indexOf(tab);
			tabContainer.scroll(tab.offsetLeft, 0.0);
			updateActive();
		}
		drop.ondragstart = function(e) {
			draggedTab = drop;
		}
		drop.ondragenter = function(e) {
			if (drop != draggedTab) {
				tab.style.backgroundColor = "red";
			}
		}
		drop.ondragover = function(e) {
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
		}
		drop.ondragleave = function(e) {
			tab.style.backgroundColor = "";
		}
		drop.ondrop = function(e) {
			tab.style.backgroundColor = "";
		}
		tab.appendChild(drop);
		var icon = document.createElement("img");
		icon.setAttribute("src", image);
		tab.appendChild(icon);
		var label = document.createElement("span");
		label.innerText = name;
		label.classList.add("tab-label");
		tab.appendChild(label);
	}

	private function updateActive() {
		for (i in 0...tabs.length) {
			if (i == activeTab) {
				tabs[i].classList.add("tab-active");
				tabs[i].classList.add("tab-focus");
			} else {
				tabs[i].classList.remove("tab-active");
				tabs[i].classList.remove("tab-focus");
			}
		}
	}
}
