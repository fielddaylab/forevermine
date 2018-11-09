var trigger_click = {
  type:TRIGGER_CLICK,
  fn:noop,
  state:0,
};
var trigger_timer = {
  type:TRIGGER_TIMER,
  fn:noop,
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
  {
    //LEVEL 1
    pre_text:
    [
      "Good morning, new best friend!!!", SPEAKER_AI, EMOTE_NULL,
      "Gemma, I only have X days of oxygen left. I need to figure out if the robots can harvest enough crystals in time.", SPEAKER_PLAYER, EMOTE_NULL,
      "Ooh! I've got a model for that!", SPEAKER_AI, EMOTE_NULL,
    ],
    text:
    [
      "My owners used this model back when the mine was still operating.",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "Wasn't that 200 years ago?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Yep! 😂",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "You'll probably need to make some adjustments.",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "Here's the data from last night!",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "What should I do?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "It's easy! Just change the numbers on the equation.",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "We need the modeled data to match our collected data.",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "Ok. Thanks, Gemma.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "You can do this, bestie! 🤗",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Submit your data to me when you figure it out!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
    ],
    correct_text:
    [
      "YAYAYAY! You did it! 🙌",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Oh, and also it looks like you're gonna die.",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "😬😬😬",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
    ],
    incorrect_text:
    [
      "Those numbers don't match, silly! Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    post_text:
    [
      "Wheee! That was fun!", SPEAKER_AI, EMOTE_NULL,
      "Why don't you get some sleep, friend? I'm sure you'll feel better in the morning!", SPEAKER_AI, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 2
    pre_text:
    [
      "Good morning, bestie! Wanna play?", SPEAKER_AI, EMOTE_NULL,
      "Awwww, don't be sad. The robots started bringing back TONS of crystals last night.", SPEAKER_AI, EMOTE_NULL,
      "Maybe you won't die after all!", SPEAKER_PLAYER, EMOTE_NULL,
    ],
    text:
    [
      "Check it out! We're harvesting crystals super fast!",  SPEAKER_AI, EMOTE_NULL,get_timer(200),
      "Wow, that's great!",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "The robots must've hit a super concentrated pocket of crystals!",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Yep! 😊",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Our straight-line model wasn't accurate anymore, so I switched to a curved line!",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "Ok. What should I do?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Adjust the model until the numbers match up!",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "Here's the new data.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Good luck, bestie! 🤞",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    correct_text:
    [
      "You did it! 🎉",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Looks like you're not gonna die after all!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Well, not right now.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    incorrect_text:
    [
      "Nope! Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    post_text:
    [
      "At this rate, I'll be out of here in no time!", SPEAKER_PLAYER, EMOTE_NULL,
      "I better go get my ship ready.", SPEAKER_PLAYER, EMOTE_NULL,
      "Wait... already? You just got here.", SPEAKER_AI, EMOTE_NULL,
      "Don't worry, Gemma. My mothership is waiting to send down brand-new robots. You'll have lots of playmates soon!", SPEAKER_PLAYER, EMOTE_NULL,
      "See you tomorrow!", SPEAKER_PLAYER, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 3
    pre_text:
    [
      "Good morning, sleepyhead!", SPEAKER_AI, EMOTE_NULL,
      "Hey Gemma! How are those little bots doing??", SPEAKER_PLAYER, EMOTE_NULL,
      "Welllll... about that. I've got some bad news.", SPEAKER_AI, EMOTE_NULL,
    ],
    text:
    [
      "The robots are bringing back less and less crystals every hour. 😞",  SPEAKER_AI, EMOTE_NULL,get_timer(100),
      "Oh no! We must be reaching the end of the pocket of crystals.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Can we adjust our model to fit the new data?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Great idea, friend!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "We make such a good team! 😍",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Here's your data.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Thanks, Gemma.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "🎵 The more we get together, together, together...",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "Gemma, are you... singing?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "🎵 The more we get together, the happier we'll be!",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
    ],
    correct_text:
    [
      "Welp, looks like you're doomed. 🤷",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
    ],
    incorrect_text:
    [
      "Nope, those numbers don't match! Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    post_text:
    [
      "What's the plan, bestie?", SPEAKER_AI, EMOTE_NULL,
      "I'm gonna build something to help the robots work faster.",  SPEAKER_PLAYER, EMOTE_NULL,
      "Do you have a model for the robots' batteries?", SPEAKER_PLAYER, EMOTE_NULL,
      "Sure! Well, I think so. Probably.", SPEAKER_AI, EMOTE_NULL,
      "Come back tomorrow. I'll see what I can dig up!", SPEAKER_AI, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 4
    pre_text:
    [
      "There you are, friend! What took so long?! Where were you?!", SPEAKER_AI, EMOTE_NULL,
      "Um... I was sleeping.", SPEAKER_AI, EMOTE_NULL,
      "BOR-ing. I've got something cool to show you!", SPEAKER_AI, EMOTE_NULL,
    ],
    text:
    [
      "Check it out!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "My owners used this model to make predictions about the robots' battery power!",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "It's from wayyyy back when people lived here, so you'll need to fix it up...",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "Gemma, this is perfect!",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "😊",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "It's weird. The mine seems operational. Why did everybody leave?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "😭😭😭",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "I was just wondering...",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "😭😭😭",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Ok, fine. Sorry I asked. Can I have the data?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Oooh, sure! Here ya go!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    correct_text:
    [
      "Yay! Great job! 🎉",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    incorrect_text:
    [
      "Nope, those numbers don't match! Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
    ],
    post_text:
    [
      "The bots are wasting a LOT of time charging their batteries.", SPEAKER_PLAYER, EMOTE_NULL,
      "I bet I can make a supercharger to speed things up!", SPEAKER_PLAYER, EMOTE_NULL,
      "Ooh, that's so cool! 🤩 Good luck, bestie!", SPEAKER_AI, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 5
    pre_text:
    [
      "Hey friend! Guess what guess what guess what!", SPEAKER_AI, EMOTE_NULL,
      "While you were asleep, I installed your fancy new supercharger!", SPEAKER_AI, EMOTE_NULL,
      "What?! Gemma, I still needed to run some tests!", SPEAKER_PLAYER, EMOTE_NULL,
      "Hmmm. 🤔 I think the words you're looking for are, Thank you, Gemma.", SPEAKER_AI, EMOTE_NULL,
      "By the way, the new coil is working great. Check it out!", SPEAKER_AI, EMOTE_NULL,
    ],
    text:
    [
      "I already collected some data. The bots are drilling super fast!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "I guess that's good.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Told you so! 😜",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Here's the new data.",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Go ahead, make your prediction!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "🎵 I've been workin' on the railroad, all the livelong day...",  SPEAKER_AI, EMOTE_NULL,get_timer(200),
      "🎵 I've been workin' on the railroad, just to pass the time away...",  SPEAKER_AI, EMOTE_NULL,get_timer(200),
    ],
    correct_text:
    [
      "Nice work, friend!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    incorrect_text:
    [
      "Silly human! Those numbers don't match. Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(1),
    ],
    post_text:
    [
      "Wow. The new charger is working great! Thanks for your help, Gemma.", SPEAKER_PLAYER, EMOTE_NULL,
      "Ha! Don't mention it, friend 😇", SPEAKER_AI, EMOTE_NULL,
      "See you tomorrow!", SPEAKER_AI, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 6
    pre_text:
    [
      "Hey Gemma! What's our status?", SPEAKER_PLAYER, EMOTE_NULL,
      "😬😬😬", SPEAKER_AI, EMOTE_NULL,
      "Um... turns out that mayyyyybe you were right about running some tests.", SPEAKER_AI, EMOTE_NULL,
      "Your supercharger blew the converter. The bots are taking FOREVER to charge.", SPEAKER_AI, EMOTE_NULL,
      "Please don't be mad!", SPEAKER_AI, EMOTE_NULL,
      "It's ok, Gemma. Let's just keep working.", SPEAKER_PLAYER, EMOTE_NULL,
      "Can you pull up a model to look at how fast the bots are charging now?", SPEAKER_PLAYER, EMOTE_NULL,
      "Anything for you, bestie!", SPEAKER_AI, EMOTE_NULL,

    ],
    text:
    [
      "Why does this model look different than yesterday?", SPEAKER_PLAYER, EMOTE_NULL,
      "Oh! Let me explain. I'm super smart, you know.",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Yesterday we were looking at bots leaving from the base.",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Turns out the bots from out in the mine are coming back in with some leftover charge!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Ok. That might help a little.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Let's see if it's enough.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,

    ],
    correct_text:
    [
      "Wow! You're great at this!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "I love playing with you!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Seriously?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Gemma, at this rate I'm never gonna make it off this planet.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Suuuuure... but we're doing our best! That's all that matters!",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
    ],
    incorrect_text:
    [
      "That's not right. Try again!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
    ],
    post_text:
    [
      "Cheer up, friend! Wanna play a game?", SPEAKER_AI, EMOTE_NULL,
      "Sorry, Gemma. I need some time alone to think. I'll see you tomorrow.", SPEAKER_PLAYER, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 7
    pre_text:
    [
      "Gemma, wake up!", SPEAKER_PLAYER, EMOTE_NULL,
      "Five more minutes... 😴 ", SPEAKER_AI, EMOTE_NULL,
      "Last night I found a huge crate of extra-large drill bits!", SPEAKER_PLAYER, EMOTE_NULL,
      "They look super strong.", SPEAKER_PLAYER, EMOTE_NULL,
      "Ooh, I remember those!", SPEAKER_AI, EMOTE_NULL,
      "Those drill bits will DEFINITELY help the bots mine faster!", SPEAKER_AI, EMOTE_NULL,
      "Yes!! Let's make another model!", SPEAKER_PLAYER, EMOTE_NULL,

    ],
    text:
    [
      "Before we install the new drill bits, we need a baseline.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Let's look at the drills we're using right now.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Eeee this is so much fun!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Here's the data!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
    ],
    correct_text:
    [
      "Hooray! Nice work! 🎉",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "I like playing with you!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "This isn't a game, Gemma.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Ha! That's what losers say! 😜",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    incorrect_text:
    [
      "Nope. Try again!",  SPEAKER_AI, EMOTE_NULL,get_timer(1),
    ],
    post_text:
    [
      "My oxygen is running low. I wish I could run more tests, but there's no time.", SPEAKER_PLAYER, EMOTE_NULL,
      "Can you install the new drill bits tonight?", SPEAKER_PLAYER, EMOTE_NULL,
      "Sure thing, bestie! Don't worry. It's all gonna work out!", SPEAKER_AI, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 8
    pre_text:
    [
      "Gemma! What's going on out there?!", SPEAKER_PLAYER, EMOTE_NULL,
      "Good morning, friend! The new drill bits are working GREAT!", SPEAKER_AI, EMOTE_NULL,
      "Are you serious? Gemma, half the bots are dead out there!", SPEAKER_PLAYER, EMOTE_NULL,
      "Well, yeah, obviously. Those fancy drill bits burn through power like crazy!", SPEAKER_AI, EMOTE_NULL,
      "What?! Why didn't you tell me?", SPEAKER_PLAYER, EMOTE_NULL,
      "We need to make a new model. Now.", SPEAKER_PLAYER, EMOTE_NULL,
    ],
    text:
    [
      "I need the data for the new drill bits.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Are you mad at me?",  SPEAKER_AI, EMOTE_NULL,get_timer(200),
      "No.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "You ARE mad! 😭",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "I need the data, Gemma.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "You asked me if the new drill bits would help the robots dig faster. I told you the truth!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "You never said ANYTHING about power!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Please can't we still be friends??",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Gemma, I'm not mad. We're still friends. I don't blame you. Now can I PLEASE have the data?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "K.",  SPEAKER_AI, EMOTE_NULL,get_timer(200),
    ],
    correct_text:
    [
      "😬😱😓",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Um, on the bright side, you're becoming a modeling expert! Yay!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "This is a disaster.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Yeah. Kinda.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    incorrect_text:
    [
      "That's not right! Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(1),
    ],
    post_text:
    [
      "We need to fix this, Gemma. Let's just go back to the old drill bits.", SPEAKER_PLAYER, EMOTE_NULL,
      "Um...", SPEAKER_AI, EMOTE_NULL,
      "What. Now.", SPEAKER_PLAYER, EMOTE_NULL,
      "Well, the old drill bits were SUPER rusty.", SPEAKER_AI, EMOTE_NULL,
      "So... I jettisoned them into space.", SPEAKER_AI, EMOTE_NULL,
      "OK GOTTA GO BYE!", SPEAKER_AI, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 9
    pre_text:
    [
      "Good morning, sunshine! 🌞", SPEAKER_AI, EMOTE_NULL,
      "Sunshine... Gemma, that's it! What if we build solar panels for the bots?", SPEAKER_PLAYER, EMOTE_NULL,
      "Build solar panels? Ugh, boring. Besides, why would you waste your time? We've already got a million solar panels.", SPEAKER_AI, EMOTE_NULL,
      "What???", SPEAKER_PLAYER, EMOTE_NULL,
      "Yeah, the robots have little built-in solar panels! It's soooo cute!", SPEAKER_AI, EMOTE_NULL,
      "Um... did I forget to tell you that?", SPEAKER_AI, EMOTE_NULL,
    ],
    text:
    [
      "Ok! The robots are now running on solar power, instead of batteries.",  SPEAKER_AI, EMOTE_NULL,get_timer(100),
      "See? I'm helping!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Um, Gemma...",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Don't take this wrong, but is there anything else important that you're forgetting to tell me?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Ummm.... I can't remember. 🙃",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Here's the new data!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Ok. Let's get this over with.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
    ],
    correct_text:
    [
      "You did it! Great job, bestie!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "The solar panels worked better than the batteries, but it's still not enough.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Wellll... at least we're together! My mom always said that two are better than one!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    incorrect_text:
    [
      "That's not right! Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(1),
    ],
    post_text:
    [
      "So what's the new plan?", SPEAKER_AI, EMOTE_NULL,
      "I need to think. I'm running out of time. See you tomorrow, Gemma.", SPEAKER_PLAYER, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 10
    pre_text:
    [
      "Hey, friend! Sorry that you're gonna die!", SPEAKER_AI, EMOTE_NULL,
      "Actually, you gave me an idea!", SPEAKER_PLAYER, EMOTE_NULL,
      "Wha?? Me?", SPEAKER_AI, EMOTE_NULL,
      "Two are better than one, remember? What if we use BOTH power sources together?", SPEAKER_PLAYER, EMOTE_NULL,
      "We'll use the solar panels to charge the robots' batteries!", SPEAKER_PLAYER, EMOTE_NULL,
      "Oh... well... that sounds like a lot of work...", SPEAKER_AI, EMOTE_NULL,
      "Come on, Gemma. Do you want me to get off this planet or not? Let's make a new model!", SPEAKER_PLAYER, EMOTE_NULL,
    ],
    text:
    [
      "All we ever do is make models. Can't we play something else?",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Stop messing around. Did you activate both power sources?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Hello? Gemma?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Fiiiine. The robots' batteries are now being continuously charged by the solar panels.",  SPEAKER_AI, EMOTE_NULL,get_timer(120),
      "Can I have the new data?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Here.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Shouldn't we be doing other best friend stuff?",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Like... can we go get an ice cream cone or something?",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "I know there's no ice cream on this planet.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "And ok, I don't have an actual body.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "But it's the thought that counts! 🍦🍦🍦",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    correct_text:
    [
      "🙄 You got it right. Hooray.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Wow, that actually worked!",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
    ],
    incorrect_text:
    [
      "That's not right! Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(1),
    ],
    post_text:
    [
      "That worked great! Tomorrow we'll see if it'll be enough.", SPEAKER_PLAYER, EMOTE_NULL,
      "Soooo... what happens if you leave?", SPEAKER_AI, EMOTE_NULL,
      "Let's not get ahead of ourselves, Gemma. We don't even know if this is gonna work.", SPEAKER_PLAYER, EMOTE_NULL,
      "Would you come back and visit me?", SPEAKER_AI, EMOTE_NULL,
      "My old owners never visit. But they weren't as nice as you...", SPEAKER_AI, EMOTE_NULL,
      "Gemma, I'm exhausted. Let's talk about this tomorrow.", SPEAKER_PLAYER, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 11
    pre_text:
    [
      "Good morning, bestie!", SPEAKER_AI, EMOTE_NULL,
      "This is it, Gemma. We've made all the adjustments we can.", SPEAKER_PLAYER, EMOTE_NULL,
      "Can you pull up a model to see how many crystals we'll collect?", SPEAKER_PLAYER, EMOTE_NULL,
      "I need to know if I'm gonna make it.", SPEAKER_PLAYER, EMOTE_NULL,
    ],
    text:
    [
      "Here you go. All the data we've got.",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Thanks, Gemma. Here goes nothing.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "You know, I'm starting to feel like you're just using me 😡",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "I'll be so BORED if you leave!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "The robots are cute and all.",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "But all they do is mine crystals and make little beeping noises, so we can't exactly have a conversation.",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Are you even listening to me???",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    correct_text:
    [
      "Wow... that actualy worked!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "YES!!! I'm gonna make it!", SPEAKER_PLAYER, EMOTE_NULL,
    ],
    incorrect_text:
    [
      "Not even close. Try again.",  SPEAKER_AI, EMOTE_NULL,get_timer(1),
    ],
    post_text:
    [
      "So that's it? You're leaving?!", SPEAKER_AI, EMOTE_NULL,
      "I won't have enough crystals until tomorrow morning. Then I'll be going.", SPEAKER_PLAYER, EMOTE_NULL,
      "I'm sorry, Gemma. I was never supposed to stay here for more than a few days.", SPEAKER_PLAYER, EMOTE_NULL,
      "You know, I just remembered. There's something I need to take care of.", SPEAKER_AI, EMOTE_NULL,
      "Gemma?", SPEAKER_PLAYER, EMOTE_NULL,
      "Thank you for everything.", SPEAKER_PLAYER, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 12
    pre_text:
    [
      "Gemma! What was that huge blast?", SPEAKER_PLAYER, EMOTE_NULL,
      "You're heeeere! Best--friends--forever!", SPEAKER_AI, EMOTE_NULL,
      "That pulse destroyed half the robots! What am I gonna do?", SPEAKER_PLAYER, EMOTE_NULL,
      "🎶 The itsy bitsy spider went up the water spout...", SPEAKER_AI, EMOTE_NULL,
      "Pull up our model, Gemma. I need to see how bad the damage is.", SPEAKER_PLAYER, EMOTE_NULL,
    ],
    text:
    [
      "Oh noooo.",  SPEAKER_AI, EMOTE_NULL,get_timer(40),
      "I don't fe-el so good 🤢",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "It's so weird. That pulse was just like the one that stranded me here.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Hahahaha wAS it? I didn't no-tice!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "Hang in there, Gemma. Can you pull up the data?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Focus, Gemma. I need your help.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Here's yOur dAta! Wheee!",  SPEAKER_AI, EMOTE_NULL,get_timer(40),
      "🎶 Down came the rain and washed the spider out...",  SPEAKER_AI, EMOTE_NULL,get_timer(40),
      "ThaT was SO-ME blast!",  SPEAKER_AI, EMOTE_NULL,get_timer(40),
      "YoU are ju-st stuck here now!",  SPEAKER_AI, EMOTE_NULL,get_timer(40),
      "I gue-ss now we can han-g out fo-rever!",  SPEAKER_AI, EMOTE_NULL,get_timer(40),
    ],
    correct_text:
    [
      "Ha! It wo-rked!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "What worked?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Oops. 🤐",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "That blast! It was you?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "You wERe goNna le-ave me!!! No-thing else was wORKing!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "The first pulse that stranded me here. Was that you, too?",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "😩😩😩",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "It ge-ts SO LONELY here!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    incorrect_text:
    [
      "Noooooope!",  SPEAKER_AI, EMOTE_NULL,get_timer(1),
    ],
    post_text:
    [
      "I can't believe this, Gemma. I'm gonna die here!", SPEAKER_PLAYER, EMOTE_NULL,
      "SiLLy hu-man! You'll be fINe. This pla-net has TONS of oxygen tanks!", SPEAKER_AI, EMOTE_NULL,
      "Wha... but... why didn't you tell me?!", SPEAKER_PLAYER, EMOTE_NULL,
      "You would've stop-ped playing with me!", SPEAKER_AI, EMOTE_NULL,
      "Mothership to Surveyer 1, do you copy?", SPEAKER_AI, EMOTE_NULL,
      "Whooooops lo-oks like my coMMUnicATor is ba-ck up...", SPEAKER_AI, EMOTE_NULL,
      "Help! I'm stuck here with a crazy AI! Send down the new mining bots, stat!", SPEAKER_PLAYER, EMOTE_NULL,
      "Copy that, Surveyer 1. Sending the bots now.", SPEAKER_PLAYER, EMOTE_NULL,
    ],
  },

  {
    //LEVEL 13
    pre_text:
    [
      "Friend!! I'm feeling much better today!", SPEAKER_AI, EMOTE_NULL,
      "Can I help you with anything?", SPEAKER_AI, EMOTE_NULL,
      "I'm feeling a teeeeeeny bit guilty about trying to strand you here forever.", SPEAKER_AI, EMOTE_NULL,
      "The new robots are here. I need to figure out how many bots I need to activate in order to get off this planet today.", SPEAKER_PLAYER, EMOTE_NULL,
      "Can you make a model for that?", SPEAKER_PLAYER, EMOTE_NULL,
      "And NOT blow anything up? Please?", SPEAKER_PLAYER, EMOTE_NULL,
      "You got it, friend!", SPEAKER_AI, EMOTE_NULL,
    ],
    text:
    [
      "You can use this model to predict how many new robots you'll need!",  SPEAKER_AI, EMOTE_NULL,get_timer(100),
      "Some of the new bots have already started mining, so I collected their data overnight.",  SPEAKER_AI, EMOTE_NULL,get_timer(100),
      "PLEASE DON'T HATE ME! 😭😭😭",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Thanks, Gemma.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "In a weird way, I'm actually gonna miss you.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Awwwwwww. 😍 I love you too, best friend!",  SPEAKER_AI, EMOTE_NULL,get_timer(100),
      "Here's your data!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "I was never gonna let you get hurt, you know.",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
      "I was just so BORED!",  SPEAKER_AI, EMOTE_NULL,get_timer(80),
    ],
    correct_text:
    [
      "Great job, friend. You solved it!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Activating the bots now!",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
      "Thanks, Gemma. I couldn't have done this without you.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "Although I wouldn't have been stuck here without you, either.",  SPEAKER_PLAYER, EMOTE_NULL,trigger_click,
      "😅😂🙃",  SPEAKER_AI, EMOTE_NULL,get_timer(60),
    ],
    incorrect_text:
    [
      "Nope, try again!",  SPEAKER_AI, EMOTE_NULL,get_timer(1),
    ],
    post_text:
    [
      "Ok. I've got enough crystals to fuel my ship. So I guess this is good-bye.", SPEAKER_PLAYER, EMOTE_NULL,
      "Can't you stay one more day?", SPEAKER_AI, EMOTE_NULL,
      "My ship is waiting for me, Gemma.", SPEAKER_PLAYER, EMOTE_NULL,
      "😢🤗😭💔.", SPEAKER_AI, EMOTE_NULL,
      "Although...", SPEAKER_PLAYER, EMOTE_NULL,
      "My ship does have an AI capacity. I could upload you to my mainframe.", SPEAKER_AI, EMOTE_NULL,
      "Wha????? I could come with you?", SPEAKER_AI, EMOTE_NULL,
      "WAHOOOO!!! I can help you with your science-y work! We'll be the best team ever!", SPEAKER_AI, EMOTE_NULL,
      "I don't know, Gemma. After everything, how can I trust you?", SPEAKER_PLAYER, EMOTE_NULL,
      "I was just lonely. Give me another chance! I won't let you down!", SPEAKER_AI, EMOTE_NULL,
      "Please please please!", SPEAKER_AI, EMOTE_NULL,
    ],
  },

];

var used_text = english_text;

