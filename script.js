const Player = (marker) => {
    let playerScore = 0
    
    const getPlayerScore = () => playerScore
    const incrementScore = () => playerScore++
    const resetScore = () => playerScore = 0

    return { marker, getPlayerScore, incrementScore, resetScore }
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

    const x = Player('X')
    const o = Player('O')

    let activePlayer = x
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
    const ties = document.querySelector('.ties .score')
    const continueRoundBtn = document.querySelector('.continue-btn')
    const resetBtn = document.querySelector('.reset-btn')

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
        xScore.textContent = x.getPlayerScore()
        oScore.textContent = o.getPlayerScore()
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
        if (isOver) activePlayer = x
        activePlayer === x ? activePlayer = o : activePlayer = x
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
        x.resetScore()
        o.resetScore()
        render()
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
            x.incrementScore()
            xScore.textContent = x.getPlayerScore()
            console.log(xScore.textContent = x.getPlayerScore())
        } else if (winner === 'O') {
            o.incrementScore()
            oScore.textContent = o.getPlayerScore()
        }
    }

    const setIsOver = (state) => isOver = state
    const incrementTie = () => tieNum++

    render()

    return { setIsOver, updateScore }

})()