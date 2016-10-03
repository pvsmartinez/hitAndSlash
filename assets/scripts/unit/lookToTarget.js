cc.Class({
    extends: cc.Component,

    properties: {
      target: {
        default: null,
        type: cc.Node,
      }
    },

    update: function (dt) {
      const dx = this.node.x - this.target.x;
      const dy = this.node.y - this.target.y;

      this.node.rotation = - (Math.atan2 (dy, dx) * 180 / Math.PI) - 90;
    },
});
