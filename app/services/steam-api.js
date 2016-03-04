import Ember from 'ember';

export default Ember.Service.extend({
  gameStats( id ) {
    var url = "http://store.steampowered.com/api/appdetails?appids=" + id;
    return Ember.$.getJSON( url ).then( function( response ) {
      console.log( response );
    });
  }
});
