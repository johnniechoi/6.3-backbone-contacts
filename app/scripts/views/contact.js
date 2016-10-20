var $ = require('jquery');
var Backbone = require('backbone');
var contactItemTemplate = require('../templates/contactitem.hbs');

// var ContactText = Backbone.View.extend({
//   tagName: 'p',
//   attributes: {
//     id: 'test',
//     'class': 'contact-test well col-md-12'
//   },
//   render: function(){
//   this.$el.text('Check this thing out!')
//   return this;
//   }
// });

var NameInput = Backbone.View.extend({
  events: {
    'submit': 'addContact'
  },
  addContact: function(e){
    e.preventDefault();

    var contactName = $('#name').val();
    var contactEmail = $('#email').val();
    var contactPhone = $('#phone').val();
    var contactTwitter = $('#twitter').val();
    var contactLinkedin = $('#linkedin').val();

    this.collection.create({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      twitter: contactTwitter,
      linkedin: contactLinkedin
    });

    $('#name').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#twitter').val('');
    $('#linkedin').val('');
    },
  });

  var ContactView = Backbone.View.extend({
    tagName: 'ul',
    events: {
      'submit': 'renderContactItem'
    },
    attributes: {
    className: 'contact-items col-md12 list-contact'
    },

    initialize: function(){
    this.listenTo(this.collection, 'add', this.renderContactItem);
    },

    renderContactItem: function(contact){
      var contactItem = new ContactItemView ({model: contact})
      this.$el.append(contactItem.render().el)
    }
  });

var ContactItemView = Backbone.View.extend({
  tagname: 'li',
  template: contactItemTemplate,
  events:{
    'click .hideme': 'hide',
    'click .clickme': 'complete',
  },
  initialize: function(){
  this.listenTo(this.model, 'destroy', this.remove);
  this.listenTo(this.model, 'changed', this.render);
  this.listenTo(this.model, 'change:visible', this.toggleVisible);
  },
  className: 'list-group-item',
  // render: function(){
  //   //When you place the handlebar, make sure to have the following stuff uncommented.
  //   // var context = this.model.toJSON();
  //   // var rendered
  //   this.$el.html(this.model.get('email'))
  //   return this;
  // },
  render: function(){
  var context = this.model.toJSON();
  var renderedTemplate = this.template(context);

  this.$el.html(this.model.get('email'))
  this.$el.html(renderedTemplate);

  return this;
},

  hide: function(){
  this.model.set('visible', false);
  },
  toggleVisible: function(){
    this.$el.hide();
  },

});





module.exports = {
  // ContactText: ContactText,
  NameInput: NameInput,
  ContactView: ContactView
}
