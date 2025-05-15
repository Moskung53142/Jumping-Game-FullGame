//First Enter

let allEnableClicked = document.querySelectorAll(".firstEnter");
let allBtnMenuGame = document.querySelectorAll(".btn_gameMenu");
let allElementsMainMenu = document.querySelectorAll(".GameMenu");

allEnableClicked.forEach(Clicked => {
    Clicked.addEventListener("click", () => {

        let removeText = document.getElementById("load_Menu");
        removeText.classList.add("hide_content");
        Clicked.classList.remove("firstEnter");
        
        allBtnMenuGame.forEach(btn => {
            btn.classList.remove("hide_content");
            btn.classList.add("show_content");
        })
        Game_sound.play();

    },{once: true});
})

//Main Menu

let btn_setting = document.getElementById("setting_Game");
let btn_Enter_Stage = document.getElementById("start_frontGame");
let settingElements = document.querySelectorAll(".setting");
let stageElements = document.querySelectorAll(".Stage_Menu");

btn_Enter_Stage.addEventListener("click", () => {

    allElementsMainMenu.forEach(element => {
        element.classList.remove("show_content");
        element.classList.add("hide_content");
    })

    stageElements.forEach(element => {
        element.classList.remove("hide_content");
        element.classList.add("show_content");
    })

    updateStage()
})

btn_setting.addEventListener("click", () => {

    settingElements.forEach(element => {
        element.classList.remove("hide_content");
        element.classList.add("show_content");
    })
})

//Setting + Sound

let volume_percent = document.getElementById("adjust_volume");
let txt_volume = document.getElementById("text_percent_volume");
let front_game = document.getElementById("wallpaper_frontGame");
let btn_apply = document.getElementById("apply");
let Game_sound = document.getElementById("Gamesound");
Game_sound.volume = 0.5;

volume_percent.addEventListener("input", () => {
    txt_volume.textContent = volume_percent.value + "%";
    Game_sound.volume = volume_percent.value / 100;
})

btn_apply.addEventListener("click", () => {
    
    settingElements.forEach(element => {
        element.classList.remove("show_content");
        element.classList.add("hide_content");
    })
})

//Stage Menu

let wallpaper_Stage = document.getElementById("wallpaper_stage");
let btnBack = document.getElementById("backToMainMenu");
let allBtnStage = document.querySelectorAll(".btn_stage");
let btnStage1 = document.getElementById("btn_stage1");
let btnStage2 = document.getElementById("btn_stage2");
let btnStage3 = document.getElementById("btn_stage3");

let game_canvas = document.getElementById("wallpaper");

btnBack.addEventListener("click", () => {

    wallpaper_Stage.classList.remove("show_content");
    wallpaper_Stage.classList.add("hide_content");

    allElementsMainMenu.forEach(element => {
        element.classList.remove("hide_content");
        element.classList.add("show_content");
    })
})

allBtnStage.forEach(btn => {

    let hover_Arrow;

    btn.addEventListener("mouseover", () => {

        if(btn.id === "btn_stage1"){
            hover_Arrow = document.getElementById("arrow1");
            hover_Arrow.classList.remove("hide_content");
            hover_Arrow.classList.add("show_content");
        }
        else if(btn.id === "btn_stage2"){
            hover_Arrow = document.getElementById("arrow2");
            hover_Arrow.classList.remove("hide_content");
            hover_Arrow.classList.add("show_content");
        }
        else if(btn.id === "btn_stage3"){
            hover_Arrow = document.getElementById("arrow3");
            hover_Arrow.classList.remove("hide_content");
            hover_Arrow.classList.add("show_content");
        }

    })

    btn.addEventListener("mouseout", () => {
        
        if(hover_Arrow){
            hover_Arrow.classList.remove("show_content");
            hover_Arrow.classList.add("hide_content");
        }
    })

    btn.addEventListener("click", () => {

        if(btn.id === "btn_stage1" && setting_map.unlockStage >= 1){
            setting_map.map_ID = 1;

            let key_manual = document.getElementById("keyboard_manual");
            key_manual.classList.remove("hide_content");
            key_manual.classList.add("show_content");

            setTimeout(() => {
                key_manual.classList.remove("show_content");
                key_manual.classList.add("hide_content");
            }, 5000);
            startGame();
        }
        else if(btn.id === "btn_stage2" && setting_map.unlockStage >= 2){
            setting_map.map_ID = 2;
            startGame();
        }
        else if(btn.id === "btn_stage3" && setting_map.unlockStage >= 3){
            setting_map.map_ID = 3;
            startGame();
        }
    })
})

function updateStage(){

    if(setting_map.unlockStage === 1){
            btnStage1.style.backgroundColor = "green";
            btnStage2.style.backgroundColor = "red";
            btnStage3.style.backgroundColor = "red";
        }
        else if(setting_map.unlockStage === 2){
            btnStage1.style.backgroundColor = "green";
            btnStage2.style.backgroundColor = "green";
            btnStage3.style.backgroundColor = "red";
        }
        else if(setting_map.unlockStage === 3){
            btnStage1.style.backgroundColor = "green";
            btnStage2.style.backgroundColor = "green";
            btnStage3.style.backgroundColor = "green";
        }
}

function startGame(){

    InititalGame();

    wallpaper_Stage.classList.remove("show_content");
    wallpaper_Stage.classList.add("hide_content");

    game_canvas.classList.remove("hide_content");
    game_canvas.classList.add("show_content");
}

// Game

let btn_next = document.getElementById("next_stage");
let cover_Game = document.getElementById("cover_game");

btn_next.addEventListener("click", () => {
    
    game_canvas.classList.remove("show_content");
    game_canvas.classList.add("hide_content");

    cover_Game.classList.remove('show_content');
    cover_Game.classList.add('hide_content');

    wallpaper_Stage.classList.remove("hide_content");
    wallpaper_Stage.classList.add("show_content");

    updateStage();
})


//Esc Menu

let Esc_Menu = document.getElementById("cover_EscMenu");
let btn_continue = document.getElementById("continue");
let btn_exit = document.getElementById("exit");

btn_continue.addEventListener("click", () => {

    Esc_Menu.classList.remove("show_content");
    Esc_Menu.classList.add("hide_content");

    engine.start();
})

btn_exit.addEventListener("click", () => {

    game_canvas.classList.remove("show_content");
    game_canvas.classList.add("hide_content");

    Esc_Menu.classList.remove("show_content");
    Esc_Menu.classList.add("hide_content");

    wallpaper_Stage.classList.remove("hide_content");
    wallpaper_Stage.classList.add("show_content");

    updateStage();
})