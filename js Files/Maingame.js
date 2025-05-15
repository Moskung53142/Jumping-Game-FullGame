const SettingMap = function(){

    this.columns = 32;
    this.rows = 18;
    this.Block_Size = 60;
    this.map_ID = 0;
    this.unlockStage = 1;
    this.retry = false;
}

SettingMap.prototype = {

    Retry: function(){
        this.retry = true;

        const cover = document.getElementById("cover_game");
        cover.classList.remove('show_content');
        cover.classList.add('hide_content');

        InititalGame();
    },

    RequestMap: function(url, callback){
      
        let request = new XMLHttpRequest();
        
        request.addEventListener("load", function(event){

            callback(JSON.parse(this.responseText));

        },{once: true});

        request.open("GET", url);
        request.send();
    },

    OpenMenu: function(){
        
        let Esc_menu = document.getElementById("cover_EscMenu");
        Esc_menu.classList.remove("hide_content");
        Esc_menu.classList.add("show_content");

        engine.stop();
    }
}

window.setting_map = new SettingMap();

const Map_Prefix = "js Files/map";
const Map_Suffix = ".json";

function InititalGame(){
    
    var keyDownUp = function(event){
        controller.keyDownUp(event.type, event.keyCode);
    }

    var render = function(){
        
        display.loadBlockImages(() =>{
            display.drawMap(game.world.Map_Block, settingMap.columns, settingMap.Block_Size);
            
        });
        let player_action = game.world.repositoryAction.player_frames[game.world.player.frame_set]
        display.drawPlayer(player_action.image, game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height);

        display.render();
    }

    var update = function(){

        //เช็คการออกจากท่อ
        if(!game.world.collider.player_standEnabled){

            controller.crouch.active = true;

            //ออกจากการมุดท่อแล้ว
            if(game.world.collider.checkOutTunnel){
                
                game.world.collider.player_standEnabled = true;
                controller.crouch.active = false;
            }
        }

        //เช็คการกระโดดและย่อพร้อมกัน
        if(game.world.player.jumping && game.world.player.crouching){

            controller.crouch.active = true;
            game.world.player.checkJumpAndCrouch = true;
        }
        
        //เช็คการชนตกมาลงบล็อคโดยในขณะที่กระโดด + ย่อ
        if(game.world.player.checkCrouchingFromFalling && controller.crouch.active && 
           game.world.player.checkJumpAndCrouch && !controller.crouch.pressed){
            
            //เช็คตอนกระโดดติดเพดานในท่อแล้วลงพื้น มันจะกระพริบตอนยืนมาเลยต้องใช้ตัวนี้มาเป็นเงื่อนไข
            if(game.world.collider.checkOutTunnel){

                controller.crouch.active = false;
            }
        }

        if(controller.esc.active)   {settingMap.OpenMenu();}
        if(controller.left.active)  {game.world.player.moveLeft();}
        if(controller.right.active) {game.world.player.moveRight();}
        if(controller.jump.active)  {game.world.player.jump(); controller.jump.active = false;}
        if(controller.crouch.active) {game.world.player.crouch(); game.world.player.checkCrouching = true;}
        
        //ยืนขึ้นหลังจากการย่อโดยเซ็ต y ตัวละครขึ้นเพื่อไม่ให้ตกบล็อค
        if(!controller.crouch.active && game.world.player.checkCrouching && !controller.crouch.pressed){

            game.world.player.CheckReAnimateFromCrouch();
        }

        //เช็คการกระโดด + ย่อ และรีเซ็ตไม่ให้บัค
        if(game.world.player.checkJumpAndCrouch){

            if(game.world.player.checkCrouchingFromFalling){

                game.world.player.checkCrouchingFromFalling = false;
                game.world.player.checkJumpAndCrouch = false;
            }
        }

        game.update();

        if(game.world.collider.door){

            game.world.collider.checkpoint = false;

            if(setting_map.unlockStage != 3 && !setting_map.retry && setting_map.map_ID >= setting_map.unlockStage){
                setting_map.unlockStage += 1;
            }
            else if(setting_map.retry){
                setting_map.retry = false;
            }

            engine.stop();
            const cover = document.getElementById("cover_game");
            cover.classList.remove('hide_content');
            cover.classList.add('show_content');

            return;

        }
    }

    var Resize = function(event){
        display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
        display.render();
    }

    var controller = new Controller();
    var game = new Game();
    window.engine = new Engine(1000/30, render, update)
    var settingMap = new SettingMap();
    var display = new Display(document.querySelector("canvas"));

    display.gameBuffer.canvas.width = game.world.width;
    display.gameBuffer.canvas.height = game.world.height;
    display.gameBuffer.imageSmoothingEnabled = false;
    console.log(Map_Prefix + setting_map.map_ID + Map_Suffix);

    settingMap.RequestMap(Map_Prefix + setting_map.map_ID + Map_Suffix, (map) => {

        game.world.setup(map);
        Resize();
        engine.start();
    })

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", Resize);
}
