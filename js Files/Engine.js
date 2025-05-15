const Engine = function(time_step, render, update){

    this.accumulate_time = 0
    this.animate_time = undefined
    this.time = undefined
    this.time_step = time_step

    this.updated = false
    
    this.render = render
    this.update = update

    this.run = function(time_curr){
        
        this.animate_time = window.requestAnimationFrame(this.handleRun);

        this.accumulate_time += time_curr - this.time;
        this.time = time_curr;
        
        if(this.accumulate_time >= this.time_step * 3){
            this.accumulate_time = this.time_step;
        }

        while(this.accumulate_time >= this.time_step){
            this.accumulate_time -= this.time_step;
            this.render(time_curr);
            this.updated = true;
        }

        if(this.updated){
            this.updated = false;
            this.update(time_curr);
        }
    }

    this.handleRun = (time_step) => {this.run(time_step);};
}

Engine.prototype = {
    constructor: Engine,

    start: function(){
        
        this.accumulate_time = this.time_step;
        this.time = window.performance.now();
        this.animate_time = window.requestAnimationFrame(this.handleRun);
    },

    stop: function(){
        window.cancelAnimationFrame(this.animate_time);
    }
}