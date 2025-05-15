const Display = function(canvas){
    
    this.gameBuffer = document.createElement("canvas").getContext("2d"),
    this.gameContext = canvas.getContext("2d");

    this.blockImages = {};

    // โหลดรูปทั้งหมดล่วงหน้า และเก็บไว้ใน this.blockImages
    this.loadBlockImages = function(callback) {
        const imageSources = {
            0: "./js Files/picture_File/backgroundWall.png",
            1: "./js Files/picture_File/BrickWall.png",
            2: "./js Files/picture_File/teleportRight.png",
            3: "./js Files/picture_File/teleportBottom.png",
            4: "./js Files/picture_File/boostPadLeft.png",
            5: "./js Files/picture_File/boostPadRight.png",
            6: "./js Files/picture_File/boostPadBottom.png",
            7: "./js Files/picture_File/boostPadTop.png",
            8: "./js Files/picture_File/door.png",
            9: "./js Files/picture_File/SpikeBottom.png",
            10: "./js Files/picture_File/TunnelBottomWall.png",
            11: "./js Files/picture_File/TunnelTopWall.png",
            12: "./js Files/picture_File/SpikeTop.png",
            13: "./js Files/picture_File/SpikeLeft.png",
            14: "./js Files/picture_File/SpikeRight.png",
            15: "./js Files/picture_File/teleportLeft.png",
            16: "./js Files/picture_File/teleportTop.png",
            17: "./js Files/picture_File/checkpoint.png",
        };

        let loaded = 0;
        const total = Object.keys(imageSources).length;

        for (let key in imageSources) {
            const img = new Image();
            img.onload = () => {
                loaded++;
                if (loaded === total && typeof callback === "function") {
                    callback();
                }
            };
            img.onerror = () => {
                console.error("Failed to load image:", imageSources[key]);
            };
            img.src = imageSources[key];
            this.blockImages[key] = img;
        }
    };

    this.drawMap = function(map, map_Column, block_Size) {
        for (let i = 0; i < map.length; i++) {
            const block_Value = map[i];

            const img = this.blockImages[block_Value];
            if (!img || !img.complete) continue;

            const placeBlock_x = (i % map_Column) * block_Size;
            const placeBlock_y = Math.floor(i / map_Column) * block_Size;

            this.gameBuffer.drawImage(img, placeBlock_x, placeBlock_y, block_Size, block_Size);
        }
    };

    this.drawPlayer = function(playerImg, player_x, player_y, player_width, player_height){
        
        let player_Img = new Image();

        player_Img.onload = () =>{
            this.gameBuffer.drawImage(player_Img, player_x, player_y, player_width, player_height);
        }
        player_Img.src = playerImg;
    }
    
    this.resize = function(width, height, height_width_ratio){
        
        if(height / width > height_width_ratio){
            this.gameContext.canvas.height = width * height_width_ratio;
            this.gameContext.canvas.width = width;
        }
        else{
            this.gameContext.canvas.height = height;
            this.gameContext.canvas.width = height / height_width_ratio; 
        }

        this.gameContext.imageSmoothingEnabled = false;
    }

}

Display.prototype = {
    constructor: Display,

    render: function(){
        this.gameContext.drawImage(this.gameBuffer.canvas, 0, 0, this.gameBuffer.canvas.width, this.gameBuffer.canvas.height, 0, 0, this.gameContext.canvas.width, this.gameContext.canvas.height);
    }
}

