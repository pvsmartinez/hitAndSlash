module.exports = {

    setupMind: function (self) {
        self.inputA = false;
        self.inputS = false;
        self.inputD = false;

        self.minRange = 80;
        self.maxRange = 90;
        self.rangeAccurace = 5;

        self.turningState = 0;

        self.moveDirection = null;
    },

    mindAnalysis: function (self) {
      let dx = self.node.x - self.arena.x;
      let dy = self.node.y - self.arena.y;
      const selfDist = Math.sqrt(dx*dx + dy*dy);
      dx = self.opponent.x - self.arena.x;
      dy = self.opponent.y - self.arena.y;
      const oppoDist = Math.sqrt(dx*dx + dy*dy);
      dx = self.opponent.x - self.node.x;
      dy = self.opponent.y - self.node.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      const angle = Math.atan2 (dy, dx);

      if (oppoDist >= selfDist) {
        if (distance > self.maxRange) {
          self.moveDirection = angle;
        } else if (distance < self.minRange) {
          self.moveDirection = angle + Math.PI;
        } else {
          self.moveDirection = null;
        }
        self.turningState = 0;
      } else {

        if(self.turningState == 0) self.turningState = Math.random() < 0.5 ? -1 : 1;

        if (distance < self.maxRange) {
          self.moveDirection = angle + Math.PI + -1 * Math.PI/2.0 * self.turningState;
        } else if (distance > self.maxRange + self.minRange) {
          self.moveDirection = angle;
        } else {
          self.moveDirection = angle + Math.PI/2.0 * self.turningState;
        }

      }

    }
};
