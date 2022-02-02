# RocketPropelledGames

## Discord commands
 "/talesOfGarbonzia" - This opens the Tales of Garbonzia game on the overviewPage

## Discord embedded messages
  ### OverviewPage
    Text - This page shows the active player (person who created the embed), a description of the game and a list of 3 save files for the user

    Buttons:
      "New Game" -
          Text = 'New Game',
          CustomId = 'Save,X,GAME_NAME(Example: talesOfGarbonzia),
          Button Style = 'default'
      "Open Save X" -
          Text = 'Open Save X,
          CustomId = 'openSave,2,GAME_NAME(Example: talesOfGarbonzia),
          Button Style = 'open'
      "Delete Save X" -
          Text = 'Delete Save X,
          CustomId = 'deleteSave,2,GAME_NAME(Example: talesOfGarbonzia),
          Button Style = 'delete'

  ### CharacterSelectPage
    Text - 3 Fields: 
      - Character Name and description (TOP)
      - Character Starting Inventory and contents (INLINE LEFT)
      - Character Starting Stats and traits (INLINE RIGHT)

    Buttons:
      "Home" - 
          Text = 'Home',
          CustomId,
          Button Style = 'dark'
      "Previous character" - 
          Text = 'Prev',
          CustomId = 'prevCharacter,CHARACTER_NAME(Example: Abigael Du Scarletta),SAFE_FILE_NAME(Example: Save1),',
          Button Style = 'default'
      "Select character" - 
          Text = 'Select Character',
          CustomId = '',
          Button Style = 'open'
      "Next character" -
          Text = 'Next',
          CustomId = 'nextCharacter,CHARACTER_NAME(Example: Abigael Du Scarletta),SAFE_FILE_NAME(Example: Save1),',
          Button Style = 'default'

  ### ActionPage
