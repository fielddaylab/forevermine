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

    gg.module_board = new module_board();
    b = gg.module_board;
    b.w = gg.canv.width;
    b.h = gg.canv.height;
    b.x = 0;
    b.y = 0;
    //acts as module cam
    b.ww = gg.canv.width;
    b.wh = gg.canv.height;
    b.wx = 0;
    b.wy = 0;
    b.new_module_btn.w = 50;
    b.new_module_btn.h = 50;
    b.new_module_btn.x = b.x+b.w-10-b.new_module_btn.w;
    b.new_module_btn.y = b.y+b.h-10-b.new_module_btn.h;
    b.gen_module();
    b.calculate();

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

    gg.dialog_box = new dialog_box();
    gg.dialog_box.w = 400;
    gg.dialog_box.h = 100;
    gg.dialog_box.x = 300;
    gg.dialog_box.y = 100;
    gg.dialog_box.nq("Hey! This is a test. It's really important that you use the boxes on the left to try and match up the red dots. I know they're small, but you can maybe do it. Also, it might be too hard. Who knows.");
    gg.dialog_box.nq("Yep. You can advance text here. Is it tedious to read all of this text? Quite a bit of it can fit in here. But to be honest, this is going to be rather complex so a lot of text might be necessary.");

  };

  self.tick = function()
  {
    var check = 1;

    var b;

    gg.line.filter(keyer,blurer,dragger);
    gg.quadratic.filter(keyer,blurer,dragger);
    clicker.filter(gg.dialog_box);
    gg.module_board.filter(keyer,blurer,dragger);

    gg.module_board.tick();

    gg.line.tick();
    gg.quadratic.tick();

    gg.dialog_box.tick();

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    dragger.flush();
    blurer.flush();
  };

  self.draw = function()
  {
    gg.module_board.draw();

    gg.ctx.strokeStyle = black;
    gg.line.draw();

    gg.ctx.strokeStyle = black;
    gg.quadratic.draw();

    gg.dialog_box.draw();
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

