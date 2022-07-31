module.exports = function DarkhanWing(mod) {
let enabled = false;
let player = null;

    mod.game.initialize("me.abnormalities");
    
    mod.command.add(["drk"], () => {
		enabled = !enabled;

		mod.command.message(`Module ${ enabled ? "disabled" : "enabled"}`);
	});
    
    mod.hook("S_SPAWN_ME", 3, event => { player = event; });
    
    mod.hook("C_PLAYER_LOCATION", 5, event => { player = event; });
    
    mod.hook("S_VISIT_NEW_SECTION", 1, () => {
      if(enabled) return;
        if (!mod.game.me.abnormalities ["5020006"] ) {
            mod.send('C_START_SKILL', 7,
            {"skill": {
            "type": 1,
            "id": 14300016,
            },
        "loc": player.loc,
        "w": player.w,
        "unk": true,
            }
        )}
    });
}