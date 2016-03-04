import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-stats-large', 'Integration | Component | game stats large', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{game-stats-large}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#game-stats-large}}
      template block text
    {{/game-stats-large}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
