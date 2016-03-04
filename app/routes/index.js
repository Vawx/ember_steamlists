import Ember from 'ember';

export default Ember.Route.extend({
  steam: Ember.inject.service('steam-api'),

  model( ) {
    return this.store.findAll('game-stats');
  },
  actions: {
    testJSON( ) {
      this.get('steam').gameStats(420);
    }
  }
});
