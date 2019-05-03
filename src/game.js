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

  self.stage = new Stage({width:init.width,height:init.height,container:init.container});
  self.scenes = [
    new NullScene(self, self.stage),
    new LoadingScene(self, self.stage),
    new GamePlayScene(self, self.stage),
  ];
  self.cur_scene     =  0;
  self.old_cur_scene = -1;

  self.resize = function(args)
  {
    document.getElementById(init.container).removeChild(self.stage.canv.canvas);
    if(args.stage) self.stage = args.stage;
    else self.stage = new Stage({width:args.width,height:args.height,container:init.container});
    for(var i = 0; i < self.scenes.length; i++)
      self.scenes[i].resize(self.stage);
  }

  var flip;
  var flop;
  self.begin = function()
  {
    self.nextScene();
    flip = Date.now();
    tick();
  };

  self.already_ticked = 0;
  var tick = function()
  {
    requestAnimFrame(tick,self.stage.canv.canvas);
    if(!self.already_ticked)
      self.dotick();
    self.already_ticked = 0;
  };

  self.dotick = function()
  {
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
      self.stage.clear();
      self.scenes[self.cur_scene].draw();
    }
    self.old_cur_scene = self.cur_scene;
  }

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

