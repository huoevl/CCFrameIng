

//资源管理

import { Asset, assetManager, AssetManager, Prefab, __private } from "cc";
import { ccf } from "../base/CCF";
import { SingleClass } from "../base/SingleClass";


declare global {
    interface IModuleMap {
        ResMgr?: ResManager;
    }
}
export class ResManager extends SingleClass {
    /** 包体 */
    private _bundle: { [bundleName: string]: AssetManager.Bundle };
    init() {
        let itself = this;
        itself._bundle = {};
    }

    /**
     * 加载包
     * @param url 
     */
    loadBundle(url: string, onComplete?: (data: AssetManager.Bundle) => void) {
        let itself = this;
        let opt = {} as __private._cocos_core_asset_manager_shared__IBundleOptions;
        assetManager.loadBundle(url, opt, (err, data) => {
            if (err) {
                return ccf.Logger.error("加载包失败：", url);
            }
            if (onComplete) {
                onComplete(data);
            }
            itself._bundle[itself.getBundleName(url)] = data;
        })
    }
    /**
     * 获取包
     * @param name 
     * @returns 
     */
    getBundle(name: string) {
        let itself = this;
        return itself._bundle[name];
    }
    /**
     * 获取包名
     * @param url 
     * @returns 
     */
    getBundleName(url: string) {
        let itself = this;
        return url;
    }
    /**
     * 加载远程资源
     * @param url 
     * @param onComplete 
     */
    loadRemote<T extends Asset>(url: string, onComplete: (asset: T) => void) {
        assetManager.loadRemote(url, { cacheEnabled: true }, (err: Error, data: T) => {
            if (err) {
                return ccf.Logger.error("加载远程资源失败：", url);
            }
            if (onComplete) {
                onComplete(data);
            }
        });
    }

    /**
     * 加载预制体
     * @param url 相对路径
     */
    loadPrefab(url: string, onComplete: (prefab: Prefab) => void) {
        let itself = this;
        let bundle = itself.getBundle(url);
        let prefab = bundle.get(url, Prefab);
        if (!prefab) {
            bundle.load(url, Prefab, (err, data) => {
                if (err) {
                    return ccf.Logger.error("加载预制体失败：", url);
                }
                if (onComplete) {
                    onComplete(data);
                }
            })
        } else {
            if (onComplete) {
                onComplete(prefab);
            }
        }
    }

}


