let canvas = document.getElementById('gameField');
let context = canvas.getContext('2d');
let grid = 16; // Размер одной клетки
let count = 0;
let score = 0;
let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells:[],
    maxCells:4, // Стартовая длина
};

let food = {
    x: 320,
    y: 320,
};


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function game() {
    requestAnimationFrame(game); 
    if(++count < 4) {  // Замедление до 15 FPS
        return;
    };

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height); //Очищение поля

    snake.x += snake.dx;
    snake.y += snake.dy;

    if(snake.x < 0) {  // Продолжение движения с другого конца экрана
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    };
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if ( snake.y >= canvas.height) {
        snake.y = 0;
    };

    snake.cells.unshift({x: snake.x, y: snake.y}); // Голова змейки

    if (snake.cells.length > snake.maxCells) { // удаление последнего элемента
        snake.cells.pop();
    };

    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, grid - 1, grid - 1);

    context.fillStyle = 'green';

    snake.cells.forEach(function(cell , index) { // Обработка каждого элемента змейки
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1); // для черной сетки вокруг клеток

        if (cell.x === food.x && cell.y === food.y) { 
            snake.maxCells++;
            food.x = getRandom(0, 25) * grid; // Всего в поле 25 ячеек
            food.y = getRandom(0, 25) * grid;
        };

        for ( let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) { // Есть ли в массиве клетки с одинаковыми координатами
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
    
                food.x = getRandom(0, 25) * grid;
                food.y = getRandom(0, 25) * grid;
            };
        };
    });
};

document.addEventListener('keydown', function(e) { // Управление 
    if (e.which === 37 && snake.dx === 0) { // движение по направлению
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    };
});
requestAnimationFrame(game);