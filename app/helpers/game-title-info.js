import Ember from 'ember';

//game.gameName getGameCost getDeveloper game.gameRating game.gameUrl game.relaseDate
export function gameTitleInfo(params/*, hash*/) {
  console.log(params[3]);
  return "<h1><a href="+ params[4] + ">" + params[0] + "</a></h1><span class='label label-default'>Rating: " + params[3] + " / 100</span><span class='label label-success'>"+ params[1] +"</span> <span class='label label-info'>Released:" + params[5] +"</span><span class='label label-warning'>" + params[2] + "</span>";
}

export default Ember.Helper.helper(gameTitleInfo);
