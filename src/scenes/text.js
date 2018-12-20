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
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Eeeeeeee! 🎉 Finally, someone to talk to!", CONTENT_AI, EMOTE_NULL,
      "I'm your Crystal Intake Specialist. You can call me Cris!", CONTENT_AI, EMOTE_NULL,
      "Wanna be best friends?", CONTENT_AI, EMOTE_NULL,
      "I'm running out of oxygen, Cris.", CONTENT_PLAYER, EMOTE_NULL,
      "I need to mine enough crystals to power my ship.", CONTENT_PLAYER, EMOTE_NULL,
      "So.... that's a yes to being besties?", CONTENT_AI, EMOTE_NULL,
      "Um, sure. Why not?", CONTENT_PLAYER, EMOTE_NULL,
      "Yippeeee! 🤗", CONTENT_AI, EMOTE_NULL,
      "Don't worry, friend! I'll help you!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "See? The bots are out mining right now!", CONTENT_AI, EMOTE_NULL,
      "Aren't they cute? 💕💕💕", CONTENT_AI, EMOTE_NULL,
      "Ok, Cris. I've got 14 days of oxygen left.", CONTENT_PLAYER, EMOTE_NULL,
      "Can we predict if I'm gonna survive?", CONTENT_PLAYER, EMOTE_NULL,
      "Ooh! Sounds fun!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(100), "Here ya go, friend!", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "My owners used this model to make predictions.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Wait... you mean 200 years ago?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(100), "Yep! 😂", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Don't worry, you can fix it up!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Me?", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "You're the Predictionator. Can't you do it?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Sorry! My circuits are suuuper scrambled. 😜", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Great.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Cheer up, friend. You can do this!!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here the data from the last few hours.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      trigger_click, "Ok. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Oh, I remember this part!!!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You need to label our equation!", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(120), "Silly human. That's not right!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(120), "Yay! You did it!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Here's our crystal count.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Initial", CONTENT_CONSTANT, 4,
      get_timer(120), "Drag the number into our equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Then change the rate so our data matches up!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "When you're ready, drag your data over to me!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(120), "Those numbers don't match, silly!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Yayayay! The numbers match!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(120), "You just made a model!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Oh, and also it looks like you're gonna die. Bummer.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "😬😬😬", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "No improvements this level", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      "Awww, don't look so sad. Why don't you get some sleep?", CONTENT_AI, EMOTE_NULL,
      "I can't sleep right now, Cris.", CONTENT_PLAYER, EMOTE_NULL,
      "Sure you can! Just count some robots, or whatever humans do.", CONTENT_AI, EMOTE_NULL,
      "See ya in the morning!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //crystal increase
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning, bestie!!! Guess what?", CONTENT_AI, EMOTE_NULL,
      "You fixed your communicator and called for help?", CONTENT_PLAYER, EMOTE_NULL,
      "Nope! 😂 Comms are still fried!", CONTENT_AI, EMOTE_NULL,
      "But! The robots hit a HUGE pocket of crystals last night!", CONTENT_AI, EMOTE_NULL,
      "They're mining SUPER fast!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "See? You might not die after all!", CONTENT_AI, EMOTE_NULL,
      "Wow, this is great!", CONTENT_PLAYER, EMOTE_NULL,
      "Cris, can we predict if I'm gonna make it?", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh, fun! Let's do it!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "This is the same model from yesterday!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You'll need to fix it up again.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Ok. Do you have the new data?", CONTENT_PLAYER, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(120), "Here ya go!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Select the labels again!", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(120), "Silly human! That's not right.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(120), "Nice work, bestie!!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Here's our Initial Crystal Count!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Initial", CONTENT_CONSTANT, 4,
      get_timer(120), "You need to fix the rate to match our new data.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Are you done yet?", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "I wanna see!!!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(120), "Silly! Those numbers don't match. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "You matched the data! Nice job, bestie! 🎉🎉🎉", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Let's make our prediction!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(120), "Yippee! We met our goal!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Looks like you're not doomed after all!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "No improvements this level", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      "Looks like you'll have enough fuel in X days!", CONTENT_AI, EMOTE_NULL,
      "Yes!! Thanks for your help, Cris!", CONTENT_PLAYER, EMOTE_NULL,
      "I can't wait to get off this dumb planet.", CONTENT_PLAYER, EMOTE_NULL,
      "Um.... no offense.", CONTENT_PLAYER, EMOTE_NULL,
      "None taken, bestie! Who knows? Maybe you'll end up sticking around for a while.", CONTENT_AI, EMOTE_NULL,
      "See you tomorrow!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //crystal return to normal
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning, sleepyhead!", CONTENT_AI, EMOTE_NULL,
      "Morning, Cris! How are those little bots doing?", CONTENT_PLAYER, EMOTE_NULL,
      "Welllll.... about that.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "The big pocket of crystals is all used up. 😞", CONTENT_AI, EMOTE_NULL,
      "Poor little bots. They're so sad.", CONTENT_AI, EMOTE_NULL,
      "I need to figure out if I'm still gonna survive.", CONTENT_PLAYER, EMOTE_NULL,
      "Sure! Let's model it!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "We need to predict if we'll still get enough fuel by Day 14.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(120), "Here's the new data!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Go ahead, label the equation!", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(120), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(120), "Here's our crystal count!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Initial", CONTENT_CONSTANT, 4,
      get_timer(120), "You can do this, bestie!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "The more we get together, together, together... 🎵", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Cris, are you... singing?", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "The more we get together, the happier we'll be! 🎵", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ready? Show me your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(120), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Hooray! We make such a good team! 😍", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Can we make our prediction now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Sure thing, bestie!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(120), "Welp, looks like you're doomed. Again. 🤷", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "So... whatcha wanna do now?", CONTENT_AI, EMOTE_NULL,
      "I need to build something to help the robots work faster.", CONTENT_PLAYER, EMOTE_NULL,
      "Ooh! Good idea!", CONTENT_AI, EMOTE_NULL,
      "Maybe this model will help!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Ok. Let's start by looking at the robots' batteries.", CONTENT_PLAYER, EMOTE_NULL,
      "Yes!!! Let's do it!", CONTENT_AI, EMOTE_NULL,
      "Buuuuuut I need a nap first. All this Prediction-ating makes me sleepy.", CONTENT_AI, EMOTE_NULL,
      "Cris, this is sort of urgent-- ", CONTENT_PLAYER, EMOTE_NULL,
      "See you tomorrow, bestie!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check out battery
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Yay! You're here!", CONTENT_AI, EMOTE_NULL,
      "I collected some data on the robots' batteries last night.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's check it out!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "This model is from wayyyy back when my old owners lived here.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Thanks, Cris.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Don't mention it, bestie!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data for the robots' batteries.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      trigger_click, "Great. Let's get a baseline for how fast the bots are charging up.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again, bestie.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Looks good!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Here's your constant.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Now drag your data over to me!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Silly human! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "We've got our baseline!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "No improvement screen this level?", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      "Wheee! That was fun!", CONTENT_AI, EMOTE_NULL,
      "I'm so glad that weird pulse messed up your ship and stranded you here!!!", CONTENT_AI, EMOTE_NULL,
      "Um.... thanks, Cris.", CONTENT_AI, EMOTE_NULL,
      "I'm gonna go build a supercharger now.", CONTENT_PLAYER, EMOTE_NULL,
      "Good luck, bestie!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Hey, friend! Guess what guess what guess what!", CONTENT_AI, EMOTE_NULL,
      "Um... ", CONTENT_AI, EMOTE_NULL,
      "While you were asleep, I installed your fancy new supercharger!", CONTENT_AI, EMOTE_NULL,
      "What?! Cris, I still needed to run some tests!", CONTENT_AI, EMOTE_NULL,
      "Oh, calm down, silly. The charger is working great!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Wow. It's actually working!", CONTENT_PLAYER, EMOTE_NULL,
      "Can we model it?", CONTENT_PLAYER, EMOTE_NULL,
      "Let's do it!!!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "This is our baseline from yesterday.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "And here's the new data!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Time to label our model!", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Hmmm. That doesn't seem right.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Ooooh, nice work!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Here's your constant.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Oooh more data! Can I see???", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Sorry, bestie. That's not right.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Let's compare our new data with our baseline.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Wow! The new charger is working great!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Told you so.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "No improvement this level.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_PLAYER, EMOTE_NULL,
      "Cris, can we go back to the crystal count model?", CONTENT_PLAYER, EMOTE_NULL,
      "I need to predict if I'm gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
      "Ooh, great idea, bestie!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Hey bestie! Ready to see how our bots are doing?", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "I've been workin' on the railroad, all the livelong day... 🎵 ", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "I've been workin' on the railroad, just to pass the time away... 🎵 ", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Go ahead, pick the labels!", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Hmmm. That's not right.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Ok! Let's see if you're still doomed!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "Match the data!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Submit your data!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Uh oh.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Looks like you're still gonna die.", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "No improvements this level.", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      "Welp, I'm super tired. See you tomorrow!", CONTENT_AI, EMOTE_NULL,
      "What??? Cris, we need to keep working!", CONTENT_PLAYER, EMOTE_NULL,
      "Do you ever stay awake for more than 5 minutes?!", CONTENT_PLAYER, EMOTE_NULL,
      "Hey, I keep this whole base running AND I'm super fun.", CONTENT_PLAYER, EMOTE_NULL,
      "You can't expect me to do everything!", CONTENT_PLAYER, EMOTE_NULL,
      "So I'm supposed to just wait around until tomorrow?", CONTENT_PLAYER, EMOTE_NULL,
      "Yep! Thanks, bestie! Sweet dreams!", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Hey, bestie! I've got good news!", CONTENT_AI, EMOTE_NULL,
      "Are you sure you have time to tell me?", CONTENT_AI, EMOTE_NULL,
      "Don't you need another nap?", CONTENT_AI, EMOTE_NULL,
      "Awww, you really do care!!!", CONTENT_AI, EMOTE_NULL,
      "Don't worry. I'm wide awake!", CONTENT_AI, EMOTE_NULL,
      "I was being... nevermind. What's the news?", CONTENT_AI, EMOTE_NULL,
      "The bots are coming back from the mine with some leftover charge!", CONTENT_AI, EMOTE_NULL,
      "Check it out!", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "The extra charge means the bots are charging up faster!", CONTENT_AI, EMOTE_NULL,
      "Come on, let's model it!!!!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "You need enough fuel before your oxygen runs out.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data I have on the subject.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
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
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
      "Goodnight!", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    pre_context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning! Here's what happened.", CONTENT_AI, EMOTE_NULL,
    ],
    context: //LAB: context animation on-screen
    [
      "Here they are mining.", CONTENT_AI, EMOTE_NULL,
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
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
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
