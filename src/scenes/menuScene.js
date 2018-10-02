var MenuScene = function(game, stage)
{
  var self = this;

  self.resize = function(s)
  {
    stage = s;
    gg.stage = stage;
    gg.canv = gg.stage.canv;
    gg.canvas = gg.canv.canvas;
    gg.ctx = gg.canv.context;

    if(keyer)   keyer.detach();   keyer   = new Keyer({source:gg.canvas});
    if(hoverer) hoverer.detach(); hoverer = new PersistentHoverer({source:gg.canvas});
    if(clicker) clicker.detach(); clicker = new Clicker({source:gg.canvas});
  }

  var keyer;
  var hoverer;
  var clicker;

  var start_btn;

  self.ready = function()
  {
    self.resize(stage);

    start_btn = new ButtonBox(10,10,100,100,function(evt){game.nextScene();})
  };

  self.tick = function()
  {
    var check = 1;

    clicker.filter(start_btn);

    if(game.scenes[game.cur_scene] == self)
    {
      keyer.flush();
      hoverer.flush();
      clicker.flush();
    }
  };

  self.draw = function()
  {
    start_btn.draw(gg.canv);
    gg.ctx.fillStyle = black;
    gg.ctx.fillText("This is a placeholder menu screen",10,20);
  };

  self.cleanup = function()
  {
    if(keyer)   keyer.detach();   keyer   = 0;
    if(hoverer) hoverer.detach(); hoverer = 0;
    if(clicker) clicker.detach(); clicker = 0;
  };

};

