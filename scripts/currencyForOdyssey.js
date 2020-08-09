Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
  html.find('.denomination.ep').remove();
  html.find('[name="data.currency.ep"]').remove();
  html.find('.denomination.pp').remove();
  html.find('[name="data.currency.pp"]').remove();
  html.find('.denomination.cp').remove();
  html.find('[name="data.currency.cp"]').remove();
  html.find('.denomination.gp').text('Drachma');
  html.find('.denomination.sp').text('=Lepta');
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
      sp: {into: "gp", each: 100}
    };
    for ( let [c, t] of Object.entries(convert) ) {
      let change = Math.floor(curr[c] / t.each);
      curr[c] -= (change * t.each);
      curr[t.into] += change;
    }
    return this.actor.update({"data.currency": curr});
 };
