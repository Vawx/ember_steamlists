import Ember from 'ember';

export default Ember.Route.extend({
  model( params ) {
    return this.store.findRecord('game-stats', params.game_id);
  },
});
