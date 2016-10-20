var $ = require('jquery');
var views = require('./views/contact');
var models = require('./models/contact');

$(function(){

  var contactCollection = new models.ContactCollection();

  var formInput = new views.NameInput({collection: contactCollection});
  formInput.setElement($('.form-container')[0])
  console.log('colletion: ', contactCollection);

  // var testText = new views.ContactText({testing: contactCollection});
  // $('.app').append(testText.render().el);

  var contactList = new views.ContactView({collection: contactCollection})
  $('.app').append(contactList.render().el);


contactCollection.fetch()
// contactCollection.fetch().then(function(){
//   contactCollection.each(function(model){
//     model.destroy();
//   });
// });

// Replace the .add with a .create as soon as you can!
  // ContactCollection.add([
  //   {'email': 'goodjoojoo@theironyard.com',
  //   'name': 'goodjoojoo',
  //   'phone': '864-123-1234',
  //   'twitter': 'goodjoojoo',
  //   'linkedin': 'goodjoojoo'}
  // ]);
});
