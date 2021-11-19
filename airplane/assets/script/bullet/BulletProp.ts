
import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletProp
 * DateTime = Thu Nov 18 2021 19:53:50 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = BulletProp.ts
 * FileBasenameNoExtension = BulletProp
 * URL = db://assets/script/bullet/BulletProp.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('BulletProp')
export class BulletProp extends Component {
    private _propSpeed = 0.3;
    private _propXSpeed = 0.3;
    private _gameManager: GameManager = null;

    onEnable () {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable () {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    update (deltaTime: number) {
        let pos = this.node.position;
        if (pos.x >= 15) {
            this._propXSpeed = this._propSpeed;
        } else if (pos.x <= -15) {
            this._propXSpeed = -this._propSpeed;
        }

        this.node.setPosition(pos.x + this._propXSpeed, pos.y, pos.z - this._propSpeed);
        pos = this.node.position;
        if(pos.z > 50){
            this.node.destroy();
        }
    }

    show(gameManager: GameManager, speed: number){
        this._gameManager = gameManager;
        this._propSpeed = speed;
    }

    private _onTriggerEnter(event: ITriggerEvent){
        const name = event.selfCollider.node.name;
        if(name === 'bulletH'){
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_H);
        } else if (name === 'bulletS') {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_S);
        } else {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_M);
        }

        this.node.destroy();
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
