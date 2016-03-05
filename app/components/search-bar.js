import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    findFromID(  ) {
      var params = {
        gameName: this.get('gameID')
      };
      this.sendAction('findFromID', params);
    },
  }
});

/*
var params;
var url = "http://store.steampowered.com/api/appdetails?appids=" + params.gameID;

  if( !foundGame ) {
    return Ember.$.getJSON( url ).then( function( response ) {
      var responseObject = response[ params.gameID.toString( ) ];
      if( responseObject.success ) {
        var responseData = responseObject.data;
        params = {
          gameName: responseData.name,
          gameDescription: responseData.detailed_description,
          gameHeader: responseData.header_image,
          gameID: responseData.steam_appid,
          gameRating: responseData.metacritic.score,
          gameRatingUrl: responseData.metacritic.url,
          gameDeveloper: responseData.developers,
          gamePublisher: responseData.publishers,
          gameScreenshots: responseData.screenshots,
          gameSupportInfo: responseData.support_info.url,
          gameCategories: responseData.categories,
          gamePrice: responseData.price_overview.final,
          gameReleaseDate: responseData.release_date.date,
          gameLanguages: responseData.supported_languages,
          gameMovies: responseData.movies,
          gameRequirements: responseData.pc_requirements.minimum,
          gameUrl: responseData.website,
        };
      }
      if(params.gameName !== undefined) {
        var newGame = {
          gameName: params.gameName,
          gameDescription: params.gameDescription,
          gameHeader: params.gameHeader,
          gameID: params.gameID,
          gameRating: params.gameRating,
          gameRatingUrl: params.gameRatingUrl,
          gameDeveloper: "",
          gamePublisher: "",
          gameScreenshots: "",
          gameSupportInfo: params.gameSupportInfo,
          gameCategories: params.gameCategories,
          gamePrice: params.gamePrice,
          gameReleaseDate: params.gameReleaseDate,
          gameLanguages: params.gameLanguages,
          gameMovies: "",
          gameRequirements: params.gameRequirements,
          gameUrl: params.gameUrl,
        };

        for( var devs = 0; devs < params.gameDeveloper.length; devs++ ) {
          newGame.gameDeveloper += params.gameDeveloper[ devs ] + ",";
        }
        for( var pub = 0; pub < params.gamePublisher.length; pub++ ) {
          newGame.gamePublisher += params.gamePublisher[ pub ] + ",";
        }
        for( var screens = 0; screens < params.gameScreenshots.length; screens ++ ){
          newGame.gameScreenshots += params.gameScreenshots[ screens ].path_thumbnail + ",";
        }
        for( var movie = 0; movie < params.gameMovies.length; movie++ ) {
          newGame.gameScreenshots += params.gameMovies[ movie ].webm.max + ",";
        }

        return newGame;
      }
    });
    console.log( newStoreGame );
  }
  else
  {

  }
});
*/
