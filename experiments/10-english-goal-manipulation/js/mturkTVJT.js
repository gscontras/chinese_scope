function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start : function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
  slides.pretrial = slide({
    name : "pretrial",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
  
    slides.one_slider_practice = slide({
    name : "one_slider_practice",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
	  

	present : [
		{practice: {item: "cars", number: "2", story: "This story features a smurf, a salesman and five cars. The smurf decided that he wanted to buy a car. First the salesman showed him a silver convertible. The smurf liked it and purchased it for two pennies. The salesman then showed him a yellow car. The smurf liked it and also purchased it for two pennies. The smurf only had one penny left, so he decided he was finished purchasing.", sentence: "\"The smurf bought two cars.\"", question: "\"What happened to the smurf?\""}},
		{practice: {item: "dogs", number: "3", story: "This story features three dogs, a cat, and a table. The cat was asleep on the table, and the dogs decided to wake it up. The first dog jumped on the table, but the cat did not wake up. The second dog jumped on the table, but the cat still did not wake up. The third dog said he wasn't going to jump on the table because he was too small.", sentence: "\"All the dogs jumped on the table.\"", question: "\"What happened to the dogs?\""}},
	],

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
		//$("#p_justification").val('');
		$(".p_err").hide();
		$(".p_hidden").hide();
		$(".p_jerr").hide();
		$(".text_response").val('');
		$(".p_showButton").show();

		this.stim = stim; //I like to store this information in the slide so I can record it later.
		
		$("#practiceSentence").html(stim["practice"]["sentence"]);
		$("#practiceStory").html(stim["practice"]["story"]);
    $("#practiceQuestion").html(stim["practice"]["question"]);
    $("#practiceBin1").html(stim["practice"]["item"])
    $("#practiceBin2").html(stim["practice"]["item"])
    $("#practiceNumber").html(stim["practice"]["number"])   
  
		this.init_sliders();
      	exp.sliderPost = null;	  //erase current slider value
        function p_showButton() {
      		$(".p_hidden").show();
      		$(".p_showButton").hide();
    	}
	  
    },
	
	    button : function() {
		if (exp.sliderPost == null) {
			$(".p_err").show();
			} else {
				this.log_responses();

					/* use _stream.apply(this); if and only if there is
					"present" data. (and only *after* responses are logged) */
					_stream.apply(this);
		}
    },

    init_sliders : function() {
      utils.make_slider("#prac_single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "one_slider_practice",
        "response" : exp.sliderPost,
		//"justification" : $("#p_justification").val(),
		//put condition here as well
      });
    }
  });
  
  


  slides.one_slider = slide({
    name : "one_slider",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

  present : ([
  {item: "frogs",
    contexts: {two: {without: "This story features two frogs, a fence, and a rock. The two frogs decided to play a jumping game. First they looked at the fence, and they concluded that the fence was too big to jump over. Then they looked at the rock. The first frog decided to jump over the rock, but the other frog thought that the rock was also too big to jump over.", with: "This story features two frogs, a fence, and a rock. The two frogs decided to play a jumping game. First they looked at the fence. The first frog jumped over the fence. Then, the second frog jumped over the fence. Then they looked at the rock. The first frog decided to jump over the rock, but the other frog thought that the rock was too big to jump over."}, four: {without: "This story features four frogs, a fence, and a rock. The four frogs decided to play a jumping game. First they looked at the fence, and they concluded that the fence was too big to jump over. Then they looked at the rock. The first two frogs decided to jump over the rock, but the other two frogs thought that the rock was also too big to jump over.", with: "This story features four frogs, a fence, and a rock. The four frogs decided to play a jumping game. First they looked at the fence. The first frog jumped over the fence. Then, the second frog jumped over the fence. Then the third and the fourth frogs jumped over the fence. Then they looked at the rock. The first two frogs decided to jump over the rock, but the other two frogs thought that the rock was too big to jump over."}}, 
    QUDs: {many: "How many frogs jumped over the rock?", all: "Did all of the frogs jump over the rock?", none: "Did none of the frogs jump over the rock?"}, 
    goals: {many:"how many frogs jumped over rocks", all:"whether all the frogs jumped over rocks", none:"whether none of the frogs jumped over rocks"},
    bins: {many: {two: "<img src = \"expt_files/bins/Frog-story/Many-two/0-frogs-jump.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/Many-two/1-frog-jumps.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/Many-two/2-frogs-jump.png\" width=\"130\">", four: "<img src = \"expt_files/bins/Frog-story/Many-four/0-frogs-jump.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/Many-four/1-frog-jumps.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/Many-four/2-frogs-jump.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/Many-four/3-frogs-jump.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/Many-four/4-frogs-jump.png\" width=\"130\">"}, all: {two: "<img src = \"expt_files/bins/Frog-story/All-two/all-frogs-jump.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/All-two/some-frogs-didnt-jump.png\" width=\"130\">", four: ["<img src = \"expt_files/bins/Frog-story/All-two/all-frogs-jump.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/All-two/some-frogs-didnt-jump.png\" width=\"130\">"]}, none: {two: "<img src = \"expt_files/bins/Frog-story/None-two/no-frogs-jump.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/None-two/some-frogs-jump.png\" width=\"130\">", four: ["<img src = \"expt_files/bins/Frog-story/None-two/no-frogs-jump.png\" width=\"130\"><img src = \"expt_files/bins/Frog-story/None-two/some-frogs-jump.png\" width=\"130\">"]}},
    sentences: {every: "\"Every frog didn't jump over the rock.\"", numeral: "\"Two frogs didn't jump over the rock.\""}},
  {item: "butterflies",
    contexts: {two: {without: "This story features two butterflies, a forest, and a city. The two butterflies were deciding where to go. First, they thought about the forest. One butterfly did not like the forest, but the other one did. They decided not to go to the forest. The first butterfly decided to go to the city. The other butterfly decided to go home instead.", with: "This story features two butterflies, a forest, and a city. The two butterflies were deciding where to go. First, they thought about the forest, and decided to go. One butterfly did not like the forest, but the other one did. The butterfly who didn't like the forest decided to leave the forest and go to the city. The other butterfly decided to leave the forest and go home."}, four: {without: "This story features four butterflies, a forest, and a city. The four butterflies were deciding where to go. First, they thought about the forest. Two butterflies did not like the forest, but the other two did. They decided not to go to the forest. The first two butterflies decided to go to the city. The other two butterflies decided to stay at home.", with: "This story features four butterflies, a forest, and a city. The four butterflies were deciding where to go. First, they thought about the forest, and decided to go. Two of the butterflies did not like the forest, but the other two did. The butterflies who didn't like the forest decided to leave the forest and go to the city. The other two butterflies decided to leave the forest and go home."}}, 
    QUDs: {many: "How many butterflies went to the city?", all: "Did all of the butterflies go to the city?", none: "Did none of the butterflies go to the city?"}, 
    goals: {many:"how many butterflies went to the city", all:"whether all the butterflies went to the city", none:"whether none of the butterflies went to the city"},
    bins: {many: {two: "<img src = \"expt_files/bins/butterfly-story/many-two/0-butterflies-city.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/many-two/1-butterfly-city.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/many-two/2-butterflies-city.png\" width=\"130\">", four: "<img src = \"expt_files/bins/butterfly-story/many-four/0-butterflies-city.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/many-four/1-butterfly-city.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/many-four/2-butterflies-city.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/many-four/3-butterflies-city.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/many-four/4-butterflies-city.png\" width=\"130\">"}, all: {two: "<img src = \"expt_files/bins/butterfly-story/all-two/all-butterflies-went.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/all-two/some-butterflies-didnt-go.png\" width=\"130\">", four: ["<img src = \"expt_files/bins/butterfly-story/all-two/all-butterflies-went.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/all-two/some-butterflies-didnt-go.png\" width=\"130\">"]}, none: {two: "<img src = \"expt_files/bins/butterfly-story/none-two/no-butterfly-went.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/none-two/some-butterflies-went.png\" width=\"130\">", four: ["<img src = \"expt_files/bins/butterfly-story/none-two/no-butterfly-went.png\" width=\"130\"><img src = \"expt_files/bins/butterfly-story/none-two/some-butterflies-went.png\" width=\"130\">"]}},
    sentences: {every: "\"Every butterfly didn't go to the city.\"", numeral: "\"Two butterflies didn't go to the city.\""}},
  {item: "lions",
    contexts: {two: {without: "This story features two lions, eggs, cookies, and a store. The two lions went into the store. They asked the owner what he had that they could eat. The store owner showed them eggs and cookies. The first lion bought a cookie. The other lion didn't buy anything.", with: "This story features two lions, eggs, cookies, and store. The two lions went into the store looking for something to eat. They saw eggs and cookies. The two lions each bought an egg, and one of the lions also bought a cookie."}, four: {without: "This story features four lions, eggs, cookies, and a store. The four lions went into the store. They asked store owner what food he was selling. The store owner showed them eggs and cookies. The first two lions each bought a cookie. The other two lions didn't buy anything.", with: "This story features four lions, eggs, cookies, and a store. The four lions went into the store looking for something to eat. They saw eggs and cookies. All four lions bought eggs, and two of the lions bought cookies."}}, 
    QUDs: {many: "How many lions bought a cookie?", all: "Did all of the lions buy a cookie?", none: "Did none of the lions buy a cookie?"}, 
    goals: {many:"how many lions bought a cookie", all:"whether all the lions bought a cookie", none:"whether none of the lions bought a cookie"},
    bins: {many: {two: "<img src = \"expt_files/bins/lion-story/many-two/0-lions-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/many-two/1-lion-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/many-two/2-lions-buy.png\" width=\"130\">", four: "<img src = \"expt_files/bins/lion-story/many-four/0-lions-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/many-four/1-lion-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/many-four/2-lions-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/many-four/3-lions-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/many-four/4-lions-buy.png\" width=\"130\">"}, all: {two: "<img src = \"expt_files/bins/lion-story/all-two/all-lions-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/all-two/some-lions-didnt-buy.png\" width=\"130\">", four: ["<img src = \"expt_files/bins/lion-story/all-two/all-lions-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/all-two/some-lions-didnt-buy.png\" width=\"130\">"]}, none: {two: "<img src = \"expt_files/bins/lion-story/none-two/no-lions-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/none-two/some-lions-buy.png\" width=\"130\">", four: ["<img src = \"expt_files/bins/lion-story/none-two/no-lions-buy.png\" width=\"130\"><img src = \"expt_files/bins/lion-story/none-two/some-lions-buy.png\" width=\"130\">"]}},
    sentences: {every: "\"Every lion didn't buy a cookie.\"", numeral: "\"Two lions didn't buy a cookie.\""}},
  {item: "dinosaurs",
    contexts: {two: {without: "This story features two dinosaurs, bugs, and fish. The two dinosaurs were hungry and looking for food. The dinosaurs saw some fish in the river but decided they were too hard to catch. One dinosaur decided to eat a bug instead because bugs are easy to catch. The other dinosaur didn't eat anything.", with: "This story features two dinosaurs, bugs, and fish. The two dinosaurs were hungry and looking for food. Each dinosaur ate a fish because fish are easy to catch. The dinosaurs then saw some bugs. One dinosaur was still hungry, so he decided to also eat a bug. The other dinosaur was too full after eating the fish so he didn't eat anything else."}, four: {without: "This story features four dinosaurs, bugs, and fish. The four dinosaurs were hungry and looking for food. The dinosaurs saw some fish in the river but decided they were too hard to catch. Two dinosaurs decided to eat bugs instead because bugs are easy to catch. The other two dinosaurs didn't eat anything.", with: "This story features four dinosaurs, bugs, and fish. The four dinosaurs were hungry and looking for food. Each dinosaur ate a fish because fish are easy to catch. The dinosaurs then saw some bugs. Two dinosaurs were still hungry, so they decided to also eat bugs. The other two dinosaurs were too full after eating the fish so they didn't eat anything else."}}, 
    QUDs: {many: "How many dinosaurs ate bugs?", all: "Did all of the dinosaurs eat bugs?", none: "Did none of the dinosaurs eat bugs?"}, 
    goals: {many:"how many dinosaurs ate bugs", all:"whether all the dinosaurs ate bugs", none:"whether none of the dinosaurs ate bugs"},
    bins: {many: {two: "<img src = \"expt_files/bins/dinosaur-story/many-two/0-dinosaurs-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/many-two/1-dinosaur-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/many-two/2-dinosaurs-eat.png\" width=\"130\">", four: "<img src = \"expt_files/bins/dinosaur-story/many-four/0-dinosaurs-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/many-four/1-dinosaur-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/many-four/2-dinosaurs-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/many-four/3-dinosaurs-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/many-four/4-dinosaurs-eat.png\" width=\"130\">"}, all: {two: "<img src = \"expt_files/bins/dinosaur-story/all-two/all-dinosaurs-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/all-two/some-dinosaurs-didnt-eat.png\" width=\"130\">", four: ["<img src = \"expt_files/bins/dinosaur-story/all-two/all-dinosaurs-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/all-two/some-dinosaurs-didnt-eat.png\" width=\"130\">"]}, none: {two: "<img src = \"expt_files/bins/dinosaur-story/none-two/no-dinosaurs-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/none-two/some-dinosaurs-eat.png\" width=\"130\">", four: ["<img src = \"expt_files/bins/dinosaur-story/none-two/no-dinosaurs-eat.png\" width=\"130\"><img src = \"expt_files/bins/dinosaur-story/none-two/some-dinosaurs-eats.png\" width=\"130\">"]}},
    sentences: {every: "\"Every dinosaur didn't eat bugs.\"", numeral: "\"Two dinosaurs didn't eat bugs.\""}},
  // {item: "pigs",
  //   contexts: {two: {without: "This story features two pigs, logs, and straw. The two pigs were deciding how to build a house. First, the two pigs considered straw. They decided not to collect straw because straw is not sturdy. Then they considered logs. One pig thought that logs were sturdy, so he decided to collect logs. The other pig still thought that logs were not sturdy and didn't collect them.", with: "This story features two pigs, logs and straw. The two pigs were deciding how to build a house. First, the two pigs considered straw and decided to collect straw to build the house. However, the wind destroyed their house. Then they considered logs. One pig thought that logs are sturdy, so he decided to collect logs. The other pig thought that logs are not sturdy and didn't collect them."}, four: {without: "This story features four pigs, logs, and straw. The four pigs were deciding how to build a house. First, the four pigs considered straw. They decided not to collect straw because straw is not sturdy. Then they considered logs. Two pigs thought that logs were sturdy, so they decided to collect logs. The other two pigs still thought that logs were not sturdy and didn't collect them.", with: "This story features four pigs, logs and straw. The four pigs were deciding how to build a house. First, the four pigs considered straw and decided to collect straw to build the house. However, the wind destroyed their house. Then they considered logs. Two pigs thought that logs are sturdy, so they decided to collect logs. The other two pigs thought that logs are not sturdy and didn't collect them."}}, 
  //   QUDs: {many: "How many pigs collected logs?", all: "Did all of the pigs collect logs?", none: "Did none of the pigs collect logs?"}, 
  //   sentences: {every: "\"Every pig didn't collect logs.\"", numeral: "\"Two pigs didn't collect logs.\""}},
  // {item: "squirrels",
  //   contexts: {two: {without: "This story features two squirrels, acorns, and walnuts. Two squirrels were gathering food for the coming winter. First, the two squirrels saw walnuts, but they didn't like walnuts. Then, the two squirrels saw acorns. One squirrel decided to gather acorns. The other squirrel didn't like acorns either so she didn't gather anything.", with: "This story features two squirrels, acorns, and walnuts. The two squirrels were gathering food for the coming winter. First, the two squirrels saw walnuts and gathered them. After a while, one squirrel got tired of walnuts and started gathering acorns instead."}, four: {without: "This story features four squirrels, acorns, and walnuts. Four squirrels were gathering food for the coming winter. First, the four squirrels saw walnuts, but they didn't like walnuts. Then, four squirrels saw acorns. Two squirres decided to gather acorns. The other two squirrels didn't like walnuts either so they didn't gather anything.", with: "This story features four squirrels, acorns, and walnuts. The four squirrels were gathering food for the coming winter. First, the four squirrels saw walnuts and gathered them. After a while, two squirrels got tired of walnuts and started gathering acorns instead."}}, 
  //   QUDs: {many: "How many squirrels gathered acorns?", all: "Did all of the squirrels gather acorns?", none: "Did none of the squirrels gather acorns?"}, 
  //   sentences: {every: "\"Every squirrel didn't gather acorns.\"", numeral: "\"Two squirrels didn't gather acorns.\""}},
  // {item: "foxes",
  //   contexts: {two: {without: "This story features two foxes, grapes, strawberries, and a cake. Two foxes decided to make a cake, so they went to pick fruit. First, the two foxes saw grapes. They thought that grapes were too sour, so they didn't pick grapes. Then, they saw strawberries. One fox picked some strawberries. The other fox didn't pick anything, because he still thought that strawberries were too sour.", with: "This story features two foxes, grapes, strawberries, and a cake. Two foxes decided to make a cake, so they went to pick fruit. First, the two foxes saw grapes and picked some grapes. Then, two foxes saw strawberries. One fox picked some strawberries. The other fox thought that strawberries were too sour and didn't pick them."}, four: {without: "This story features four foxes, grapes, strawberries, and a cake. Four foxes decided to make a cake, so they went to pick fruit. First, the four foxes saw grapes. They thought that grapes were too sour, so they didn't pick grapes. Then, they saw strawberries. Two foxes picked some strawberries. The other two foxes didn't pick anything, because they still thought that strawberries were too sour.", with: "This story features four foxes, grapes, strawberries, and a cake. Four foxes decided to make a cake, so they went to pick fruit. First, the four foxes saw grapes and picked some grapes. Then, four foxes saw strawberries. Two foxes picked some strawberries. The other two foxes thought that strawberries were too sour and didn't pick them."}}, 
  //   QUDs: {many: "How many foxes picked strawberries?", all: "Did all of the foxes pick strawberries?", none: "Did none of the foxes pick strawberries?"}, 
  //   sentences: {every: "\"Every fox didn't pick strawberries.\"", numeral: "\"Two foxes didn't pick strawberries.\""}},
  // {item: "monkeys",
  //   contexts: {two: {without: "This story features two monkeys, an oak, and a palm tree. The two monkeys were looking for a place to live. First, they looked at an oak. They concluded that the oak was too short to guarantee their safety. Then, the two monkey looked at a palm tree. One monkey climbed on the palm tree. The other monkey still thought that the palm tree was too short, so he didn't climb on any trees.", with: "This story features two monkeys, an oak, and a palm tree. Two monkeys were looking for a place to live. First, they looked at an oak, and climbed on it. One monkey thought that the oak was too short to guarantee his safety, so he decided to find another tree. The monkey who looked for another tree climbed on a palm tree. The other monkey stayed on the oak."}, four: {without: "This story features four monkeys, an oak, and a palm tree. The four monkeys were looking for a place to live. First, they looked at an oak. They concluded that the oak was too short to guarantee their safety. Then, the four monkey looked at a palm tree. Two monkeys climbed on the palm tree. The other two monkeys still thought that the palm tree was too short, so they didn't climb on any trees.", with: "This story features four monkeys, an oak, and a palm tree. Four monkeys were looking for a place to live. First, they looked at an oak, and climbed on it. Two monkeys thought that the oak was too short to guarantee their safety, so they decided to find another tree. The two monkeys who looked for another tree climbed on a palm tree. The other two monkeys stayed on the oak."}}, 
  //   QUDs: {many: "How many monkeys climbed on the palm tree?", all: "Did all of the monkeys climb on the palm tree?", none: "Did none of the monkeys climb on the palm tree?"}, 
  //   sentences: {every: "\"Every monkey didn't climb on the palm tree.\"", numeral: "\"Two monkeys didn't climb on the palm tree.\""}},
  // {item: "penguins",
  //   contexts: {two: {without: "This story features two penguins, a polar bear, fish, and a lobster. The two penguins were going to visit their friend, a polar bear, and they wanted to bring a gift. First, the two penguins thought about a lobster, but they decided it was too expensive as a gift. Then they thought about fish. One penguin decided to bring a fish as a gift. The other penguin didn't like the fish and brought nothing instead.", with: "This story features two penguins, a polar bear, fish, and a lobster. The two penguins were going to visit their friend, a polar bear, and they wanted to bring a gift. The two penguins decided to bring a lobster. One penguin thought that a lobster was not enough, so that penguin also decided to bring a fish. The other penguin only brought a lobster."}, four: {without: "This story features four penguins, a polar bear, fish, and a lobster. Four penguins were going to visit their friend, a polar bear, and they wanted to bring a gift. First, they thought about a lobster, but they decided that a lobster was too expensive as a gift. Then, the four penguins thought about fish. Two penguins decided to bring a fish as a gift. The other two penguins didn't like the fish and brought nothing instead.", with: "This story features four penguins, a polar bear, fish, and lobster. Four penguins were going to visit their friend, a polar bear, and they wanted to bring a gift. First, they thought about a lobster as a gift. Two penguins thought that a lobster was not enough, so they also decided to bring a fish. The other two penguins only brought a lobster."}}, 
  //   QUDs: {many: "How many penguins brought fish as a gift?", all: "Did all of the penguins bring fish as a gift?", none: "Did none of the penguins bring fish as a gift?"}, 
  //   sentences: {every: "\"Every penguin didn't bring fish as a gift.\"", numeral: "\"Two penguins didn't bring fish as a gift.\""}},
  // {item: "fairies",
  //   contexts: {two: {without: "This story features two fairies, a castle, violin, and guitar. There was a celebration in the castle. The two fairies were deciding to have a concert for the celebration. First, they thought about playing the violin. One fairy didn't liked the violin, so she decided to play the guitar. The other fairy didn't play anything.", with: "This story features two fairies, a castle, violin, and guitar. There was a celebration in the castle. The two fairies were deciding to have a concert for the celebration. First, they decided to play the violin. One fairy didn't like the sound the violin made, so she decided to play the guitar instead. The other fairy kept playing the violin."}, four: {without: "This story features four fairies, a castle, violin, and guitar. There was a celebration in the castle. Four fairies were deciding to have a concert for the celebration. First, they thought about playing the violin. Two fairies didn't like the violin, so they decided to play the guitar. The other two fairies didn't play anything.", with: "This story features four fairies, a castle, violin, and guitar. There was a celebration in the castle. Two fairies were deciding to have a concert for the celebration. First, they decided to play the violin. Two fairies didn't like the sound the violin made, so they decided to play the guitar instead. The other two fairies kept playing the violin."}}, 
  //   QUDs: {many: "How many fairies played the guitar?", all: "Did all of the fairies play the guitar?", none: "Did none of the fairies play the guitar?"}, 
  //   sentences: {every: "\"Every fairy didn't play the guitar.\"", numeral: "\"Two fairies didn't play the guitar.\""}},
  // {item: "bears",
  //   contexts: {two: {without: "This story features two bears, science books, story books, and a library. The two bears went to the library to borrow books. Science books and story books were available to borrow. One bear borrowed a science book, but the other bear didn't borrow anything.", with: "This story features two bears, science books, story books, and a library. The two bears went to the library to borrow books. Science books and story books were available to borrow. Both two bears borrowed a story book, and one bear also borrowed a science book."}, four: {without: "This story features four bears, science books, story books, and a library. The four bears went to the library to borrow books. Science books and story books were available to borrow. Two bears borrowed a science book, but the other two bears didn't borrow anything.", with: "This story features four bears, science books, story books, and a library. The four bears went to the library to borrow books. Science books and story books were available to borrow. Four bears borrowed a story book, and two bears also borrowed a science book."}}, 
  //   QUDs: {many: "How many bears borrowed a science book?", all: "Did all of the bears borrow a science book?", none: "Did none of the bears borrow a science book?"}, 
  //   sentences: {every: "\"Every bear didn't borrow a science book.\"", numeral: "\"Two bears didn't borrow a science book.\""}},
  // {item: "pandas",
  //   contexts: {two: {without: "This story features two pandas, a gym, and a fitness coach. The two pandas went to the gym to lose weight. First, the fitness coach asked them to run a mile. The two pandas thought that running was too hard. Then, the coach asked them to practice Kung Fu for two hours. One panda decided to practice Kung Fu, but the other panda was too lazy and did nothing.", with: "This story features two pandas, a gym, and a fitness coach. The two pandas went to the gym to lose weight. First, the fitness coach asked them to run a mile. The two pandas ran a mile. Then, the coach asked them to practice Kung Fu for two hours. One panda decided to practice Kung Fu, but the other panda decided to take a rest."}, four: {without: "This story features four pandas, a gym, and a fitness coach. The four pandas went to the gym to lose weight. First, the fitness coach asked them to run a mile. The four pandas thought that running was too hard. Then, the coach asked them to practice Kung Fu for two hours. Two pandas decided to practice Kung Fu, but the other two pandas were too lazy and did nothing.", with: "This story features four pandas, a gym, and a fitness coach. The four pandas went to the gym to lose weight. First, the fitness coach asked them to run a mile. The four pandas ran a mile. Then, the coach asked them to practice Kung Fu for two hours. Two pandas decided to practice Kung Fu, but the other two pandas decided to take a rest."}}, 
  //   QUDs: {many: "How many pandas practiced Kung Fu?", all: "Did all of the pandas practice Kung Fu?", none: "Did none of the pandas practice Kung Fu?"}, 
  //   sentences: {every: "\"Every panda didn't practice Kung Fu.\"", numeral: "\"Two pandas didn't practice Kung Fu.\""}},
  // {item: "control1",
  //   contexts: {two: {without: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk.", with: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk."}, four: {without: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk.", with: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk."}}, 
  //   QUDs: {many: "How many hippos drank milk?", all: "Did all of the hippos drink milk?", none: "Did none of the hippos drink milk?"}, 
  //   sentences: {every: "\"Three hippos drank milk.\"", numeral: "\"Three hippos drank milk.\""}},
  // {item: "control2",
  //   contexts: {two: {without: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table.", with: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table."}, four: {without: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table.", with: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table."}}, 
  //   QUDs: {many: "How many dogs rolled balls?", all: "How many dogs rolled balls?", none: "How many dogs rolled balls?"}, 
  //   sentences: {every: "\"Only one dog rolled his ball.\"", numeral: "\"Only one dog rolled his ball.\""}},
  // {item: "control3",
  //   contexts: {two: {without: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump.", with: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump."}, four: {without: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump.", with: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump."}}, 
  //   QUDs: {many: "How many lizards climbed on the book?", all: "How many lizards climbed on the book?", none: "How many lizards climbed on the book?"}, 
  //   sentences: {every: "\"Four lizards climbed on the book.\"", numeral: "\"Four lizards climbed on the book.\""}},
  // {item: "control4",
  //   contexts: {two: {without: "This story features four cats and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish.", with: "This story features four cats and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish."}, four: {without: "This story features four cats and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish.", with: "This story features four cats and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish."}}, 
  //   QUDs: {many: "How many cats caught fish?", all: "How many cats caught fish?", none: "How many cats caught fish?"}, 
  //   sentences: {every: "\"Four cats caught fish.\"", numeral: "\"Four cats caught fish.\""}},
  // {item: "control5",
  //   contexts: {two: {without: "This story features three bunnies and a cage. The three bunnies were deciding to take an adventure. The first bunny went outside the cage. The second bunny went outside the cage. And the third bunny went outside the cage as well.", with: "This story features three bunnies and a cage. The three bunnies were deciding to take an adventure. The first bunny went outside the cage. The second bunny went outside the cage. And the third bunny went outside the cage as well."}, four: {without: "This story features three bunnies and a cage. The three bunnies were deciding to take an adventure. The first bunny went outside the cage. The second bunny went outside the cage. And the third bunny went outside the cage as well.", with: "This story features three bunnies and a cage. The three bunnies were deciding to take an adventure. The first bunny went outside the cage. The second bunny went outside the cage. And the third bunny went outside the cage as well."}}, 
  //   QUDs: {many: "How many bunnies went outside the cage?", all: "How many bunnies went outside the cage?", none: "How many bunnies went outside the cage?"}, 
  //   sentences: {every: "\"Every bunny went outside the cage.\"", numeral: "\"Every bunny went outside the cage.\""}},
  // {item: "control6",
  //   contexts: {two: {without: "This story features two owls and thieves. The two owls were trying to catch thieves. At night, the first owl caught a thief, but the second owl did not catch any thieves.", with: "This story features two owls and thieves. The two owls were trying to catch thieves. At night, the first owl caught a thief, but the second owl did not catch any thieves."}, four: {without: "This story features two owls and thieves. The two owls were trying to catch thieves. At night, the first owl caught a thief, but the second owl did not catch any thieves.", with: "This story features two owls and thieves. The two owls were trying to catch thieves. At night, the first owl caught a thief, but the second owl did not catch any thieves."}}, 
  //   QUDs: {many: "How many owls caught a thief?", all: "How many owls caught a thief?", none: "How many owls caught a thief?"}, 
  //   sentences: {every: "\"Every owl caught a thief.\"", numeral: "\"Every owl caught a thief.\""}},
  // {item: "control7",
  //   contexts: {two: {without: "This story features two kids and candies. The two kids were deciding to share their candies with each other. The first kid gave candy to the second kid. The second kid did not give candy to the first kid.", with: "This story features two kids and candies. The two kids were deciding to share their candies with each other. The first kid gave candy to the second kid. The second kid did not give candy to the first kid."}, four: {without: "This story features two kids and candies. The two kids were deciding to share their candies with each other. The first kid gave candy to the second kid. The second kid did not give candy to the first kid.", with: "This story features two kids and candies. The two kids were deciding to share their candies with each other. The first kid gave candy to the second kid. The second kid did not give candy to the first kid."}}, 
  //   QUDs: {many: "How many kids shared their candies?", all: "How many kids shared their candies?", none: "How many kids shared their candies?"}, 
  //   sentences: {every: "\"Every kid shared their candies.\"", numeral: "\"Every kid shared their candies.\""}},
  // {item: "control8",
  //   contexts: {two: {without: "This story features three pigeons. The three pigeons were migrating from the north to the south. The pigeons flew in a straight line.", with: "This story features three pigeons. The three pigeons were migrating from the north to the south. The pigeons flew in a straight line."}, four: {without: "This story features three pigeons. The three pigeons were migrating from the north to the south. The pigeons flew in a straight line.", with: "This story features three pigeons. The three pigeons were migrating from the north to the south. The pigeons flew in a straight line."}}, 
  //   QUDs: {many: "How many pigeons were flying to the south?", all: "How many pigeons were flying to the south?", none: "How many pigeons were flying to the south?"}, 
  //   sentences: {every: "\"Every pigeon was flying to the south.\"", numeral: "\"Every pigeon was flying to the south.\""}},
 //    {twowithout: {story: "This story features two frogs, a fence, and a rock. The two frogs decided to play a jumping game. First they looked at the fence, and they concluded that the fence was too big to jump over. Then they looked at the rock. The first frog decided to jump over the rock, but the other frog thought that the rock was also too big to jump over.", sentence: "\"Two frogs didn't jump over the rock.\"", item: "frog"}, twowith: {story: "This story features two frogs, a fence, and a rock. The two frogs decided to play a jumping game. First they looked at the fence. The first frog jumped over the fence. Then, the second frog jumped over the fence. Then they looked at the rock. The first frog decided to jump over the rock, but the other frog thought that the rock was too big to jump over.", sentence: "\"Two frogs didn't jump over the rock.\"", item: "frog"}, fourwithout: {story: "This story features four frogs, a fence, and a rock. The four frogs decided to play a jumping game. First they looked at the fence, and they concluded that the fence was too big to jump over. Then they looked at the rock. The first two frogs decided to jump over the rock, but the other two frogs thought that the rock was also too big to jump over.", sentence: "\"Two frogs didn't jump over the rock.\"", item: "frog"}, fourwith: {story: "This story features four frogs, a fence, and a rock. The four frogs decided to play a jumping game. First they looked at the fence. The first frog jumped over the fence. Then, the second frog jumped over the fence. Then the third and the fourth frogs jumped over the fence. Then they looked at the rock. The first two frogs decided to jump over the rock, but the other two frogs thought that the rock was too big to jump over.", sentence: "\"Two frogs didn't jump over the rock.\"", item: "frog"}, everywithout: {story: "This story features two frogs, a fence, and a rock. The two frogs decided to play a jumping game. First they looked at the fence, and they concluded that the fence was too big to jump over. Then they looked at the rock. The first frog decided to jump over the rock, but the other frog thought that the rock was also too big to jump over.",sentence: "\"every frog didn't jump over the rock.\"",item: "frog"}, everywith: {story: "This story features two frogs, a fence, and a rock. The two frogs decided to play a jumping game. First they looked at the fence. The first frog jumped over the fence. Then, the second frog jumped over the fence. Then they looked at the rock. The first frog decided to jump over the rock, but the other frog thought that the rock was too big to jump over.",sentence: "\"every frog didn't jump over the rock.\"",item: "frog"}, questions: {all: "\"Did all of the frogs jump over the rock?\"", none: "\"Did none of the frogs jump over the rock?\"", how_many: "\"How many frogs jumped over the rock?\""}},
 //  }
	// {twowithout: {story: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk.", sentence: "\"Three hippos drank milk.\"", item: "control1"}, twowith: {story: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk.", sentence: "\"Three hippos drank milk.\"", item: "control1"}, fourwithout: {story: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk.", sentence: "\"Three hippos drank milk.\"", item: "control1"}, fourwith: {story: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk.", sentence: "\"Three hippos drank milk.\"", item: "control1"}, everywithout: {story: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk.", sentence: "\"Three hippos drank milk.\"", item: "control1"}, everywith: {story: "This story features two hippos and two cartons of milk. Two hippos were very thirsty and were looking for water to drink. The only thing they could find to drink was milk. They both decided to drink the milk.", sentence: "\"Three hippos drank milk.\"", item: "control1"}, questions: {all: "\"How many hippos drank milk?\"", none: "\"How many hippos drank milk?\"", how_many: "\"How many hippos drank milk?\""}},
	// {twowithout: {story: "This story features two butterflies, a forest, and a city. The two butterflies were deciding where to go. First, they thought about the forest. One butterfly did not like the forest, but the other one did. They decided not to go to the forest. The first butterfly decided to go to the city. The other butterfly decided to go home instead.", sentence: "\"Two butterflies didn't go to the city.\"", item: "butterflies"}, twowith: {story: "This story features two butterflies, a forest, and a city. The two butterflies were deciding where to go. First, they thought about the forest, and decided to go. One butterfly did not like the forest, but the other one did. The butterfly who didn't like the forest decided to leave the forest and go to the city. The other butterfly decided to leave the forest and go home.", sentence: "\"Two butterflies didn't go to the city.\"", item: "butterflies"}, fourwithout: {story: "This story features four butterflies, a forest, and a city. The four butterflies were deciding where to go. First, they thought about the forest. Two butterflies did not like the forest, but the other two did. They decided not to go to the forest. The first two butterflies decided to go to the city. The other two butterflies decided to stay at home.", sentence: "\"Two butterflies didn't go to the city.\"", item: "butterflies"}, fourwith: {story: "This story features four butterflies, a forest, and a city. The four butterflies were deciding where to go. First, they thought about the forest, and decided to go. Two of the butterflies did not like the forest, but the other two did. The butterflies who didn't like the forest decided to leave the forest and go to the city. The other two butterflies decided to leave the forest and go home.", sentence: "\"Two butterflies didn't go to the city.\"", item: "butterflies"}, everywithout: {story: "This story features two butterflies, a forest, and a city. The two butterflies were deciding where to go. First, they thought about the forest. One butterfly did not like the forest, but the other one did. They decided not to go to the forest. The first butterfly decided to go to the city. The other butterfly decided to go home instead.", sentence:"\"every butterfly didn't go to the city.\"", item: "butterflies"}, everywith: {story: "This story features two butterflies, a forest, and a city. The two butterflies were deciding where to go. First, they thought about the forest, and decided to go. One butterfly did not like the forest, but the other one did. The butterfly who didn't like the forest decided to leave the forest and go to the city. The other butterfly decided to leave the forest and go home.", sentence: "\"every butterfly didn't go to the city.\"", item: "butterflies"}, questions: {all: "\"Did all of the butterflies go to the city?\"", none: "\"Did none of the butterflies go to the city?\"", how_many: "\"How many butterflies went to the city?\""}},
	// {twowithout: {story: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table.", sentence: "\"Only one dog rolled his ball.\"", item: "control2"}, twowith: {story: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table.", sentence: "\"Only one dog rolled his ball.\"", item: "control2"}, fourwithout: {story: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table.", sentence: "\"Only one dog rolled his ball.\"", item: "control2"}, fourwith: {story: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table.", sentence: "\"Only one dog rolled his ball.\"", item: "control2"},everywithout: {story: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table.", sentence: "\"Only one dog rolled his ball.\"", item: "control2"}, everywith: {story: "This story features two dogs and two balls. Two dogs were playing, and each had a ball. The first dog decided to roll its ball across the table. The second dog decided not to roll its ball, because it was afraid its ball might roll off the table.", sentence: "\"Only one dog rolled his ball.\"", item: "control2"}, questions: {all: "\"How many dogs rolled balls?\"", none: "\"How many dogs rolled balls?\"", how_many: "\"How many dogs rolled balls?\""}},
	// {twowithout: {story: "This story features two lions, eggs, cookies, and a store. The two lions went into the store. They asked the owner what he had that they could eat. The store owner showed them eggs and cookies. The first lion bought a cookie. The other lion didn't buy anything.", sentence: "\"Two lions didn't buy a cookie.\"", item: "lions"}, twowith: {story: "This story features two lions, eggs, cookies, and store. The two lions went into the store looking for something to eat. They saw eggs and cookies. The two lions each bought an egg, and one of the lions also bought a cookie.", sentence: "\"Two lions didn't buy a cookie.\"", item: "lions"}, fourwithout: {story: "This story features four lions, eggs, cookies, and a store. The four lions went into the store. They asked store owner what food he was selling. The store owner showed them eggs and cookies. The first two lions each bought a cookie. The other two lions didn't buy anything.", sentence: "\"Two lions didn't buy a cookie\"", item: "lions"}, fourwith: {story: "This story features four lions, eggs, cookies, and a store. The four lions went into the store looking for something to eat. They saw eggs and cookies. All four lions bought eggs, and two of the lions bought cookies.", sentence: "\"Two lions didn't buy a cookie.\"", item: "lions"}, everywithout: {story: "This story features four lions, eggs, cookies, and a store. The four lions went into the store. They asked store owner what food he was selling. The store owner showed them eggs and cookies. The first two lions each bought a cookie. The other two lions didn't buy anything.", sentence: "\"every lion didn't buy a coockie.\"", item: "lions"}, everywith: {story: "This story features four lions, eggs, cookies, and a store. The four lions went into the store looking for something to eat. They saw eggs and cookies. All four lions bought eggs, and two of the lions bought cookies.", sentence: "\"every lion didn't buy a coockie.\"", item: "lions"}, questions: {all: "\"Did all of the lions buy a cookie?\"", none: "\"Did none of the lions buy a cookie?\"", how_many: "\"How many lions bought a cookie?\""}},
	// {twowithout: {story: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump.", sentence: "\"Four lizards climbed on the book.\"", item: "control3"}, twowith: {story: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump.", sentence: "\"Four lizards climbed on the book.\"", item: "control3"}, fourwithout: {story: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump.", sentence: "\"Four lizards climbed on the book.\"", item: "control3"}, fourwith: {story: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump.", sentence: "\"Four lizards climbed on the book.\"", item: "control3"}, everywithout: {story: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump.", sentence: "\"Four lizards climbed on the book.\"", item: "control3"}, everywith: {story: "This story features four lizards and a book. The lizards were sunning themselves when one of the lizards thought they would get more sun on top of the book. Two of the lizards jumped on the book. The other two lizards decided the book was too high and decided not to jump.", sentence: "\"Four lizards climbed on the book.\"", item: "control3"}, questions: {all: "\"How many lizards climbed on the book?\"", none: "\"How many lizards climbed on the book?\"", how_many: "\"How many lizards climbed on the book?\""}},
	// {twowithout: {story: "This story features two dinosaurs, bugs, and fish. The two dinosaurs were hungry and looking for food. The dinosaurs saw some fish in the river but decided they were too hard to catch. One dinosaur decided to eat a bug instead because bugs are easy to catch. The other dinosaur didn't eat anything.", sentence: "\"Two dinosaurs didn't eat bugs.\"", item: "dinosaurs"}, twowith: {story: "This story features two dinosaurs, bugs, and fish. The two dinosaurs were hungry and looking for food. Each dinosaur ate a fish because fish are easy to catch. The dinosaurs then saw some bugs. One dinosaur was still hungry, so he decided to also eat a bug. The other dinosaur was too full after eating the fish so he didn't eat anything else.", sentence: "\"Two dinosaurs didn't eat bugs.\"", item: "dinosaurs"}, fourwithout: {story: "This story features four dinosaurs, bugs, and fish. The four dinosaurs were hungry and looking for food. The dinosaurs saw some fish in the river but decided they were too hard to catch. Two dinosaurs decided to eat bugs instead because bugs are easy to catch. The other two dinosaurs didn't eat anything.", sentence: "\"Two dinosaurs didn't eat bugs.\"", item: "dinosaurs"}, fourwith: {story: "This story features four dinosaurs, bugs, and fish. The four dinosaurs were hungry and looking for food. Each dinosaur ate a fish because fish are easy to catch. The dinosaurs then saw some bugs. Two dinosaurs were still hungry, so they decided to also eat bugs. The other two dinosaurs were too full after eating the fish so they didn't eat anything else.", sentence: "\"Two dinosaurs didn't eat bugs.\"", item: "dinosaurs"}, everywithout: {story: "This story features four dinosaurs, bugs, and fish. The four dinosaurs were hungry and looking for food. The dinosaurs saw some fish in the river but decided they were too hard to catch. Two dinosaurs decided to eat bugs instead because bugs are easy to catch. The other two dinosaurs didn't eat anything.", sentence: "\"every dinosaur didn't eat bugs.\"", item: "dinosaurs"}, everywith: {story: "This story features four dinosaurs, bugs, and fish. The four dinosaurs were hungry and looking for food. Each dinosaur ate a fish because fish are easy to catch. The dinosaurs then saw some bugs. Two dinosaurs were still hungry, so they decided to also eat bugs. The other two dinosaurs were too full after eating the fish so they didn't eat anything else.", sentence: "\"every dinosaur didn't eat bugs.\"", item: "dinosaurs"}, questions: {all: "\"Did all of the dinosaurs eat bugs?\"", none: "\"Did none of the dinosaurs eat bugs?\"", how_many: "\"How many dinosaurs ate bugs?\""}},
 //  {twowithout: {story: "This story features four cats, and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish.", sentence: "\"Four cats caught the fish.\"", item: "control4"}, twowith: {story: "This story features four cats, and fishes. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fishes.This story features four cats, and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish.", sentence: "\"Four cats caught the fish.\"", item: "control4"}, fourwithout: {story: "This story features four cats, and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish.", sentence: "\"Four cats caught the fish.\"", item: "control4"}, fourwith: {story: "This story features four cats, and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish.", sentence: "\"Four cats caught the fish.\"", item: "control4"}, everywithout: {story: "This story features four cats, and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish.", sentence: "\"Four cats caught the fish.\"", item: "control4"}, everywith: {story: "This story features four cats, and fish. The four cats were deciding to go fishing. The first cat caught a fish. The second cat caught a fish. The third cat and the fourth cat did not catch any fish.", sentence: "\"Four cats caught the fish.\"", item: "control4"}, questions: {all: "\"How many cats caught the fish?\"", none: "\"How many cats caught the fish?\"", how_many: "\"How many cats caught the fish?\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: "pig"}, twowith: {story: "", sentence: "\"\"", item: "pig"}, fourwithout: {story: "", sentence: "\"\"", item: "pig"}, fourwith: {story: "", sentence: "\"\"", item: "pig"}, everywithout: {story: "", sentence: "\"\"", item: "pig"}, everywith: {story: "", sentence: "\"\"", item: "pig"}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: "control5"}, twowith: {story: "", sentence: "\"\"", item: "control5"}, fourwithout: {story: "", sentence: "\"\"", item: "control5"}, fourwith: {story: "", sentence: "\"\"", item: "control5"}, everywithout: {story: "", sentence: "\"\"", item: "control5"}, everywith: {story: "", sentence: "\"\"", item: "control5"}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: ""}, twowith: {story: "", sentence: "\"\"", item: ""}, fourwithout: {story: "", sentence: "\"\"", item: ""}, fourwith: {story: "", sentence: "\"\"", item: ""}, everywithout: {story: "", sentence: "\"\"", item: ""}, everywith: {story: "", sentence: "\"\"", item: ""}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: "control6"}, twowith: {story: "", sentence: "\"\"", item: "control6"}, fourwithout: {story: "", sentence: "\"\"", item: "control6"}, fourwith: {story: "", sentence: "\"\"", item: "control6"}, everywithout: {story: "", sentence: "\"\"", item: "control6"}, everywith: {story: "", sentence: "\"\"", item: "control6"}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: ""}, twowith: {story: "", sentence: "\"\"", item: ""}, fourwithout: {story: "", sentence: "\"\"", item: ""}, fourwith: {story: "", sentence: "\"\"", item: ""}, everywithout: {story: "", sentence: "\"\"", item: ""}, everywith: {story: "", sentence: "\"\"", item: ""}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: "control7"}, twowith: {story: "", sentence: "\"\"", item: "control7"}, fourwithout: {story: "", sentence: "\"\"", item: "control7"}, fourwith: {story: "", sentence: "\"\"", item: "control7"}, everywithout: {story: "", sentence: "\"\"", item: "control7"}, everywith: {story: "", sentence: "\"\"", item: "control7"}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: ""}, twowith: {story: "", sentence: "\"\"", item: ""}, fourwithout: {story: "", sentence: "\"\"", item: ""}, fourwith: {story: "", sentence: "\"\"", item: ""}, everywithout: {story: "", sentence: "\"\"", item: ""}, everywith: {story: "", sentence: "\"\"", item: ""}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: "control8"}, twowith: {story: "", sentence: "\"\"", item: "control8"}, fourwithout: {story: "", sentence: "\"\"", item: "control8"}, fourwith: {story: "", sentence: "\"\"", item: "control8"}, everywithout: {story: "", sentence: "\"\"", item: "control8"}, everywith: {story: "", sentence: "\"\"", item: "control8"}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: ""}, twowith: {story: "", sentence: "\"\"", item: ""}, fourwithout: {story: "", sentence: "\"\"", item: ""}, fourwith: {story: "", sentence: "\"\"", item: ""}, everywithout: {story: "", sentence: "\"\"", item: ""}, everywith: {story: "", sentence: "\"\"", item: ""}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: ""}, twowith: {story: "", sentence: "\"\"", item: ""}, fourwithout: {story: "", sentence: "\"\"", item: ""}, fourwith: {story: "", sentence: "\"\"", item: ""}, everywithout: {story: "", sentence: "\"\"", item: ""}, everywith: {story: "", sentence: "\"\"", item: ""}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: ""}, twowith: {story: "", sentence: "\"\"", item: ""}, fourwithout: {story: "", sentence: "\"\"", item: ""}, fourwith: {story: "", sentence: "\"\"", item: ""}, everywithout: {story: "", sentence: "\"\"", item: ""}, everywith: {story: "", sentence: "\"\"", item: ""}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\""}},
 //  {twowithout: {story: "", sentence: "\"\"", item: ""}, twowith: {story: "", sentence: "\"\"", item: ""}, fourwithout: {story: "", sentence: "\"\"", item: ""}, fourwith: {story: "", sentence: "\"\"", item: ""}, everywithout: {story: "", sentence: "\"\"", item: ""}, everywith: {story: "", sentence: "\"\"", item: ""}, questions: {all: "\"\"", none: "\"\"", how_many: "\"\" "}},
  ]),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
		$("#justification").val('');
		$(".err").hide();
		$(".hidden").hide();
		$(".jerr").hide();
		$(".text_response").val('');
		$(".showButton").show();

		this.stim = stim; //I like to store this information in the slide so I can record it later.

      // exp.quantifier = _.sample(["every","numeral"])
      exp.quantifier = "numeral"
      exp.context = _.sample(["without","with"]);
      exp.number = _.sample(["two","four"]);
      // exp.number = "two"
      exp.QUD = _.sample(["all","none","many"])
      //here to test out different examples (i.e. link a picture and see if there
      //are any formatting difficulties)
      // exp.QUD = "none"
	  //exp.number = _.esample(["two"]);

      // exp.condition = exp.number + exp.context

      exp.item = stim["item"]

      $("#topic").html(exp.item)
      $("#goal").html(stim["goals"][exp.QUD])

      // exp.numberBins = stim["bins"][exp.QUD].length

      $("#bins").html(stim["bins"][exp.QUD][exp.number])


      if (exp.quantifier == "every") {
        $("#testSentence").html(stim["sentences"]["every"])
      } else if (exp.quantifier == "numeral") {
        $("#testSentence").html(stim["sentences"]["numeral"])
      }
	    $("#expStory").html(stim["contexts"][exp.number][exp.context]);
      $("#expQUD").html("\"" + stim["QUDs"][exp.QUD] + "\"");
      this.init_sliders();
      exp.sliderPost = null;	  //erase current slider value
	  
    },
	
/* 	$("#play").click(function() {
		  var myVideo = document.getElementById("expVideo"); 
			function playPause() { 
				if (myVideo.paused) 
					myVideo.play(); 
				else 
					myVideo.pause(); 
			} 
	}); */

    button : function() {
		if (exp.sliderPost == null) {
			$(".err").show();
			} else {
				this.log_responses();

					/* use _stream.apply(this); if and only if there is
					"present" data. (and only *after* responses are logged) */
					_stream.apply(this);
		}
    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "one_slider",
        "response" : exp.sliderPost,
    		//"justification" : $("#justification").val(),
    		"quantifier" : exp.quantifier,
    		"number" : exp.number,
        "context" : exp.context,
        "item" : exp.item,
        "slide_number" : exp.phase,
        "QUD" : exp.QUD

      });
    }
  });
  

 

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        assess : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
		  //"justification" : exp.justify,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  repeatWorker = false;
  (function(){
      var ut_id = "scopeTVJT-fixed";
      if (UTWorkerLimitReached(ut_id)) {
        $('.slide').empty();
        repeatWorker = true;
        alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
      }
  })();

  exp.trials = [];
  exp.catch_trials = [];
  //exp.condition = _.sample(["Cond 1"]); //can randomize between subject conditions here
  //exp.condition = _.sample(["Cond 1, Cond 2, Cond 3, Cond 4"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width,
    };
  //blocks of the experiment:
  // exp.structure=["i0", "instructions", "one_slider_practice", "pretrial", "one_slider", 'subj_info', 'thanks'];  
  exp.structure=["i0", "instructions","one_slider", 'subj_info', 'thanks'];
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);
	
	//exp.nQs = 2;
  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
