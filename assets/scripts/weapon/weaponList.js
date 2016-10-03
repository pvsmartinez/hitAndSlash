const utils = require('utils');

const actionKind = utils.enum({
  continuous: 0,
  once: 1
});

const weapons = utils.enum({
  shield: {
    actionKind: actionKind.continuous,
    idlePosition: 30,
    startEffect: function(self){return cc.rotateBy(0.05, -45*self.side, -45*self.side);},
    doEffect: null,
    releaseEffect: function(self){return cc.rotateBy(0.05, 45*self.side, 45*self.side);},
  },
  sword: {
    actionKind: actionKind.once,
    idlePosition: 45,
    startEffect: function(self){return cc.rotateBy(0.05, 45*self.side, 45*self.side).easing(cc.easeOut(3));},
    doEffect: function(self){return cc.rotateBy(0.25, -150*self.side, -150*self.side).easing(cc.easeOut(3));},
    releaseEffect: function(self){return cc.rotateBy(0.4, 105*self.side, 105*self.side).easing(cc.easeIn(3));},
  },
});

module.exports = {
  weapons : weapons,
  actionKind : actionKind
};
