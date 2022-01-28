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



function Dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.btn')) {
      var dropdowns = document.getElementsByClassName("content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        };
      };
    };
  }; 

function Light() {
    document.getElementsByTagName('body')[0].style.background = "#" + 'd5cbcb';
}

function Dark() {
    document.getElementsByTagName('body')[0].style.background = "#" + '070214';
}

function Obsidian() {
    document.getElementsByTagName('body')[0].style.background = "#" + '210c57';
}

function change_color() {
    let hex_numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F"];

    let hexcode = '';
    for(let i = 0; i < 6; i++) {
        let random_index = Math.floor(Math.random() * hex_numbers.length);

        hexcode += hex_numbers[random_index];
    };
    document.getElementsByTagName('body')[0].style.background = "#" + hexcode;
};

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function game() {
    requestAnimationFrame(game); 
    if(++count < 5) {  
        return;
    };


    document.getElementById("value").innerHTML = score;

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

    context.fillStyle = 'green';
    context.fillRect(food.x, food.y, grid - 1, grid - 1);

    context.fillStyle = 'purple';

    snake.cells.forEach(function(cell , index) { // Обработка каждого элемента змейки
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1); // для черной сетки вокруг клеток

        if (cell.x === food.x && cell.y === food.y) { 
            snake.maxCells++;
            score++;
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
                score = 0;
    
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