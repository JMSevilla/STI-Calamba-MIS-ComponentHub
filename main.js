const { app, BrowserWindow, Menu } = require('electron')
const url = require('url')
const path = require('path')
const isDev = require('electron-is-dev')
let mainWindow
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Electron',
        width: 1000,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        fullscreen: true
    });
    
    const startUrl = path.join(__dirname, './sti_monitoring_system/build/index.html')
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

const customMenu = Menu.buildFromTemplate([
    {
        label: 'Parent menu',
        submenu: [
            {
                label: 'Menu 1',
                click: () => {
                    
                }
            }
        ]
    }
])

// Menu.setApplicationMenu(customMenu)


app.whenReady().then(createMainWindow)


// const startUrl = url.format({
//     pathname: path.join(__dirname, './sti_monitoring_system/build/index.html'),
//     protocol: 'file'
// })
// mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${startUrl}`)