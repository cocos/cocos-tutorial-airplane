
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Constant
 * DateTime = Mon Nov 15 2021 18:26:06 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = Constant.ts
 * FileBasenameNoExtension = Constant
 * URL = db://assets/script/framework/Constant.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

export class Constant{
    public static EnemyType = {
        TYPE1: 1,
        TYPE2: 2,
    };

    public static Combination = {
        PLAN1: 1,
        PLAN2: 2,
        PLAN3: 3,
    };

    public static CollisionType = {
        SELF_PLANE: 1 << 1,
        ENEMY_PLANE: 1 << 2,
        SELF_BULLET: 1 << 3,
        ENEMY_BULLET: 1 << 4,
        BULLET_PROP: 1 << 5,
    };

    public static BulletPropType = {
        BULLET_M: 1,
        BULLET_H: 2,
        BULLET_S: 3,
    }

    public static Direction = {
        LEFT: 1,
        MIDDLE: 2,
        RIGHT: 3,
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
