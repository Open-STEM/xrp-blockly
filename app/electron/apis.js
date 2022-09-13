const { dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const drivelist = require('drivelist');

/* List of all APIS */
global.share.ipcMain.handle('save-code', handleSaveCode);
global.share.ipcMain.handle('saveas-code', handleSaveAsCode);
global.share.ipcMain.handle('upload-code', handleUploadCode);
global.share.ipcMain.handle('open-file', handleOpenFile);


// Saves text to code.fp in default folder
// If no default folder set, asks user for what
// to save file as, and then sets the default folder
async function handleSaveCode(event, req) {
	const appState = JSON.parse(fs.readFileSync("./app/state.json"));
	if (appState.fullPath != "") {
	  let filePath = path.join(appState.fullPath, req.filename);
	  fs.writeFileSync(filePath, req.content);
		return {
			status: 200,
			payload: path.basename(filePath, path.extname(filePath)),
			message: "Code saved"
		};
	} else {
		let result = saveAsReq(req, appState)
		if (result === -1) {
			return {
				status: 500,
				message: "File not selected"
			};
		} else {
			return {
				status: 200,
				payload: result,
				message: "Code saved"
			};
		}
	}
}

// Shows saveas dialog
// Sets the default folder if not set already
async function handleSaveAsCode(event, req) {
	const appState = JSON.parse(fs.readFileSync("./app/state.json"));
	let result = saveAsReq(req, appState);

	if (result === -1) {
		return {
			status: 500,
			message: "File not selected"
		};
	} else {
		return {
			status: 200,
			payload: result,
			message: "Code saved"
		};
	}
};

// Uploads Code to robot
async function handleUploadCode (event, code) {
	try {
		let drives = await drivelist.list();
	
		let first_bot = drives.find(x => x.description.includes('Maker Pi RP2040'));
		let first_bot_drive = first_bot.mountpoints[0].path;
		let output_filepath = path.join(first_bot_drive, 'code.py');
		fs.writeFileSync(output_filepath, code);
		
		return {
			status: 201,
			message: "Code Uploaded"
		};
	} catch (e) {
		return {
			status: 500,
			message: `Internal Error: ${e}`
		};
	}
};

// Opens File
async function handleOpenFile(event, req) {
	const filePath = dialog.showOpenDialogSync({
		title: "Open File",
		properties: ['openFile'],
		// title: 'Open File',
		filters: [{ name: 'First+', extensions: ['fp'] }]
	});

	if (filePath) {
		let inputFile = fs.readFileSync(filePath[0], { encoding: 'utf8' });
		
		return {
			status: 200,
			payload: {
				fileName: path.basename(filePath[0], path.extname(filePath[0])),
				fileContent: inputFile,
			},
			message: "File opened"
		};
	} else {
		return {
			status: 500,
			message: "File not selected"
		}
	}
};

// Helper function for save / saveas functionality
function saveAsReq(req, appState) {
	const filePath = dialog.showSaveDialogSync({
		title: 'Save As',
		defaultPath: req.filename, // null if saveas req
		filters: [{ name: 'First+', extensions: ['fp'] }]
	});
	if (filePath) {
		updateStateJson(appState, { fullPath: path.dirname(filePath) });
		fs.writeFileSync(filePath, req.content);

		return path.basename(filePath, path.extname(filePath));
	} else {
		return -1;
	}
}

// Helper function for updating the internal
// appstate
function updateStateJson(appState, slice) {
	for (const [key, value] of Object.entries(slice)) {
		appState[key] = value;
	}
	fs.writeFileSync("./app/state.json", JSON.stringify(appState));
	// TODO: update state in frontend?
}