import Ember from 'ember';

export default Ember.Route.extend({
  steam: Ember.inject.service('steam-api'),
  key: "664E7EA41CB695E0AB7CC82FCA403940",

  model( ) {
    var self = this;
    var url = "http://store.steampowered.com/api/featured/";
    return Ember.$.getJSON( url ).then( function( response ) {
      console.log( response );
      return Ember.RSVP.hash ({
        saved: self.store.findAll('game-stats'),
        featured: "",
      });
    });
  },
  actions: {
    gameStats( params ) {
      var self = this;
      this.store.findAll('game-stats').then( function( result ){
        var found = false;
        result.forEach( function( game ) {
          if( params.gameID === gameID ) {
            found = true;
          }
        });
        if( !found ) {
            var newGameSave = self.store.createRecord('game-stats', params);
            newGameSave.save( );
        }
      });
    }
  }
});
