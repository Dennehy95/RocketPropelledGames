const storage = require('node-persist')

const StoryClass = function() {
    this.storyPoint0 = function(saveData, saveFileName) {
        let messageDescription = '> You track down Shazay to a small, abandoned farmhouse and confront him about his crimes. You tell him you knew he and Rosetta were behind the attack on your order and that he was responsible for killing Max. \n\u200b\n' + 
            
            '> He breaks down in tears and begs for you to end his suffering, saying it was Rosetta\'s plan and and she was going to kill his entire family if he did not obey. He promises that it wasn\'t him who killed Max and that he turned on her at the last minute. Rosetta was then double crossed by The Regenerates who had been blackmailing her, but she escaped and he last saw her heading for Rottingwood. He tells you that he wants to die as they then killed his family, forcing him to flee but that he is now tired of running away and wants the pain to stop.'
        let actionsAvailable = []
        if (saveData.events.Shazay?.declinedJoin) {
            messageDescription = '> Shazay looks up at you, blinking in confusion. Then his eyes fill with tears again and he begins to shake uncontrollably. Terrified, he cries, "Please no, please don\'t let them find me" and once again he begs for you to end his suffering.'
        } else {
            if (!saveData.events.Shazay?.outcome) actionsAvailable.push({actionText: 'Join me', actionPoint: 'actionPoint4'}, )
        }
        if (saveData.events.Shazay?.outcome === 'KilledQuickly') {
            messageDescription = '> You tell Shazay to close his eyes and look down. As he quietly whimpers you pull out your ' + saveData.inventory.Weapons[0].Name + ' and swiftly put him to rest. As his dead, deceased corpse falls to the ground, you notice a golden watch fall from his hands. Inside is a picture of his daughter and wife. You pocket the watch.\n\u200b\n'
            + '> **Item received**: Shazay\'s golden family watch\n'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                messageDescription,
                actionsAvailable
            }
        }
        if (saveData.events.Shazay?.outcome === 'KilledSlowly') {
            messageDescription = '> You pull out your ' + saveData.inventory.Weapons[0].Name + ' and begin to slowly end the miserable life of this rat. Savouring every cut and bludgeon you deal, licking the spraying blood off your lips. His screaming is like music to your ears. You give him a final heavy kick which plum near takes his head off. As his dead, deceased corpse falls to the ground, you notice a golden watch fall from his hands. Inside is a picture of his daughter and wife. You pocket the watch.\n\u200b\n'
            + '> **Item received**: Shazay\'s golden family watch\n > **Morality** -2\n > **Trait gained**: Sadistic'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1, '}, )
            return { 
                messageDescription,
                actionsAvailable
            }
        }
        if (saveData.events.Shazay?.outcome === 'Beaten') {
            messageDescription = '> You feel the rage build from within you. You leap forward and begin to pummel him with your fists. He makes no motion to stop you. Twice your kicks seem to knock him out but still he remains conscious. The floor is covered in pools of his blood. You raise your arm, ready to land the killing blow. But you stop yourself. You take a look around feel sickened by your actions. You take a last look at Shazay, confirming he is still breathing, and you turn to leave.\n\u200b\n'
            + '\n > **Morality** -1'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                messageDescription,
                actionsAvailable
            }
        }
        if (saveData.events.Shazay?.outcome === 'LeftHim') {
            messageDescription = '> You take a look at this cowardly worm. How was he ever accepted into the Order of the Chevallien? You shake your head quietly at him, but his eyes meet only the floor. You turn away and leave him to his suffering.'
            actionsAvailable.push({actionText: 'Next', actionPoint: 'storyPoint1'}, )
            return { 
                messageDescription,
                actionsAvailable
            }
        }
        actionsAvailable.unshift({actionText: 'Kill him quickly', actionPoint: 'actionPoint0'}, {actionText: 'Kill him slowly', actionPoint: 'actionPoint1'}, {actionText: 'Beat him', actionPoint: 'actionPoint2'}, {actionText: 'Leave him', actionPoint: 'actionPoint3'})
        return { 
            messageDescription,
            actionsAvailable
        }
    }
    this.storyPoint1 = function(saveData, saveFileName) {
        console.log(saveData)
        return { messageDescription: 'storyPoint1', actionsAvailable: {}}
    }
    this.storyPoint2 = function(saveData, saveFileName) {
        console.log(saveData)
        return { messageDescription: 'storyPoint2', actionsAvailable: {}}
    }
}

const ActionPointClass = function() {
    /*  storyPoint0 - Abigael in farmhouse with Shazay */
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
        currentSaveData.stats.morality = currentSaveData.stats.morality > 2 ? currentSaveData.stats.morality - 2 : 0
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
    const actions = new ActionPointClass()
    return await actions[actionPoint + saveData.storyPoint](actionPoint, gamesActiveUserId, userData, saveFileName)
    // return story[functionName](saveData)
}