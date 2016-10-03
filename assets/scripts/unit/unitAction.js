cc.Class({
    extends: cc.Component,

    properties: {
        leftWeapon: {
          default: null,
          type: cc.Node,
        },
        rightWeapon: {
          default: null,
          type: cc.Node,
        },
        controller: {
          default: null,
          type: require('unitController'),
        },
    },

    // use this for initialization
    onLoad: function () {
      if(!!this.leftWeapon) {
        this.leftWeaponEffect = this.leftWeapon.getComponent('weaponEffect');
        this.leftWeaponEffect.side = -1;
      }
      if(!!this.rightWeapon) {
        this.rightWeaponEffect = this.rightWeapon.getComponent('weaponEffect');
        this.rightWeaponEffect.side = 1;
      }
    },

    update: function (dt) {
      if(!!this.leftWeaponEffect) this.leftWeaponEffect.effect(this.controller.inputA);
      if(!!this.rightWeaponEffect) this.rightWeaponEffect.effect(this.controller.inputD);
    },
});
