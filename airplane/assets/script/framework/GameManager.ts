
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Bullet } from '../bullet/Bullet';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Mon Nov 15 2021 16:15:32 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/script/framework/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;
    @property(Prefab)
    public bullet01: Prefab = null;
    @property(Prefab)
    public bullet02: Prefab = null;
    @property(Prefab)
    public bullet03: Prefab = null;
    @property(Prefab)
    public bullet04: Prefab = null;
    @property(Prefab)
    public bullet05: Prefab = null;
    @property
    public shootTime = 0.3;
    @property
    public bulletSpeed = 1;

    @property(Node)
    public bulletRoot: Node = null;

    private _currShootTime = 0;
    private _isShooting = false;

    start () {
        this._init();
    }

    update (deltaTime: number) {
        this._currShootTime += deltaTime;
        if(this._isShooting && this._currShootTime > this.shootTime){
            this.createPlayerBullet();
            this._currShootTime = 0;
        }
    }

    public createPlayerBullet(){
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;
    }

    public isShooting(value: boolean){
        this._isShooting = value;
    }

    private _init(){
        this._currShootTime = this.shootTime;
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
