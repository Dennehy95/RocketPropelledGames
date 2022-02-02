function getBonus(stat) {
    const isNegative = stat < 10
    const bonus = (Math.floor(Math.abs(stat - 10) / 2))
    return isNegative ? (bonus * -1) : bonus
}

const storage = require('node-persist')

const StoryClass = function() {
    /*  STORY POINT 0 - Abigael in farmhouse with Shazay */
    this.storyPoint0 = function(saveData) {
        let messageDescription = '> You track down Shazay to a small, abandoned farmhouse and confront him about his crimes. You tell him you knew he and Rosetta were behind the attack on your order and that he was responsible for killing Max. \n\u200b\n' + 
            
            '> He breaks down in tears and begs for you to end his suffering, saying it was Rosetta\'s plan and and she was going to kill his entire family if he did not obey. He promises that it wasn\'t him who killed Max and that he turned on her at the last minute. Rosetta was then double crossed by The Regenerates who had been blackmailing her, but she escaped and he last saw her heading for Rottingwood. He tells you that he wants to die as they then killed his family, forcing him to flee but that he is now tired of running away..'
        let actionsAvailable = []
        if (saveData.events.Shazay?.declinedJoin) {
            messageDescription = '> Shazay looks up at you, blinking in confusion. Then his eyes fill with tears again and he begins to shake uncontrollably. Terrified, he cries, "Please no, please don\'t let them find me" and once again he begs for you to end his suffering.'
        } else {
            if (!saveData.events.Shazay?.outcome) actionsAvailable.push({actionText: 'Join me', actionPoint: 'actionPoint4'}, )
        }
        if (saveData.events.Shazay?.outcome === 'KilledQuickly') {
            messageDescription = '> You tell him to close his eyes and look down. You pull out your ' + saveData.inventory.Weapons[0].Name + ' and swiftly put him to rest. As his dead, deceased corpse falls to the ground, you notice a golden watch fall from his hands. Inside is a picture of his daughter and wife. You pocket the watch.\n\u200b\n'
            + '> **Item received**: Shazay\'s golden family watch\n'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                actionsAvailable,
                messageDescription,
            }
        }
        if (saveData.events.Shazay?.outcome === 'KilledSlowly') {
            messageDescription = '> You pull out your ' + saveData.inventory.Weapons[0].Name + ' and bring it down, savouring every cut and bludgeon you deal, his screams like music to your ears. As his dead, deceased corpse falls to the ground, you notice a golden watch fall from his hands. Inside is a picture of his daughter and wife. You pocket the watch.\n\u200b\n'
            + '> **Item received**: Shazay\'s golden family watch\n > **Morality** -2\n > **Trait gained**: Sadistic'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                actionsAvailable,
                messageDescription,
            }
        }
        if (saveData.events.Shazay?.outcome === 'Beaten') {
            messageDescription = '> You feel the rage build from within you. You leap forward and begin to pummel him with your fists. He makes no motion to stop you. You stop yourself before landing the killing blow. You take a look around at all the blood and feel sickened by your actions. You take a last look at Shazay, confirm he is still breathing, and you turn to leave.\n\u200b\n'
            + '\n > **Morality** -1'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                actionsAvailable,
                messageDescription,
            }
        }
        if (saveData.events.Shazay?.outcome === 'LeftHim') {
            messageDescription = '> You take a look at the coward. How was he ever accepted into the Order? You shake your head quietly at him, but his eyes meet only the floor. You turn away and leave him to his suffering.'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                actionsAvailable,
                messageDescription,
            }
        }
        actionsAvailable.unshift({actionText: 'Kill him quickly', actionPoint: 'actionPoint0'}, {actionText: 'Kill him slowly', actionPoint: 'actionPoint1'}, {actionText: 'Beat him', actionPoint: 'actionPoint2'}, {actionText: 'Leave him', actionPoint: 'actionPoint3'})
        return { 
            actionsAvailable,
            messageDescription,
        }
    }

    /*  STORY POINT 1 - Abigael in Rottingwood town center */
    /* STORY */
    this.storyPoint1 = function(saveData) {
        console.log(saveData)
        let messageDescription = '> Your new goal is to track down Rosetta. You arrive mid-afternoon, in the town center of Rottingwood.' + 
        '\n\u200b\n > Looking around you can see a tavern and a stables that you think could be good places to ask in. You also see a shady character hiding underneath a stoop in the wall..'
        let actionsAvailable = [
            {actionText: 'Enter the tavern', actionPoint: 'storyPoint2'},
            {actionText: 'Enter the stables', actionPoint: 'storyPoint3'},
            {actionText: 'Approach the shady character', actionPoint: 'storyPoint4'}
        ]
        return { messageDescription, actionsAvailable}
    }

    /* ACTIONS */

    // Do stat/inventory changes
    // Update story
    // Update saveTime
    // Update storyPoint

    // Abigael kills Shazay quickly
    this.actionPoint0storyPoint0 = async function(actionPoint, gamesActiveUserId, userData, saveFileName) {
        let currentSaveData = userData.talesOfGarbonzia[saveFileName]
        /* Events */
        currentSaveData.events['Shazay'] = currentSaveData.events['Shazay'] || {}
        currentSaveData.events.Shazay.outcome = 'KilledQuickly'
        /* Inventory */
        /* Stats */
        /* Story */
        currentSaveData.story = currentSaveData.story + ' After he begged for you to end his suffering you quickly and mercifully put him to rest.'
        /* Traits */
        return await storage.setItem(gamesActiveUserId, userData)
    }
    // Abigael kills Shazay slowly
    this.actionPoint1storyPoint0 = async function(actionPoint, gamesActiveUserId, userData, saveFileName) {
        let currentSaveData = userData.talesOfGarbonzia[saveFileName]
        /* Events */
        currentSaveData.events['Shazay'] = currentSaveData.events['Shazay'] || {}
        currentSaveData.events.Shazay.outcome = 'KilledSlowly'
        /* Inventory */
        /* Stats */
        currentSaveData.stats.Morality = currentSaveData.stats.Morality > 2 ? currentSaveData.stats.Morality - 2 : 0
        /* Story */
        currentSaveData.story = currentSaveData.story + ' After he begged for you to end his suffering you gave in to your inner demons and slowly and painfully put him to rest with gleeful joy.'
        /* Traits */
        currentSaveData.traits = currentSaveData.traits || []
        if (!currentSaveData.traits.includes('Sadistic')) currentSaveData.traits.push('Sadistic')
        return await storage.setItem(gamesActiveUserId, userData)
    }
    // Abigael beats Shazay
    this.actionPoint2storyPoint0 = async function(actionPoint, gamesActiveUserId, userData, saveFileName) {
        let currentSaveData = userData.talesOfGarbonzia[saveFileName]
        /* Events */
        currentSaveData.events['Shazay'] = currentSaveData.events['Shazay'] || {}
        currentSaveData.events.Shazay.outcome = 'Beaten'
        /* Inventory */
        /* Stats */
        /* Story */
        currentSaveData.story = currentSaveData.story + ' After he begged for you to end his suffering you let your rage in the moment take over and you beat him to within an inch of his life, leaving him just about alive.'
        /* Traits */
        return await storage.setItem(gamesActiveUserId, userData)
    }
    // Abigael leaves Shazay
    this.actionPoint3storyPoint0 = async function(actionPoint, gamesActiveUserId, userData, saveFileName) {
        let currentSaveData = userData.talesOfGarbonzia[saveFileName]
        /* Events */
        currentSaveData.events['Shazay'] = currentSaveData.events['Shazay'] || {}
        currentSaveData.events.Shazay.outcome = 'LeftHim'
        /* Inventory */
        /* Stats */
        /* Story */
        currentSaveData.story = currentSaveData.story + ' After he begged for you to end his suffering you pushed down your feelings of hatred. You looked at this poor excuse of a Chevallien and decided he was not deserving of your mercy. You left him untouched'
        /* Traits */
        return await storage.setItem(gamesActiveUserId, userData)
    }
    // Abigael asks Shazay to join
    this.actionPoint4storyPoint0 = async function(actionPoint, gamesActiveUserId, userData, saveFileName) {
        let currentSaveData = userData.talesOfGarbonzia[saveFileName]
        currentSaveData.events['Shazay'] = currentSaveData.events['Shazay'] || {}
        currentSaveData.events.Shazay.declinedJoin = true
        return await storage.setItem(gamesActiveUserId, userData)
    }

    /*  STORY POINT 2 - Abigael in Rottingwood tavern */

    /* STORY */
    this.storyPoint2 = function(saveData) {
        console.log(saveData)
        let messageDescription = '> You enter the tavern and look around. You see a barmaid serving drinks behind the counter. You notice a rough, ghoulish looking fellow in the corner, surrounded by what seem to be his lackeys. You also notice a passed out drunkard at a nearby table, whose pouch of gold is lying unattended on the table..' 
        let actionsAvailable = [
            {actionText: 'Approach the barmaid', actionPoint: 'actionPoint1'},
            {actionText: 'Approach the ghoulish fellow', actionPoint: 'actionPoint2'},
            {actionText: 'Try to steal the gold', actionPoint: 'actionPoint3'}
        ]
        return { messageDescription, actionsAvailable}
    }

    /* ACTIONS */
    
    /***************************************************************************************************/

    /*  STORY POINT 3 - Abigael in Rottingwood stables */

    /* STORY */
    this.storyPoint3 = function(saveData) {
        console.log(saveData)
        let messageDescription = '> You enter the stables. A scrawny, tall young lad approaches you with his moth hanging open. "Umm....Hullo..." he says to you, and he continues to start blankly at you..' 
        let actionsAvailable = [{actionText: 'Ask him for the stablemaster', actionPoint: 'actionPoint1'}, {actionText: 'Ask about Rosetta', actionPoint: 'actionPoint2'}, {actionText: 'Continue staring', actionPoint: 'actionPoint3'}]

        if (saveData.events.Stableboy?.staredAt) {
            //Count times stared at, if = 3 he starts to cry and runs away. Lose 1 point of morality, only option is leave 
        }
        if (saveData.stats.Morality <= 4) {
            //Include action to punch stable hand,if punched roll a dice, if >10 he gain back intelligence lost after being kicked by a horse and is thankful and leads you to stablemaster, if <10 he looks at you cries and runs away and you must leave
        }
        if (saveData.events.Stableboy?.punched) {
            //Count times stared at, if = 3 he starts to cry and runs away. Lose 1 point of morality, only option is leave 
        }
        return { messageDescription, actionsAvailable}
    }
    
    /* ACTIONS */
    
    /***************************************************************************************************/

    /*  STORY POINT 4 - Abigael looks for shady character under the wall */

    /* STORY */

    this.storyPoint4 = function(saveData) {
        console.log(saveData)
        let messageDescription = '> You head towards where you saw the shady character. But as you duck beneath the gap under the wall, you don\'t see anyone. You manage to just about hear a quiet *click*..' 
        let actionsAvailable = [{actionText: 'Next', actionPoint: 'actionPoint0'}]

        if (saveData.events['GameOver']) {
            messageDescription = '\n You hear a *whoosh*. Startled, you quickly leap backwards... Backwards into the oncoming warning shot. It embeds itself through your neck. You sputter out your final breaths, looking up to see your killer is just a mere boy, holding a broken hand crossbow.\n\u200b\n'
            actionsAvailable.push({actionText: 'Game Over', actionPoint: 'storyPoint1'}, )
            return { 
                actionsAvailable,
                messageDescription,
            }
        }
        // if (saveData.events.Shazay?.outcome === 'KilledSlowly') {
        //     messageDescription = '> You pull out your ' + saveData.inventory.Weapons[0].Name + ' and bring it down, savouring every cut and bludgeon you deal, his screams like music to your ears. As his dead, deceased corpse falls to the ground, you notice a golden watch fall from his hands. Inside is a picture of his daughter and wife. You pocket the watch.\n\u200b\n'
        //     + '> **Item received**: Shazay\'s golden family watch\n > **Morality** -2\n > **Trait gained**: Sadistic'
        //     actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
        //     return { 
        //         actionsAvailable,
        //         messageDescription,
        //     }
        // }
        if (saveData.events.StoryPoint4_Robbed) {
            // Stumble and robbed by kids
            messageDescription = '> Caught off guard by the bolt *whooshing* just past your head, you slid and faceplant onto the stone floor. In your dazed state you feel what seems like hundreds of tiny hands clawing all over you. Finally you shake away the stars to find yourself alone. Feeling around you realise all your money has been taken\n\u200b\n'
            + saveData.events.StoryPoint4_Robbed.inventoryUpdate
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                actionsAvailable,
                messageDescription,
            }
        } else if (saveData.events.StoryPoint4_DodgedBolt) {
            messageDescription = '> You quickly spot the *whooshing* bolt as it whizzes harmlessly past your head. A warning shot, you surmise. Turning you notice a gaggle of young thieves, stopped in there tracks staring at you. With a slight glint of your steel, they cut and run. You manage to catch the young crossbow wielder before he can turn away..\n\u200b\n'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                actionsAvailable,
                messageDescription,
            }
            // Dodge and confront, opens up story
        } else if (saveData.events.StoryPoint4_CaughtBolt) {
            messageDescription = '> You quickly spot the *whooshing* bolt and with incredible speed and precision, you pluck it out of midair. A chorus of gasps erupts from the gaggle of young thieves who were about to assail you. With a look of astonishment the young crossbow wielder drops down from him perch and apologies to you. He asks you if you need anything as the young kids stare at you in amazement..\n\u200b\n' +
            + saveData.events.StoryPoint4_CaughtBolt.traitUpdate
        }
        // Action point 0 is a dice roll to see if perceive threat. If 1-2 you get hit by crossbow and die, if <10 you just about dodge but fall over, kids rob you while shady man aims crossbow at you, if >10 you easily dodge and draw weapon, go into deeper story

        return { messageDescription, actionsAvailable}
    }

    /* ACTIONS */

    // Perception check crossbow threat
    this.actionPoint0storyPoint4 = async function(actionPoint, gamesActiveUserId, userData, saveFileName) {
        let currentSaveData = userData.talesOfGarbonzia[saveFileName]
        const d20 = Math.floor(Math.random()*20+1)
        const perceptionBonus = getBonus(currentSaveData.stats.Perception)
        const diceRollTotal = d20 + perceptionBonus
        const diceRollBonusText = perceptionBonus >= 0 ? 'Perception bonus: +' + perceptionBonus : 'Perception bonus: ' + perceptionBonus
        let storyUpdate = ''
        let isBadass = false
        if (d20 === 1 || diceRollTotal < 3) {
            currentSaveData.events['GameOver'] = true
            // storyUpdate = '\n You hear a *whoosh*. Startled, you quickly leap backwards... Backwards into the oncoming warning shot. It embeds itself through your neck. You sputter out your final breaths, looking up to see your killer is just a mere boy, holding a broken hand crossbow.'
            storyUpdate = '\n Your curiosity and lack of grace was what finally did you in. One ungainly stumble caused a wayward bolt to pierce your neck. As the young assailant looked on in horror, you bled out beneath the Rottingwood walls, failing embarrassingly in your quest.'
        } else if (diceRollTotal < 10) {
            let inventoryUpdate = ''
            Object.entries(currentSaveData.inventory.Currency).forEach(([key, value]) => {
                inventoryUpdate = inventoryUpdate + '\n **Item lost**: ' + value + ' ' + key
                currentSaveData.inventory.Currency[key] = 0
            })
            currentSaveData.events['StoryPoint4_Robbed'] = {
                inventoryUpdate,
            }
        } else if (diceRollTotal < 18) {
            currentSaveData.events['StoryPoint4_DodgedBolt'] = {}
        } else if (d20 === 20 || diceRollTotal >= 19) {
            isBadass = true
            currentSaveData.events['StoryPoint4_CaughtBolt'] =  {
                traitUpdate: '\n > **Trait gained**: Badass',
            }
        }
        /* Events */
        currentSaveData.events['DiceRoll'] = d20
        currentSaveData.events['DiceRollTotal'] = diceRollTotal
        currentSaveData.events['DiceRollBonusText'] = diceRollBonusText
        
        /* Inventory */

        /* Stats */
        /* Story */
        currentSaveData.story = currentSaveData.story + storyUpdate
        /* Traits */
        if (isBadass) {
            currentSaveData.traits = currentSaveData.traits || []
            if (!currentSaveData.traits.includes('Badass')) currentSaveData.traits.push('Badass')
        }
        return await storage.setItem(gamesActiveUserId, userData)
    }
    
    /***************************************************************************************************/
}


module.exports.getStory = function(saveData, saveFileName) {
    const story = new StoryClass()
    const functionName = saveData.storyPoint
    console.log(functionName)
    return story[functionName](saveData, saveFileName)
}

module.exports.performActionPoint = async function(actionPoint, gamesActiveUserId, userData, saveData, saveFileName) {
    console.log('performActionPoint')
    console.log(actionPoint)
    console.log(saveData.storyPoint)
    console.log(actionPoint + saveData.storyPoint)
    const story = new StoryClass()
    return await story[actionPoint + saveData.storyPoint](actionPoint, gamesActiveUserId, userData, saveFileName)
}