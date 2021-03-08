var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var up = 38;
var down = 40;
var left = 37;
var right = 39;
var food_remain = -1;
var num_of_monsters = -1;
var timeToPlay = -1;
var extra_food = 1;
var pacman_right = true;
var pacman_left = false;
var pacman_up = false;
var pacman_down = false;
var num_of_25_pt;
var scoreOfTotalBoard = 0;
var pacman_dead = false;
var boardMonsters;
var boardExtraScore;
var intervalMonster;
var numOfLifes = 5;
var playerName;
var extra_life = 1;
var clock = 1;
var gameSong;
var noSound = false;
var intervalExtraScore;
var n;
var k;
var size_x_to_draw;
var size_y_to_draw;
var intervals = [];


$(function() {
    $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Letters only please");

    $.validator.addMethod("alphanumeric", function(value, element) {
        return this.optional(element) || /^.*(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/i.test(value);
    }, "Please use with letters and numbers");

    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({
        // Specify validation rules
        rules: {
            user_name: "required",
            user_password: {
                required: true,
                minlength: 6,
                alphanumeric: true,
            },
            userFirstName: {
                required: true,
                lettersonly: true
            },
            userLastName: {
                required: true,
                lettersonly: true
            },
            userMail: {
                required: true,
                email: true
            },
            birthday: "required",
        },
        // Specify validation error messages
        messages: {
            user_name: "Username is required",
            user_password: {
                required: "Password is required",
                minlength: "Password length should be 6",
                maxlength: "Password length should be 6"
            },
            userFirstName: {
                required: "First name is required",
                lettersonly: "First name should contains only letters"
            },
            userLastName: {
                required: "Last name is required",
                lettersonly: "Last name should contains only letters"
            },
            userMail: {
                required: "Email is required",
                email: "Please enter a valid email address"
            },
            birthday: "Birthday is required",
        },
        submitHandler: function(form) {
            // alert("Hi");
            save_user();
            // form.submit();
        },
        invalidHandler: function(event, validator) {
            alert("Please check your registration values!")
        }
    });
});

$(function() {
    $("form[name='setting']").validate({
        // Specify validation rules
        rules: {
            // upId:{
            //     maxlength: 1,
            // },
            // downId:{
            //     maxlength: 1,
            // },
            // rightId:{
            //     maxlength: 1,
            // },
            // leftId:{
            //     maxlength: 1,
            // },
            food: {
                required: true,
                min: 50,
                max: 90,
            },
            monsters: {
                required: true,
                min: 1,
                max: 4,
            },
            lblTimeSetting: {
                required: true,
                min: 60,
            },
        },
        // Specify validation error messages
        messages: {
            // upId: "Please insert only one keyboard",
            // leftId: "Please insert only one keyboard",
            // upId: "Please insert only one keyboard",
            // rightId: "Please insert only one keyboard",
            food: {
                required: "Number of balls is required",
                min: "Please insert Number between 50 to 90",
                max: "Please insert Number between 50 to 90",
            },
            monsters: {
                required: "Number of monsters is required",
                min: "Please insert Number between 1 to 4",
                max: "Please insert Number between 1 to 4",
            },
            lblTimeSetting: {
                required: "Time is required",
                min: "Please insert at least 60 seconds",
            },
        },
        submitHandler: function(form) {
            submit_setting();
            startForNow();
        },
        invalidHandler: function(event, validator) {
            alert("Please check your setting values!")
        }
    });
});


function submit_setting(){
    $("#setting").css("display", "none");
    $("#random_btn").css("display", "none");
    $('#score_time_life').css('display', 'block');
    $('#random_btn').css('display', 'none');
    settings_display();
}
function playSong() {
    gameSong.play();

}
function stopSong() {
    gameSong.pause();
}
function myFunctionLogin() {
    document.getElementById("name").value = null;
    document.getElementById("userPassword").value = null;
    $(document.getElementById("welcome")).hide();
    $(document.getElementById("about")).hide();
    $(document.getElementById("register")).hide();
    $(document.getElementById("setting")).hide();
    $(document.getElementById("login")).show();
    $("#random_btn").css("display", "none");
    $('#score_time_life').css('display', 'none');
    $("#foot").css("position","fixed");
    clearIntervals();
    if(!noSound) {
        stopSong();
        stop_soundEffect();
        noSound = false;
    }
}

$(document).ready(function () {
    $("#aboutBtn").click(function () {
        $('#welcome').css("display", "none");
        $(document.getElementById("register")).hide();
        $(document.getElementById("login")).hide();
        $("#about").show(300);
        $(document.getElementById("setting")).hide()
        $("#random_btn").css("display", "none");
        $('#score_time_life').css('display', 'none');
        $("#foot").css("position","fixed")
        stopSong();
        stop_soundEffect()
        noSound = false;
    });
});

$(document).ready(function () {
    $("#welcomeBtn").click(function () {
        clearIntervals();
        $(document.getElementById("about")).hide();
        $(document.getElementById("register")).hide();
        $(document.getElementById("login")).hide();
        $('#welcome').css("display", "block");
        $(document.getElementById("setting")).hide();
        $("#random_btn").css("display", "none");
        $('#score_time_life').css('display', 'none');
        $("#foot").css("position","fixed");
        stopSong();
    });
});

$(document).ready(function () {
    $("#loginBtn").click(function () {
        myFunctionLogin();
    });
});

$(document).ready(function () {
    $("#registerBtn").click(function () {
        clearIntervals();
        $('#welcome').css("display", "none");
        $(document.getElementById("about")).hide();
        $(document.getElementById("login")).hide();
        $("#register").show(300);
        $(document.getElementById("setting")).hide();
        $("#random_btn").css("display", "none");
        $('#score_time_life').css('display', 'none');
        $("#foot").css("position","fixed");
        stopSong();
    });
});

/* defult user */
$(document).ready(function () {
    let defUserName = {
        userName: "p",
        userPassword: "p",
        firstName: "p",
        lastName: "p",
        mail: "p@gmail.com",
        birthDay: Date.now()
    };
    let str = JSON.stringify(defUserName);
    localStorage.setItem("p", str);
});


function save_user() {
    var user_name = document.getElementById("user_name").value;
    var password =  document.getElementById("user_password").value;
    var firstName = document.getElementById("userFirstName").value;
    var lastName = document.getElementById("userLastName").value;
    var userMail = document.getElementById("userMail").value;
    var date = document.getElementById("birthday").value;
    if (localStorage.getItem(user_name) === null) {
        let data = {
            userName: user_name,
            userPassword: password,
            firstName: firstName,
            lastName: lastName,
            mail: userMail,
            birthDay: date
        };
        document.forms[0].reset();
        let str = JSON.stringify(data);
        localStorage.setItem(user_name, str);
        $('#register').css('display', 'none');
        $("#loading_img").css("display","block");
        setTimeout(hide,2000);
        playerName = userMail;
    }
    else {
        alert("this user already exist");
    }
}

function load_user() {
    let userName = document.getElementById("name").value;
    let userPassword = document.getElementById("userPassword").value;
    let originalData = localStorage.getItem(userName);
    console.info(originalData);
    if (originalData === null || userName === "" || userPassword ==="") {
        alert("You must to fill all the labels before you enter the game");
    }
    else {
        let dataObj = JSON.parse(originalData);
        let psd = dataObj.userPassword;
        let name = dataObj.userName;
        if (userName === name && userPassword === psd) {
            $('#login').css('display', 'none');
            $("#loading_img").css("display","block");
            setTimeout(hide,2000);
            playerName = userName;
        }
    }
}
function hide() {
    $("#loading_img").css("display","none");
    initSetting();
    $('#setting').css('display', 'block');
    $("#random_btn").css("display","block");
}

function initSetting() {
    document.getElementById("upId").value = "ArrowUP";
    document.getElementById("downId").value = "ArrowDown";
    document.getElementById("leftId").value = "ArrowLeft";
    document.getElementById("rightId").value = "ArrowRight";
    up = 38;
    down = 40;
    left = 37;
    right = 39;
    // upId.placeholder = "ArrowUp";
    // downId.placeholder = "ArrowDown";
    // leftId.placeholder = "ArrowLeft";
    // rightId.placeholder = "ArrowRight";
    document.getElementById("food").value = null;
    document.getElementById("monsters").value = null;
    document.getElementById("lblTimeSetting").value = null;
}

function open_about() {
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    // btn.onclick = function () {
    //     modal.style.display = "block";
    // }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
    // when user clicks on the Esc button, close it
    document.onkeydown = function (event) {
        var x = event.keyCode;
        if (x === 27) {
            modal.style.display = "none";
        }
    };
    modal.style.display = "block";
}

function myFunction() {
    clearIntervals();
    $('#welcome').css("display", "none");
    $(document.getElementById("about")).hide();
    $(document.getElementById("login")).hide();
    $(document.getElementById("register")).show();
    $("#register").show(300);
}
function calculateCubeSize() {
    size_x_to_draw = 15*canvas.height/225;
    size_y_to_draw = 15*canvas.width/225;
}

function startForNow() {
    // e.preventDefault();
    context = canvas.getContext("2d");
    calculateCubeSize();
    $("#foot").css("position","relative");
    initNewGame();
    settings_display();
    //$("#newGame_btn").css("display","block");
}

function initNewGame() {
    clearIntervals();
    $("#timeAlert").css("display", "none");
    calculateCubeSize();
    pacman_dead = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context = canvas.getContext("2d");
    food_remain = parseInt($(document.getElementById("food")).val());
    num_of_monsters = parseInt($(document.getElementById("monsters")).val());
    timeToPlay = parseInt($(document.getElementById("lblTimeSetting")).val());
    pacman_right = true;
    pacman_left = false;
    pacman_up = false;
    pacman_down = false;
    extra_food = 1;
    clock = 1;
    if(numOfLifes === 6){
        removeLife(6);
    }
    numOfLifes = 5;
    extra_life = 1;
    life();
    clearIntervals();
    Start();
    Draw();
    playSong();
    return false;
}

function clearIntervals() {
    // window.clearInterval(interval);
    // window.clearInterval(intervalMonster);
    // window.clearInterval(intervalExtraScore);
    while(intervals.length > 0) {
            clearInterval(intervals.pop());
    }
}

function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var pacman_remain = 1;
    gameSong = document.getElementById("gameSong");
    playSong();
    gameSong.loop = true;
    if (food_remain === -1 && num_of_monsters === -1 && timeToPlay === -1) {
        food_remain = parseInt($(document.getElementById("food")).val());
        num_of_monsters = parseInt($(document.getElementById("monsters")).val());
        timeToPlay = parseInt($(document.getElementById("lblTimeSetting")).val());
    }
    num_of_5_pt = parseInt(0.6 * food_remain);
    num_of_15_pt = parseInt(0.3 * food_remain);
    num_of_25_pt = food_remain - num_of_5_pt - num_of_15_pt;
    scoreOfTotalBoard = (5*num_of_5_pt + 15*num_of_15_pt + 25*num_of_25_pt);
    start_time = new Date();
    boardMonsters = new Array();
    boardExtraScore = new Array();
    for (var i = 0; i < 15; i++) {
        boardMonsters[i] = new Array();
        boardExtraScore[i] = new Array();
        for(var j = 0; j < 15; j++){
            boardMonsters[i][j] = 0;
            boardExtraScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 15; j++) {
            if (
                // (i === 1 && j === 1) ||
                (i === 4 && j === 1) ||
                (i === 4 && j === 2) ||
                (i === 3 && j === 2) ||
                (i === 7 && j === 0) ||
                (i === 7 && j === 1) ||
                (i === 7 && j === 2) ||
                (i === 12 && j === 1) ||
                (i === 13 && j === 1) ||
                (i === 12 && j === 2) ||
                (i === 12 && j === 13) ||
                (i === 11 && j === 13) ||
                (i === 11 && j === 12) ||
                (i === 8 && j === 10 ) ||
                (i === 7 && j === 10) ||
                (i === 6 && j === 10) ||
                (i === 9 && j === 10) ||
                (i === 2 && j === 7) ||
                (i === 1 && j === 7) ||
                (i === 2 && j === 8) ||
                (i === 13 && j === 6) ||
                (i === 11 && j === 6) ||
                (i === 12 && j === 6) ||
                (i === 12 && j === 7) ||
                (i === 2 && j === 13) ||
                (i === 3 && j === 13) ||
                (i === 4 && j === 13) ||
                (i === 5 && j === 13) ||
                (i === 3 && j === 12) ||
                // (i === 4 && j === 7) ||
                // (i === 4 && j === 6) ||
                // (i === 4 && j === 5) ||
                // (i === 5 && j === 6) ||
                // (i === 8 && j === 6) ||
                // (i === 8 && j === 5) ||
                // (i === 8 && j === 4) ||
                // (i === 7 && j === 5) ||
                (i === 8 && j === 9)
            ) {
                board[i][j] = 4;
            }
            else if(num_of_monsters > 0 && ((i === 0 && j === 0) || (i === 14 && j === 0) || (i === 14 && j === 14) || (i === 0 && j === 14))){
                board[i][j] = 9;
                boardMonsters[i][j] = 9;
                num_of_monsters--;
            }
            else {
                    board[i][j] = 0;
            }
        }
    }
    if(pacman_remain > 0 ){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 2;
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
        pacman_remain--;
    }
    if(clock > 0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 3;
        clock--;
    }

    while(extra_life > 0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 5;
        extra_life--;
    }

    while (extra_food > 0) {
        var emptyCell = findRandomEmptyCell(board);
        n = emptyCell[0];
        k = emptyCell[1];
        board[n][k] = 8;
        boardExtraScore[n][k] = 8;
        extra_food--;
    }

    while (num_of_5_pt > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        num_of_5_pt--;
        food_remain--;
    }
    while (num_of_15_pt > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 6;
        num_of_15_pt--;
        food_remain--;
    }
    while (num_of_25_pt > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 7;
        num_of_25_pt--;
        food_remain--;
    }

    keysDown = {};
    addEventListener(
        "keydown",
        function (e) {
            keysDown[e.keyCode] = true;
            if([32,37,38,39,40].indexOf(e.keyCode) > -1){
                e.preventDefault();
            }
        },
        false
    );
    addEventListener(
        "keyup",
        function (e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    intervals.push(setInterval(UpdatePosition, 150));
    intervals.push(setInterval(UpdateMonsterPosition, 500));
    intervals.push(setInterval(UpdateExtraScorePosition, 500));
}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 14 + 1);
    var j = Math.floor(Math.random() * 14 + 1);
    while (board[i][j] !== 0) {
        i = Math.floor(Math.random() * 14 + 1);
        j = Math.floor(Math.random() * 14 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[up]) {
        return 1;
    }
    if (keysDown[down]) {
        return 2;
    }
    if (keysDown[left]) {
        return 3;
    }
    if (keysDown[right]) {
        return 4;
    }
}

function changeValueToKey(event) {
    //set key from event's id
    if (event.target.id === "upId") {
        up = event.keyCode;
        // upId.value = event.key;
        if(event.key.length > 1) {
            upId.value = event.key;
        }
    }
    if (event.target.id === "downId") {
        down = event.keyCode;
        if(event.key.length > 1) {
            downId.value = event.key;
        }

    }
    if (event.target.id === "leftId") {
        left = event.keyCode;
        if(event.key.length > 1) {
            leftId.value = event.key;
        }

    }
    if (event.target.id === "rightId") {
        right = event.keyCode;
        if(event.key.length > 1) {
            rightId.value = event.key;
        }
    }
}

function randomSetting() {
    clearIntervals();
    initSetting();
    food_remain = -1;
    num_of_monsters = -1;
    timeToPlay = -1;
    while (food_remain < 50 || food_remain > 90) {
        food_remain = parseInt(100 * Math.random());
    }
    while (num_of_monsters < 1 || num_of_monsters > 4) {
        num_of_monsters = parseInt(10 * Math.random());
    }
    while (timeToPlay < 60) {
        timeToPlay = parseInt(100 * Math.random());
    }

    food.value = food_remain;
    monsters.value = num_of_monsters;
    lblTimeSetting.value = timeToPlay;
    favcolor5.value = getRandomColor();
    favcolor15.value = getRandomColor();
    favcolor25.value = getRandomColor();
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    if(color === '#000000'){
        getRandomColor();
    }
    return color;
}


function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context = canvas.getContext("2d");
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    var monster = new Image();
    monster.src = "image/monster40.png";
    var burger = new Image();
    burger.src = "image/burger30.png";
    var life = new Image();
    life.src = "image/life.png";
    var clock = new Image();
    clock.src = "image/clock.png";
    var wallPic = new Image();
    wallPic.src = "image/wall2.jpeg";
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            var center = new Object();
            center.x = i * size_x_to_draw + size_x_to_draw/2;
            center.y = j * size_y_to_draw + size_y_to_draw/2;
            if (boardMonsters[i][j] === 9) {
                context.drawImage(monster, center.x - size_x_to_draw/2, center.y - size_y_to_draw/2);
            }else if (boardExtraScore[i][j] === 8){
                context.drawImage(burger, center.x - 15, center.y - 15);
            }else if(board[i][j] === 3){
                context.drawImage(clock, center.x - 15, center.y - 15);
            }else if (board[i][j] === 5){
                context.drawImage(life, center.x - 15, center.y - 15);
            } else if (board[i][j] === 2 && pacman_left && pacman_dead === false) {
                context.beginPath();
                context.arc(center.x, center.y, 20, -0.85 * Math.PI, 0.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 10, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 2 && pacman_up && pacman_dead === false) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 1.7 * Math.PI, 1.35 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 10, center.y + 5, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 2 && pacman_right && pacman_dead === false) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 10, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 2 && pacman_down && pacman_dead === false) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 0.75 * Math.PI, 0.35 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 8   , center.y - 8, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
                /*5 point ball*/
            } else if (board[i][j] === 1) {
                context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                context.fillStyle = favcolor5.value; //color
                context.fill();
                context.fillStyle = "white"; //color
                context.font = "bold 10px Arial";
                context.fillText("5", center.x - 3, center.y + 4);
                /*15 point ball*/
            } else if (board[i][j] === 6) {
                context.beginPath();
                context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
                context.fillStyle = favcolor15.value; //color
                context.fill();
                context.fillStyle = "white"; //color
                context.font = "bold 10px Arial";
                context.fillText("15", center.x - 6, center.y + 4);
            } else if (board[i][j] === 7) {
                context.beginPath();
                context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                context.fillStyle = favcolor25.value; //color
                context.fill();
                context.fillStyle = "black"; //color
                context.font = "bold 10px Arial";
                context.fillText("25", center.x - 5, center.y + 3);
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.strokeStyle = "#3c3cef";
                //context.drawImage(wallPic,center.x - 18,center.y - 17);
                context.drawImage(wallPic,center.x - size_x_to_draw/2, center.y - size_y_to_draw/2,size_x_to_draw,size_y_to_draw);
            }
        }
    }
}


