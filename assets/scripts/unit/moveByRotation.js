cc.Class({
    extends: cc.Component,

    properties: {
      speed: 100,
      controller: {
        default: null,
        type: require('unitController'),
      }
    },

    update: function (dt) {
      if (!!this.controller.moveDirection) {
        this.node.x += dt * this.speed * Math.cos(this.controller.moveDirection);
        this.node.y += dt * this.speed * Math.sin(this.controller.moveDirection);
      }
    },
});
