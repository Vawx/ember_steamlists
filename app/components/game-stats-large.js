import Ember from 'ember';

export default Ember.Component.extend({
  getVideoLinks: Ember.computed('model', function( ) {
    var vids = this.get('game').get("gameMovies").toString( ).split(",");
    for( var i = 0; i < vids.length; i++ ) {
      if( vids[ i ].length < 2 ) {
        var index = vids.indexOf( i );
        vids.splice( index, 1);
      }
    }
    return vids;
  }),
  getImageLinks: Ember.computed('model', function( ) {
    var images = this.get("game").get("gameScreenshots").toString( ).split(",");
    for( var i = 0; i < images.length; i++ ) {
      if( images[ i ].length < 2 ) {
        var index = images.indexOf( i );
        images.splice( index, 1);
      }
    }
    return images;
  }),
  getGameCost: Ember.computed('model', function( ) {
    var convert = this.get("game").get("gamePrice").toString();
    var strLen = convert.length;
    var converted = convert.substring(0, strLen - 2) + "." + convert.substring(strLen - 2);
    if( converted.length > 1 ) {
      return "$" + converted;
    }
    return "Free!";
  }),
  getDeveloper: Ember.computed('model', function( ) {
    var dev = this.get('game').get("gameDeveloper").toString( ).split(",");
    for( var i = 0; i < dev.length; i++ ) {
      if( dev[ i ].length < 2 ) {
        var index = dev.indexOf( i );
        dev.splice( index, 1);
      }
    }
    return dev;
  }),
  getRating: Ember.computed('model', function( ) {
    var rating = this.get('game').get('gameRating').toString( );
    if(rating.length === 0) {
      rating = "Not rated";
    }
    return rating;
  }),
});