function UpdateMonsterPosition() {
    let currMonsterPositions = new Array();
    for (var i = 0; i < 15; i++) {
        currMonsterPositions[i] = new Array();
        for (var j = 0; j < 15; j++) {
            currMonsterPositions[i][j] = 0;
            if (boardMonsters[i][j] === 9) {
                currMonsterPositions[i][j] = 9;
            }
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (currMonsterPositions[i][j] === 9) {
                var randomNum = Math.floor(Math.random() * 2);/*0,1*/
                var notMove = true;
                //monster get down
                if (randomNum === 0 && Math.abs(((i + 1) - shape.i) < Math.abs((i - 1) - shape.i)) && board[i + 1][j] !== 4 && boardMonsters[i + 1][j] !== 9) {
                    boardMonsters[i][j] = 0;
                    boardMonsters[i + 1][j] = 9;
                    notMove = false;
                }
                //monster get up
                else if (randomNum === 0 && Math.abs(((i + 1) - shape.i) > Math.abs((i - 1) - shape.i)) && board[i - 1][j] !== 4 && boardMonsters[i - 1][j] !== 9) {
                    boardMonsters[i][j] = 0;
                    boardMonsters[i - 1][j] = 9;
                    notMove = false;
                }
                //monster get right
                else if (randomNum === 1 && Math.abs(((j + 1) - shape.j) < Math.abs((j - 1) - shape.j)) && board[i][j + 1] !== 4 && boardMonsters[i][j + 1] !== 9) {
                    boardMonsters[i][j] = 0;
                    boardMonsters[i][j + 1] = 9;
                    notMove = false;
                }
                //monster get left
                else if (randomNum === 1 && Math.abs(((j + 1) - shape.j) > Math.abs((j - 1) - shape.j)) && board[i][j - 1] !== 4 && boardMonsters[i][j - 1] !== 9) {
                    boardMonsters[i][j] = 0;
                    boardMonsters[i][j - 1] = 9;
                    notMove = false;
                } else if (notMove || shape.i == i || shape.j == j) {
                    while (notMove) {
                        var randomMoveIfStack = Math.floor(Math.random() * 4);/*0,1*/
                        if (randomMoveIfStack === 0 && i-1 >= 0 && i-1 <= 14 && board[i - 1][j] !== 4 && boardMonsters[i - 1][j] !== 9) {
                            boardMonsters[i][j] = 0;
                            boardMonsters[i - 1][j] = 9;
                            notMove = false;
                        } else if (randomMoveIfStack === 1  && i+1 >= 0 && i+1 <= 14 && board[i + 1][j] !== 4 && boardMonsters[i + 1][j] !== 9) {
                            boardMonsters[i][j] = 0;
                            boardMonsters[i + 1][j] = 9;
                            notMove = false;
                        }
                        //get right
                        else if (randomMoveIfStack === 2  && j+1 >= 0 && j+1 <= 14 && board[i][j + 1] !== 4 && boardMonsters[i][j + 1] !== 9) {
                            boardMonsters[i][j] = 0;
                            boardMonsters[i][j + 1] = 9;
                            notMove = false;
                        }
                        //get left
                        else if (randomMoveIfStack === 3 && j-1 >= 0 && j-1 <= 14 && board[i][j - 1] !== 4 && boardMonsters[i][j - 1] !== 9) {
                            boardMonsters[i][j] = 0;
                            boardMonsters[i][j - 1] = 9;
                            notMove = false;
                        }
                    }
                }
            }
        }
    }
    // Draw();
}

