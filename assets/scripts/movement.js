module.exports = {

    setupMovement: function (self) {
        self.maxSpeed = 0.8;
    },

    moveUnit: function (self) {
      if (!!self.moveDirection) {
        self.node.x += self.maxSpeed * Math.cos(self.moveDirection);
        self.node.y += self.maxSpeed * Math.sin(self.moveDirection);
      }

      const dx = self.node.x - self.opponent.x;
      const dy = self.node.y - self.opponent.y;

      self.node.rotation = - (Math.atan2 (dy, dx) * 180 / Math.PI) - 90;
    }
}
