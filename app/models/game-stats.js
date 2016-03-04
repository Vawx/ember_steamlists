import DS from 'ember-data';

export default DS.Model.extend({
	gameName: DS.attr( ),
	gameDescription: DS.attr( ),
	gameHeader: DS.attr( ),
	gameID: DS.attr( ),
	gameRating: DS.attr( ),
	gameRatingUrl: DS.attr( ),
	gameDeveloper: DS.attr( ),
	gamePublisher: DS.attr( ),
	gameScreenshots: DS.attr( ),
	gameSupportInfo: DS.attr( ),
	gameCategories: DS.attr( ),
	gamePrice: DS.attr( ),
	gameReleaseDate: DS.attr( ),
	gameLanguages: DS.attr( ),
	gameMovies: DS.attr( ),
	gameRequirements: DS.attr( ),
	gameUrl: DS.attr( ),
	recentNews: DS.hasMany('game-news', {async: true}),
	achievements: DS.hasMany('game-achievements', {async: true}),
});
