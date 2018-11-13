var ENUM;

ENUM = 0;
var LEVEL_NULL      = ENUM; ENUM++;
var LEVEL_LINEAR    = ENUM; ENUM++;
var LEVEL_QUADRATIC = ENUM; ENUM++;
var LEVEL_MODULE    = ENUM; ENUM++;
var LEVEL_COUNT     = ENUM; ENUM++;

ENUM = 0;
var TRIGGER_NULL  = ENUM; ENUM++;
var TRIGGER_CLICK = ENUM; ENUM++;
var TRIGGER_TIMER = ENUM; ENUM++;
var TRIGGER_COUNT = ENUM; ENUM++;

ENUM = 0;
var SPEAKER_NULL   = ENUM; ENUM++;
var SPEAKER_PLAYER = ENUM; ENUM++;
var SPEAKER_AI     = ENUM; ENUM++;
var SPEAKER_DATA   = ENUM; ENUM++;
var SPEAKER_SIM    = ENUM; ENUM++;
var SPEAKER_NULL   = ENUM; ENUM++;

ENUM = 0;
var EMOTE_NULL       = ENUM; ENUM++;
var EMOTE_EXCITED    = ENUM; ENUM++;
var EMOTE_BASHFUL    = ENUM; ENUM++;
var EMOTE_SAD        = ENUM; ENUM++;
var EMOTE_PROCESSING = ENUM; ENUM++;
var EMOTE_NULL       = ENUM; ENUM++;

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

  self.pano_st = 0;
  self.pano_et = 1;

  self.modparams = [];
  self.relparams = [];

  var trigger_timer = {
    type:TRIGGER_TIMER,
    fn:noop,
    state:0,
    tstate:0,
  };

  self.pre_text = [ "Good morning!", SPEAKER_AI, EMOTE_NULL, ]
  self.text = [ "Here's the model data.", SPEAKER_AI, EMOTE_NULL, trigger_timer, ];
  self.import_text = [ "Great! Now match the model to the data.", SPEAKER_AI, EMOTE_NULL, trigger_timer, ];
  self.export_text = [ "Awesome- now submit the data to the chat!", SPEAKER_AI, EMOTE_NULL, trigger_timer, ];
  self.correct_text = [ "You did it! On to the next assignment...", SPEAKER_AI, EMOTE_NULL, trigger_timer, ];
  self.incorrect_text = [ "I don't think that's right... try again.", SPEAKER_AI, EMOTE_NULL, trigger_timer, ];
  self.post_text = [ "Goodnight!", SPEAKER_AI, EMOTE_NULL, ]

  self.feedback_imgs = [];

  self.correct = 0;
  self.submit = function(correct)
  {
    self.correct = correct;

    if(self.correct)
    {
      gg.message_box.nq_group(self.correct_text);
      self.submitted_correct();
    }
    else
    {
      gg.message_box.nq_group(self.incorrect_text);
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