function UpdateExtraScorePosition() {
    let currScorePositions = new Array();
    for (var i = 0; i < 15; i++) {
        currScorePositions[i] = new Array();
        for (var j = 0; j < 15; j++) {
            currScorePositions[i][j] = 0;
            if(boardExtraScore[i][j] === 8){
                currScorePositions[i][j] = 8;
            }
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if(currScorePositions[i][j] === 8) {
                notMove = true;
                //monster get down
                while(notMove) {
                    var randomNum = Math.floor(Math.random() * 4);/*0,1*/
                    if (randomNum === 0  && i+1 >= 0 && i+1 <= 14 && board[i + 1][j] !== 4 && boardMonsters[i + 1][j] !== 9) {
                        boardExtraScore[i][j] = 0;
                        boardExtraScore[i + 1][j] = 8;
                        notMove = false;
                    }
                    else if (randomNum === 1 && i-1 >= 0 && i-1 <= 14 && board[i - 1][j] !== 4 && boardMonsters[i - 1][j] !== 9) {
                        boardExtraScore[i][j] = 0;
                        boardExtraScore[i - 1][j] = 8;
                        notMove = false;
                    } else if (randomNum === 2 && j+1 >= 0 && j+1 <= 14 && board[i][j + 1] !== 4 && boardMonsters[i][j + 1] !== 9) {
                        boardExtraScore[i][j] = 0;
                        boardExtraScore[i][j + 1] = 8;
                        notMove = false;
                    } else if (randomNum === 3 && j-1 >= 0 && j-1 <= 14 && board[i][j - 1] !== 4 && boardMonsters[i][j - 1] !== 9) {
                        boardExtraScore[i][j] = 0;
                        boardExtraScore[i][j - 1] = 8;
                        notMove = false;
                    }
                }
            }
        }
    }
}
// function UpdateExtraScorePosition() {
//     //get random number to to move
//     var randomNumExtra = Math.floor(Math.random() * 4);/*0,1,2,3*/
//     if(boardExtraScore[n][k] === 8) {
//         // get down
//         if (randomNumExtra === 0 && n-1 >= 0 && n-1 <= 14 && board[n + 1][k] !== 4 ) {
//             boardExtraScore[n][k] = 0;
//             boardExtraScore[n + 1][k] = 8;
//             n = n + 1;
//         }
//         // get up
//         else if (randomNumExtra === 1 && n-1 >= 0 && n-1 <= 14  && board[n - 1][k] !== 4) {
//             boardExtraScore[n][k] = 0;
//             boardExtraScore[n - 1][k] = 8;
//             n = n - 1;
//         }
//         // get right
//         else if (randomNumExtra === 2 && k+1 >= 0 && k+1 <= 14 && board[n][k + 1] !== 4 ) {
//             boardExtraScore[n][k] = 0;
//             boardExtraScore[n][k + 1] = 8;
//             k = k + 1;
//         }
//         //get left
//         else if (randomNumExtra === 3  && k-1 >= 0 && k-1 <= 14 && board[n][k - 1] !== 4) {
//             boardExtraScore[n][k] = 0;
//             boardExtraScore[n][k - 1] = 8;
//             k = k - 1;
//         }
//         Draw();
//     }
// }

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        pacman_up = true;
        pacman_right = false;
        pacman_left = false;
        pacman_down = false;
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        pacman_down = true;
        pacman_left = false;
        pacman_up = false;
        pacman_right = false;
        if (shape.j < 14 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        pacman_left = true;
        pacman_right = false;
        pacman_up = false;
        pacman_down = false;
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        pacman_right = true;
        pacman_left = false;
        pacman_up = false;
        pacman_down = false;
        if (shape.i < 14 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    /*pacman take extra life*/
    if(board[shape.i][shape.j] === 5){
        numOfLifes++;
        life();
        document.getElementById("alertString").innerHTML = "Good Job!\nYou got extra life!";
        $("#timeAlert").css("display", "block");
        // Draw();
    }
    /*no lifes any more*/
    if(numOfLifes === 0){
        alertNote("Loser!",1500);
        stopSong();
        clearIntervals()
    }
    /*same cell with ball - score up */
    if (board[shape.i][shape.j] === 1 || board[shape.i][shape.j] === 6 || board[shape.i][shape.j] === 7 ) {
        if(!noSound){
            var audio = new Audio('audio/pacman_eatfruit.wav');
            audio.play();
        }
        if(board[shape.i][shape.j] === 1){
            score = score + 5;
        }
        if(board[shape.i][shape.j] === 6){
            score = score + 15;
        }
        if(board[shape.i][shape.j] === 7){
            score = score + 25;
        }
    }
    /*same cell with burger - score up*/
    if (boardExtraScore[shape.i][shape.j] === 8) {
        if(!noSound){
            var audio = new Audio('audio/pacman_eatghost.wav');
            audio.play();
        }
        boardExtraScore[shape.i][shape.j] = 0;
        document.getElementById("alertString").innerHTML = "Yummy BURGER.. You Got 50 points!!";
        $("#timeAlert").css("display", "block");
        score = score + 50;
    }
    /*extra time when pacman arrived to clock*/
    if(board[shape.i][shape.j] === 3){
        timeToPlay = timeToPlay + 15;
        lblTimeSetting.value = timeToPlay;
        document.getElementById("alertString").innerHTML = "You Got extra 15 seconds!!";
        $("#timeAlert").css("display", "block");
        settings_display();
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;

    /*same cell with monster - dead*/
    if (boardMonsters[shape.i][shape.j] === 9) {
        if(!noSound){
            var audio = new Audio('audio/death.mp3');
            audio.play();
        }
        pacman_dead = true;
        board[shape.i][shape.j] = 0;
        score = score - 10;
        // Draw();
        clearIntervals()
        setTimeout(continueGame, 1500);
    }
    /*when got half of points - pacman changes color*/
    if (score >= scoreOfTotalBoard/2) {
        pac_color = getRandomColor();
        document.getElementById("alertString").innerHTML = "Keep going.. You got half of the total points!";
        $("#timeAlert").css("display", "block");
    }
    if(score < 100 && time_elapsed >= timeToPlay){
        let note = "You better than " + score + " points!";
        time_elapsed = timeToPlay;
        lblTime.value = time_elapsed;
        clearIntervals()
        alertNote(note,1000)
    }else if(score >= 100 && time_elapsed >= timeToPlay){
        time_elapsed = timeToPlay;
        lblTime.value = time_elapsed;
        clearIntervals()
        alertNote("Winner!!!",1000)
    }
    if (gameOver()) {
        stopSong();
        clearIntervals()
        // Draw();
        alertNote("Game completed - You got the total score - Winner!",1000);
        setTimeout(initNewGame, 1000);
    } else {
        Draw();
    }
}

function alertNote(note,timeToAlert) {
    setTimeout(function () {
        alert(note);
    }, timeToAlert);
}

function continueGame() {
    $("#timeAlert").css("display", "none");
    removeLife(numOfLifes);
    numOfLifes--;
    num_of_monsters = parseInt($(document.getElementById("monsters")).val());
    pacman_dead = false;
    pacman_remain = 1;
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if(board[i][j] === 2){
                board[i][j] = 0;
            }
            boardMonsters[i][j] = 0;
            if(num_of_monsters > 0 && ((i === 0 && j === 0) || (i === 14 && j === 0) || (i === 14 && j === 14) || (i === 0 && j === 14))){
                boardMonsters[i][j] = 9;
                num_of_monsters--;
            }
        }
    }
    if(pacman_remain > 0 ){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 5;
        shape.i = emptyCell[0];
        shape.j = emptyCell[1];
        pacman_remain--;
    }
    intervals.push(setInterval(UpdatePosition, 150));
    intervals.push(setInterval(UpdateMonsterPosition, 500));
    intervals.push(setInterval(UpdateExtraScorePosition, 500));
}


