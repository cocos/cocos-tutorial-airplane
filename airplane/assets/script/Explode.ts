
import { _decorator, Component, Node } from 'cc';
import { PoolManager } from './framework/PoolManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Explode
 * DateTime = Sun Dec 05 2021 17:42:54 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = Explode.ts
 * FileBasenameNoExtension = Explode
 * URL = db://assets/script/Explode.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Explode')
export class Explode extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    onEnable () {
        this.scheduleOnce(this._putBack, 1);
    }

    private _putBack(){
        PoolManager.instance().putNode(this.node);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
