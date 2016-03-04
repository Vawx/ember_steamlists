import DS from 'ember-data';

export default DS.Model.extend({
	gameName: DS.attr( ),
	gameID: DS.attr( ),
	gameRating: DS.attr( ),
	gameDeveloper: DS.attr( ),
	recentNews: DS.hasMany('news', {async: true}),  
});
