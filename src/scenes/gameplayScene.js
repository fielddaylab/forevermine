var GamePlayScene = function(game, stage)
{
  var self = this;

  self.resize = function(s)
  {
    stage = s;
    gg.stage = stage;
    gg.canv = gg.stage.canv;
    gg.canvas = gg.canv.canvas;
    gg.ctx = gg.canv.context;

    if(hoverer) hoverer.detach(); hoverer = new PersistentHoverer({source:gg.canvas});
    if(clicker) clicker.detach(); clicker = new Clicker({source:gg.canvas});
    if(dragger) dragger.detach(); dragger = new Dragger({source:gg.canvas});
  }

  var hoverer;
  var clicker;
  var dragger;
  var cam;
  var params;

  self.ready = function()
  {
    params = jsonFromURL();
    self.resize(stage);
  };

  self.tick = function()
  {
    //hoverer.filter(blah);
    var check = 1;
    //if(check) check = !clicker.filter(blah);
    //if(check) check = !dragger.filter(blah);

    hoverer.flush();
    clicker.flush();
    dragger.flush();
  };

  self.draw = function()
  {
  };

  self.cleanup = function()
  {
  };

};

