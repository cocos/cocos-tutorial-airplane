
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Mon Nov 15 2021 14:58:43 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

const OUTOFRANGE = 50;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    public bulletSpeed = 0;

    start () {
        // [3]
    }

    update (deltaTime: number) {
        const pos = this.node.position;
        const moveLength = pos.z - this.bulletSpeed;
        this.node.setPosition(pos.x, pos.y, moveLength);

        if(moveLength > OUTOFRANGE){
            this.node.destroy();
            console.log('bullet destroy');
        }
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
