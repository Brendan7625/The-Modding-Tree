addLayer("a", {
    name: "Act Aspects", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Act Aspects", // Name of prestige currency
    baseResource: "messages", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('a', 13)) mult = mult.times(upgradeEffect('a', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Gain Act Aspects", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Get More People",
            description: "Double the messages sent in the server",
            cost: new Decimal(1),
        },
        12: {
            title: "The Second Time's Always Faster",
            description: "Boost message gain by Act Aspects",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Act Speedup",
            description: "Boost Act Point gain by messages",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}
        }
    },
    layerShown(){return true}
})
addLayer("acts", {
    name: "Acts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ac", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#800000",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "Acts", // Name of prestige currency
    baseResource: "Act Aspects", // Name of resource prestige is based on
    baseAmount() {return player["a"].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Move on to the next Act", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})