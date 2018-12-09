
var pipes = [];
var birds = [];

var population_size = 100;

var generation = 0;
var top_score = 0;

var speed;

var dead_birds = [];


function setup() {
    var can = createCanvas(640, 480);
    can.parent('game')
    nextGeneration();
    pipes.push(new Pipe());
}

function draw() {
    clear();
    background('#512da8');
    speed = document.querySelector('#speed').value;

    for (var i = pipes.length - 1; i >= 0; i--) {

        if (frameCount % speed == 0) {
            pipes[i].show();
        }

        pipes[i].update();

        for (var idx = birds.length - 1; idx >= 0; idx--) {
            var this_bird = birds[idx];
            if (pipes[i].hits(this_bird)) {
                dead_birds.push(this_bird);
                birds.splice(idx, 1);

            } else {
                this_bird.score++;

                if (this_bird.score > top_score) {
                    top_score = this_bird.score;
                }

                this_bird.update();

                if (frameCount % speed == 0) {
                    this_bird.show();
                }
            }

        }

        if (birds.length == 0) {
            nextGeneration();
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }

    }

    if (frameCount % 40 == 0) {
        pipes.push(new Pipe());
    }

    show_score();

}

function nextGeneration() {

    updateScoreData( generation, "score_chart", top_score );
    generation++;

    if (birds.length == 0) {

        for (var idx = 0; idx < population_size; idx++) {
            var abird = new Bird();
            abird.addBrain(pipes);
            birds.push(abird);
        }

    } else {

        var bird_pool = [];
        for (var id = dead_birds.length - 1; id > 0; id--) {
            for (var cnt = 0; cnt < id; cnt++) {
                bird_pool.push(dead_birds[id]);
            }
        }

        for (var idx = 0; idx < population_size; idx++) {
            var abird = random(bird_pool);
            abird.brain.net.mutate(0.1);
            birds.push(abird);
        }

        bird_pool = [];
        dead_birds = [];

    }
}

function show_score() {
    fill(255);
    text("Generation " + generation, 20, 20);
    text("Top Score " + top_score, 20, 40);
}

function randomScalingFactor() {
    return Math.round(random(-100, 100));
};
