'use strict'

const builder = require('electron-builder')
const Platform = builder.Platform
const fs = require('fs-extra')
const path = require('path')
const cp = require('child_process')

// Let's get that intellisense working
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const options = {
    protocols: {
        name: 'qsofrproject',
        // Don't forget to set `MimeType: "x-scheme-handler/deeplink"` for `linux.desktop` entry!
        schemes: ['deeplink'],
    },
    appId: 'com.qiusoft.projects',
    productName: '项目助手',
    electronVersion: '24.2.0',

    // "store” | “normal” | "maximum". - For testing builds, use 'store' to reduce build time significantly.
    compression: 'normal',
    removePackageScripts: true,

    afterSign: async (context) => {
        // Mac releases require hardening+notarization: https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution
        // if (!isDebug && context.electronPlatformName === 'darwin') {
        //     await notarizeMac(context)
        // }
    },
    // force arch build if using electron-rebuild
    beforeBuild: async (context) => {
        // const { appDir, electronVersion, arch } = context
        // await electronRebuild.rebuild({ buildPath: appDir, electronVersion, arch })
        return false
    },
    nodeGypRebuild: false,
    buildDependenciesFromSource: false,

    directories: {
        output: 'dist/artifacts/local',
        buildResources: 'installer/resources',
    },
    files: ['./*', './distjs/**', './distpage/**'],
    extraFiles: [
        // {
        //     from: 'build/Release',
        //     to: nodeAddonDir,
        //     filter: '*.node',
        // },
    ],

    win: {
        target: 'nsis',
        icon: 'public/icon/icon.ico',
        publisherName: '秋无衣',
    },
    nsis: {
        deleteAppDataOnUninstall: true,
    },

    mac: {
        target: 'dmg',
        icon: 'public/icon/ico.icns',
        hardenedRuntime: true,
        gatekeeperAssess: true,
        extendInfo: {
            NSAppleEventsUsageDescription: 'Let me use Apple Events.',
            NSCameraUsageDescription: 'Let me use the camera.',
            NSScreenCaptureDescription: 'Let me take screenshots.',
        },
    },
    dmg: {
        // background: 'installer/mac/dmg-background.png',
        icon: 'public/icon/ico.icns',
        iconSize: 100,
        contents: [
            {
                x: 255,
                y: 85,
                type: 'file',
            },
            {
                x: 253,
                y: 325,
                type: 'link',
                path: '/Applications',
            },
        ],
        window: {
            width: 500,
            height: 500,
        },
    },

    linux: {
        desktop: {
            StartupNotify: 'false',
            Encoding: 'UTF-8',
            MimeType: 'x-scheme-handler/deeplink',
        },
        target: ['AppImage', 'rpm', 'deb'],
    },
    deb: {
        priority: 'optional',
        afterInstall: 'installer/linux/after-install.tpl',
    },
    rpm: {
        fpm: ['--before-install', 'installer/linux/before-install.tpl'],
        afterInstall: 'installer/linux/after-install.tpl',
    },
}

// Promise is returned
builder
    .build({
        targets: Platform.MAC.createTarget(),
        config: options,
    })
    .then((result) => {
        console.log(JSON.stringify(result))
        // fs.emptyDirSync(path.join(__dirname, '..', 'distjs'))
        // fs.emptyDirSync(path.join(__dirname, '..', 'distpage'))
        // fs.rmdirSync(path.join(__dirname, '..', 'distjs'))
        // fs.rmdirSync(path.join(__dirname, '..', 'distpage'))
        cp.execSync('open .', {
            cwd: path.join(__dirname, '..', 'dist', 'artifacts', 'local'),
        })
    })
    .catch((error) => {
        console.error(error)
    })
