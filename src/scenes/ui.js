var editable_line = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.m = 0;
  self.b = 0;
  self.h_min = 0;
  self.h_max = 0;
  self.v_min = 0;
  self.v_max = 0;

  self.m_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.m = v; });
  self.b_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.b = v; });

  self.size = function()
  {
    var btn_s = 20;
    self.m_btn.w = btn_s;
    self.m_btn.h = btn_s;
    self.m_btn.x = self.x+15;
    self.m_btn.y = self.y+self.h+5;

    self.b_btn.w = btn_s;
    self.b_btn.h = btn_s;
    self.b_btn.x = self.x+55;
    self.b_btn.y = self.y+self.h+5;
  }

  self.v = function(x)
  {
    return self.m*x + self.b;
  }

  self.sx = 0;
  self.sy = 0;
  self.ex = 0;
  self.ey = 0;
  self.draw_params = function()
  {
    self.sy = self.v(self.h_min);
    self.ey = self.v(self.h_max);
    self.sx = self.h_min;
    self.ex = self.h_max;
    if(self.sy < self.v_min && self.ey < self.v_min) { self.sy = self.v_min; self.ey = self.v_min; return; }
    if(self.sy > self.v_max && self.ey > self.v_max) { self.sy = self.v_max; self.ey = self.v_max; return; }
    if(self.sy < self.v_min) { self.sx = (self.v_min-self.b)/self.m; self.sy = self.v_min; }
    if(self.sy > self.v_max) { self.sx = (self.v_max-self.b)/self.m; self.sy = self.v_max; }
    if(self.ey < self.v_min) { self.ex = (self.v_min-self.b)/self.m; self.ey = self.v_min; }
    if(self.ey > self.v_max) { self.ex = (self.v_max-self.b)/self.m; self.ey = self.v_max; }

    self.sy = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.sy);
    self.ey = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.ey);
    self.sx = mapVal(self.h_min, self.h_max, self.x, self.x+self.w, self.sx);
    self.ex = mapVal(self.h_min, self.h_max, self.x, self.x+self.w, self.ex);
  }

  self.filter = function(keyer,blurer,dragger)
  {
    if(keyer)
    {
      keyer.filter(self.m_btn);
      keyer.filter(self.b_btn);
    }
    if(blurer)
    {
      blurer.filter(self.m_btn);
      blurer.filter(self.b_btn);
    }
    if(dragger)
    {
      var check = 1;
      if(check) check = !dragger.filter(self.m_btn);
      if(check) check = !dragger.filter(self.b_btn);
      return !check;
    }
    return 0;
  }

  self.tick = function()
  {

  }
  self.draw = function()
  {
    strokeBox(self,gg.ctx);
    self.draw_params();
    drawLine(self.sx,self.sy,self.ex,self.ey, gg.ctx);

    var x = self.x;
    var y = self.y+self.h+20;
    gg.ctx.fillText("y = ",x,y);
    x += 20;
    gg.ctx.fillText(self.m,x,y);
    x += 20;
    gg.ctx.fillText("x +",x,y);
    x += 20;
    gg.ctx.fillText(self.b,x,y);

    //strokeBox(self.m_btn,gg.ctx);
    //strokeBox(self.b_btn,gg.ctx);
  }
}
var editable_quadratic = function()
{
  var self = this;
  self.w = 0;
  self.h = 0;
  self.x = 0;
  self.y = 0;

  self.a = 0;
  self.b = 0;
  self.c = 0;
  self.h_min = 0;
  self.h_max = 0;
  self.v_min = 0;
  self.v_max = 0;
  self.samples = 100;

  self.a_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.a = v; });
  self.b_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.b = v; });
  self.c_btn = new NumberBox(0,0,0,0,0,0.01,function(v){ v = fdisp(v,1); self.c = v; });

  self.size = function()
  {
    var btn_s = 20;
    self.a_btn.w = btn_s;
    self.a_btn.h = btn_s;
    self.a_btn.x = self.x+15;
    self.a_btn.y = self.y+self.h+5;

    self.b_btn.w = btn_s;
    self.b_btn.h = btn_s;
    self.b_btn.x = self.x+60;
    self.b_btn.y = self.y+self.h+5;

    self.c_btn.w = btn_s;
    self.c_btn.h = btn_s;
    self.c_btn.x = self.x+100;
    self.c_btn.y = self.y+self.h+5;
  }

  self.v = function(x)
  {
    return self.a*sqr(x)+self.b*x+self.c;
  }

  self.xpts = [];
  self.ypts = [];
  self.draw_params = function()
  {
    var x;
    var y;
    for(var i = 0; i < self.samples; i++)
    {
      x = mapVal(0,self.samples-1,self.h_min,self.h_max,i);
      y = self.v(x);
      self.xpts[i] = mapVal(self.h_min, self.h_max, self.x, self.x+self.w, x);
      self.ypts[i] = clamp(self.y, self.y+self.h, mapVal(self.v_min, self.v_max, self.y+self.h, self.y, y)); //map then clamp separate because y flipped
    }
  }

  self.filter = function(keyer,dragger,blurer)
  {
    if(keyer)
    {
      keyer.filter(self.a_btn);
      keyer.filter(self.b_btn);
      keyer.filter(self.c_btn);
    }
    if(blurer)
    {
      blurer.filter(self.a_btn);
      blurer.filter(self.b_btn);
      blurer.filter(self.c_btn);
    }
    if(dragger)
    {
      var check = 1;
      if(check) check = !dragger.filter(self.a_btn);
      if(check) check = !dragger.filter(self.b_btn);
      if(check) check = !dragger.filter(self.c_btn);
      return !check;
    }
    return 0;
  }

  self.tick = function()
  {

  }
  self.draw = function()
  {
    strokeBox(self,gg.ctx);
    self.draw_params();
    gg.ctx.beginPath();
    gg.ctx.moveTo(self.xpts[0],self.ypts[0]);
    for(var i = 0; i < self.samples; i++)
      gg.ctx.lineTo(self.xpts[i],self.ypts[i]);
    gg.ctx.stroke();

    var x = self.x;
    var y = self.y+self.h+20;
    gg.ctx.fillText("y = ",x,y);
    x += 20;
    gg.ctx.fillText(self.a,x,y);
    x += 20;
    gg.ctx.fillText("x² +",x,y);
    x += 25;
    gg.ctx.fillText(self.b,x,y);
    x += 20;
    gg.ctx.fillText("x +",x,y);
    x += 20;
    gg.ctx.fillText(self.c,x,y);

    //strokeBox(self.a_btn,gg.ctx);
    //strokeBox(self.b_btn,gg.ctx);
    //strokeBox(self.c_btn,gg.ctx);
  }
}

