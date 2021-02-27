~~~~
//ALL

// possible utterances
var utterances = ['null','every-dou-not', 'not-every-dou'];
var utterancePrior = function() {
  uniformDraw(utterances)
}
var cost = function(utterance) {
  return 1
}
// possible world states
var states = [0,1,2];
var statePrior = function() {
  uniformDraw(states);
}
// possible scopes
var scopePrior = function(){
  return uniformDraw(['surface', 'inverse'])
}
// meaning function
var meaning = function(utterance, state, scope) {
  return utterance == 'every-dou-not' ?
    state == 0 :
  utterance == 'not-every-dou'?
  state < 2 :
  true;
};
// QUDs
var QUDs = ['how many?','all red?','none red?'];
var QUDPrior = function() {
//   uniformDraw(QUDs);
//   uniformDraw(QUDs);
  categorical({ps: [0.05, 0.9, 0.05], vs: QUDs})
}
var QUDFun = function(QUD,state) {
  QUD == 'all red?' ? state == 2 :
  QUD == 'none red?' ? state == 0 :
  state;
};
// Literal listener (L0)
var literalListener = cache(function(utterance,scope,QUD) {
  Infer({model: function(){
    var state = uniformDraw(states);
    var qState = QUDFun(QUD,state)
    condition(meaning(utterance,state,scope));
    return qState;
  }});
});
var alpha = 2.5
// Speaker (S)
var speaker = cache(function(scope, state, QUD) {
  return Infer({model: function(){
    var utterance = utterancePrior()
    var qState = QUDFun(QUD, state)
    factor(alpha*(literalListener(utterance,scope,QUD).score(qState)
                  - cost(utterance)))
    return utterance
  }})
})
// Pragmatic listener (L1)
var pragmaticListener = cache(function(utterance) {
  Infer({model: function(){
    var state = statePrior();
    var scope = scopePrior();
    var QUD = QUDPrior();
    observe(speaker(scope,state,QUD),utterance);
    return state
  }});
});
// Pragmatic speaker (S2)
var pragmaticSpeaker = cache(function(state) {
  Infer({model: function(){
    var utterance = utterancePrior();
    factor(pragmaticListener(utterance).score(state))
    return utterance
  }})
})
// A speaker decides whether to endorse the ambiguous utterance as a
// description of the not-all world state
// pragmaticListener(‘every-not-dou’)
display(pragmaticSpeaker(1))
pragmaticSpeaker(1)
~~~~

~~~~
//NONE

// possible utterances
var utterances = ['null','every-dou-not', 'not-every-dou'];
var utterancePrior = function() {
  uniformDraw(utterances)
}
var cost = function(utterance) {
  return 1
}
// possible world states
var states = [0,1,2];
var statePrior = function() {
  uniformDraw(states);
}
// possible scopes
var scopePrior = function(){
  return uniformDraw(['surface', 'inverse'])
}
// meaning function
var meaning = function(utterance, state, scope) {
  return utterance == 'every-dou-not' ?
    state == 0 :
  utterance == 'not-every-dou'?
  state < 2 :
  true;
};
// QUDs
var QUDs = ['how many?','all red?','none red?'];
var QUDPrior = function() {
//   uniformDraw(QUDs);
//   uniformDraw(QUDs);
  categorical({ps: [0.05, 0.05, 0.9], vs: QUDs})
}
var QUDFun = function(QUD,state) {
  QUD == 'all red?' ? state == 2 :
  QUD == 'none red?' ? state == 0 :
  state;
};
// Literal listener (L0)
var literalListener = cache(function(utterance,scope,QUD) {
  Infer({model: function(){
    var state = uniformDraw(states);
    var qState = QUDFun(QUD,state)
    condition(meaning(utterance,state,scope));
    return qState;
  }});
});
var alpha = 2.5
// Speaker (S)
var speaker = cache(function(scope, state, QUD) {
  return Infer({model: function(){
    var utterance = utterancePrior()
    var qState = QUDFun(QUD, state)
    factor(alpha*(literalListener(utterance,scope,QUD).score(qState)
                  - cost(utterance)))
    return utterance
  }})
})
// Pragmatic listener (L1)
var pragmaticListener = cache(function(utterance) {
  Infer({model: function(){
    var state = statePrior();
    var scope = scopePrior();
    var QUD = QUDPrior();
    observe(speaker(scope,state,QUD),utterance);
    return state
  }});
});
// Pragmatic speaker (S2)
var pragmaticSpeaker = cache(function(state) {
  Infer({model: function(){
    var utterance = utterancePrior();
    factor(pragmaticListener(utterance).score(state))
    return utterance
  }})
})
// A speaker decides whether to endorse the ambiguous utterance as a
// description of the not-all world state
// pragmaticListener(‘every-not-dou’)
display(pragmaticSpeaker(1))
pragmaticSpeaker(1)
~~~~

~~~~
//MANY

// possible utterances
var utterances = ['null','every-dou-not', 'not-every-dou'];
var utterancePrior = function() {
  uniformDraw(utterances)
}
var cost = function(utterance) {
  return 1
}
// possible world states
var states = [0,1,2];
var statePrior = function() {
  uniformDraw(states);
}
// possible scopes
var scopePrior = function(){
  return uniformDraw(['surface', 'inverse'])
}
// meaning function
var meaning = function(utterance, state, scope) {
  return utterance == 'every-dou-not' ?
    state == 0 :
  utterance == 'not-every-dou'?
  state < 2 :
  true;
};
// QUDs
var QUDs = ['how many?','all red?','none red?'];
var QUDPrior = function() {
//   uniformDraw(QUDs);
//   uniformDraw(QUDs);
  categorical({ps: [0.9, 0.05, 0.05], vs: QUDs})
}
var QUDFun = function(QUD,state) {
  QUD == 'all red?' ? state == 2 :
  QUD == 'none red?' ? state == 0 :
  state;
};
// Literal listener (L0)
var literalListener = cache(function(utterance,scope,QUD) {
  Infer({model: function(){
    var state = uniformDraw(states);
    var qState = QUDFun(QUD,state)
    condition(meaning(utterance,state,scope));
    return qState;
  }});
});
var alpha = 2.5
// Speaker (S)
var speaker = cache(function(scope, state, QUD) {
  return Infer({model: function(){
    var utterance = utterancePrior()
    var qState = QUDFun(QUD, state)
    factor(alpha*(literalListener(utterance,scope,QUD).score(qState)
                  - cost(utterance)))
    return utterance
  }})
})
// Pragmatic listener (L1)
var pragmaticListener = cache(function(utterance) {
  Infer({model: function(){
    var state = statePrior();
    var scope = scopePrior();
    var QUD = QUDPrior();
    observe(speaker(scope,state,QUD),utterance);
    return state
  }});
});
// Pragmatic speaker (S2)
var pragmaticSpeaker = cache(function(state) {
  Infer({model: function(){
    var utterance = utterancePrior();
    factor(pragmaticListener(utterance).score(state))
    return utterance
  }})
})
// A speaker decides whether to endorse the ambiguous utterance as a
// description of the not-all world state
// pragmaticListener(‘every-not-dou’)
display(pragmaticSpeaker(1))
pragmaticSpeaker(1)
~~~~