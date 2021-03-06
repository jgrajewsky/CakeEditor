import electron.Shell;
import sys.io.File;
import electron.main.IpcMain;
import sys.FileSystem;
import electron.main.MenuItem;
import electron.main.Menu;
import electron.main.App;
import electron.main.BrowserWindow;

class Main {
	private static var app:BrowserWindow;
	private static var creator:BrowserWindow;
	private static var explorer:BrowserWindow;

	private static var projectPath:String;

	private static function main() {
		App.on(ready, function(e) {
			app = new BrowserWindow({
				title: "Cake",
				minWidth: 800,
				minHeight: 600,
				backgroundColor: "#191919",
				show: false,
				webPreferences: {
					nodeIntegration: true
				}
			});

			app.loadFile("app.html");

			app.once(ready_to_show, function() {
				Menu.setApplicationMenu(Menu.buildFromTemplate([
					new MenuItem({
						label: "File",
						submenu: [
							new MenuItem({label: "New Project...", accelerator: "Ctrl+N", click: newProject}),
							new MenuItem({label: "Open Project...", accelerator: "Ctrl+O", click: openProject}),
							new MenuItem({type: "separator"}),
							new MenuItem({label: "Exit", click: quit})
						]
					}),
					new MenuItem({
						label: "View",
						submenu: [
							new MenuItem({label: "Zoom In", accelerator: "Ctrl+numadd", click: zoomIn}),
							new MenuItem({label: "Zoom Out", accelerator: "Ctrl+numsub", click: zoomOut}),
							new MenuItem({label: "Reset Zoom", accelerator: "Ctrl+num0", click: resetZoom})
						]
					}),
					new MenuItem({
						label: "Debug",
						submenu: [
							new MenuItem({label: "Developer tools", accelerator: "Ctrl+Shift+J", click: devTools})
						]
					})
				]));

				app.maximize();
				app.show();
			});

			app.on(closed, function() {
				quit();
			});
		});

		IpcMain.on("create", function(e, path, name) {
			projectPath = '${path}\\${name}';
			FileSystem.createDirectory('${projectPath}\\Assets\\Scenes');
			FileSystem.createDirectory('${projectPath}\\Assets\\Scripts');
			FileSystem.createDirectory('${projectPath}\\Builds');
			var ignore = File.write('${projectPath}\\.gitignore');
			ignore.writeString("#Cake internal folder\n/Library/\n\n#Possible build folders\n/[Bb]uild/\n/[Bb]uilds/");
			ignore.close();
			creator.close();
		});

		IpcMain.on("explorerContext", function(e, path, x, y) {
			var template = Menu.buildFromTemplate([
				new MenuItem({
					label: "Show in Explorer",
					click: function() {
						Shell.openItem(path);
					}
				}),
				new MenuItem({
					label: "Remove from list",
					click: function() {
						e.reply("remove", path);
					}
				})
			]);
			template.popup({window: explorer, x: x, y: y});
		});

		IpcMain.on("open", function(e, path) {
			explorer.close();
			projectPath = path;
		});
	}

	private static function zoomIn():Void {
		setZoom(0.1);
	}

	private static function zoomOut():Void {
		setZoom(-0.1);
	}

	private static function setZoom(delta:Float):Void {
		app.webContents.zoomFactor = Math.min(Math.max(app.webContents.zoomFactor + delta, 0.5), 1.5);
	}

	private static function resetZoom():Void {
		app.webContents.zoomFactor = 1.0;
	}

	private static function newProject():Void {
		if (creator == null) {
			creator = new BrowserWindow({
				title: "New Project",
				parent: app,
				modal: true,
				width: 750,
				height: 500,
				minWidth: 750,
				minHeight: 500,
				minimizable: false,
				backgroundColor: "#383838",
				show: false,
				webPreferences: {
					nodeIntegration: true
				}
			});
			creator.loadFile("creator.html");
			creator.removeMenu();

			creator.on(ready_to_show, function() {
				creator.webContents.zoomFactor = app.webContents.zoomFactor;
				creator.show();
				creator.webContents.openDevTools();
			});

			creator.on(close, function() {
				creator = null;
				app.focus();
			});
		}

		creator.focus();
	}

	private static function openProject():Void {
		if (explorer == null) {
			explorer = new BrowserWindow({
				title: "Open Project",
				parent: app,
				modal: true,
				width: 750,
				height: 500,
				minWidth: 750,
				minHeight: 500,
				minimizable: false,
				backgroundColor: "#383838",
				show: false,
				webPreferences: {
					nodeIntegration: true
				}
			});
			explorer.loadFile("explorer.html");
			explorer.removeMenu();

			explorer.on(ready_to_show, function() {
				explorer.webContents.zoomFactor = app.webContents.zoomFactor;
				explorer.show();
				explorer.webContents.openDevTools();
			});

			explorer.on(close, function() {
				explorer = null;
				app.focus();
			});
		}

		explorer.focus();

		// var dirs = Dialog.showOpenDialogSync(app, {title: "Open Project", properties: ["openDirectory"]});
		// if (dirs != null) {
		// 	projectPath = dirs[0];
		// 	var s = projectPath.split("\\");
		// 	projectName = s[s.length - 1];
		// 	app.setTitle('${projectName} - SceneName - BuildTarget - Cake');
		// }
	}

	private static function devTools() {
		app.webContents.openDevTools();
	}

	private static function quit():Void {
		App.quit();
	}
}
