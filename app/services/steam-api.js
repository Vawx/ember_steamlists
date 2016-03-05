import Ember from 'ember';

export default Ember.Service.extend({
  key: "664E7EA41CB695E0AB7CC82FCA403940",
  createAppUrl( id ) {
    return "http://store.steampowered.com/api/appdetails?appids=" + id;
  },
  createFeaturedURL( ) {
    return "http://store.steampowered.com/api/featured/";
  },
  createFillDBURL( ) {
    return "http://api.steampowered.com/ISteamApps/GetAppList/v0001/";
  }
});
