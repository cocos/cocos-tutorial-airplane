
import { _decorator, Component, Node, systemEvent, SystemEvent, Touch, EventTouch, Vec2 } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIMain
 * DateTime = Mon Nov 15 2021 14:10:01 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = UIMain.ts
 * FileBasenameNoExtension = UIMain
 * URL = db://assets/script/ui/UIMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('UIMain')
export class UIMain extends Component {
    @property
    public planeSpeed = 1;

    @property(Node)
    public playerPlane: Node = null;

    @property(GameManager)
    public gameManager: GameManager = null;

    start () {
        this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(SystemEvent.EventType.TOUCH_END, this._touchEnd, this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    _touchStart(touch: Touch, event: EventTouch){
        this.gameManager.isShooting(true);
    }

    _touchMove(touch: Touch, event: EventTouch){
        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y);
    }

    _touchEnd(touch: Touch, event: EventTouch){
        this.gameManager.isShooting(false);
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
