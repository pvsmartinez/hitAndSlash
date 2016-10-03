let parent = require('unitController');
cc.Class({
    extends: parent,

    properties: {
      rangeAccuracy: 10,
      targetPosition: {
        default: null,
        visible: false,
      },
      body: {
        default: null,
        type: cc.Node,
      },
      arena: {
        default: null,
        type: cc.Node,
      },
      target: {
        default: null,
        type: cc.Node,
      },
      minRange: {
        default: 80,
        tooltip: 'closest distance unit will want to be from target'
      },
      maxRange: {
        default: 90,
        tooltip: 'fartest distance unit will want to be from target'
      },
      turningState: {
        default: 0,
        visible: false,
      }
    },

    onLoad: function () {

    },

    update: function (dt) {
      let dx = this.body.x - this.arena.x;
      let dy = this.body.y - this.arena.y;
      const selfDist = Math.sqrt(dx*dx + dy*dy);
      dx = this.target.x - this.arena.x;
      dy = this.target.y - this.arena.y;
      const oppoDist = Math.sqrt(dx*dx + dy*dy);
      dx = this.target.x - this.body.x;
      dy = this.target.y - this.body.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      const angle = Math.atan2 (dy, dx);

      if (oppoDist >= selfDist) {
        if (distance > this.maxRange) {
          this.moveDirection = angle;
        } else if (distance < this.minRange) {
          this.moveDirection = angle + Math.PI;
        } else {
          this.moveDirection = null;
        }
        this.turningState = 0;
      } else {

        if(this.turningState == 0) this.turningState = Math.random() < 0.5 ? -1 : 1;

        if (distance < this.maxRange) {
          this.moveDirection = angle + Math.PI + -1 * Math.PI/2.0 * this.turningState;
        } else if (distance > this.maxRange + this.minRange) {
          this.moveDirection = angle;
        } else {
          this.moveDirection = angle + Math.PI/2.0 * this.turningState;
        }

      }
    },
});
