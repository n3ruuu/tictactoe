const Player = (marker) => {
    return marker
}

const Gameboard = (() => {
    let boardArray = [
        ['x', 'x', 'o'],
        ['o', 'o', 'x'],
        ['x', 'x', 'x']
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
        ((row >= 0 && row <= 3) && (col >= 0 && col <= 3) && (boardArray[row][col] == '')) 
            ? (boardArray[row][col] = marker, console.table(getBoard()))    
            : console.log('Invalid')
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

        patterns.forEach(line => {
            (line !== '' && (line[0] === line[1]) && (line[0] === line[2]))
                ? console.log('Winner')
                : console.log('No winner')
        })        

    }

    console.table(getBoard())

    return { getBoard, resetBoard, markBoard, checkBoard }
})()

const Display = {

}