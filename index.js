module.exports = function DarkhanWing(mod) {
	const { player } = mod.require.library;
	const skills = new Set();
	const abnormalWing = [97950016, 97950015, 97950014, 97950013, 97950009, 5020006, 98140055];
	const skillsWing = { red: 60401313, blue: 60401315, green: 60401317, black: 60401319, pink: 60401321, yellow: 690034 };

	mod.game.initialize("me.abnormalities");

	mod.command.add("drk", arg => {
		if (!arg) {
			mod.settings.enabled = !mod.settings.enabled;
			mod.command.message(`Module ${mod.settings.enabled ? "enabled" : "disabled" }`);
		} else {
			mod.settings.color = arg;
			mod.command.message(`Set color ${arg}`);
		}
	});

	mod.hook("S_SKILL_LIST", 2, event => {
		event.skills.forEach(skillData => {
			if (skillData.active) {
				skills.add(Number(skillData.id));
			}
		});
	});

	mod.game.on("leave_game", () => {
		skills.clear();
	});

	mod.hook("S_VISIT_NEW_SECTION", 1, () => {
		if (!mod.settings.enabled || mod.game.me.inCombat || mod.game.me.onPegasus || mod.game.me.mounted) return;
		let skillId = skillsWing[mod.settings.color];
		if (mod.settings.color === "red" && skills.has(14300016)) { // fix for menma
			skillId = 14300016;
		}
		if (skills.has(skillId)) {
			if (!abnormalWing.some(a => mod.game.me.abnormalities[a])) {
				mod.send("C_START_SKILL", 7, {
					skill: {
						type: 1,
						id: skillId
					},
					loc: player.loc,
					w: player.loc.w,
					unk: true
				});
			}
		}
	});
};