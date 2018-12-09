class BirdBrain{
    constructor( pipes, bird ){
        this.pipes = pipes;
        this.bird = bird;

        const config = {
            inputSize: 5,
            hiddenLayers: [8],
            outputSize: 2,
            learningRate: 0.01,
            decayRate: 0.999,
        };

        this.net = new NeuralNetwork( 5, 8, 2 );
    }

    decide(){

        // Find the closest pipe
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
        let d = (pipes[i].x + pipes[i].w) - this.bird.x;
            if (d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
            }
        }

        let inputs = [];
        inputs[0] = this.bird.y / height;
        inputs[1] = closest == null ? 0 : closest.top / height;
        inputs[2] = closest == null ? 1 : closest.bottom / height;
        inputs[3] = closest == null ? ( width - this.bird.x )/width : closest.x / width;
        inputs[4] = this.bird.velocity / 10;

        var output = this.net.predict(inputs);
        return output;
    }
}