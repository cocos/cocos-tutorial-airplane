
import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PoolManager
 * DateTime = Fri Nov 26 2021 18:00:45 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = PoolManager.ts
 * FileBasenameNoExtension = PoolManager
 * URL = db://assets/script/framework/PoolManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

interface IDictPool {
    [name: string]: NodePool;
}

interface IDictPrefab {
    [name: string]: Prefab;
}

@ccclass('PoolManager')
export class PoolManager {

    public static instance(){
        if(!this._instance){
            this._instance = new PoolManager();
        }

        return this._instance;
    }

    private _dictPool: IDictPool = {};
    private _dictPrefab: IDictPrefab = {};
    private static _instance: PoolManager;


    public getNode(prefab: Prefab, parent: Node){
        let name = prefab.data.name;
        // console.log('get node   ' + name);
        let node: Node = null;
        this._dictPrefab[name] = prefab;
        const pool = this._dictPool[name];
        if (pool) {
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                node = instantiate(prefab);
            }
        } else {
            this._dictPool[name] = new NodePool();
            node = instantiate(prefab);
        }

        node.parent = parent;
        node.active = true;
        return node;
    }

    public putNode(node: Node){
        let name = node.name;
        // console.log('put node   ' + name);
        node.parent = null;
        if (!this._dictPool[name]) {
            this._dictPool[name] = new NodePool();
        }

        this._dictPool[name].put(node);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
