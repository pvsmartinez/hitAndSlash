let movement = require("movement");
let controller = require("controller");
let mind = require("mind");

cc.Class({
    extends: cc.Component,

    properties: {
      color: new cc.Color(255, 255, 255),
      controllable: false,
      opponent: {
        default: null,
        type: cc.Node
      },
      arena: {
        default: null,
        type: cc.Node
      },
      weaponLeftPrefab: {
        default: null,
        type: cc.Prefab
      },
      weaponRightPrefab: {
        default: null,
        type: cc.Prefab
      },
    },

    onLoad: function () {
      movement.setupMovement(this);
      if (this.controllable) controller.setInputControl(this);
      else mind.setupMind(this);

      this.node.color = this.color;

      if (!!this.weaponLeftPrefab) {
        this.weaponLeft = cc.instantiate(this.weaponLeftPrefab).getComponent('weapon');
        this.weaponLeft.node.parent = this.node;
        this.weaponLeft.node.setPosition(0,0);
        this.weaponLeft.side = -1;
        this.weaponLeft.idle();
      }
      if (!!this.weaponRightPrefab) {
        this.weaponRight = cc.instantiate(this.weaponRightPrefab).getComponent('weapon');
        this.weaponRight.node.parent = this.node;
        this.weaponRight.node.setPosition(0,0);
        this.weaponRight.side = 1;
        this.weaponRight.idle();
      }
    },

    update: function (dt) {
      if (!this.controllable) mind.mindAnalysis(this);
      else controller.controllerAnalysis(this);
      movement.moveUnit(this);
      if (!!this.weaponLeft) this.weaponLeft.effect(this.inputA);
      if (!!this.weaponRight) this.weaponRight.effect(this.inputD);
    },
});
