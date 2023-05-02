const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('option')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are working in your famous 5 star family owned Pizzeria, when all of a sudden you hear a terrifying groaning coming from the tables. You look around the vicinity and find your trusty spatula laying next to you.',
    options: [
      {
        text: 'Take the trusty spatula',
        setState: { TrustedSpatula: true },
        nextText: 2
      },
      {
        text: 'Determine the spatula is not as trusty as it looks',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You head fourth into the dining area of your restaurant. You see a giant ghost of a pizza floating about scaring your customers to death! You weigh up your options.',
    options: [
      {
        text: 'Fight the evil ghost pizza',
        nextText: 4
      },
      {
        text: 'Call the pizza police',
        nextText: 5
      },
      {
        text: 'Run away and dishonor the Meatball family',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You point your trusty spatula at the evil ghost pizza and yell "Hey pizzano! I challenge you... TO A DANCE OFF!". The evil ghost pizza smirks and says "You cannot defeat me! I am the best pizza dancer in the galaxy".',
    options: [
        {
            text: 'Say "PROVE IT YOU CODARDO!"',
            setState: { Bold: true },
            nextText: 7
          },
          {
            text: "Channel your trusty spatula's power and Bust a move!",
            requiredState: (currentState) => currentState.TrustedSpatula,
            nextText: 9
          },
    ]
  },
  {
    id: 5,
    text: 'You reach for your phone to call the pizza police. Moments after the pizza police burst in through the door! They look around, but the evil ghost pizza is nowhere to be seen! As you are the only suspect there, you are taken to pizza court for wasting police time...',
    options: [
      {
        text: 'GAME OVER (Restart)',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You turn and run away screaming loudly, as you run you slip on a splatter of cheese and break your back!',
    options: [
        {
            text: 'GAME OVER (Restart)',
            nextText: -1
          }
    ]
  },
  {
    id: 7,
    text: 'The pizza grows a pair of ghoulish arms and legs and begins to do some of the best breakdancing you have ever seen!',
    options: [
      {
        text: 'Watch in awe',
        nextText: 8
      },
      {
        text: "Channel your trusty spatula's power and Bust a move!",
        requiredState: (currentState) => currentState.TrustedSpatula,
        nextText: 9
      },
    ]
  },
  {
    id: 8,
    text: "You stare in awe at the pizzas moves, they are the best you have ever seen! You become hypnotized by his awesome moves and hand over your family pizzeria. The new 'Evil Pizza Pizzeria' becomes the biggest pizza chain in the world, all because you couldn't match his skills...",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: "Channeling your trusty spatula's power, you begin to break it down in response to the evil ghost pizza! As you do this the ground rumbles and a portal opens, two men dressed in 80s Disco Hip Hop atire step out. They explain that they're the judges of galactic breakdance, and this is now an official dance-off! Absolutely NO magical spatulas are allowed...",
    options: [
      {
        text: "Give up your spatula and commence the final showdown!",
        requiredState: (currentState) => currentState.TrustedSpatula,
        requiredState: (currentState) => currentState.Bold,
        nextText: 13
      },
      {
        text: "Continue the dance off and show off your master skills.",
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: "The disco judges sniff the air and tell both you and the ghost pizza to stop! They ask you both to empty your pockets. The pizza empties his, spilling cheese onto the floor. You have your spatula in your pocket. You'll be exposed as a cheat if you bring it out!",
    options: [
        {
            text: "Refuse to empty your pockets",
            nextText: 11
          },
          {
            text: "Empty your pockets",
            nextText: 12
          }
    ]
  },
  {
    id: 11,
    text: "You refuse to empty your pockets. The disco judges punch you and force you to! They figure out you're a dirty cheater and you're laughed out of the pizzeria.",
    options: [
      {
        text: 'GAME OVER (Restart)',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: "You comply with the judges demands. You feel sheepish after this and find yourself barely able to compete against the mighty evil ghost pizza! You've been made a fool.",
    options: [
      {
        text: 'GAME OVER (Restart)',
        nextText: -1
      }
    ]
  },
  {
    id: 13,
    text: "You comply with the judges demands. But you're bold! You begin to breakdance so hard that the fabric of space and time rips apart and consumes the evil ghost pizza! The judges respect your moves and depart. Your restaurant is saved!",
    options: [
      {
        text: 'VICTORY! (Restart?)',
        nextText: -1
      }
    ]
  }
]

startGame()