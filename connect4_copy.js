class Game {
    constructor(p1, p2, width = 7, height = 6) {
        this.players = [p1, p2];
        this.height = height;
        this.width = width;
        this.currPlayer = p1;
        this.makeBoard();
        this.makeHtmlBoard();
        this.gameOver = false;
    }

    makeBoard() {
        this.board = [];
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
        }
    }

    makeHtmlBoard() {
        const board = document.getElementById('board');

        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', handleClick);

        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }

        board.append(top);

        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }
            board.append(row);
        }
    }

    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
            if (!board[y][x]) {
                return y;
            }
        }
        return null;
    }

    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.classList.add(`p${currPlayer}`);
        piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        alert(msg);
    }

    handleClick(evt) {
        const x = +evt.target.id;
        const y = this.findSpotForCol(x);

        if (y === null) {
            return;
        }
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        if (checkForWin()) {
            return this.endGame(`Player ${this.currPlayer} won!`)
        }

        if (this.board.every(row => row.every(cell => cell))) {
            return this.endGame('Tie!');
        }

        this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }

    checkForWin() {
        function _win(cells) {
            return cells.every(
                ([y, x]) =>
                    y >= 0 &&
                    y < this.height &&
                    x >= 0 &&
                    x < this.width &&
                    board[y][x] === this.currPlayer
            );
        }
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }
        }
    }

}
