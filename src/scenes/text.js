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
      "Hooray!!!!! 🎉🎉🎉 Finally, someone to talk to!", CONTENT_AI, EMOTE_NULL,
      "Wha... What happened? Who are you?", CONTENT_PLAYER, EMOTE_NULL,
      "I'm Cris!", CONTENT_AI, EMOTE_NULL,
      "Well, Crystal Intake Specialist, but that's boring.", CONTENT_AI, EMOTE_NULL,
      "My... my head feels funny.", CONTENT_PLAYER, EMOTE_NULL,
      "Awww, poor human. You need some rest! Want some chicken soup?", CONTENT_AI, EMOTE_NULL,
      "(I don't have any soup, so please say no.)", CONTENT_AI, EMOTE_NULL,
      "Ugh. I feel like I'm forgetting something important... ", CONTENT_PLAYER, EMOTE_NULL,
      "Oh no!!! My oxygen levels. I only have 14 days left!", CONTENT_PLAYER, EMOTE_NULL,
      "Don't worry, new best friend. I'll help you!", CONTENT_AI, EMOTE_NULL,
      "Check it out! While you were passed out, I got the old robots mining again.", CONTENT_AI, EMOTE_NULL,
      "Look at them go! 💕💕💕", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "This is great, Cris. If we mine enough fuel, I can power my ship!", CONTENT_PLAYER, EMOTE_NULL,
      "Can we predict if the bots are working fast enough?", CONTENT_PLAYER, EMOTE_NULL,
      "Sure! I've got the perfect tool for that!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(100), "This is a model!", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "We can use it to predict crystal collection.", CONTENT_AI, EMOTE_NULL,
      get_timer(100), "My owners used this model all the time!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Your owners... ", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "You mean 200 years ago?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(100), "Yep! 😂", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You'll need to make some adjustments.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Can't you do it?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Sorry, bestie. That's not in my programming!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Ughhh. My head.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Don't worry. I'll talk you through it!!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the mining data.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Drag it over to the table!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      trigger_click, "Ok. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "You need to label our equation!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Go ahead. Give it a try!", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(120), "Silly human! That's not right.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(120), "Yayayay! You did it!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You ok, friend?", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You look like you need to lie down... ", CONTENT_AI, EMOTE_NULL,
      trigger_click, "I'm fine, Cris. What now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Here's our initial crystal count.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Initial", CONTENT_CONSTANT, 4,
      get_timer(120), "Drag the number into our equation.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Then change the rate so our data matches up!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Ok, now show me your data!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "I'll run the numbers, and we'll see if you're doomed!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(120), "Those numbers don't match, silly!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Yippee! You just made a model!", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Yippee?!", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Cris, look at day 14.", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Oh, the fuel thing!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Yep, you're totally gonna die.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(120), "😬😬😬", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Awww, don't look so sad, friend. At least we're having fun!", CONTENT_AI, EMOTE_NULL,
      "I need to... need to figure out... ", CONTENT_PLAYER, EMOTE_NULL,
      "Bestie? Can you hear me? You look a little... ", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //crystal increase
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning, sleepyhead! Feeling better?", CONTENT_AI, EMOTE_NULL,
      "I think so.", CONTENT_PLAYER, EMOTE_NULL,
      "Good! I've got a surprise for you!", CONTENT_AI, EMOTE_NULL,
      "While you were sleeping, I adjusted the robots' course.", CONTENT_AI, EMOTE_NULL,
      "They found a HUGE pocket of crystals!", CONTENT_AI, EMOTE_NULL,
      "They're bringing back crystals super fast!", CONTENT_AI, EMOTE_NULL,
      "Well? Are you happy???", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Wow! Thanks, Cris. I might actually survive!", CONTENT_PLAYER, EMOTE_NULL,
      "Anything for you, bestie!!! 😍💕🤗", CONTENT_AI, EMOTE_NULL,
      "Can we make a new prediction?", CONTENT_PLAYER, EMOTE_NULL,
      "I thought you'd never ask!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "This is our model from yesterday.", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(120), "Here's the new data from last night!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(120), "Silly human! That's not right.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      trigger_click, "Um... I can't remember.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "What should I do now?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Oh, it's easy!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "This is our Initial Crystal Count.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Initial", CONTENT_CONSTANT, 4,
      get_timer(120), "Drag the number into the equation!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You just need to figure out the new rate.", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Show me your data when you're done!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "I'll run the numbers and we'll see if you're gonna make it!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(120), "Silly! Those numbers don't match. Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Yay! Nice job, bestie! 🎉🎉🎉", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "You're a natural at this.", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Cris, look at the graph! I'm gonna make it!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Yesss! I knew I could cheer you up!", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "At this rate, I'll be off this planet by tomorrow night!", CONTENT_PLAYER, EMOTE_NULL,
      "Oh... wait... tomorrow? Isn't that kinda fast?", CONTENT_AI, EMOTE_NULL,
      "Good point, Cris. I should go get my ship ready!", CONTENT_PLAYER, EMOTE_NULL,
      "Or..... you could, I don't know... just hang out here for a bit?", CONTENT_AI, EMOTE_NULL,
      "Thanks, Cris. But you don't need to worry about me! I'm feeling much better.", CONTENT_PLAYER, EMOTE_NULL,
      "See you tomorrow!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //crystal return to normal
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Eeee! You're back!", CONTENT_AI, EMOTE_NULL,
      "Good morning, Cris! How are those little bots doing?", CONTENT_PLAYER, EMOTE_NULL,
      "Um... 😬😬😬", CONTENT_AI, EMOTE_NULL,
      "Oh no. What happened?", CONTENT_AI, EMOTE_NULL,
      "The pocket of crystals must've run out.", CONTENT_AI, EMOTE_NULL,
      "The bots are mining suuuper slow.", CONTENT_AI, EMOTE_NULL,
      "I'm sorry, bestie. 😢", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "It's not your fault, Cris. ", CONTENT_PLAYER, EMOTE_NULL,
      "Can we predict if I'm still gonna make it?", CONTENT_PLAYER, EMOTE_NULL,
      "Oooh! Sounds like fun!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(120), "We make such a good team!!! 😍", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "The more we get together, together, together... 🎵", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Cris, are you... singing?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "The more we get together, the happier we'll be! 🎵", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      trigger_click, "Um... yeah.", CONTENT_PLAYER, EMOTE_NULL,
      trigger_click, "Can I have the new data, please, Cris?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(120), "Oh, right! Here ya go!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(120), "Nope! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(120), "Here's our crystal count.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Initial", CONTENT_CONSTANT, 4,
      get_timer(120), "Go ahead! You know the drill.", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Ha.... get it? The DRILL?", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "🤣🤣🤣🤣", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(120), "Show me your data when you're ready!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(120), "Nope! Those numbers don't match. Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(120), "Hooray!!! Nice job, bestie!", CONTENT_AI, EMOTE_NULL,
      get_timer(120), "Eeeek. You don't look happy.", CONTENT_AI, EMOTE_NULL,
      trigger_click, "Look at Day 14 on the graph, Cris.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(120), "Ohhh, yeah. Looks like you're doomed. 🤷", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Look on the bright side. At least you did your best!", CONTENT_PLAYER, EMOTE_NULL,
      "I'm not giving up.", CONTENT_PLAYER, EMOTE_NULL,
      "I'm a material scientist. I can build something to help the bots work faster!", CONTENT_PLAYER, EMOTE_NULL,
      "Any ideas, Cris?", CONTENT_PLAYER, EMOTE_NULL,
      "Eeee! This is so exciting!", CONTENT_AI, EMOTE_NULL,
      "Here are some things we can work on!", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "Ok. Let's start by looking at the batteries.", CONTENT_PLAYER, EMOTE_NULL,
      "Sure! You're in charge here!", CONTENT_AI, EMOTE_NULL,
      "Get it? In CHARGE?? 🙃", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //check out battery
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Try to stay focused, Cris.", CONTENT_AI, EMOTE_NULL,
      "We need to look at how fast the robots are charging up.", CONTENT_AI, EMOTE_NULL,
      "Oooh! Sounds like fun!", CONTENT_AI, EMOTE_NULL,
      "I've been collecting data on the robots' batteries.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's model it!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the data!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      trigger_click, "So... I need to label the equation, right?", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "Yep!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "I've been workin' on the railroad, allll the livelong day... 🎵", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Nope! Try again, bestie.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Great job!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Here's our initial charge.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "See if you can get the data to match up!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Show me your data when you're ready!", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Silly human! Try again.", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      get_timer(20), "You did it!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "We've got our baseline!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "Wow. Those batteries are ancient!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "They are?", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Well, they were brand new 200 years ago... ", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Wheee! That was so much fun!", CONTENT_AI, EMOTE_NULL,
      "I'm so glad that super-mysterious pulse messed up your ship and stranded you here!", CONTENT_AI, EMOTE_NULL,
      "Um... thanks, Cris.", CONTENT_AI, EMOTE_NULL,
      "I'm gonna build some new batteries now.", CONTENT_AI, EMOTE_NULL,
      "Good luck, bestie! 🤞", CONTENT_AI, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //improve charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Good morning, best friend!!!", CONTENT_AI, EMOTE_NULL,
      "Yikes. You look awful.", CONTENT_AI, EMOTE_NULL,
      "I was up all night working on the new batteries.", CONTENT_PLAYER, EMOTE_NULL,
      "I FINALLY got them installed a few hours ago.", CONTENT_PLAYER, EMOTE_NULL,
      "Oooooh, shiny!", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's pull up our model and see how your batteries are working!", CONTENT_AI, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Here's the new data!", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Hmmm. That doesn't seem right.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "We already know the Initial Charge.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Initial", CONTENT_CONSTANT, 4,
      get_timer(20), "You need to adjust the Rate!", CONTENT_AI, EMOTE_NULL,
    ],
    submit: //WORKSPACE: values matched; lead to submit
    [
      get_timer(20), "Ready to show me your data?", CONTENT_AI, EMOTE_NULL,
    ],
    submitted_incorrect: //WORKSPACE: submitted before values correct; reset
    [
      get_timer(20), "Sorry, bestie. Those numbers don't match.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "Try again!", CONTENT_AI, EMOTE_NULL,
    ],
    review: //WORKSPACE: submitted correct equation; lead to review survival chances
    [
      trigger_click, "Wow! The new batteries are working great!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      get_timer(20), "Yeah! And plus, the bots look super cool now. 😎", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "Wheee! That was amazing, friend!", CONTENT_AI, EMOTE_NULL,
      "Um... why don't you look happier?", CONTENT_AI, EMOTE_NULL,
      "We improved the batteries, but it might not be enough.", CONTENT_PLAYER, EMOTE_NULL,
      "Can you pull up the crystal collecting model?", CONTENT_PLAYER, EMOTE_NULL,
      "I need to predict if I'm gonna make it.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_PLAYER, EMOTE_NULL,
    ],
  },

  //check crystals
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "I'm rooting for you, friend!!!", CONTENT_AI, EMOTE_NULL,
      "The bots are hard at work.", CONTENT_AI, EMOTE_NULL,
    ],
    lets_go: //LAB: just shown context animation. lead into going to workspace.
    [
      "Let's see if it'll be enough!", CONTENT_PLAYER, EMOTE_NULL,
    ],
    status: //WORKSPACE: full "14 days" graph shown, w/ "survive/die" zones (unknown where you will land).
    [
      get_timer(20), "Here goes nothing!", CONTENT_AI, EMOTE_NULL,
    ],
    data: //WORKSPACE: graph zoomed into 10-hour scope. give data
    [
      get_timer(20), "Drag the data onto the table.", CONTENT_AI, EMOTE_NULL,
      get_timer(20), "DATA:", CONTENT_DATA, EMOTE_NULL,
    ],
    labels: //WORKSPACE: data imported, empty model framework shown. lead into "pick labels"
    [
      get_timer(120), "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
    labels_incorrect: //WORKSPACE: labels chosen incorrectly; reset
    [
      get_timer(20), "Hmmm. That's not right.", CONTENT_AI, EMOTE_NULL,
    ],
    constants: //WORKSPACE: labels chosen. show known constants, lead into "define unknowns"
    [
      get_timer(20), "Here's the initial crystal count.", CONTENT_AI, EMOTE_NULL,
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
      get_timer(20), "You did it! Great job, bestie!", CONTENT_AI, EMOTE_NULL,
    ],
    debrief: //WORKSPACE: draw conclusion based on review; lead back to lab
    [
      trigger_click, "I can't believe it. I'm gonna make it!", CONTENT_PLAYER, EMOTE_NULL,
      get_timer(20), "You are???", CONTENT_AI, EMOTE_NULL,
    ],
    improve: //LAB: show system
    [
      "So... um... when do you leave?", CONTENT_AI, EMOTE_NULL,
      "As soon as I've got enough crystals!", CONTENT_PLAYER, EMOTE_NULL,
      "Are you coming back tomorrow? We could keep working on the robots!", CONTENT_AI, EMOTE_NULL,
      "I'm sorry, Cris. I've got work to do before I leave.", CONTENT_PLAYER, EMOTE_NULL,
      "Don't be sorry, friend!", CONTENT_AI, EMOTE_NULL,
      "Besides, these things always seem to work out in the end.", CONTENT_PLAYER, EMOTE_NULL,
    ],
    post: //LAB: send to bed
    [
      "THIS SHOULD BE SKIPPED", CONTENT_AI, EMOTE_NULL,
    ],
  },

  //initial charge rate
  { //one level. copy and paste from this { to the following } to create a new level
    context: //LAB: you've just awoken. lead into show context animation.
    [
      "Hey, bestie! I've got good news!", CONTENT_AI, EMOTE_NULL,
      "Check it out!", CONTENT_AI, EMOTE_NULL,
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
