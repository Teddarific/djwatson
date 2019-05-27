
let trainedNet;

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: d.input,
            output: d.output
        }
    })
}

function train(data) {
    var config = {
        hiddenLayers: [12],
        activation: 'sigmoid',
        learningRate: 0.1,
    }

    let net = new brain.NeuralNetwork();
    console.log('training...')
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
    const json = net.toJSON();
    const jsonString = JSON.stringify(json);
    console.log(jsonString);
    console.log('Finished training...');
 };
 
 function execute(input) {
    let results = trainedNet(input);
    let output;
    console.log(results)
    return output;
 }
 
 train(trainingData);