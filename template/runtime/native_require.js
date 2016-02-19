
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/physics/physics.js",
	"bin-debug/AbstractP2Test.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/p2DebugDraw.js",
	"bin-debug/section1/SimpleP2APP.js",
	"bin-debug/section1/SimpleP2APPWithDebugDraw.js",
	"bin-debug/section2/TestAsset.js",
	"bin-debug/section2/TestContactMaterial.js",
	"bin-debug/section2/TestShape.js",
	"bin-debug/section4/TestAddShape.js",
	"bin-debug/section4/TestAddShapeBuDaoWeng.js",
	"bin-debug/section4/TestAdjustCenterOfMass.js",
	"bin-debug/section4/TestApplyForce.js",
	"bin-debug/section4/TestApplyImpulse.js",
	"bin-debug/section4/TestEmit.js",
	"bin-debug/section4/TestFromPolygon.js",
	"bin-debug/section4/TestGetAABB.js",
	"bin-debug/section4/TestHitTest.js",
	"bin-debug/section4/TestOverlaps.js",
	"bin-debug/section4/TestRayCast.js",
	"bin-debug/section4/TestSleep.js",
	"bin-debug/section4/TestToWorldFrame.js",
	"bin-debug/section5/DemoOneWayPlatfrom.js",
	"bin-debug/section5/TestContactEquation.js",
	"bin-debug/section5/TestFrictionEquation.js",
	"bin-debug/section6/DemoDistanceConstraint.js",
	"bin-debug/section6/DemoGearConstraint.js",
	"bin-debug/section6/DemoLockConstraint.js",
	"bin-debug/section6/DemoPrismaticConstraint.js",
	"bin-debug/section6/DemoRevoluteConstraint.js",
	"bin-debug/section6/TestDistanceConstraint.js",
	"bin-debug/section6/TestGearConstraint.js",
	"bin-debug/section6/TestLockConstraint.js",
	"bin-debug/section6/TestPrismaticConstraint.js",
	"bin-debug/section6/TestRevoluteConstraint.js",
	"bin-debug/section7/TestLinearSpring.js",
	"bin-debug/section7/TestRotationalSpring.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};