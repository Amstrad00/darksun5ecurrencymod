Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
  html.find('.denomination.ep').remove();
  html.find('[name="data.currency.ep"]').remove();
  html.find('.denomination.pp').text('Gold');
  html.find('.denomination.gp').text('Silver');
  html.find('.denomination.sp').text('Ceramic');
  html.find('.denomination.cp').text('Bits');
  // etc.
});
  
Hooks.once('ready', () => {
  CONFIG.Actor.sheetClasses.character['dnd5e.ActorSheet5eCharacter'].cls.prototype._onConvertCurrency = _onMyConvertCurrency;
});

  function _onMyConvertCurrency(event) {
    event.preventDefault();
    const curr = duplicate(this.actor.data.data.currency);
    console.log(curr);
    const convert = {
      cp: {into: "sp", each: 10},
      sp: {into: "gp", each: 10 },
      gp: {into: "pp", each: 10}
    };
    for ( let [c, t] of Object.entries(convert) ) {
      let change = Math.floor(curr[c] / t.each);
      curr[c] -= (change * t.each);
      curr[t.into] += change;
    }
    return this.actor.update({"data.currency": curr});
 };