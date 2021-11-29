
import { _decorator, Component, Node, Prefab, instantiate, math, Vec3, BoxCollider, macro, Label, Animation } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { BulletProp } from '../bullet/BulletProp';
import { EnemyPlane } from '../plane/EnemyPlane';
import { SelfPlane } from '../plane/SelfPlane';
import { AudioManager } from './AudioManager';
import { Constant } from './Constant';
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
    @property(SelfPlane)
    public playerPlane: SelfPlane = null;
    // bullet
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

    // enemy
    @property(Prefab)
    public enemy01: Prefab = null;
    @property(Prefab)
    public enemy02: Prefab = null;
    @property
    public createEnemyTime = 1;
    @property
    public enemy1Speed = 0.5;
    @property
    public enemy2Speed = 0.7;

    // prop
    @property(Prefab)
    public bulletPropM: Prefab = null;
    @property(Prefab)
    public bulletPropH: Prefab = null;
    @property(Prefab)
    public bulletPropS: Prefab = null;
    @property
    public bulletPropSpeed = 0.3;

    // ui
    @property(Node)
    public gamePage: Node = null;
    @property(Node)
    public gameOverPage: Node = null;
    @property(Label)
    public gameScore: Label = null;
    @property(Label)
    public gameOverScore: Label = null;
    @property(Animation)
    public overAnim: Animation = null;

    // audio
    @property(AudioManager)
    public audioEffect: AudioManager = null;

    public isGameStart = false;

    private _currShootTime = 0;
    private _isShooting = false;
    private _currCreateEnemyTime = 0;
    private _combinationInterval = Constant.Combination.PLAN1;
    private _bulletType = Constant.BulletPropType.BULLET_M;
    private _score = 0;


    start () {
        this._init();
    }

    update (deltaTime: number) {
        if(!this.isGameStart){
            return;
        }

        if(this.playerPlane.isDie){
            this.gameOver();
            return;
        }

        this._currShootTime += deltaTime;
        if(this._isShooting && this._currShootTime > this.shootTime){
            if (this._bulletType === Constant.BulletPropType.BULLET_H) {
                this.createPlayerBulletH();
            } else if (this._bulletType === Constant.BulletPropType.BULLET_S) {
                this.createPlayerBulletS();
            } else {
                this.createPlayerBulletM();
            }

            const name = 'bullet' + (this._bulletType % 2 + 1);
            this.playAudioEffect(name);
            this._currShootTime = 0;
        }

        this._currCreateEnemyTime += deltaTime;
        if(this._combinationInterval === Constant.Combination.PLAN1){
            if(this._currCreateEnemyTime > this.createEnemyTime){
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }
        } else if(this._combinationInterval === Constant.Combination.PLAN2){
            if(this._currCreateEnemyTime > this.createEnemyTime * 0.9){
                const randomCombination = math.randomRangeInt(1, 3);
                if (randomCombination === Constant.Combination.PLAN2) {
                    this.createCombination1();
                } else {
                    this.createEnemyPlane();
                }

                this._currCreateEnemyTime = 0;
            }
        } else {
            if(this._currCreateEnemyTime > this.createEnemyTime * 0.8){
                const randomCombination = math.randomRangeInt(1, 4);
                if (randomCombination === Constant.Combination.PLAN2) {
                    this.createCombination1();
                } else if (randomCombination === Constant.Combination.PLAN3) {
                    this.createCombination2();
                } else {
                    this.createEnemyPlane();
                }

                this._currCreateEnemyTime = 0;
            }
        }
    }

    public returnMain(){
        this._currShootTime = 0;
        this._currCreateEnemyTime = 0;
        this._combinationInterval = Constant.Combination.PLAN1;
        this._bulletType = Constant.BulletPropType.BULLET_M;
        this.playerPlane.node.setPosition(0, 0, 15);
        this._score = 0;
    }

    public gameStart(){
        this.isGameStart = true;
        this._changePlaneMode();
        this._score = 0;
        this.gameScore.string = this._score.toString();
    }

    public gameReStart(){
        this.isGameStart = true;
        this._currShootTime = 0;
        this._currCreateEnemyTime = 0;
        this._changePlaneMode();
        this._combinationInterval = Constant.Combination.PLAN1;
        this._bulletType = Constant.BulletPropType.BULLET_M;
        this.playerPlane.node.setPosition(0, 0, 15);
        this._score = 0;
    }

    public gameOver(){
        this.isGameStart = false;
        this.gamePage.active = false;
        this.gameOverPage.active = true;
        this.gameOverScore.string = this._score.toString();
        this.overAnim.play();
        this._isShooting = false;
        this.playerPlane.init();
        this.unschedule(this._modeChanged);
        this._destroyAll();
    }

    public addScore(){
        this._score ++;
        this.gameScore.string = this._score.toString();
    }

    public createPlayerBulletM(){
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.node.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);
    }

    public createPlayerBulletH(){
        const pos = this.playerPlane.node.position;
        // left
        const bullet1 = instantiate(this.bullet03);
        bullet1.setParent(this.bulletRoot);
        bullet1.setPosition(pos.x - 2.5, pos.y, pos.z - 7);
        const bulletComp1 = bullet1.getComponent(Bullet);
        bulletComp1.show(this.bulletSpeed, false);

        // right
        const bullet2 = instantiate(this.bullet03);
        bullet2.setParent(this.bulletRoot);
        bullet2.setPosition(pos.x + 2.5, pos.y, pos.z - 7);
        const bulletComp2 = bullet2.getComponent(Bullet);
        bulletComp2.show(this.bulletSpeed, false);
    }

    public createPlayerBulletS(){
        const pos = this.playerPlane.node.position;
        // middle
        const bullet = instantiate(this.bullet05);
        bullet.setParent(this.bulletRoot);
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);

        // left
        const bullet1 = instantiate(this.bullet05);
        bullet1.setParent(this.bulletRoot);
        bullet1.setPosition(pos.x - 4, pos.y, pos.z - 7);
        const bulletComp1 = bullet1.getComponent(Bullet);
        bulletComp1.show(this.bulletSpeed, false, Constant.Direction.LEFT);

        // right
        const bullet2 = instantiate(this.bullet05);
        bullet2.setParent(this.bulletRoot);
        bullet2.setPosition(pos.x + 4, pos.y, pos.z - 7);
        const bulletComp2 = bullet2.getComponent(Bullet);
        bulletComp2.show(this.bulletSpeed, false, Constant.Direction.RIGHT);
    }

    public createEnemyBullet(targetPos: Vec3){
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        bullet.setPosition(targetPos.x, targetPos.y, targetPos.z + 6);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(1, true);

        const colliderComp = bullet.getComponent(BoxCollider);
        colliderComp.setGroup(Constant.CollisionType.ENEMY_BULLET);
        colliderComp.setMask(Constant.CollisionType.SELF_PLANE);
    }

    public createEnemyPlane(){
        const whichEnemy = math.randomRangeInt(1, 3);
        let prefab: Prefab = null;
        let speed = 0;
        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01;
            speed = this.enemy1Speed;
        } else {
            prefab = this.enemy02;
            speed = this.enemy2Speed;
        }

        const enemy = instantiate(prefab);
        enemy.setParent(this.node);
        const enemyComp = enemy.getComponent(EnemyPlane);
        enemyComp.show(this, speed, true);

        const randomPos = math.randomRangeInt(-25, 26);
        enemy.setPosition(randomPos, 0, -50);
    }
    public createCombination1(){
        const enemyArray = new Array<Node>(5);
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy01);
            const element = enemyArray[i];
            element.parent = this.node;
            element.setPosition(-20 + i * 10, 0, -50);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy1Speed, false);
        }
    }

    public createCombination2(){
        const enemyArray = new Array<Node>(7);

        const combinationPos = [
            -21, 0, -60,
            -14, 0, -55,
            -7, 0, -50,
            0, 0, -45,
            7, 0, -50,
            14, 0, -55,
            21, 0, -60,
        ];

        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy02);
            const element = enemyArray[i];
            element.parent = this.node;
            const startIndex = i * 3;
            element.setPosition(combinationPos[startIndex], combinationPos[startIndex + 1], combinationPos[startIndex + 2]);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy2Speed, false);
        }
    }

    public createBulletProp(){
        const randomProp = math.randomRangeInt(1, 4);
        let prefab: Prefab = null;
        if(randomProp === Constant.BulletPropType.BULLET_H){
            prefab = this.bulletPropH;
        } else if(randomProp === Constant.BulletPropType.BULLET_H){
            prefab = this.bulletPropS;
        } else {
            prefab = this.bulletPropM;
        }

        const prop = instantiate(prefab);
        prop.setParent(this.node);
        prop.setPosition(15, 0, -50);
        const propComp = prop.getComponent(BulletProp);
        propComp.show(this, -this.bulletPropSpeed);
    }

    public isShooting(value: boolean){
        this._isShooting = value;
    }

    public changeBulletType(type: number){
        this._bulletType = type;
    }

    public playAudioEffect(name: string){
        this.audioEffect.play(name);
    }

    private _init(){
        this._currShootTime = this.shootTime;
        this.playerPlane.init();
    }

    private _changePlaneMode(){
        this.schedule(this._modeChanged, 10, macro.REPEAT_FOREVER);
    }

    private _modeChanged(){
        this._combinationInterval ++;
        this.createBulletProp();
    }

    private _destroyAll(){
        let children = this.node.children;
        let length = children.length;
        let i = 0;
        for ( i = length - 1; i >= 0 ; i--) {
            const child = children[i];
            child.destroy();
        }

        children = this.bulletRoot.children;
        length = children.length;
        for (i = length - 1; i >= 0 ; i--) {
            const child = children[i];
            child.destroy();
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
