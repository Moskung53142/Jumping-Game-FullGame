const Controller = function(){  
    
    this.esc = new Controller.ButtonPressed()
    this.left = new Controller.ButtonPressed()
    this.right = new Controller.ButtonPressed()
    this.jump = new Controller.ButtonPressed()
    this.crouch = new Controller.ButtonPressed()

    this.keyDownUp = function(type, keyCodePressed){
        
        var down = (type == "keydown") ? true : false;
        switch(keyCodePressed){

            case 16: this.crouch.getInput(down); break;
            case 32: this.jump.getInput(down); break;
            case 65: this.left.getInput(down); break;
            case 68: this.right.getInput(down); break;
            case 27: this.esc.getInput(down); break;
        }
    }
}

Controller.prototype = {
    constructor: Controller
}

Controller.ButtonPressed = function(){
    this.active = this.down = false
}

Controller.ButtonPressed.prototype = {
    constructor: Controller.ButtonPressed,

    getInput: function(down){
        if(this.down != down) this.active = down;
        this.active = down;
        this.pressed = down;
    }
}