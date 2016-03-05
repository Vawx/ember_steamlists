import Ember from 'ember';

export default Ember.Route.extend({
  steam: Ember.inject.service('steam-api'),

  model( ) {
    var self = this;
    return Ember.$.getJSON( self.get('steam').createFeaturedURL( ) ).then( function( response ) {
      var featuredGames = [];
      var params;
      response.featured_win.forEach( function( feature ) {
        params = {
          gameOriginalCost: feature.original_price,
          gameCost: feature.final_price,
          gameDiscount: feature.discount_percent,
          gameImage: feature.header_image,
          gameID: feature.id,
          gameName: feature.name,
        };
        if( params.gameOriginalCost != null ) {
          var convert = params.gameOriginalCost.toString();
          var strLen = convert.length;
          var converted = convert.substring(0, strLen - 2) + "." + convert.substring(strLen - 2);
          params.gameOriginalCost = converted;
        }
        if( params.gameCost != null ) {
          var convert = params.gameCost.toString();
          var strLen = convert.length;
          var converted = convert.substring(0, strLen - 2) + "." + convert.substring(strLen - 2);
          params.gameCost = converted;
        }
        var newBasic = {
          name: params.gameName,
          gameID: params.gameID,
        };
        featuredGames.push( params )
        var newSaveBasic = self.store.createRecord('game-basic-info', newBasic );
        newSaveBasic.save( ).then( function( ) {
        });
      });;
      return Ember.RSVP.hash ({
        saved: self.store.findAll('game-stats'),
        featured: featuredGames,
      });
    });
  },
  actions: {
    gameStats( params ) {

    },
    // Used to fill DB will all steam app IDs and names so i can search by name to get JSON response
    fillDB( ) {
      var self = this;
      return Ember.$.getJSON( self.get('steam').createFillDBURL( ) ).then( function( response ) {
        var foundGames = response.applist.apps;
        var gameIDs = [];
        foundGames.app.forEach( function( id ) {
          var params = {
            name: id.name,
            gameID: id.appid,
          };
          var newBasicInfo = self.store.createRecord('game-basic-info', params);
          newBasicInfo.save( );
        });
      });
    },
    findFromID( gameID ) {
      // Query and QueryRecord do NOT work and when they do return something, it is undefined.
      // FindAll will at least give me a result im looking for.
      var self = this;
      return this.store.findAll('game-basic-info' ).then( function( result ){
        result.forEach( function( found ) {
          if( found.get("name") === gameID.gameName.toString( ) ) {
            Ember.$.getJSON( self.get('steam').createAppUrl( found.get('gameID') ) ).then( function( response ) {
              var responseObject = response[ found.get('gameID').toString( ) ];
              if( responseObject.success ) {
                var responseData = responseObject.data;
                if(responseData != undefined) {
                  if( responseData.name != undefined ) {
                  var params = {
                      gameName: responseData.name,
                      gameDescription: responseData.detailed_description,
                      gameHeader: responseData.header_image,
                      gameID: responseData.steam_appid,
                      gameRating: "",
                      gameRatingUrl: "",
                      gameDeveloper: responseData.developers,
                      gamePublisher: responseData.publishers,
                      gameScreenshots: responseData.screenshots,
                      gameSupportInfo: responseData.support_info.url,
                      gameCategories: responseData.categories,
                      gamePrice: "",
                      gameReleaseDate: responseData.release_date.date,
                      gameLanguages: responseData.supported_languages,
                      gameMovies: responseData.movies,
                      gameRequirements: responseData.pc_requirements.minimum,
                      gameUrl: responseData.website,
                    };
                  }
                }
                if( responseData.price_overview != undefined) {
                  params.gamePrice = responseData.price_overview.final;
                }
                if( responseData.metacritic != undefined ) {
                  params.gameRating = responseData.metacritic.score;
                  params.gameRatingUrl = responseData.metacritic.url;
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
                    gameCategories: "",
                    gamePrice: params.gamePrice,
                    gameReleaseDate: params.gameReleaseDate,
                    gameLanguages: params.gameLanguages,
                    gameMovies: "",
                    gameRequirements: params.gameRequirements,
                    gameUrl: params.gameUrl,
                  };

                  for( var cat = 0; cat < params.gameCategories.length; cat++ ) {
                    newGame.gameCategories += params.gameCategories[ cat ].description.toString( ) + ", ";
                  }
                  for( var devs = 0; devs < params.gameDeveloper.length; devs++ ) {
                    newGame.gameDeveloper += params.gameDeveloper[ devs ].toString( ) + ", ";
                  }
                  for( var pub = 0; pub < params.gamePublisher.length; pub++ ) {
                    newGame.gamePublisher += params.gamePublisher[ pub ].toString( ) + ", ";
                  }
                  for( var screens = 0; screens < params.gameScreenshots.length; screens ++ ){
                    newGame.gameScreenshots += params.gameScreenshots[ screens ].path_thumbnail.toString( ) + ", ";
                  }
                  for( var movie = 0; movie < params.gameMovies.length; movie++ ) {
                    newGame.gameMovies += params.gameMovies[ movie ].webm.max.toString( ) + ", ";
                  }
                  var newGameSave = self.store.createRecord('game-stats', newGame);
                  newGameSave.save( ).then( function( ) {
                    self.transitionTo('game', newGameSave.get('id'));
                  });
                }
              }
            });
          }
        });
      });
    },
  }
});

/**
this.store.query('game-basic-info', { name: "Half-Life" } ).then( function( found ) {
  console.log( found.get("gameID") );

var url = "http://store.steampowered.com/api/appdetails?appids=" + found.get('gameID');
Ember.$.getJSON( url ).then( function( response ) {
  var responseObject = response[ found.get('gameID').toString( ) ];
  if( responseObject.success ) {
    var responseData = responseObject.data;
    if(responseData != undefined) {
      if( responseData.name != undefined ) {
        params = {
          gameName: responseData.name,
          gameDescription: responseData.detailed_description,
          gameHeader: responseData.header_image,
          gameID: responseData.steam_appid,
          gameRating: "",
          gameRatingUrl: "",
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
    }
    if( responseData.metacritic != undefined ) {
      params.gameRating = responseData.metacritic.score;
      params.gameRatingUrl = responseData.metacritic.url;
    }
    if(params.gameName !== undefined) {
      newGame = {
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
      var newGameSave = self.store.createRecord('game-stats', params);
      newGameSave.save( ).then( function( ) {
        return self.transitionTo('game', newGameSave.gameID);
      });
    }
  }
});
});
}
*/
