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

    if(gg.module_board) { gg.module_board.ww = gg.canv.width; gg.module_board.wh = gg.canv.height; }

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

  self.set_level = function(i)
  {
    gg.cur_level = gg.levels[i];
    switch(gg.cur_level.type)
    {
      case LEVEL_LINEAR:
        gg.line.m = gg.cur_level.m;
        gg.line.b = gg.cur_level.b;
        gg.line.correct_m = gg.cur_level.correct_m;
        gg.line.correct_b = gg.cur_level.correct_b;
        gg.line.calculate_table();
        gg.line.draw_params();
        break;
      case LEVEL_QUADRATIC:
        gg.line.m = gg.cur_level.m;
        gg.line.b = gg.cur_level.b;
        gg.line.correct_m = gg.cur_level.correct_m;
        gg.line.correct_b = gg.cur_level.correct_b;
        gg.line.calculate_table();
        gg.line.draw_params();
        break;
      case LEVEL_MODULE:
        var m;
        var mp;
        for(var i = 0; i < gg.cur_level.modparams.length; i++)
        {
          m = gg.module_board.gen_module();
          mp = gg.cur_level.modparams[i];
          m.title = mp.title;
          m.v[0] = mp.v;
          m.v_btn.set(m.v[0]);
          m.correct_v[0] = mp.correct_v;
          if(i == 0) gg.module_board.table_module = m;
        }
        for(var i = 0; i < gg.cur_level.relparams.length; i++)
        {
          m = gg.module_board.gen_modrel();
          mp = gg.cur_level.relparams[i];
          m.v = mp.v;
          m.v_btn.set(m.v);
          m.correct_v = mp.correct_v;
          m.src = gg.module_board.modules[mp.src_i];
          m.dst = gg.module_board.modules[mp.dst_i];
        }
        gg.module_board.calculate_table();
        gg.module_board.calculate();
        break;
    }

  }

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
    b.size();

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

    gg.levels = [];
    var l;
    var m;
    var i = 0;

    l = new level();
    l.i = i;
    l.type = LEVEL_LINEAR;
    l.m = 0;
    l.b = 0;
    l.correct_m = 2;
    l.correct_b = 1;
    gg.levels.push(l);
    i++;

    l = new level();
    l.i = i;
    l.type = LEVEL_LINEAR;
    l.a = 0;
    l.b = 0;
    l.c = 0;
    l.correct_a = 0.1;
    l.correct_b = 0.2;
    l.correct_c = 3;
    gg.levels.push(l);
    i++;

    l = new level();
    l.i = i;
    l.type = LEVEL_MODULE;
    m = new modparam();
    m.title = "Charge";
    m.v = 1;
    m.correct_v = 1;
    l.modparams.push(m);
    m = new modparam();
    m.title = "Charge Rate";
    m.v = 1;
    m.correct_v = 2;
    l.modparams.push(m);
    m = new relparam();
    m.v = 1;
    m.correct_v = 1;
    m.src_i = 1;
    m.dst_i = 0;
    l.relparams.push(m);
    gg.levels.push(l);
    i++;

    self.set_level(2);
  };

  self.tick = function()
  {
    var check = 1;

    var b;

    switch(gg.cur_level.type)
    {
      case LEVEL_LINEAR:    gg.line.filter(keyer,blurer,dragger);         gg.line.tick();         break;
      case LEVEL_QUADRATIC: gg.quadratic.filter(keyer,blurer,dragger);    gg.quadratic.tick();    break;
      case LEVEL_MODULE:    gg.module_board.filter(keyer,blurer,dragger); gg.module_board.tick(); break;
    }
    clicker.filter(gg.dialog_box);

    gg.dialog_box.tick();

    keyer.flush();
    hoverer.flush();
    clicker.flush();
    dragger.flush();
    blurer.flush();
  };

  self.draw = function()
  {
    gg.ctx.strokeStyle = black;
    switch(gg.cur_level.type)
    {
      case LEVEL_LINEAR:    gg.line.draw();         break;
      case LEVEL_QUADRATIC: gg.quadratic.draw();    break;
      case LEVEL_MODULE:    gg.module_board.draw(); break;
    }
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

