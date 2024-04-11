
const buttonLearn = document.querySelector('#aprender');
const isTrainingSpan = document.querySelector('#is-training');
const trainingCompleteSpan = document.getElementById('text-train-success');
const buttonPredict = document.querySelector('#predecir');
const inputField = document.querySelector('#input');
const outputText = document.querySelector('#output-text');

const model = tf.sequential();
model.add(tf.layers.dense({
    units: 1,
    inputShape: [1]
}
));

model.compile(
    {
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

buttonLearn.addEventListener('click', async () => {

    isTrainingSpan.classList.remove('visually-hidden');

    const INPUT = Array.from({ length: 9 }, (x, i) => {
        return i - 6;
    });
    const OUTPUT = INPUT.map(x => 2 * x + 6);
    console.log(INPUT, OUTPUT);

    const xs = tf.tensor2d(INPUT, [9, 1]);
    const ys = tf.tensor2d(OUTPUT, [9, 1]);

    await model.fit(xs, ys, { epochs: 300 });


    isTrainingSpan.classList.add('visually-hidden');
    trainingCompleteSpan.classList.remove('visually-hidden');
    buttonLearn.disabled = true;
    document.getElementById('predecir-section').classList.remove('visually-hidden');

})

buttonPredict.addEventListener('click', async () => {
    const output = model.predict(tf.tensor2d([+inputField.value], [1, 1]));
    outputText.innerText = `El resultado de la predicción para ${inputField.value} es: ${output.dataSync()[0]}`;
})