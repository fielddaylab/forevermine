'use strict';
var trigger_click = {
  type:TRIGGER_CLICK,
  state:0,
};
var trigger_timer = {
  type:TRIGGER_TIMER,
  state:1,
};

var get_timer = function(t)
{
  var n = cloneInto(trigger_timer,{});
  n.state = t;
  return n;
}

var english_text =
[

  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //crystal increase
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //crystal return to normal
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check out battery
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Rate", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's try modelling it.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(20), "I'm not sure how this can be modelled.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Something about that doesn't look right...", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Let's try that. We have a few known constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Awesome- now submit the data to the chat!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "I don't think that's right... try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it! Let's see how it looks", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Looks Good/Bad!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Hey that's ok- let's try improving something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },


];

var used_text = english_text;
