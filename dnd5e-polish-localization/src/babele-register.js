Hooks.once('init', () => {
	
	if (typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'DnD5ePolishLocalization',
			lang: 'pl',
			dir: 'lang/compendium'
		});

		Babele.get().registerConverters({
			"weight": (value) => { return parseInt(value)/2 },
			"range": (range) => {
				if(range) {
					if(range.units === 'ft') {
						if(range.long) {
							range = mergeObject(range, { long: Math.floor(range.long*0.3) });
						}
						return mergeObject(range, { value: Math.floor(range.value*0.3) });
					}
					if(range.units === 'mi') {
						if(range.long) {
							range = mergeObject(range, { long: Math.floor(range.long*1.5) });
						}
						return mergeObject(range, { value: range.value*1.5 });
					}
					return range;
				}
			}
		});
	}
});

Hooks.on('preCreateScene', (scene) => {
	mergeObject(scene, { "gridUnits": "m", "gridDistance": 1.5 });
});
