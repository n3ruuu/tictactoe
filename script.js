const Player = (name, marker) => {
    let playerScore = 0
    
    const getPlayerScore = () => playerScore
    const incrementScore = () => playerScore++
    const resetScore = () => playerScore = 0
    const getPlayerName = () => name

    return { getPlayerName, name, marker, getPlayerScore, incrementScore, resetScore }
}

const Gameboard = (() => {
    let boardArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    const getBoard = () => boardArray
    
    const resetBoard = () => {
        boardArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }  

    const markBoard = (index, marker) => {
        const [row, col] = index
        if ((row >= 0 && row < 3) && (col >= 0 && col < 3) && (boardArray[row][col] == '')) {
            boardArray[row][col] = marker 
            checkBoard()    
        }
        else console.log('Invalid')
    }

    const checkBoard = () => {
        const patterns = [
            // rows
            boardArray[0],
            boardArray[1],
            boardArray[2],
            // columns
            [boardArray[0][0], boardArray[1][0], boardArray[2][0]],
            [boardArray[0][1], boardArray[1][1], boardArray[2][1]],
            [boardArray[0][2], boardArray[1][2], boardArray[2][2]],
            // diagonals
            [boardArray[0][0], boardArray[1][1], boardArray[2][2]],
            [boardArray[0][2], boardArray[1][1], boardArray[2][0]]
        ]

        for (let i = 0; i < patterns.length; i++) {
            const line = patterns[i]
            if (line[0] !== '' && (line[0] === line[1]) && (line[0] === line[2])) {
                Display.updateScore(line[0])
                Display.setIsOver(true)
                return
            }
        }
        console.table(getBoard()) 
        console.log('No winner yet')     
    }

    console.table(getBoard())

    return { getBoard, resetBoard, markBoard, checkBoard }
})()

const Display = (() => {

    const getPlayerOneName = () => document.querySelector('#player1').value;
    const getPlayerTwoName = () => document.querySelector('#player2').value;

    const playerOne = Player(getPlayerOneName(), 'X')
    const playerTwo = Player(getPlayerTwoName(), 'O')

    let activePlayer = playerOne
    let isOver = false
    let roundNumber = 1
    let tieNum = 0


    // cache DOM
    const boxes = document.querySelectorAll('.box')
    const roundNum = document.querySelector('.round-num')
    const playerX = document.querySelector('.playerX')
    const playerO = document.querySelector('.playerO')
    const xScore = playerX.querySelector('.score')
    const oScore = playerO.querySelector('.score')
    const p1NameHolder = playerX.querySelector('.text')
    const p2NameHolder = playerO.querySelector('.text')
    const ties = document.querySelector('.ties .score')
    const continueRoundBtn = document.querySelector('.continue-btn')
    const resetBtn = document.querySelector('.reset-btn')
    const confirmBtn = document.querySelector('.confirm-btn')
    const modal = document.querySelector('#modal')
    const inputs = document.querySelectorAll('input')

    confirmBtn.addEventListener('click', (e) => addPlayers(e))

    const addPlayers = (e) => {
        e.preventDefault()

        const playerOneName = getPlayerOneName()
        const playerTwoName = getPlayerTwoName()

        if (playerOneName === '' || playerTwoName === '') return

        p1NameHolder.textContent = getPlayerOneName()
        p2NameHolder.textContent = getPlayerTwoName()
        
        render()
        hideModal()
    }

    const hideModal = () => {
        modal.style.display = 'none'
        inputs.forEach(input => input.value  = '')
    }
    const showModal = () => modal.style.display = 'block'

    // bind events
    resetBtn.addEventListener('click', () => resetGame())
    continueRoundBtn.addEventListener('click', () => continueRound())

    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            let boxIndex = parseInt(e.target.dataset.index)   
            let boxContent = e.target.textContent
            if (boxContent !== '') return

            playRound(boxIndex)
            checkTie()
        })
    })

    const render = () => {
        xScore.textContent = playerOne.getPlayerScore()
        oScore.textContent = playerTwo.getPlayerScore()
        roundNum.textContent = roundNumber
        ties.textContent = tieNum
    }

    const playRound = (index) => {
        if (isOver) return
        let row = Math.floor(index / 3)
        let col = index % 3
        Gameboard.markBoard([row, col], activePlayer.marker)
        updateBoard(index)
    }

    const checkTie = () => {
        if (Array.from(boxes).every(box => box.textContent !== '')) {
            incrementTie()
            setIsOver(true)
            render()
        }
    }

    const getNextPlayer = () => {
        if (isOver) activePlayer = playerOne
        activePlayer === playerOne ? activePlayer = playerTwo : activePlayer = playerOne
    }

    const updateBoard = (index) => {
        boxes[index].textContent = activePlayer.marker
        Gameboard.checkBoard()
        getNextPlayer()
    }

    const clearBoard = () => {
        for (let i = 0; i < 9; i++) {
            boxes[i].textContent = ''
        }
    }

    const continueRound = () => {
        if (!isOver) return
        roundNumber++
        resetRound()
        render()
    }

    const resetGame = () => {
        tieNum = 0
        roundNumber = 1
        resetRound()
        playerOne.resetScore()
        playerTwo.resetScore()
        render()
        showModal()
    }

    const resetRound = () => {
        Gameboard.resetBoard()
        clearBoard()
        setIsOver(false)
        getNextPlayer()
    }

    const updateScore = (winner) => {
        if (isOver) return
        if (winner === 'X') {
            playerOne.incrementScore()
            xScore.textContent = playerOne.getPlayerScore()
        } else if (winner === 'O') {
            playerTwo.incrementScore()
            oScore.textContent = playerTwo.getPlayerScore()
        }
    }

    const setIsOver = (state) => isOver = state
    const incrementTie = () => tieNum++

    render()

    return { setIsOver, updateScore }

})()