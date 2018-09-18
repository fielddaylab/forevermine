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
    if(self.sy < self.v_min) { self.sx = (self.v_in-self.b)/self.m; self.sy = self.v_min; }
    if(self.sy > self.v_max) { self.sx = (self.v_in-self.b)/self.m; self.sy = self.v_max; }
    if(self.ey < self.v_min) { self.ex = (self.v_in-self.b)/self.m; self.ey = self.v_min; }
    if(self.ey > self.v_max) { self.ex = (self.v_in-self.b)/self.m; self.ey = self.v_max; }

    self.sy = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.sy);
    self.ey = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, self.ey);
    self.sx = self.x;
    self.ex = self.x+self.h;
  }

  self.tick = function()
  {

  }
  self.draw = function()
  {
    strokeBox(self,gg.ctx);
    self.draw_params();
    drawLine(self.sx,self.sy,self.ex,self.ey, gg.ctx);
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
      self.ypts[i] = mapVal(self.v_min, self.v_max, self.y+self.h, self.y, y);
    }
  }

  self.tick = function()
  {

  }
  self.draw = function()
  {
    strokeBox(self,gg.ctx);
    self.draw_params();
    gg.ctx.moveTo(self.xpts[0],self.ypts[0]);
    for(var i = i; i < self.samples; i++)
      gg.ctx.moveTo(self.xpts[i],self.ypts[i]);
    gg.ctx.stroke();
  }
}

