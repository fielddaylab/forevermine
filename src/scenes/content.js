'use strict';
var ENUM;

ENUM = 0;
var TRIGGER_NULL  = ENUM; ENUM++;
var TRIGGER_CLICK = ENUM; ENUM++;
var TRIGGER_TIMER = ENUM; ENUM++;
var TRIGGER_COUNT = ENUM; ENUM++;

ENUM = 0;
var CONTENT_NULL     = ENUM; ENUM++;
var CONTENT_PLAYER   = ENUM; ENUM++;
var CONTENT_AI       = ENUM; ENUM++;
var CONTENT_DATA     = ENUM; ENUM++;
var CONTENT_CONSTANT = ENUM; ENUM++;
var CONTENT_SIM      = ENUM; ENUM++;
var CONTENT_NULL     = ENUM; ENUM++;

ENUM = 0;
var EMOTE_NULL       = ENUM; ENUM++;
var EMOTE_EXCITED    = ENUM; ENUM++;
var EMOTE_BASHFUL    = ENUM; ENUM++;
var EMOTE_SAD        = ENUM; ENUM++;
var EMOTE_PROCESSING = ENUM; ENUM++;
var EMOTE_NULL       = ENUM; ENUM++;

var level = function()
{
  var self = this;
  self.i = 0;
  self.y_icon = GenIcon(10,10);
  self.m_starting = [0,];
  self.m_correct = [0,];
  self.m_label = ["Rate",];
  self.m_icon = [GenIcon(10,10),];
  self.b_starting = [0,];
  self.b_correct = [0,];
  self.b_label = ["Initial",];
  self.b_icon = [GenIcon(10,10),];

  self.x_n = 10;
  self.y_n = 10;
  self.t_speed = 0.01;
  self.fast_t_speed = 0.1;
  self.x_label = "HOURS";
  self.y_label = "CRYSTALS";

  self.day = 0;

  self.feedback_imgs = [];
  self.system_imgs = [];
  self.pano = 0;
  self.pano_st = 0;
  self.pano_et = 1;

  self.skip_context = 0;
  self.skip_zoom = 0;
  self.skip_axis = 0;
  self.skip_labels = 0;
  self.skip_system = 0;
  self.skip_night = 0;

  self.text = {}; //see text.js for format

  //state
  self.progress = 0;
  self.correct = 0;

  self.reset = function()
  {
    self.progress = 0;
    self.correct = 0;
  }

  self.tick = function()
  {

  }

  self.draw = function()
  {

  }
}

