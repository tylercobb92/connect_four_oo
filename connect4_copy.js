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


    }










}