function open_login_window() {
    document.getElementById("Welcom_buttons").hidden = true;
    var x = document.getElementById("Login_button");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function life() {
    var img_name;
    for (var i = 1; i <= numOfLifes; i++) {
        img_name = "#img" + i;
        $(img_name).css("display", "block");
    }
}

function removeLife(i) {
    if(i > 0) {
        var img_name = "#img" + i;
        $(img_name).css("display", "none");
    }
}
function settings_display() {
    // initSetting();
    document.getElementById('pl_name').innerHTML = playerName;
    if($('#upId').val()){
        document.getElementById('up').innerHTML = document.getElementById("upId").value;
    }
    else {
        document.getElementById('up').innerHTML;
    }
    if($('#downId').val()){
        document.getElementById('down').innerHTML = document.getElementById("downId").value;
    }
    else {
        document.getElementById('down').innerHTML;
    }
    if($('#rightId').val()){
        document.getElementById('right').innerHTML = document.getElementById("rightId").value;
    }
    else {
        document.getElementById('right').innerHTML;
    }
    if($('#leftId').val()){
        document.getElementById('left').innerHTML = document.getElementById("leftId").value;
    }
    else{
        document.getElementById('left').innerHTML;
    }
    document.getElementById('balls').innerHTML = document.setting.food.value;
    document.getElementById('timePlay').innerHTML = document.setting.lblTimeSetting.value;
    document.getElementById('mons').innerHTML = document.setting.monsters.value;
}
function stop_soundEffect() {
    noSound = true;
}

function gameOver() {
    for (var i = 0; i < 15; i++) {
        for(var j = 0; j < 15; j++){
            if(board[i][j] === 1 || board[i][j] === 6 || board[i][j] === 7){
                return false;
            }
        }
    }
    return true;
}