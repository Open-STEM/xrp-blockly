const { dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const drivelist = require('drivelist');

// Use ipc to receive text to save to a file using system save dialog
global.share.ipcMain.on('save-code', (event, req) => {
	const appState = JSON.parse(fs.readFileSync("./app/state.json"));
	if (appState.fullPath != "") {
	  let filePath = path.join(appState.fullPath, req.filename);
	  fs.writeFileSync(filePath, req.content);
	} else {
	  handleSaveAs(req, appState)
	}
	responseObj = "Saved Code";

	let mainWindow = global.share.getMainWindow();
	mainWindow.webContents.send("fromMain", responseObj);
});
  
global.share.ipcMain.on('saveas-code', (event, req) => {
	const appState = JSON.parse(fs.readFileSync("./app/state.json"));
	req.filename = "";
	handleSaveAs(req, appState);

	responseObj = "Saved Code";

	let mainWindow = global.share.getMainWindow();
	mainWindow.webContents.send("fromMain", responseObj);
});
  
function handleSaveAs(req, appState) {
	const filePath = dialog.showSaveDialogSync({
		title: 'Save As',
		defaultPath: req.filename, // null if saveas req
		filters: [{ name: 'First+', extensions: ['fp'] }]
	});
	if (filePath) {
		updateStateJson(appState, { fullPath: path.dirname(filePath) });
		fs.writeFileSync(filePath, req.content);
	}
}
  
function updateStateJson(appState, slice) {
	for (const [key, value] of Object.entries(slice)) {
		appState[key] = value;
	}
	fs.writeFileSync("./app/state.json", JSON.stringify(appState));
	// TODO: update state in frontend?
}
  
// Upload Code
global.share.ipcMain.on('upload-code', (event, code) => {
	drivelist.list()
		.then(drives => {
			let first_bot = drives.find(x => x.description.includes('Maker Pi RP2040'));
			let first_bot_drive = first_bot.mountpoints[0].path;
			let output_filepath = path.join(first_bot_drive, 'code.py');
			fs.writeFileSync(output_filepath, code);
		});
});
  
// Open File
global.share.ipcMain.on('open-file', (event, code) => {
	const filePath = dialog.showOpenDialogSync({
		title: "Open File",
		properties: ['openFile'],
		// title: 'Open File',
		filters: [{ name: 'First+', extensions: ['fp'] }]
	});

	if (filePath) {
		let inputFile = fs.readFileSync(filePath[0], { encoding: 'utf8' });
		let mainWindow = global.share.getMainWindow();
		mainWindow.webContents.send("opened-file", inputFile);
	}
});