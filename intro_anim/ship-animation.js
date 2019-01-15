(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"ship_animation_atlas_", frames: [[0,0,2048,1320]]},
		{name:"ship_animation_atlas_2", frames: [[0,0,2048,1320]]},
		{name:"ship_animation_atlas_3", frames: [[0,0,2048,1320]]},
		{name:"ship_animation_atlas_4", frames: [[0,0,2048,1315]]},
		{name:"ship_animation_atlas_5", frames: [[0,922,1049,1003],[0,0,1198,920]]},
		{name:"ship_animation_atlas_6", frames: [[1084,919,581,97],[1458,0,29,45],[0,919,1082,128],[0,0,1107,917],[1109,0,347,97]]}
];


// symbols:



(lib.abandoned = function() {
	this.initialize(ss["ship_animation_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.ARcircle = function() {
	this.initialize(ss["ship_animation_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedTexturedBitmap_2 = function() {
	this.initialize(ss["ship_animation_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.door = function() {
	this.initialize(ss["ship_animation_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.helmetpngcopy2 = function() {
	this.initialize(ss["ship_animation_atlas_"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.MiningFacility = function() {
	this.initialize(ss["ship_animation_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.planetsurface = function() {
	this.initialize(ss["ship_animation_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.smokeleft = function() {
	this.initialize(ss["ship_animation_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.smokeright = function() {
	this.initialize(ss["ship_animation_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.spaceship = function() {
	this.initialize(ss["ship_animation_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.status = function() {
	this.initialize(ss["ship_animation_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.helmetpngcopy2();
	this.instance.parent = this;
	this.instance.setTransform(-1057.35,-660,1.0326,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1057.3,-660,2114.7,1320);


(lib.Tween9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.helmetpngcopy2();
	this.instance.parent = this;
	this.instance.setTransform(-1057.35,-660,1.0326,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1057.3,-660,2114.7,1320);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.smokeright();
	this.instance.parent = this;
	this.instance.setTransform(-619.35,-226.6,0.8732,0.8732,-17.4224);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-619.3,-539.8,1238.6999999999998,1079.6999999999998);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedTexturedBitmap_2();
	this.instance.parent = this;
	this.instance.setTransform(-17.85,-399.85,0.3521,0.3521);

	this.instance_1 = new lib.smokeleft();
	this.instance_1.parent = this;
	this.instance_1.setTransform(1.4,-614.35,0.8547,0.8547,50.4929);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-603.3,-614.3,1206.6999999999998,1228.6999999999998);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.door();
	this.instance.parent = this;
	this.instance.setTransform(-1024,-657.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1024,-657.5,2048,1315);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.door();
	this.instance.parent = this;
	this.instance.setTransform(-1024,-657.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1024,-657.5,2048,1315);


(lib.Symbol_16_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.abandoned();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.4469,0.4469);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_16_Layer_1, null, null);


(lib.Symbol_15_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.status();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.4755,0.4755);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_15_Layer_1, null, null);


(lib.Symbol_14_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.MiningFacility();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.4953,0.4953);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_14_Layer_1, null, null);


(lib.Symbol_13_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.MiningFacility();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.4953,0.4953);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_13_Layer_1, null, null);


(lib.Symbol_11_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ARcircle();
	this.instance.parent = this;
	this.instance.setTransform(0,291.4,0.4541,0.4541,-37.7109);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_11_Layer_1, null, null);


(lib.Symbol_9_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.spaceship();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_9_Layer_1, null, null);


(lib.Symbol_7_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.planetsurface();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_7_Layer_1, null, null);


(lib.Symbol16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_16_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(129.8,21.7,1,1,0,0,0,129.8,21.7);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol16, new cjs.Rectangle(0,0,259.7,43.4), null);


(lib.Symbol15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_15_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(82.5,23.1,1,1,0,0,0,82.5,23.1);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol15, new cjs.Rectangle(0,0,165,46.1), null);


(lib.Symbol14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_14_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(267.9,31.7,1,1,0,0,0,267.9,31.7);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol14, new cjs.Rectangle(0,0,536,63.4), null);


(lib.Symbol13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_13_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(267.9,31.7,1,1,0,0,0,267.9,31.7);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol13, new cjs.Rectangle(0,0,536,63.4), null);


(lib.Symbol11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_11_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(327.7,325.9,1,1,0,0,0,327.7,325.9);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(0,0,655.5,651.8), null);


(lib.Symbol9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_9_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(1024,660,1,1,0,0,0,1024,660);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol9, new cjs.Rectangle(0,0,2048,1320), null);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_7_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(1024,660,1,1,0,0,0,1024,660);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(0,0,2048,1320), null);


(lib.Symbol_10_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol7();
	this.instance.parent = this;
	this.instance.setTransform(1024,660,1,1,0,0,0,1024,660);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_10_Layer_1, null, null);


(lib.Symbol_2_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween3("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(587.35,598.05,0.9735,0.9735);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_2_Layer_1, null, null);


(lib.Symbol_1_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween5("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(619.35,539.85);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol_1_Layer_1, null, null);


(lib.Scene_1_ship = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ship
	this.instance = new lib.spaceship();
	this.instance.parent = this;

	this.instance_1 = new lib.Symbol9();
	this.instance_1.parent = this;
	this.instance_1.setTransform(1024,660,1,1,0,0,0,1024,660);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},60).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},83).to({state:[{t:this.instance_1}]},160).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(61).to({_off:false},0).to({regX:1023.9,regY:659.9,scaleX:2.8618,scaleY:2.8618,x:1023.7,y:318.4},83,cjs.Ease.quartIn).wait(161));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hud_status = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// hud_status
	this.instance = new lib.Symbol15();
	this.instance.parent = this;
	this.instance.setTransform(991.5,641.1,1,1,0,0,0,82.5,23.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(233).to({_off:false},0).to({alpha:1},4,cjs.Ease.quintOut).wait(68));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hud_mining = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// hud_mining
	this.instance = new lib.Symbol13();
	this.instance.parent = this;
	this.instance.setTransform(1179.9,612.7,1,1,0,0,0,267.9,31.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.instance_1 = new lib.Symbol14();
	this.instance_1.parent = this;
	this.instance_1.setTransform(1179.9,584.7,1,1,0,0,0,267.9,31.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},204).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},62).to({state:[{t:this.instance_1}]},33).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(204).to({_off:false},0).to({_off:true,y:584.7,alpha:1},5,cjs.Ease.quintOut).wait(96));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hud_circle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// hud_circle
	this.instance = new lib.Symbol11();
	this.instance.parent = this;
	this.instance.setTransform(1735.15,578.75,1,1,0,0,0,327.7,325.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(175).to({_off:false},0).to({regX:327.9,scaleX:1.1856,scaleY:1.1856,rotation:37.4768,x:1735.35,y:578.85,alpha:1},8,cjs.Ease.quintOut).wait(122));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hud_abandoned = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// hud_abandoned
	this.instance = new lib.Symbol16();
	this.instance.parent = this;
	this.instance.setTransform(1203.8,641.7,1,1,0,0,0,129.8,21.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(258).to({_off:false},0).to({alpha:1},21,cjs.Ease.quintInOut).wait(26));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_helmet = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// helmet
	this.instance = new lib.Tween9("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(1025.35,661);

	this.instance_1 = new lib.Tween10("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(1025.35,661);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},19).to({state:[{t:this.instance_1}]},74).to({state:[{t:this.instance_1}]},211).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},19).to({_off:true},74).wait(212));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_door = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// door
	this.instance = new lib.Tween1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(1024,660.35);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(1024,1717.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:1717.5},25,cjs.Ease.quintInOut).wait(280));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},25,cjs.Ease.quintInOut).wait(55).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(63).to({startPosition:0},0).wait(160).to({startPosition:0},0).wait(1));

}).prototype = p = new cjs.MovieClip();


(lib.Symbol10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_10_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(1024,660,1,1,0,0,0,1024,660);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol10, new cjs.Rectangle(0,0,2048,1320), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_2_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(587.4,598.1,1,1,0,0,0,587.4,598.1);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,1174.7,1196.1), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.Symbol_1_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(619.4,539.9,1,1,0,0,0,619.4,539.9);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,1238.7,1079.8), null);


(lib.Scene_1_smoke_right = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// smoke_right
	this.instance = new lib.Symbol1();
	this.instance.parent = this;
	this.instance.setTransform(1185.05,1570.4,1,1,0,0,0,619.4,539.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({_off:false},0).to({scaleX:1.3175,scaleY:1.3175,x:1305.65,y:1482.8,alpha:1},2).to({regX:619.5,regY:540,scaleX:1.4565,scaleY:1.4565,rotation:-7.4598,x:1305.7,y:1482.9,alpha:0},43).wait(243));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_smoke_left = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// smoke_left
	this.instance = new lib.Symbol2();
	this.instance.parent = this;
	this.instance.setTransform(797.3,1593.7,1,1,0,0,0,587.4,598.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({_off:false},0).to({scaleX:1.3298,scaleY:1.3298,x:673.5,y:1501.15,alpha:1},2).to({scaleX:1.4587,scaleY:1.4587,rotation:6.9592,x:673.65,y:1501.2,alpha:0},43).wait(243));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_planet = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// planet
	this.instance = new lib.Symbol10();
	this.instance.parent = this;
	this.instance.setTransform(1024.15,699.65,1.076,1.076,0,0,0,1024,659.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:674.5},85).to({y:622},63).wait(1).to({regY:660,y:622.1},0).wait(155).to({regY:659.9,y:622},0).wait(1));

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.shipanimation = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.getNumChildren() - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_304 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(304).call(this.frame_304).wait(1));

	// hud_mining_obj_
	this.hud_mining = new lib.Scene_1_hud_mining();
	this.hud_mining.name = "hud_mining";
	this.hud_mining.parent = this;
	this.hud_mining.depth = 0;
	this.hud_mining.isAttachedToCamera = 0
	this.hud_mining.isAttachedToMask = 0
	this.hud_mining.layerDepth = 0
	this.hud_mining.layerIndex = 0
	this.hud_mining.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hud_mining).wait(305));

	// hud_status_obj_
	this.hud_status = new lib.Scene_1_hud_status();
	this.hud_status.name = "hud_status";
	this.hud_status.parent = this;
	this.hud_status.depth = 0;
	this.hud_status.isAttachedToCamera = 0
	this.hud_status.isAttachedToMask = 0
	this.hud_status.layerDepth = 0
	this.hud_status.layerIndex = 1
	this.hud_status.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hud_status).wait(305));

	// hud_abandoned_obj_
	this.hud_abandoned = new lib.Scene_1_hud_abandoned();
	this.hud_abandoned.name = "hud_abandoned";
	this.hud_abandoned.parent = this;
	this.hud_abandoned.depth = 0;
	this.hud_abandoned.isAttachedToCamera = 0
	this.hud_abandoned.isAttachedToMask = 0
	this.hud_abandoned.layerDepth = 0
	this.hud_abandoned.layerIndex = 2
	this.hud_abandoned.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hud_abandoned).wait(305));

	// hud_circle_obj_
	this.hud_circle = new lib.Scene_1_hud_circle();
	this.hud_circle.name = "hud_circle";
	this.hud_circle.parent = this;
	this.hud_circle.depth = 0;
	this.hud_circle.isAttachedToCamera = 0
	this.hud_circle.isAttachedToMask = 0
	this.hud_circle.layerDepth = 0
	this.hud_circle.layerIndex = 3
	this.hud_circle.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hud_circle).wait(305));

	// helmet_obj_
	this.helmet = new lib.Scene_1_helmet();
	this.helmet.name = "helmet";
	this.helmet.parent = this;
	this.helmet.setTransform(1025.3,661,1,1,0,0,0,1025.3,661);
	this.helmet.depth = 0;
	this.helmet.isAttachedToCamera = 0
	this.helmet.isAttachedToMask = 0
	this.helmet.layerDepth = 0
	this.helmet.layerIndex = 4
	this.helmet.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.helmet).wait(305));

	// smoke_right_obj_
	this.smoke_right = new lib.Scene_1_smoke_right();
	this.smoke_right.name = "smoke_right";
	this.smoke_right.parent = this;
	this.smoke_right.depth = 0;
	this.smoke_right.isAttachedToCamera = 0
	this.smoke_right.isAttachedToMask = 0
	this.smoke_right.layerDepth = 0
	this.smoke_right.layerIndex = 5
	this.smoke_right.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.smoke_right).wait(305));

	// smoke_left_obj_
	this.smoke_left = new lib.Scene_1_smoke_left();
	this.smoke_left.name = "smoke_left";
	this.smoke_left.parent = this;
	this.smoke_left.depth = 0;
	this.smoke_left.isAttachedToCamera = 0
	this.smoke_left.isAttachedToMask = 0
	this.smoke_left.layerDepth = 0
	this.smoke_left.layerIndex = 6
	this.smoke_left.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.smoke_left).wait(305));

	// ship_obj_
	this.ship = new lib.Scene_1_ship();
	this.ship.name = "ship";
	this.ship.parent = this;
	this.ship.setTransform(1024,660,1,1,0,0,0,1024,660);
	this.ship.depth = 0;
	this.ship.isAttachedToCamera = 0
	this.ship.isAttachedToMask = 0
	this.ship.layerDepth = 0
	this.ship.layerIndex = 7
	this.ship.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ship).wait(305));

	// door_obj_
	this.door = new lib.Scene_1_door();
	this.door.name = "door";
	this.door.parent = this;
	this.door.setTransform(1024,660.4,1,1,0,0,0,1024,660.4);
	this.door.depth = 0;
	this.door.isAttachedToCamera = 0
	this.door.isAttachedToMask = 0
	this.door.layerDepth = 0
	this.door.layerIndex = 8
	this.door.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.door).wait(305));

	// planet_obj_
	this.planet = new lib.Scene_1_planet();
	this.planet.name = "planet";
	this.planet.parent = this;
	this.planet.setTransform(1024.2,699.8,1,1,0,0,0,1024.2,699.8);
	this.planet.depth = 0;
	this.planet.isAttachedToCamera = 0
	this.planet.isAttachedToMask = 0
	this.planet.layerDepth = 0
	this.planet.layerIndex = 9
	this.planet.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.planet).wait(149).to({regY:660.9,y:660.9},0).wait(155).to({regY:699.8,y:699.8},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-882.5,-910.1,4837,3381);
// library properties:
lib.properties = {
	id: '2950D5E6532242268B583097D2F4B736',
	width: 2048,
	height: 1320,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/ship_animation_atlas_.png", id:"ship_animation_atlas_"},
		{src:"images/ship_animation_atlas_2.png", id:"ship_animation_atlas_2"},
		{src:"images/ship_animation_atlas_3.png", id:"ship_animation_atlas_3"},
		{src:"images/ship_animation_atlas_4.png", id:"ship_animation_atlas_4"},
		{src:"images/ship_animation_atlas_5.png", id:"ship_animation_atlas_5"},
		{src:"images/ship_animation_atlas_6.png", id:"ship_animation_atlas_6"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['2950D5E6532242268B583097D2F4B736'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


// Layer depth API : 

AdobeAn.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;