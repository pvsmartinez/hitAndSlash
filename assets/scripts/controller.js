module.exports = {

    setInputControl: function (self) {

        self.inputA = false;
        self.inputS = false;
        self.inputD = false;

        self.moveDirection = null;
        self.diameter = 10;
        self.targetPosition = null;

        cc.eventManager.addListener({
          event: cc.EventListener.MOUSE,
          onMouseMove: function(mouse) {
            const dx = mouse.getLocation().x - self.node.x;
            const dy = mouse.getLocation().y - self.node.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            self.targetPosition = mouse.getLocation();
            if (distance > self.diameter) self.moveDirection = Math.atan2 (dy, dx);
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

    controllerAnalysis: function(self) {
      if (!self.targetPosition) return;
      const dx = self.targetPosition.x - self.node.x;
      const dy = self.targetPosition.y - self.node.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      if (distance > self.diameter) self.moveDirection = Math.atan2 (dy, dx);
      else self.moveDirection = null;
    }
};
