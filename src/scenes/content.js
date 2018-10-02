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
  this.active = 1;
  this.wx = 0;
  this.wy = 0;
}
var relparam = function()
{
  this.v = 0;
  this.correct_v = 0;
  this.src_i = 0;
  this.dst_i = 0;
  this.active = 1;
  this.wx = 0;
  this.wy = 0;
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
  self.correct_text = [ "You did it! On to the next assignment...", ];
  self.incorrect_text = [ "I don't think that's right... try again.", ];

  self.correct = 0;
  self.submitted = 0;
  self.submit = function(correct)
  {
    self.correct = correct;
    self.submitted = 1;

    if(self.correct)
    {
      gg.dialog_box.clear();
      for(var i = 0; i < self.correct_text.length; i++)
        gg.dialog_box.nq(self.correct_text[i]);
      self.submitted_correct();
    }
    else
    {
      gg.dialog_box.clear();
      for(var i = 0; i < self.incorrect_text.length; i++)
        gg.dialog_box.nq(self.incorrect_text[i]);
      self.submitted_incorrect();
    }
  }

  self.submitted_correct = function()
  {

  }

  self.submitted_incorrect = function()
  {

  }

  self.tick = function()
  {

  }

  self.draw = function()
  {

  }
}

