const weapons = require('weaponList').weapons;
const actionKind = require('weaponList').actionKind;

cc.Class({
    extends: cc.Component,

    properties: {
      side: {
        default: 1,
        visible: false,
      },
      kind: {
        default: 1,
        tooltip: "weapon kind. 0 = shield, 1 = sword"
      }
    },

    onLoad: function() {
      this.doingAction = false;
      switch (this.kind) {
        case 0:
          this.weapon = weapons.shield;
          break;
        case 1:
          this.weapon = weapons.sword;
          break;
        default:
          this.weapon = weapons.sword;
      }
      this.node.rotation = this.side * this.weapon.idlePosition;
    },

    effect: function (trigger) {
      switch (this.weapon.actionKind) {
        case actionKind.once:
          if(this.doingAction || !trigger) return;
          this.doingAction = true;
          const endAction = function () { this.doingAction = false; };
          const action = cc.sequence(this.weapon.startEffect(this),
                                        this.weapon.doEffect(this),
                                   this.weapon.releaseEffect(this),
                                      cc.callFunc(endAction, this));
          this.node.runAction(action);
          break;
        case actionKind.continuous:
          if(trigger) {
            if(this.doingAction || this.doingAction == null) return;
            this.doingAction = true;
            const action = cc.sequence(this.weapon.startEffect(this));
            this.node.runAction(action);
          } else {
            if(!this.doingAction || this.doingAction == null) return;
            this.doingAction = null;
            const endAction = function () { this.doingAction = false; };
            const action = cc.sequence(this.weapon.releaseEffect(this),
                                          cc.callFunc(endAction, this));
            this.node.runAction(action);
          }
          break;
      }
    },
});
