/* Tales of Garbonzia - Base character constants */
module.exports = {
    characters: [
    // Abigael Du Scarletta
        {
            characterIntroLong: 'An exiled warrior from the holy order of Chevallien, you were forced to flee when your branch was decimated after a betrayal from two of your closest companions, Shazay Quorum and Rosetta Du Fireen. With your lover, Max Ogden, slain at their hands you have vowed to track them down and exact justice. You were told that Rosetta had been double crossed by the cult, The Regenerates, who had orchestrated the attack and she had been killed. You have been tracking Shazay ever since..',
            characterIntroShort: 'An exiled warrior from a holy order who vows to enact justice on those who betrayed your ministry and killed those closest to you.',
            embedColor: 'RED',
            image: '',
            inventory: {
                Clothes: {
                    Overall: {
                        Description: 'Long ruby-red robes, heavily torn',
                    },
                    Jewelry: {
                        Description: 'Scratched insignia of your holy order.'
                    }
                },
                Currency: {
                    Gold: 10
                },
                Items: [
                    'Drawing of you and Max Ogden',
                    'Handful of corn',
                ],
                Weapons: [
                    {
                        Name: 'Basic Scimitar',
                        Damage: 5,
                    }
                ]
            },
            location: {
                image: '',
                name: 'Outskirts of Rottingwood'
            },
            name: 'Abigael Du Scarletta',
            stats: {
                Courage: 16,
                Morality: 12,
                Perception: 10,
                Strength: 14,
                Wisdom: 6
            },
            story: 'You tracked down Shazay and confronted him for his crimes.',
            storyPoint: 'storyPoint0',
            thumbnail: 'https://cdn.discordapp.com/attachments/928375898288312330/928375924855046254/unknown.png',
        },
        // The Spirit, Cicero, The Crofter, Rosetta Du Fireen
        {
            characterIntroLong: 'A shapeshifting demon, cursed to inhabit the mortal plane after a failed uprising. To return he ',
            characterIntroShort: 'A shapeshifting demon, cursed to inhabit the mortal plane after a failed uprising.',
            embedColor: 'BLACK',
            image: '',
            inventory: {
                Clothes: {
                    Description: 'Plain black robes'
                },
                Currency: {
                    Gold: 2
                },
                Items: [],
                Weapons: {
                    'Basic Dagger': {
                        Damage: 3,
                    }
                }
            },
            location: {
                image: '',
                name: 'Red Lobster pet shop'
            },
            name: 'The Spirit',
            stats: {
                Courage: 14,
                Morality: 4,
                Perception: 12,
                Strength: 8,
                Wisdom: 16
            },
            story: '',
            storyPoint: 'storyPoint0',
            thumbnail: 'https://cdn.discordapp.com/attachments/928375898288312330/928382226566086746/unknown.png',
        },
        // Nigel Whithersbury
        {
            characterIntroLong: 'You are Nigel Whithersbury. A hapless child who\'s uncaring parents do nothing to stop you as you Magoo your way around the town of Rottingwood. Your never-ending hunt for shinier and sharper scissors has led you on many merry adventures. Where next will you find your quarry? What dangers may you blissfully bypass as you search.',
            characterIntroShort: 'You are Nigel. A hapless child who\'s uncaring parents do nothing to stop you as you Magoo your way around the town of Rottingwood. You favour the scissors.',
            embedColor: 'GREEN',
            image: '',
            inventory: {
                Clothes: {
                    Description: 'Light grey torn overalls and just about a pair of black farming boots.'
                },
                Currency: {
                    Raisins: 11
                },
                Items: [],
                Weapons: {
                    Fists: {
                        damage: 1,
                        Description: 'A Child\'s fists'
                    }
                }
            },
            location: {
                image: '',
                name: 'Rottingwood town square'
            },
            name: 'Nigel Whithersbury',
            stats: {
                Courage: 4,
                Luck: 18,
                Morality: 16,
                Perception: 8,
                Strength: 4,
                Wisdom: 6
            },
            storyPoint: 'storyPoint0', //Today you find yourself in the middle of Rottingwood square assailed by two local bullies who dare to try and thieve your luncheon raisins.
            thumbnail: 'https://cdn.discordapp.com/attachments/928375898288312330/928382540849487922/unknown.png',
        }]
}