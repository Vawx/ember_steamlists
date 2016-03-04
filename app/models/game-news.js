import DS from 'ember-data';

export default DS.Model.extend({
	news: DS.attr( ),
	game: DS.belongsTo('game-stats', {async: true }),
});
