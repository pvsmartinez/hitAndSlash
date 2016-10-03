let parent = require('unitController');
cc.Class({
    extends: parent,

    properties: {
      mouseAccuracy: 10,
      targetPosition: {
        default: null,
        visible: false,
      },
      body: {
        default: null,
        type: cc.Node,
      }
    },

    onLoad: function () {
      let self = this;

      cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseMove: function(mouse) {
          const dx = mouse.getLocation().x - self.body.x;
          const dy = mouse.getLocation().y - self.body.y;
          const distance = Math.sqrt(dx*dx + dy*dy);
          self.targetPosition = mouse.getLocation();
          if (distance > self.mouseAccuracy) self.moveDirection = Math.atan2 (dy, dx);
          else self.moveDirection = null;
        }
      }, self.node);

      cc.eventManager.addListener({
          event: cc.EventListener.KEYBOARD,
          onKeyPressed: function(keyCode, event) {
              switch(keyCode) {
                  case cc.KEY.a:
                      self.inputA = true;
                      break;
                  case cc.KEY.s:
                      self.inputS = true;
                      break;
                  case cc.KEY.d:
                      self.inputD = true;
                      break;
              }
          },
          onKeyReleased: function(keyCode, event) {
              switch(keyCode) {
                  case cc.KEY.a:
                      self.inputA = false;
                      break;
                  case cc.KEY.s:
                      self.inputS = false;
                      break;
                  case cc.KEY.d:
                      self.inputD = false;
                      break;
              }
          }
      }, self.node);
    },

    update: function (dt) {
      if (!this.targetPosition) return;
      const dx = this.targetPosition.x - this.body.x;
      const dy = this.targetPosition.y - this.body.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if (distance > this.mouseAccuracy) this.moveDirection = Math.atan2 (dy, dx);
      else this.moveDirection = null;
    },
});
