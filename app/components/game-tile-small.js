import Ember from 'ember';

export default Ember.Component.extend({
  steam: Ember.inject.service('steam-api'),
});
