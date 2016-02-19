var AbstractP2Test = (function (_super) {
    __extends(AbstractP2Test, _super);
    function AbstractP2Test() {
        _super.call(this);
        this.factor = 30;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=AbstractP2Test;p=c.prototype;
    p.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    };
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    };
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.onAppReady();
            this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        }
    };
    p.enableMouseDrag = function (world) {
        this.wworld = world;
        this.emptyBody = new p2.Body();
        this.wworld.addBody(this.emptyBody);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    p.onTouch = function (te) {
        var mousePos = new Array(te.stageX / this.factor, te.stageY / this.factor);
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                var hitBodies = this.wworld.hitTest(mousePos, this.wworld.bodies, 1);
                //console.log(hitBodies.length);
                if (hitBodies.length > 0) {
                    //  for (var i: number = 0; i < hitBodies.length; i++) {
                    var body = hitBodies[0];
                    this.emptyBody.position[0] = mousePos[0];
                    this.emptyBody.position[1] = mousePos[1];
                    this.mouseJoint = new p2.RevoluteConstraint(this.emptyBody, body, {
                        worldPivot: mousePos,
                    });
                    this.mouseJoint.collideConnected = false;
                    this.wworld.addConstraint(this.mouseJoint);
                    // }
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                this.wworld.removeConstraint(this.mouseJoint);
                this.mouseJoint = null;
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.emptyBody.position[0] = mousePos[0];
                this.emptyBody.position[1] = mousePos[1];
                break;
        }
    };
    p.onAppReady = function () {
    };
    p.loop = function () {
    };
    return AbstractP2Test;
})(egret.DisplayObjectContainer);
egret.registerClass(AbstractP2Test,"AbstractP2Test");
//# sourceMappingURL=AbstractP2Test.js.map