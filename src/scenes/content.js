var ENUM;

ENUM = 0;
var LEVEL_NULL      = ENUM; ENUM++;
var LEVEL_LINEAR    = ENUM; ENUM++;
var LEVEL_QUADRATIC = ENUM; ENUM++;
var LEVEL_MODULE    = ENUM; ENUM++;
var LEVEL_COUNT     = ENUM; ENUM++;

var modparam = function()
{
  this.title = "";
  this.v = 0;
  this.correct_v = 0;
}
var relparam = function()
{
  this.v = 0;
  this.correct_v = 0;
  this.src_i = 0;
  this.dst_i = 0;
}

var level = function()
{
  var self = this;
  self.i = 0;
  self.type = LEVEL_NULL;
  self.m = 0; //y = mx + b
  self.correct_m = 0;
  self.a = 0; //y = ax^2 + bx + c
  self.correct_a = 0;
  self.b = 0; //y = ax^2 + bx + c && y = mx + b
  self.correct_b = 0;
  self.c = 0; //y = ax^2 + bx + c
  self.correct_c = 0;

  self.modparams = [];
  self.relparams = [];

  self.text = [];
}

