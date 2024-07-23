const Player = (name, marker) => {
    let playerScore = 0;
    
    const getPlayerScore = () => playerScore;
    const incrementScore = () => playerScore++;

    return { name, marker, getPlayerScore, incrementScore }
}

const Gameboard = (() => {
    let boardArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const getBoard = () => boardArray;
    
    const resetBoard = () => {
        boardArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }  

    const markBoard = (index, marker) => {
        const [row, col] = index;
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
            const line = patterns[i];
            if (line[0] !== '' && (line[0] === line[1]) && (line[0] === line[2])) {
                console.log(`Winner: ${line[0]}`)
                return;
            }
        }
        console.table(getBoard()) 
        console.log('No winner yet')     
    }

    console.table(getBoard())

    return { getBoard, resetBoard, markBoard, checkBoard }
})()

const Display = (() => {

})()