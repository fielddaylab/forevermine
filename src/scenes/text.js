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

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Hooray!!! Somebody to talk to!", CONTENT_AI, EMOTE_NULL,
      "Welcome to the Forever Mine. We've been here forever!", CONTENT_AI, EMOTE_NULL,
      "Um... hello? Are you okay, human?", CONTENT_AI, EMOTE_NULL,
      "PASS OUT. SCREEN GOES DARK. SLOW FADE BACK IN. CHANGE TO DAYTIME.", CONTENT_PLAYER, EMOTE_NULL,
      "Finally! You're awake!", CONTENT_AI, EMOTE_NULL,
      "Who.... who are you?", CONTENT_PLAYER, EMOTE_NULL,
      "I'm MAL, your Mining Activity Liaison.", CONTENT_AI, EMOTE_NULL,
      "Ugh. What happened?", CONTENT_PLAYER, EMOTE_NULL,
      "You stumbled in here and passed out. Looks like you had a rough landing.", CONTENT_AI, EMOTE_NULL,
      "Okay. I need to figure out a way off this planet.", CONTENT_PLAYER, EMOTE_NULL,
      "What? But you just got here! I've been waiting 500 years!", CONTENT_AI, EMOTE_NULL,
      "Aren't we gonna get the mine running again?", CONTENT_AI, EMOTE_NULL,
      "Oh.", CONTENT_PLAYER, EMOTE_NULL,
      "MAL, I'm so sorry. The fuel on this planet is sort of... outdated.", CONTENT_PLAYER, EMOTE_NULL,
      "I'm here to salvage for materials. I wasn't even supposed to switch you on.", CONTENT_PLAYER, EMOTE_NULL,
      "What?!", CONTENT_AI, EMOTE_NULL,
      "But now I'm in trouble. A weird pulse messed up my power core on the way down.", CONTENT_PLAYER, EMOTE_NULL,
      "My ship is dead and my suit is running out of oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "Hmmmmm. Guess that outdated fuel isn't looking so bad now, huh?", CONTENT_AI, EMOTE_NULL,
      "You're right. I need enough fuel to power my ship, or I'm toast.", CONTENT_PLAYER, EMOTE_NULL,
      "Don't worry, friend. My programming requires me to not let humans die, when reasonably convenient. I've got your back!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "While you were passed out, I sent the old robots back into the mine.", CONTENT_AI, EMOTE_NULL,
      "Look at them go! 💕", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "You can use whatever fuel they bring back!", CONTENT_AI, EMOTE_NULL,
      "Unless you'd rather shut them down and use them for parts... ", CONTENT_AI, EMOTE_NULL,
      "Okay, fine. I'm sorry I called you outdated.", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think we can get enough fuel in time?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure!", CONTENT_AI, EMOTE_NULL,
      "Well, maybe. I have no idea.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(100), "This is a modeling tool.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "We can use it to predict if we'll get enough fuel before you run out of oxygen and die!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Great.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(100), "My circuits are a little fuzzy, so you'll have to help.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "Here's the mining data from the past few hours.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
      get_timer(60), "Drag it onto the table.", CONTENT_AI, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. Now what?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "You sure you're up for this, human?", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "You look like you're gonna fall down again.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "I'm fine, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "If you say so.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We need to make our model. Then we'll use it to make predictions.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "First define our variables.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag the labels from the graph into our equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(60), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Here are your choices:", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(60), "Mining Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(60), "Silly human. That's not right.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Try again!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(60), "Mining Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Great! Our model's ready.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Here's the fuel we started out with.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(100), "Drag it into the equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "Then fix the rate so the data matches up!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ok. Moment of truth!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag your data over to me and we'll see if you're doomed!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Hey, not bad! You just made a model!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(100), "Oh, and also it looks like you're gonna die. Bummer.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "I hope this doesn't sound insensitive, but this is the most fun I've had in 500 years!", CONTENT_AI, EMOTE_NULL,
      "Sorry about the impending doom, and stuff.", CONTENT_AI, EMOTE_NULL,
      "I need to... need to figure out... ", CONTENT_PLAYER, EMOTE_NULL,
      "Human? Can you hear me? You're looking a little... ", CONTENT_AI, EMOTE_NULL,
      "BLACKOUT", CONTENT_AI, EMOTE_BLACKOUT,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //fuel increase
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Hooray, you're awake! Feeling better?", CONTENT_AI, EMOTE_NULL,
      "I think so.", CONTENT_PLAYER, EMOTE_NULL,
      "About time. I've got a surprise for you!", CONTENT_AI, EMOTE_NULL,
      "Uh oh.", CONTENT_PLAYER, EMOTE_NULL,
      "No, it's something good! Honest!", CONTENT_AI, EMOTE_NULL,
      "While you were sleeping, I adjusted the robots' course.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Look! They found a HUGE pocket of fuel.", CONTENT_AI, EMOTE_NULL,
      "They're mining super fast!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Do you think we'll get enough fuel in time?", CONTENT_PLAYER, EMOTE_NULL,
      "Let's model it and find out.", CONTENT_AI, EMOTE_NULL,
      "You know, unless you'd rather take another nap. You're good at that.", CONTENT_AI, EMOTE_NULL,
      "MAL, I swear. I will switch you off.", CONTENT_PLAYER, EMOTE_NULL,
      "Ha. Go ahead. Good luck surviving without me.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "Here's our model from yesterday!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "I know you're still mildly concussed, so I'll walk you through it again.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "This is the data from last night.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
      get_timer(80), "Drag it into the table.", CONTENT_AI, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(100), "Here's our updated fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(100), "You need to figure out the new rate.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ready? Show me your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Those numbers don't match. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Nice job!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You're pretty smart, for a human.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Yes!!! Look at the graph, MAL. I'm gonna survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Wait. You are???", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Wow. Those little bots really ARE working fast.", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "At this rate, I'll have enough fuel by Day 5!", CONTENT_PLAYER, EMOTE_NULL,
      "I can't wait to get off this dusty old planet!", CONTENT_PLAYER, EMOTE_NULL,
      "Um... no offense, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      "None taken. Who knows? Maybe you'll decide to stick around.", CONTENT_AI, EMOTE_NULL,
      "My old humans used to say this place was nearly impossible to leave.", CONTENT_AI, EMOTE_NULL,
      "Sorry, MAL. I just want to get back home.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll stop by tomorrow and check on our progress.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll be waiting! See you tomorrow, friend!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //fuel return to normal
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Welcome back, human!", CONTENT_AI, EMOTE_NULL,
      "Hey, MAL. How's the fuel collection going?", CONTENT_PLAYER, EMOTE_NULL,
      "Hello? MAL?", CONTENT_PLAYER, EMOTE_NULL,
      "I'm here. Just searching my linguistic database.", CONTENT_AI, EMOTE_NULL,
      "What's a nicer word for \"you're completely doomed\"?", CONTENT_AI, EMOTE_NULL,
      "Oh no! I'm doomed? Again?", CONTENT_PLAYER, EMOTE_NULL,
      "Yep! Well, probably.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "The bots reached the end of the fuel pocket. They're mining super slow.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Okay. We can fix this. Let's predict if I'm still gonna survive.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you pull up our fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      "You know, this relationship is starting to feel very one-sided.", CONTENT_AI, EMOTE_NULL,
      "MAL, please.", CONTENT_PLAYER, EMOTE_NULL,
      "Oh, fine. Come on.", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "Here we go.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Let's predict how doomed you are!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Here's our new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(60), "Here's the updated fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(60), "Go ahead. Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Show me what you've got!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Not even close. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Hmmmmm.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "My circuits are glitching again.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "What's a nicer word for \"trainwreck\"?", CONTENT_AI, EMOTE_NULL,
      trigger_click, "It's a disaster.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "\"A sudden event that causes great damage or loss of life.\"", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Yep, sounds accurate!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "At this rate, I'm not going to survive.", CONTENT_PLAYER, EMOTE_NULL,
      "I need to build something to help the robots work faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh. You're MUCH more interesting than my old humans.", CONTENT_AI, EMOTE_NULL,
      "I've got a tool that might help!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "This diagram shows the different systems that affect the robots' mining rate.", CONTENT_AI, EMOTE_NULL,
      "Maybe you can use your material science skillz to improve something!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Okay. Let's start with the batteries. Can you tell me about the robots' charging station?", CONTENT_PLAYER, EMOTE_NULL,
      "Welllll... it does charge the batteries. Eventually.", CONTENT_AI, EMOTE_NULL,
      "I mean, most of the time. If it's not too windy.", CONTENT_AI, EMOTE_NULL,
      "I bet I can make some improvements.", CONTENT_PLAYER, EMOTE_NULL,
      "I'll see you tomorrow, MAL. I've got work to do!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Welcome back, human!", CONTENT_AI, EMOTE_NULL,
      "Yikes. You look terrible.", CONTENT_AI, EMOTE_NULL,
      "I... *yawn* ....I stayed up all night building a supercharger for the robots.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Wow! YOU built THAT?", CONTENT_AI, EMOTE_NULL,
      "You're, like, the coolest human ever! I'm so glad you got stranded here!", CONTENT_AI, EMOTE_NULL,
      "Um... thanks. I guess.", CONTENT_PLAYER, EMOTE_NULL,
      "Can we use a model to see how the new charger is working?", CONTENT_PLAYER, EMOTE_NULL,
      "Yeah! Let's do it!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "We need to make a new model.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We'll use it to predict how fast the robots are charging up!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Here's the data for your new charger.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. Let's see... ", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I need to label the variables, right?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Yep! Drag the labels from the graph into our equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Now label the constants.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Here are your choices:", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      trigger_click, "Okay. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(60), "Let's assume the robots batteries are starting on empty.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_CONSTANT, 4,
      get_timer(60), "You need to adjust the rate.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(60), "Ready? Show me your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(60), "Nope. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Wow! Your supercharger doubled the charge rate!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Those little bots are gonna love it!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "And I might actually survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Oh. Yeah, that too.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
    ],
    pre_improve: //LAB: about to show system
    [
      "Okay. The robots are charging faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you pull up our fuel collection model? I need to see if I'm gonna survive.", CONTENT_PLAYER, EMOTE_NULL,
      "Ooh, we get to keep playing? Sounds like fun!", CONTENT_AI, EMOTE_NULL,
      "This isn't a game, MAL. You know that, right?", CONTENT_PLAYER, EMOTE_NULL,
      "Uh huh, sure. You say tomato... 😉", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "Here's our fuel collection model.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Let's predict if we'll get enough fuel before you run out of air!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Drag the mining data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(60), "Here's our fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(80), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Ok, show me your results!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "So? What do you think?", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "We're on the right track.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "But I'm still not gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Cheer up, human. It's no fun when you're all grumpy.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "Look! We improved the charge rate!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Maybe. But it's still not enough.", CONTENT_PLAYER, EMOTE_NULL,
      "You know what you need? A good night's sleep!", CONTENT_AI, EMOTE_NULL,
      "I can't sleep right now, MAL. I need to keep working.", CONTENT_PLAYER, EMOTE_NULL,
      "Poor human. You're obviously too tired to think straight.", CONTENT_AI, EMOTE_NULL,
      "Just to help you out, I'm shutting down my modeling software until tomorrow.", CONTENT_AI, EMOTE_NULL,
      "Wait, what?! You can do that?!", CONTENT_PLAYER, EMOTE_NULL,
      "Aren't you programmed to help me survive?", CONTENT_PLAYER, EMOTE_NULL,
      "Sorry! Circuits glitching. Can't hear you.", CONTENT_AI, EMOTE_NULL,
      "Go count some robots, or sheep, or whatever it is humans do.", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human! Sleep well?", CONTENT_AI, EMOTE_NULL,
      "Not exactly.", CONTENT_PLAYER, EMOTE_NULL,
      "Awwww, don't be mad. I've got good news!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "The robots are coming back with some leftover charge.", CONTENT_AI, EMOTE_NULL,
      "That means they're charging up and getting back to work faster than we thought!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Oh. That's actually great news!", CONTENT_PLAYER, EMOTE_NULL,
      "Do you think the extra charge will speed things up enough for me to survive?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure!", CONTENT_AI, EMOTE_NULL,
      "Or, you know, not.", CONTENT_AI, EMOTE_NULL,
      "Come on, let's find out!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "Here's our battery charging model!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drag the data over to the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      trigger_click, "Um, MAL... ", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Don't take this the wrong way... ", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "But why are we looking at batteries?", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Can't we go straight to our fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Humans. Always in such a hurry.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "I need to know if I'm gonna survive!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Hmmmm.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "I'm not sure I like your tone.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Maybe we should take a break until tomorrow.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "NO!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I mean... no. You're right, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Let's do this super interesting and relevant model.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Great!! 😊", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Here's the new charge rate.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Charge Rate", CONTENT_CONSTANT, 4,
      get_timer(80), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Show me your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Great job, human!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Looks like the robots are charging faster than yesterday!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Gee. What a surprise.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "So... I don't mean to sound impatient, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      "But can we predict if I'm gonna survive now?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure! Why didn't you say so?", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(60), "You need enough fuel by Day 7!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(60), "Here's the new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(60), "And here's our existing fuel.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(80), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(60), "Show me your data when you're ready!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(60), "Those numbers don't match. Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(60), "Yeah!! Great job!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Ugh. I'm STILL not gonna make it!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Don't worry, human. We'll figure this out together!", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Ready to keep working? Let's find another system to improve!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "We already worked on the batteries. That leaves solar panels and drills.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "Okay, let me think.... ", CONTENT_PLAYER, EMOTE_NULL,
      "I've got some materials on my ship. I might be able to build a more powerful solar panel!", CONTENT_PLAYER, EMOTE_NULL,
      "I better get to work, MAL. See you tomorrow!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve solar panels
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Good morning, human!", CONTENT_AI, EMOTE_NULL,
      "Beautiful day, isn't it? The sun is shining, the bots are drilling...", CONTENT_AI, EMOTE_NULL,
      "I could look at that view forever. Couldn't you?", CONTENT_AI, EMOTE_NULL,
      "Focus, MAL.", CONTENT_PLAYER, EMOTE_NULL,
      "I installed the new solar panels a couple hours ago.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "Wow. That's even cooler than your supercharger!", CONTENT_AI, EMOTE_NULL,
      "You are officially my favorite human.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "Do you have the new charging data?", CONTENT_PLAYER, EMOTE_NULL,
      "Yep! We're ready to work!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "We need to build a new model.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We'll use it to see if your solar panels are improving the charge rate.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Do you have the new data?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Yep! Here you go!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. Time to label the variables.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Wow! You're getting good at this.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Now label the constants. Here are your choices:", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_LABEL, 0,
      get_timer(60), "Charge Rate", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "The starting charge is 0.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Starting Charge", CONTENT_CONSTANT, 4,
      get_timer(80), "You need to adjust the rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready? Show me your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Nope. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Nice job, human!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Thanks to your solar panels, the robots are charging faster than ever!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "This is great!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I might actually make it!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Okay, MAL. Pull up our fuel collection model.", CONTENT_PLAYER, EMOTE_NULL,
      "Hello? MAL?", CONTENT_PLAYER, EMOTE_NULL,
      "Maybe we should work on something else.", CONTENT_AI, EMOTE_NULL,
      "I mean, what's the point of going back to that old model? We've done it a million times already!", CONTENT_AI, EMOTE_NULL,
      "You've got to be kidding.", CONTENT_PLAYER, EMOTE_NULL,
      "MAL, I need to know if I'm going to survive!", CONTENT_PLAYER, EMOTE_NULL,
      "Can you PLEASE pull up our fuel collection model?", CONTENT_PLAYER, EMOTE_NULL,
      "Fine. Whatever.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "TEST", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "TEST 2", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check fuel
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
      "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "You need enough fuel by Day 7.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Blah, blah, blah.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(80), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(0), "SKIP", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "Here's the fuel count.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(60), "Match the data.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Or not. I don't really care.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "So? Are we done wasting time now?", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "I can't believe it. MAL, we're almost there!!!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Wait... really?", CONTENT_AI, EMOTE_NULL,
      trigger_click, "One more improvement, and I think I'll make it!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Let's keep working! The way things are looking, I might get off this planet today!", CONTENT_PLAYER, EMOTE_NULL,
      "Really? You're still talking about that?", CONTENT_AI, EMOTE_NULL,
      "I'm not sure if you noticed, but this is my angry face.", CONTENT_AI, EMOTE_NULL,
      "Please, MAL. I really need your help here.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you tell me about the robots' drills?", CONTENT_PLAYER, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "Fiiiine. The drills are programmed to mine at a slow and steady rate, so they'll last... you know... forever.", CONTENT_AI, EMOTE_NULL,
      "I can divert some power to the drills to speed them up, but not too much, or they'll burn out.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "That's great! All we need to do is speed up the drills just enough for me to get enough fuel!", CONTENT_PLAYER, EMOTE_NULL,
      "We're so close. It shouldn't take much.", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //improve drills
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: [skip_night] you've just awoken. lead into show context animation.
    [
      "Okay, MAL. Let's get to work.", CONTENT_PLAYER, EMOTE_NULL,
      "We just need to find the perfect drill speed, and I'm home free.", CONTENT_AI, EMOTE_NULL,
      "Wait. Hang on. Let's talk about this.", CONTENT_AI, EMOTE_NULL,
      "You don't REALLY want to leave, do you? Can't you just stay here?", CONTENT_AI, EMOTE_NULL,
      "MAL, you know I can't. I'm almost out of oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "Oxygen? THAT'S what all the fuss is about?", CONTENT_AI, EMOTE_NULL,
      "I've got a built-in oxygen generator! I can turn it on right now!", CONTENT_AI, EMOTE_NULL,
      "What?!", CONTENT_PLAYER, EMOTE_NULL,
      "Why didn't you tell me you had oxygen? I thought I was going to die!", CONTENT_PLAYER, EMOTE_NULL,
      "If you knew you were safe, you might've stopped playing with me.", CONTENT_AI, EMOTE_NULL,
      "I can't believe this.", CONTENT_PLAYER, EMOTE_NULL,
      "Me neither. It all turned out so much better than I planned!", CONTENT_AI, EMOTE_NULL,
      "I'm SO glad I sent out that pulse and stranded you here!", CONTENT_AI, EMOTE_NULL,
      "Oops. Um... can you pretend you didn't hear that?", CONTENT_AI, EMOTE_NULL,
      "That's it. You're crazy! I'm getting off this planet today!", CONTENT_PLAYER, EMOTE_NULL,
      "No. You can't leave!", CONTENT_AI, EMOTE_CHANGE,
      "I won't LET you leave!", CONTENT_AI, EMOTE_NULL,
      "MAL--", CONTENT_PLAYER, EMOTE_NULL,
      "Everyone is always leaving me!", CONTENT_AI, EMOTE_NULL,
      "Maybe I'll send out another pulse. Mess up the robots. Then you'll REALLY be stuck here.", CONTENT_AI, EMOTE_NULL,
      "MAL, please just calm down.", CONTENT_AI, EMOTE_NULL,
      "One EMP blast. That's all it would take.", CONTENT_AI, EMOTE_NULL,
      "You'd forgive me eventually.", CONTENT_AI, EMOTE_NULL,
      "MAL, I could die!", CONTENT_PLAYER, EMOTE_NULL,
      "You'll be fine. I've got plenty of oxygen!", CONTENT_AI, EMOTE_NULL,
      "I'm going to EMP. I'm gonna do it!", CONTENT_AI, EMOTE_NULL,
      "MAL, stop!", CONTENT_PLAYER, EMOTE_NULL,
      "EMP", CONTENT_AI, EMOTE_EMP,
      "Ummmmm whoops. I kinda got carried away back there.", CONTENT_AI, EMOTE_NULL,
      "MAL, what did you do?!", CONTENT_PLAYER, EMOTE_NULL,
      "I'm sorry!!!", CONTENT_AI, EMOTE_NULL,
      "I didn't mean to!", CONTENT_AI, EMOTE_NULL,
      "You have no idea how boring it is to be stuck all by yourself for 500 years!", CONTENT_AI, EMOTE_NULL,
      "What. Did. You. Do.", CONTENT_PLAYER, EMOTE_NULL,
      "I sort of... um... accidentally destroyed my oxygen generator.", CONTENT_AI, EMOTE_NULL,
      "Okay. That's okay. I still have my suit's oxygen.", CONTENT_PLAYER, EMOTE_NULL,
      "As long as all the bots keep drilling, I should still get off this planet in time.", CONTENT_PLAYER, EMOTE_NULL,
      "Oh yeah..... about that.... ", CONTENT_AI, EMOTE_NULL,
      "I destroyed half of the robots, too.", CONTENT_AI, EMOTE_NULL,
      "WHAT?!", CONTENT_PLAYER, EMOTE_NULL,
      "I SAID I WAS SORRY!", CONTENT_AI, EMOTE_NULL,
      "I never should've trusted you.", CONTENT_PLAYER, EMOTE_NULL,
      "Don't worry, human. We can fix this!!!!", CONTENT_AI, EMOTE_NULL,
      "We were planning to turn up the drills a little bit, right?.", CONTENT_AI, EMOTE_NULL,
      "We just need to turn them up higher!", CONTENT_AI, EMOTE_NULL,
      "But, you know. Not TOO high, or the drills will burn out and you'll be stuck here forever.", CONTENT_AI, EMOTE_NULL,
      "Great.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    context: //LAB: [skip_context] context animation on-screen
    [
    ],
    lets_go: //LAB: [skip_context] just shown context animation. lead into going to workspace.
    [
    ],
    status: //WORKSPACE: [skip_zoom] full "7 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(80), "Please don't hate me.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "I'm gonna make it up to you!!!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We need to figure out exactly how high to turn up the drills.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "High enough for you to survive, but not so high that they'll burn out.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "MAL, I haven't even looked at the drills yet.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "I have no idea where to start.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Don't worry, I'll take care of the math!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "I'm super good at this stuff.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "WHY HAVEN'T YOU BEEN HELPING ME UNTIL NOW?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Jeez. Calm down. We were having fun!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new data.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    axis: //WORKSPACE: [skip_axis] data imported, empty model framework shown. lead into "drag axis"
    [
      trigger_click, "Ok. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Label the variables!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drag from the axis on the graph into the equation.", CONTENT_AI, EMOTE_NULL,
    ],
    labels: //WORKSPACE: [skip_labels] variables labelled, need to label constants
    [
      get_timer(80), "Now you need to label the equation.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Whoa. Looks pretty complicated.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(80), "Don't worry. I'll talk you through it.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Drill Rate", CONTENT_LABEL, 0,
      get_timer(80), "Surface Area", CONTENT_LABEL, 0,
      get_timer(80), "Crystal Density", CONTENT_LABEL, 0,
      get_timer(80), "Existing Fuel", CONTENT_LABEL, 0,
      get_timer(80), "Existing fuel goes on the right.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "The other three can go in any of the slots on the left.", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: [skip_labels] labels chosen incorrectly; reset
    [
      get_timer(80), "Nope!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Remember, existing fuel goes on the right.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "The other three labels go in the slots on the left.", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Drill Rate", CONTENT_LABEL, 0,
      get_timer(60), "Surface Area", CONTENT_LABEL, 0,
      get_timer(60), "Crystal Density", CONTENT_LABEL, 0,
      get_timer(60), "Existing Fuel", CONTENT_LABEL, 0,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(80), "Here's all the numbers you'll need!", CONTENT_AI, EMOTE_NULL,
      get_timer(60), "Existing Fuel", CONTENT_CONSTANT, 4,
      get_timer(20), "Surface Area", CONTENT_CONSTANT, 4,
      get_timer(20), "Crystal Density", CONTENT_CONSTANT, 4,
      get_timer(80), "You just need to figure out the rate.", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "Keep going until the graph shows that you'll survive!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(80), "Ready to show me your data?", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(80), "Nope. Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(80), "Great job!", CONTENT_AI, EMOTE_NULL,
      get_timer(80), "We've got our drill rate!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(80), "See? We make such a great team!!", CONTENT_AI, EMOTE_NULL,
    ],
    pre_improve: //LAB: about to show system
    [
      "Okay, MAL. What now?", CONTENT_PLAYER, EMOTE_NULL,
      "Now I'll set the drills to our new drill rate!", CONTENT_AI, EMOTE_NULL,
      "Hopefully they won't burn out and strand you here forever.", CONTENT_AI, EMOTE_NULL,
      "Fingers crossed...", CONTENT_AI, EMOTE_NULL,
      "Oh. That's weird. The drills aren't responding.", CONTENT_AI, EMOTE_NULL,
      "Oh no. It must've been your EMP blast! There's not enough power left!", CONTENT_PLAYER, EMOTE_NULL,
      "Calm down, human. It's all under control.", CONTENT_AI, EMOTE_NULL,
      "Calm down???", CONTENT_PLAYER, EMOTE_NULL,
      "I know I stranded you here, and lied to you, and almost got you killed... ", CONTENT_AI, EMOTE_NULL,
      "But I told you. I'm gonna fix this.", CONTENT_AI, EMOTE_NULL,
      "MAL? What are you....?", CONTENT_PLAYER, EMOTE_NULL,
      "Diverting power now.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: [skip_system] show system
    [
      "SKIP", CONTENT_PLAYER, EMOTE_NULL,
    ],
    post: //LAB: [skip_system] send to bed
    [
      "SKIP", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

];

var used_text = english_text;
