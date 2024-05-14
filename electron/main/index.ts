import {app, BrowserWindow, shell, ipcMain, Menu, Tray} from 'electron'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import os from 'node:os'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.ts    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

let win: BrowserWindow | null = null
let tray: Tray | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
    win = new BrowserWindow({
        title: 'moon-mars',
        width: 900, // 窗口宽度
        height: 670, // 窗口高度
        show: false, // 初始时不显示窗口
        frame: false, // 设置为 false 以移除窗口的默认边框
        autoHideMenuBar: true, // 自动隐藏菜单栏
        icon: path.join(process.env.VITE_PUBLIC, 'mars.png'),
        webPreferences: {
            preload,
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // nodeIntegration: true,

            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            // contextIsolation: false,
        },
    })
    // 创建系统托盘
    tray = new Tray(path.join(__dirname, '../../build/mars.png'));
    // 托盘名称
    tray.setToolTip('moon-mars');
    // 托盘菜单
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示',
            click: () => {
                win.show()
            }
        },
        {
            label: '退出',
            click: () => {
                win.destroy()
            }
        }
    ]);
    // 载入托盘菜单
    tray.setContextMenu(contextMenu);// 双击触发
    tray.on('double-click', () => {
        // 双击通知区图标实现应用的显示或隐藏
        win.isVisible() ? win.hide() : win.show()
        win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
    });

    // 当窗口准备好显示时
    win.on('ready-to-show', () => {
        // 在窗口准备好显示之后执行其他操作
        // 例如加载数据、设置界面等
        // 最后调用 show() 方法显示窗口
        win.show()
    })

    if (VITE_DEV_SERVER_URL) { // #298
        win.loadURL(VITE_DEV_SERVER_URL)
        // Open devTool if the app is not packaged
        win.webContents.openDevTools()
    } else {
        win.loadFile(indexHtml)
    }

    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return {action: 'deny'}
    })
    // win.webContents.on('will-navigate', (event, url) => { }) #344
}

// app.whenReady().then(createWindow)
// 当 Electron 初始化完成并准备创建浏览器窗口时
app.whenReady().then(() => {
    //拖拽窗口
    ipcMain.handle('drag-window', (event, args) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        if (win) {
            win.setBounds({x: args.appX, y: args.appY, width: args.width, height: args.height})
        }
    })

    // IPC 测试
    ipcMain.on('window', (event, args) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents) // 从webContents获取相应的窗口对象
        switch (args.name) {
            case 'maximize':
                if (win.isMaximized()) {
                    win.restore();
                } else {
                    win.maximize();
                }
                break;
            case 'minimize':
                win.minimize();
                break;
            case 'hide':
                win.hide(); // 隐藏窗口到任务栏
                break;
            case 'close':
                win.close();
                break;
            default:
                break;
        }
        // 发送窗口当前状态给渲染进程
        event.sender.send('window-state-changed', {
            maximized: win.isMaximized(),
            minimized: win.isMinimized(),
        });
    })

    createWindow() // 创建窗口

    // 在 macOS 上，当应用程序处于激活状态但没有窗口打开时，重新创建一个窗口
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    win = null
    if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    if (VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
    } else {
        childWindow.loadFile(indexHtml, {hash: arg})
    }
})
