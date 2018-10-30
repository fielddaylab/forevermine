var DOUBLETIME = 0;
var gg = {params:jsonFromURL()};
var Game = function(init)
{
  var default_init =
  {
    width:640,
    height:320,
    container:"stage_container"
  }

  var self = this;
  doMapInitDefaults(init,init,default_init);

  var stage = new Stage({width:init.width,height:init.height,container:init.container});
  self.scenes = [
    new NullScene(self, stage),
    new LoadingScene(self, stage),
    new GamePlayScene(self, stage),
  ];
  self.cur_scene     =  0;
  self.old_cur_scene = -1;

  self.resize = function(args)
  {
    document.getElementById(init.container).removeChild(stage.canv.canvas);
    if(args.stage) stage = args.stage;
    else stage = new Stage({width:args.width,height:args.height,container:init.container});
    for(var i = 0; i < self.scenes.length; i++)
      self.scenes[i].resize(stage);
  }

  var flip;
  var flop;
  self.begin = function()
  {
    self.nextScene();
    flip = Date.now();
    tick();
  };

  var tick = function()
  {
    requestAnimFrame(tick,stage.canv.canvas);
    self.scenes[self.cur_scene].tick();
    var slow = false;
    flop = Date.now();
    slow = flop-flip > 25;
    flip = flop;
    if(self.old_cur_scene == self.cur_scene && (DOUBLETIME || slow))
    {
      self.scenes[self.cur_scene].tick();
      if(DOUBLETIME)
      {
        self.scenes[self.cur_scene].tick();
      }
    }
    if(self.old_cur_scene == self.cur_scene) //still in same scene- draw
    {
      stage.clear();
      self.scenes[self.cur_scene].draw();
    }
    self.old_cur_scene = self.cur_scene;
  };

  self.nextScene = function()
  {
    self.setScene(self.cur_scene+1);
  };

  self.setScene = function(i)
  {
    self.scenes[self.cur_scene].cleanup();
    self.cur_scene = i;
    self.scenes[self.cur_scene].ready();
  }
};

