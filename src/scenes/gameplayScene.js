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

    gg.line = new editable_line();
    b = gg.line;
    b.w = 100;
    b.h = 100;
    b.x = 100;
    b.y = 100;
    b.v_min = 0;
    b.v_max = 10;
    b.h_min = 0;
    b.h_max = 10;
    gg.line_m_btn = new NumberBox(b.x,      b.y+b.h+10,10,10,0,0.01,function(v){gg.line.m = v;});
    gg.line_b_btn = new NumberBox(b.x+10+10,b.y+b.h+10,10,10,0,0.01,function(v){gg.line.b = v;});

    gg.quadratic = new editable_quadratic();
    b = gg.quadratic;
    b.w = 100;
    b.h = 100;
    b.x = 100;
    b.y = gg.line.y+gg.line.h+10+10+10;
    b.v_min = 0;
    b.v_max = 10;
    b.h_min = 0;
    b.h_max = 10;
    gg.quadratic_a_btn = new NumberBox(b.x,            b.y+b.h+10,10,10,0,0.01,function(v){gg.quadratic.a = v;});
    gg.quadratic_b_btn = new NumberBox(b.x+10+10,      b.y+b.h+10,10,10,0,0.01,function(v){gg.quadratic.b = v;});
    gg.quadratic_c_btn = new NumberBox(b.x+10+10+10+10,b.y+b.h+10,10,10,0,0.01,function(v){gg.quadratic.c = v;});
  };

  self.tick = function()
  {
    var check = 1;

    var b;

    b = gg.line_m_btn;
    if(check) check = !keyer.filter(b);
    if(check) check = !dragger.filter(b);
                       blurer.filter(b);
    b = gg.line_b_btn;
    if(check) check = !keyer.filter(b);
    if(check) check = !dragger.filter(b);
                       blurer.filter(b);

    b = gg.quadratic_a_btn;
    if(check) check = !keyer.filter(b);
    if(check) check = !dragger.filter(b);
                       blurer.filter(b);
    b = gg.quadratic_b_btn;
    if(check) check = !keyer.filter(b);
    if(check) check = !dragger.filter(b);
                       blurer.filter(b);
    b = gg.quadratic_c_btn;
    if(check) check = !keyer.filter(b);
    if(check) check = !dragger.filter(b);
                       blurer.filter(b);

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
    gg.ctx.fillRect(10,10,10,10);

    gg.line.draw();
    gg.line_m_btn.draw(gg.canv);
    gg.line_b_btn.draw(gg.canv);

    gg.quadratic.draw();
    gg.quadratic_a_btn.draw(gg.canv);
    gg.quadratic_b_btn.draw(gg.canv);
    gg.quadratic_c_btn.draw(gg.canv);
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

