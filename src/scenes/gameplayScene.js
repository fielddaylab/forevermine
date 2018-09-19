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

    if(keyer)   keyer.detach();   keyer   = new Keyer({source:gg.canvas});
    if(hoverer) hoverer.detach(); hoverer = new PersistentHoverer({source:gg.canvas});
    if(clicker) clicker.detach(); clicker = new Clicker({source:gg.canvas});
    if(dragger) dragger.detach(); dragger = new Dragger({source:gg.canvas});
    if(blurer)  blurer.detach();  blurer  = new Blurer({source:gg.canvas});
  }

  var keyer;
  var hoverer;
  var clicker;
  var dragger;
  var blurer;

  self.ready = function()
  {
    self.resize(stage);

    var b;
    var graph_s = 100;
    var btn_s = 20;

    gg.line = new editable_line();
    b = gg.line;
    b.w = graph_s;
    b.h = graph_s;
    b.x = 10;
    b.y = 10;
    b.v_min = 0;
    b.v_max = 10;
    b.h_min = 0;
    b.h_max = 10;
    b.size();

    gg.quadratic = new editable_quadratic();
    b = gg.quadratic;
    b.w = graph_s;
    b.h = graph_s;
    b.x = 10;
    b.y = gg.line.y+gg.line.h+10+btn_s+10;
    b.v_min = 0;
    b.v_max = 10;
    b.h_min = 0;
    b.h_max = 10;
    b.size();
  };

  self.tick = function()
  {
    var check = 1;

    var b;

    gg.line.filter(keyer,blurer,dragger);
    gg.quadratic.filter(keyer,blurer,dragger);

    gg.line.tick();
    gg.quadratic.tick();

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    dragger.flush();
    blurer.flush();
  };

  self.draw = function()
  {
    gg.ctx.strokeStyle = black;
    gg.line.draw();

    gg.ctx.strokeStyle = black;
    gg.quadratic.draw();
  };

  self.cleanup = function()
  {
    if(keyer)   keyer.detach();   keyer   = 0;
    if(hoverer) hoverer.detach(); hoverer = 0;
    if(clicker) clicker.detach(); clicker = 0;
    if(dragger) dragger.detach(); dragger = 0;
    if(blurer)  blurer.detach();  blurer  = 0;
  };

};

