'use strict';
const _0x2313 = [
    'BXbfd',
    'getSelecte',
    'lready!',
    'ector\x20v',
    'fixed\x20cont',
    'ZrTMO',
    'de(',
    'Ldcxt',
    'exports',
    'NlCcS',
    'd.js',
    'i\x20Mode',
    'onfig.json',
    'getData',
    'readFileSy',
    'oPcfH',
    'DCUsU',
    'ch-asset',
    'ready-to-s',
    'v.switchMo',
    'ui-kit:tou',
    'lcHAi',
    'name',
    'setImage',
    'XlqgB',
    'nspector-c',
    'getUserTok',
    'qFaEd',
    'isPortrait',
    'Cocos\x20Insp',
    '&mode=',
    'broadcast',
    'append',
    'removeAllL',
    'zlbZL',
    'ELuow',
    'dspSs',
    '1yjaRsN',
    'zVhEr',
    'Message',
    'has\x20tray\x20a',
    'access_tok',
    'setContext',
    ':focusNode',
    'warn',
    'MUZIh',
    'openDevToo',
    'simpleMode',
    'click',
    'getContent',
    'loadURL',
    'dWKfg',
    'createFrom',
    'ggleSimple',
    '484029CKqaJQ',
    '1723126HwFlad',
    'setting.to',
    'tml',
    '66461UWllWN',
    'iScWC',
    'setContent',
    './package.',
    '?port=',
    'asset',
    'Path',
    'tswKo',
    'aScript',
    'XnYYR',
    'xxYbl',
    'file://',
    'EEMsI',
    '1LKvGmw',
    'size',
    'Mode()',
    'split',
    'json',
    './icon.png',
    'index_low_',
    'mVBlA',
    'webContent',
    'process',
    'server',
    'pLGyg',
    'setting.co',
    'Selection',
    'assign',
    'version',
    'orFjj',
    'unselect',
    'iAZud',
    '../cocos-i',
    'config.jso',
    'then',
    'ECQgn',
    'select',
    'mLlTE',
    'Sec',
    'sZqRN',
    'electron',
    'request',
    'CFIcF',
    'EDeOG',
    'nfigDataFo',
    'hwQlt',
    'executeJav',
    'utf-8',
    'index.html',
    'query-port',
    'isteners',
    'destroy',
    'parse',
    'v?.refresh',
    'join',
    'Toggle\x20Min',
    'ApYcy',
    'disableWeb',
    'Visibility',
    'OpenDevToo',
    'error',
    'HRjWZ',
    'show',
    'Size',
    'Menu',
    'resize',
    'how',
    'path',
    'YcWqz',
    'setMenuBar',
    'FWtEe',
    'existsSync',
    'rMain',
    '1029767ABJyvo',
    '1908582ayWbNJ',
    'node',
    'setMenu',
    'otMOB',
    '1138513sVpeqz',
    '#2e2c29',
    'versions',
    'electron.h',
    'QjUEc',
    'agnjs',
    'closed',
    ':focusAsse',
    'gQmWV',
    '6fsogvM',
    '1349963caOsyB',
    'User',
    'mainPreloa',
    'ent\x20size'
];
const _0x115e19 = _0x5bd0;
(function (_0x47bb2b, _0x38291f) {
    const _0x1f63ec = _0x5bd0;
    while (!![]) {
        try {
            const _0x57d6ec = -parseInt(_0x1f63ec(0x243)) + -parseInt(_0x1f63ec(0x1f5)) + parseInt(_0x1f63ec(0x251)) + parseInt(_0x1f63ec(0x1f9)) * parseInt(_0x1f63ec(0x250)) + parseInt(_0x1f63ec(0x1f6)) + parseInt(_0x1f63ec(0x206)) * -parseInt(_0x1f63ec(0x247)) + -parseInt(_0x1f63ec(0x1e4)) * -parseInt(_0x1f63ec(0x242));
            if (_0x57d6ec === _0x38291f)
                break;
            else
                _0x47bb2b['push'](_0x47bb2b['shift']());
        } catch (_0x3c0e16) {
            _0x47bb2b['push'](_0x47bb2b['shift']());
        }
    }
}(_0x2313, 0x5003 * 0x13 + -0x1a16b5 + 0x22f57e));
const {BrowserWindow, app, remote, ipcMain, Menu, Tray, nativeImage, MenuItem} = require(_0x115e19(0x221)), path = require(_0x115e19(0x23c)), pcs = require(_0x115e19(0x20f)), os = require('os'), folder = '', devTools = ![];
function _0x5bd0(_0x57c188, _0x31655b) {
    _0x57c188 = _0x57c188 - (-0x205 + -0x7 * 0x19e + 0xf1e);
    let _0x3cb131 = _0x2313[_0x57c188];
    return _0x3cb131;
}
let win, tray = null, mode = 0x838 + -0xae6 + -0x62 * -0x7, unloaded = ![];
const PKG_NAME = require(_0x115e19(0x1fc) + _0x115e19(0x20a))[_0x115e19(0x1d5)], PKG_VERSION = require(_0x115e19(0x1fc) + _0x115e19(0x20a))[_0x115e19(0x215)];
let fs = require('fs'), _configPath = path[_0x115e19(0x22f)](__dirname, _0x115e19(0x21a) + 'n'), __parentConfig = path[_0x115e19(0x22f)](__dirname, _0x115e19(0x219) + _0x115e19(0x1d8) + _0x115e19(0x1cb));
function readConfig() {
    const _0x5c7059 = _0x115e19, _0x218f6e = { 'Ldcxt': _0x5c7059(0x228) };
    let _0x15a4d9 = '';
    return fs[_0x5c7059(0x240)](__parentConfig) ? _0x15a4d9 = fs[_0x5c7059(0x1cd) + 'nc'](__parentConfig, { 'encoding': _0x218f6e[_0x5c7059(0x25c)] }) : _0x15a4d9 = fs[_0x5c7059(0x1cd) + 'nc'](_configPath, { 'encoding': _0x218f6e[_0x5c7059(0x25c)] }), JSON[_0x5c7059(0x22d)](_0x15a4d9);
}
let config = readConfig(), disableWebSec = Boolean(config[_0x115e19(0x232) + _0x115e19(0x21f)]), dw = 0x2d9 + -0x25a9 * -0x1 + -0x2882, dh = -0x35b + 0x9 * 0x2fc + -0x1781;
function changeDWH() {
    const _0x51a494 = _0x115e19, _0x50cb4f = {
            'ELuow': function (_0x59e624, _0x2180a9) {
                return _0x59e624 + _0x2180a9;
            }
        };
    dw = config[_0x51a494(0x1ee)] ? config[_0x51a494(0x1db)] ? config[_0x51a494(0x207)][0x75e + -0xc3a + 0x4dc] : config[_0x51a494(0x207)][0x182 * -0xa + -0x114b + 0x2060] : 0x1328 + -0xd01 + 0x29 * -0x11, dh = config[_0x51a494(0x1ee)] ? _0x50cb4f[_0x51a494(0x1e2)](config[_0x51a494(0x1db)] ? config[_0x51a494(0x207)][-0x1 * 0x1357 + -0x368 + 0xd * 0x1c0] : config[_0x51a494(0x207)][-0x149d * -0x1 + 0x8 * 0x13d + -0x1e85], 0xd * -0x193 + -0x2d5 * 0xa + 0x30fc) : -0x236f + -0x10cd * -0x1 + 0x14fa;
}
changeDWH();
let u = null;
module[_0x115e19(0x1c7)] = {
    async 'load'() {
        const _0x9704a4 = _0x115e19;
        ipcMain['on'](PKG_NAME + _0x9704a4(0x1ea), focusNode), ipcMain['on'](PKG_NAME + (_0x9704a4(0x24e) + 't'), focusAsset);
        try {
            u = await Editor[_0x9704a4(0x252)][_0x9704a4(0x1cc)]();
            if (!u[_0x9704a4(0x1e8) + 'en'])
                Object[_0x9704a4(0x214)](u, await Editor[_0x9704a4(0x252)][_0x9704a4(0x1d9) + 'en']());
        } catch (_0x2e8c71) {
        }
    },
    'unload'() {
        const _0x8c81ee = _0x115e19;
        unloaded = !![], ipcMain[_0x8c81ee(0x1e0) + _0x8c81ee(0x22b)](PKG_NAME + _0x8c81ee(0x1ea)), ipcMain[_0x8c81ee(0x1e0) + _0x8c81ee(0x22b)](PKG_NAME + (_0x8c81ee(0x24e) + 't'));
    },
    'methods': {
        'previewMode'() {
            const _0x1cb4f7 = _0x115e19, _0x1e9d1d = {
                    'dspSs': function (_0x212889, _0x320dff) {
                        return _0x212889(_0x320dff);
                    }
                };
            if (unloaded)
                return;
            _0x1e9d1d[_0x1cb4f7(0x1e3)](tryShowWindow, 0x3 * 0x12a + 0x1 * -0xd87 + 0xa09);
        },
        'buildMobileMode'() {
            const _0xc2bc51 = _0x115e19, _0x42b3b5 = {
                    'EDeOG': function (_0x42d981, _0xc6a1be) {
                        return _0x42d981(_0xc6a1be);
                    }
                };
            if (unloaded)
                return;
            _0x42b3b5[_0xc2bc51(0x224)](tryShowWindow, 0x1f10 + 0x580 + -0x248f);
        },
        'buildDesktopMode'() {
            const _0x2e2a3a = _0x115e19, _0x220186 = {
                    'HRjWZ': function (_0x450646, _0x5a0db9) {
                        return _0x450646(_0x5a0db9);
                    }
                };
            if (unloaded)
                return;
            _0x220186[_0x2e2a3a(0x236)](tryShowWindow, 0xc8e * 0x1 + 0x15d7 * -0x1 + 0x94c);
        },
        'openCustomPage'() {
            const _0x46324b = _0x115e19, _0x3ef6e0 = {
                    'sZqRN': function (_0x2eb89f, _0x294a1e) {
                        return _0x2eb89f(_0x294a1e);
                    }
                };
            if (unloaded)
                return;
            _0x3ef6e0[_0x46324b(0x220)](tryShowWindow, -0x18f + 0x2414 + -0x2283);
        },
        'refresh'() {
            const _0x4a95a9 = _0x115e19, _0x1eb4d8 = { 'zlbZL': _0x4a95a9(0x22e) + '()' };
            win?.[_0x4a95a9(0x20e) + 's']?.[_0x4a95a9(0x227) + _0x4a95a9(0x201)](_0x1eb4d8[_0x4a95a9(0x1e1)]);
        }
    }
};
function focusNode(_0x23cc3f, _0x3c0394) {
    const _0x5d9f73 = _0x115e19, _0x22a5bb = { 'iAZud': _0x5d9f73(0x244) };
    let _0xf6728e = Editor[_0x5d9f73(0x213)][_0x5d9f73(0x256) + 'd'](_0x22a5bb[_0x5d9f73(0x218)]);
    Editor[_0x5d9f73(0x213)][_0x5d9f73(0x217)](_0x22a5bb[_0x5d9f73(0x218)], _0xf6728e), Editor[_0x5d9f73(0x213)][_0x5d9f73(0x21d)](_0x22a5bb[_0x5d9f73(0x218)], _0x3c0394);
}
function focusAsset(_0x137eeb, _0x2ba596) {
    const _0x4886cd = _0x115e19, _0x361f48 = {
            'tswKo': _0x4886cd(0x1d3) + _0x4886cd(0x1d0),
            'mVBlA': _0x4886cd(0x1fe)
        };
    Editor[_0x4886cd(0x1e6)][_0x4886cd(0x1de)](_0x361f48[_0x4886cd(0x200)], _0x2ba596);
    let _0x167328 = Editor[_0x4886cd(0x213)][_0x4886cd(0x256) + 'd'](_0x361f48[_0x4886cd(0x20d)]);
    Editor[_0x4886cd(0x213)][_0x4886cd(0x217)](_0x361f48[_0x4886cd(0x20d)], _0x167328), Editor[_0x4886cd(0x213)][_0x4886cd(0x21d)](_0x361f48[_0x4886cd(0x20d)], _0x2ba596);
}
async function showWindow() {
    const _0x2d5eca = _0x115e19, _0x1179a9 = {
            'xxYbl': function (_0x267862) {
                return _0x267862();
            },
            'XnYYR': function (_0x2a75b3, _0x50a2de) {
                return _0x2a75b3 != _0x50a2de;
            },
            'otMOB': function (_0x516718, _0x41c040) {
                return _0x516718 != _0x41c040;
            },
            'DCUsU': _0x2d5eca(0x259) + _0x2d5eca(0x254),
            'NlCcS': _0x2d5eca(0x212) + _0x2d5eca(0x225) + _0x2d5eca(0x241),
            'oPcfH': function (_0x3b610f, _0x14a93f) {
                return _0x3b610f + _0x14a93f;
            },
            'mLlTE': _0x2d5eca(0x1dc) + _0x2d5eca(0x258),
            'agnjs': _0x2d5eca(0x248),
            'gQmWV': _0x2d5eca(0x23a),
            'QjUEc': _0x2d5eca(0x1d1) + _0x2d5eca(0x23b),
            'YcWqz': _0x2d5eca(0x24d),
            'ApYcy': function (_0x2e44a2, _0x26af78) {
                return _0x2e44a2 >= _0x26af78;
            },
            'ZrTMO': _0x2d5eca(0x210),
            'XlqgB': _0x2d5eca(0x22a),
            'BXbfd': function (_0x2d91f9, _0x172524) {
                return _0x2d91f9 + _0x172524;
            },
            'dWKfg': function (_0x41f050, _0x5a74da) {
                return _0x41f050 + _0x5a74da;
            },
            'CFIcF': _0x2d5eca(0x1fd),
            'orFjj': _0x2d5eca(0x1dd)
        };
    if (win) {
        win[_0x2d5eca(0x237)](), win[_0x2d5eca(0x20e) + 's'][_0x2d5eca(0x227) + _0x2d5eca(0x201)](_0x2d5eca(0x1d2) + _0x2d5eca(0x25b) + mode + ')');
        return;
    }
    win = new BrowserWindow({
        'width': dw,
        'height': dh,
        'title': _0x1179a9[_0x2d5eca(0x1ce)](_0x1179a9[_0x2d5eca(0x21e)], PKG_VERSION),
        'backgroundColor': _0x1179a9[_0x2d5eca(0x24c)],
        'autoHideMenuBar': !![],
        'webPreferences': {
            'useContentSize': !![],
            'enablePreferredSizeMode': ![],
            'preferredSizeMode': ![],
            'webviewTag': !![],
            'nodeIntegration': !![],
            'nodeIntegrationInSubFrames': !![],
            'enableRemoteModule': !![],
            'sandbox': ![],
            'devTools': devTools,
            'contextIsolation': ![],
            'webSecurity': !disableWebSec,
            'resizable': !config[_0x2d5eca(0x1ee)],
            'minimizable': !config[_0x2d5eca(0x1ee)],
            'maximizable': !config[_0x2d5eca(0x1ee)],
            'preload': path[_0x2d5eca(0x22f)](__dirname, folder + (_0x2d5eca(0x253) + _0x2d5eca(0x1c9)))
        }
    });
    try {
        win[_0x2d5eca(0x245)](null), win[_0x2d5eca(0x23e) + _0x2d5eca(0x233)](![]), win[_0x2d5eca(0x23e) + _0x2d5eca(0x233)] = win[_0x2d5eca(0x245)] = function (_0x27fc72) {
        };
    } catch (_0x24fb7d) {
    }
    win['on'](_0x1179a9[_0x2d5eca(0x24f)], () => {
        const _0x1ba3cb = _0x2d5eca, _0x5d5be1 = {
                'iScWC': function (_0x2649eb) {
                    const _0x2c15e0 = _0x5bd0;
                    return _0x1179a9[_0x2c15e0(0x203)](_0x2649eb);
                },
                'pLGyg': function (_0x4dd7df, _0x52d42d) {
                    const _0x206cc5 = _0x5bd0;
                    return _0x1179a9[_0x206cc5(0x202)](_0x4dd7df, _0x52d42d);
                },
                'MUZIh': function (_0x2983dd, _0x26995f) {
                    const _0x40753d = _0x5bd0;
                    return _0x1179a9[_0x40753d(0x246)](_0x2983dd, _0x26995f);
                },
                'lcHAi': _0x1179a9[_0x1ba3cb(0x1cf)]
            };
        try {
            win[_0x1ba3cb(0x20e) + 's'][_0x1ba3cb(0x227) + _0x1ba3cb(0x201)](_0x1179a9[_0x1ba3cb(0x1c8)])[_0x1ba3cb(0x21b)](function (_0x5dc92c) {
                const _0x10e505 = _0x1ba3cb;
                if (_0x5dc92c)
                    config = _0x5dc92c;
                _0x5d5be1[_0x10e505(0x1fa)](changeDWH);
                if (config[_0x10e505(0x1ee)] && win[_0x10e505(0x20e) + 's']) {
                    let _0x4957bf = win[_0x10e505(0x1f0) + _0x10e505(0x238)]();
                    (_0x5d5be1[_0x10e505(0x211)](dw, _0x4957bf[-0x1d36 * 0x1 + -0xefb * 0x1 + -0x4e9 * -0x9]), _0x5d5be1[_0x10e505(0x1ec)](dh, _0x4957bf[0x1 * -0x2097 + -0x1 * -0x58f + -0x3 * -0x903])) && (win[_0x10e505(0x1fb) + _0x10e505(0x238)](dw, dh), devTools && console[_0x10e505(0x1eb)](_0x5d5be1[_0x10e505(0x1d4)]));
                }
            });
        } catch (_0x38f8ba) {
            console[_0x1ba3cb(0x235)](_0x38f8ba);
        }
    }), win['on'](_0x1179a9[_0x2d5eca(0x24b)], () => win[_0x2d5eca(0x237)]()), win['on'](_0x1179a9[_0x2d5eca(0x23d)], () => {
        const _0x4b0559 = _0x2d5eca;
        win[_0x4b0559(0x22c)](), win = null;
        if (tray)
            tray[_0x4b0559(0x22c)]();
        tray = null;
    });
    let _0x1f4ff0 = folder + (_0x2d5eca(0x20c) + _0x2d5eca(0x24a) + _0x2d5eca(0x1f8));
    _0x1179a9[_0x2d5eca(0x231)](process[_0x2d5eca(0x249)][_0x2d5eca(0x221)][_0x2d5eca(0x209)]('.')[0x926 * -0x4 + 0x25d5 + -0x13d], 0x423 * -0x3 + -0x602 * 0x3 + 0x1e74) && (_0x1f4ff0 = folder + _0x2d5eca(0x229));
    let _0x2db2c2 = await Editor[_0x2d5eca(0x1e6)][_0x2d5eca(0x222)](_0x1179a9[_0x2d5eca(0x25a)], _0x1179a9[_0x2d5eca(0x1d7)]), _0x32ee23 = path[_0x2d5eca(0x22f)](__dirname, _0x1179a9[_0x2d5eca(0x1ce)](_0x1179a9[_0x2d5eca(0x255)](_0x1179a9[_0x2d5eca(0x1f2)](_0x1179a9[_0x2d5eca(0x1f2)](_0x1f4ff0, _0x1179a9[_0x2d5eca(0x223)]), _0x2db2c2), _0x1179a9[_0x2d5eca(0x216)]), mode));
    if (u) {
        let {
                cocos_uid: _0x2c7512,
                nickname: _0x51924d,
                access_token: _0x24ff52
            } = u, _0x104077 = {
                'cocos_uid': _0x2c7512,
                'nickname': _0x51924d,
                'access_token': _0x24ff52
            };
        for (let _0x29be86 in _0x104077) {
            _0x32ee23 += '&' + _0x29be86 + '=' + _0x104077[_0x29be86];
        }
    }
    win[_0x2d5eca(0x1f1)](_0x2d5eca(0x204) + _0x32ee23);
}
function tryShowWindow(_0xdd80a5) {
    const _0x5df1ec = _0x115e19, _0x30cd53 = {
            'qFaEd': _0x5df1ec(0x20b),
            'EEMsI': _0x5df1ec(0x1ef),
            'ECQgn': _0x5df1ec(0x230) + _0x5df1ec(0x1ca),
            'hwQlt': _0x5df1ec(0x234) + 'ls',
            'FWtEe': _0x5df1ec(0x1e7) + _0x5df1ec(0x257),
            'zVhEr': function (_0x4401c7) {
                return _0x4401c7();
            }
        };
    try {
        let _0x5577ce = nativeImage[_0x5df1ec(0x1f3) + _0x5df1ec(0x1ff)](path[_0x5df1ec(0x22f)](__dirname, _0x30cd53[_0x5df1ec(0x1da)]));
        _0x5577ce = _0x5577ce[_0x5df1ec(0x23a)]({
            'width': 0x10,
            'height': 0x10
        });
        tray && tray[_0x5df1ec(0x1d6)](_0x5577ce);
        if (!tray) {
            tray = new Tray(_0x5577ce), tray['on'](_0x30cd53[_0x5df1ec(0x205)], function () {
                const _0x5cfdd1 = _0x5df1ec;
                win[_0x5cfdd1(0x237)]();
            });
            let _0x568230 = new Menu();
            _0x568230[_0x5df1ec(0x1df)](new MenuItem({
                'label': _0x30cd53[_0x5df1ec(0x21c)],
                'click': function () {
                    const _0x16ebbe = _0x5df1ec;
                    win && win[_0x16ebbe(0x20e) + 's'][_0x16ebbe(0x227) + _0x16ebbe(0x201)](_0x16ebbe(0x1f7) + _0x16ebbe(0x1f4) + _0x16ebbe(0x208));
                }
            })), devTools && _0x568230[_0x5df1ec(0x1df)](new MenuItem({
                'label': _0x30cd53[_0x5df1ec(0x226)],
                'click': function () {
                    const _0x39407a = _0x5df1ec;
                    win && win[_0x39407a(0x20e) + 's'][_0x39407a(0x1ed) + 'ls']();
                }
            })), tray[_0x5df1ec(0x1e9) + _0x5df1ec(0x239)](_0x568230);
        } else {
            if (devTools)
                console[_0x5df1ec(0x1eb)](_0x30cd53[_0x5df1ec(0x23f)]);
        }
    } catch (_0x21b7de) {
        if (devTools)
            console[_0x5df1ec(0x235)](_0x21b7de);
    }
    mode = _0xdd80a5;
    try {
        _0x30cd53[_0x5df1ec(0x1e5)](showWindow);
    } catch (_0x7ff5e4) {
        console[_0x5df1ec(0x235)](_0x7ff5e4);
    }
}