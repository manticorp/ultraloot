const ul = new UltraLoot();
ul.registerDefaults();

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#graph-container');
  const rng = ul.getRng();

  const samples = 100000;

  // shared vars
  const xbins = {
    // start: 0,
    // end: 1,
    size: 0.005,
  };
  const layout = {
    // width: 600,
    // height: 400,
    bargap: 0,
    bargroupgap: 0,
    barmode: 'overlay'
  };
  const opacity = 0.5;
  const chartType = 'histogram';
  const lay = (up) => ({ ...layout, ...up });

  const newEl = (container, code) => {
    const overallCont = document.createElement('div');
    const codeCont = document.createElement('div');
    const graphCont = document.createElement('div');
    const preEl = document.createElement('pre');
    const codeEl = document.createElement('code');
    overallCont.classList.add('rng-demo-container');
    codeCont.classList.add('code-container');
    graphCont.classList.add('graph-container');
    container.appendChild(overallCont);
    overallCont.appendChild(codeCont);
    overallCont.appendChild(graphCont);
    codeCont.appendChild(preEl);
    preEl.appendChild(codeEl);
    codeEl.innerHTML = code;

    return graphCont;
  };

  const random = [];
  const random1and10 = [];
  const random1and10biasneg1 = [];
  const random1and10biasplus1 = [];
  const random1and10biasneg2 = [];
  const random1and10biasplus2 = [];
  const randint = [];
  const randint1and10 = [];
  const randint1and10biasneg1 = [];
  const randint1and10biasplus1 = [];
  const randint1and10biasneg2 = [];
  const randint1and10biasplus2 = [];
  let title = 'rng.random()';
  let min = 1;
  let max = 10;
  for (let i = 0; i < samples; i++) {
    random.push(rng.random());
    random1and10.push(rng.random(min, max, 0));
    random1and10biasneg1.push(rng.random(min, max, -1));
    random1and10biasplus1.push(rng.random(min, max, 1));
    random1and10biasneg2.push(rng.random(min, max, -2));
    random1and10biasplus2.push(rng.random(min, max, 2));

    randint1and10.push(rng.randInt(min, max, 0));
    randint1and10biasneg1.push(rng.randInt(min, max, -1));
    randint1and10biasplus1.push(rng.randInt(min, max, 1));
    randint1and10biasneg2.push(rng.randInt(min, max, -2));
    randint1and10biasplus2.push(rng.randInt(min, max, 2));
  }
  let div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: random, name: 'Random', type: chartType, opacity, xbins },
    ],
    layout: lay({ title })
  });

  title = `rng.random(${min}, ${max}, bias)`;
  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: random1and10, name: 'rng.random(1, 10, 0)', type: chartType, opacity, xbins },
      { x: random1and10biasneg1, name: 'rng.random(1, 10, -1)', type: chartType, opacity, xbins },
      { x: random1and10biasplus1, name: 'rng.random(1, 10, +1)', type: chartType, opacity, xbins },
      { x: random1and10biasneg2, name: 'rng.random(1, 10, -2)', type: chartType, opacity, xbins },
      { x: random1and10biasplus2, name: 'rng.random(1, 10, +2)', type: chartType, opacity, xbins },
    ],
    layout: lay({ title })
  });

  title = `rng.randint(${min}, ${max}, bias)`;
  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: randint1and10, name: 'rng.randint(1, 10, 0)', type: chartType, opacity, xbins: { size: 1 } },
      { x: randint1and10biasneg1, name: 'rng.randint(1, 10, -1)', type: chartType, opacity, xbins: { size: 1 } },
      { x: randint1and10biasplus1, name: 'rng.randint(1, 10, +1)', type: chartType, opacity, xbins: { size: 1 } },
      { x: randint1and10biasneg2, name: 'rng.randint(1, 10, -2)', type: chartType, opacity, xbins: { size: 1 } },
      { x: randint1and10biasplus2, name: 'rng.randint(1, 10, +2)', type: chartType, opacity, xbins: { size: 1 } },
    ],
    layout: lay({ title })
  });

  const normal = [];
  const normalLeft = [];
  const normalRight = [];
  const normalDefault = [];
  let mean = 0.5;
  let stddev = 1 / 10;
  min = 0;
  max = 1;
  title = 'rng.normal()';
  for (let i = 0; i < samples; i++) {
    normal.push(rng.normal({ mean, stddev, min, max }));
    normalLeft.push(rng.normal({ mean, stddev, min, max, skew: -1 }));
    normalRight.push(rng.normal({ mean, stddev, min, max, skew: 1 }));
    normalDefault.push(rng.normal());
  }
  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: normalDefault, name: 'Normal', type: chartType, opacity, xbins: { size: 0.05 } },
    ],
    layout: lay({ title: 'rng.normal default args' })
  });

  title = `rng.normal({ mean: ${mean}, stddev: ${stddev}, min: ${min}, max: ${max}, skew: -1/0/1 })`;
  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: normal, name: 'skew: 0', type: chartType, opacity, xbins },
      { x: normalLeft, name: 'skew: -1', type: chartType, opacity, xbins },
      { x: normalRight, name: 'skew: +1', type: chartType, opacity, xbins },
    ],
    layout: lay({ title })
  });

  const chancy = [];
  const chancyNormal = [];
  const chancyNormalLeft = [];
  const chancyNormalRight = [];
  min = 0;
  max = 1;
  title = `rng.chancy({type: undefined|"normal", min: ${min}, max: ${max}, skew: -1/0/1 })`;
  for (let i = 0; i < samples; i++) {
    chancy.push(rng.chancy({ min, max }));
    chancyNormal.push(rng.chancy({ min, max, type: 'normal' }));
    chancyNormalLeft.push(rng.chancy({ min, max, skew: -1, type: 'normal' }));
    chancyNormalRight.push(rng.chancy({ min, max, skew: 1, type: 'normal' }));
  }
  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: chancy, name: 'type: undefined, skew: 0', type: chartType, opacity, xbins },
      { x: chancyNormal, name: 'type: "normal", skew: 0', type: chartType, opacity, xbins },
      { x: chancyNormalLeft, name: 'type: "normal", skew: -1', type: chartType, opacity, xbins },
      { x: chancyNormalRight, name: 'type: "normal", skew: +1', type: chartType, opacity, xbins }
    ],
    layout: lay({ title })
  });

  const chancyNormalAtFifty = [];
  const chancyNormalAtFiftySkewedLeft = [];
  const chancyNormalAtFiftySkewedRight = [];
  const chancyNormalAtFiftySkewedFarLeft = [];
  const chancyNormalAtFiftySkewedFarRight = [];
  let type = 'normal';
  min = 0;
  max = 100;
  title = `rng.chancy({type: "${type}", min: ${min}, max: ${max}, skew: -2/-1/0/+1/+2 })`;
  for (let i = 0; i < samples*10; i++) {
    chancyNormalAtFifty.push(rng.chancy({ min, max, type }));
    chancyNormalAtFiftySkewedLeft.push(rng.chancy({ min, max, type, skew: -1 }));
    chancyNormalAtFiftySkewedRight.push(rng.chancy({ min, max, type, skew: 1 }));
    chancyNormalAtFiftySkewedFarLeft.push(rng.chancy({ min, max, type, skew: -2 }));
    chancyNormalAtFiftySkewedFarRight.push(rng.chancy({ min, max, type, skew: 2 }));
  }
  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: chancyNormalAtFifty, name: 'skew: 0', type: chartType, opacity, xbins },
      { x: chancyNormalAtFiftySkewedLeft, name: 'skew: -1', type: chartType, opacity, xbins },
      { x: chancyNormalAtFiftySkewedRight, name: 'skew: +1', type: chartType, opacity, xbins },
      { x: chancyNormalAtFiftySkewedFarLeft, name: 'skew: -2', type: chartType, opacity, xbins },
      { x: chancyNormalAtFiftySkewedFarRight, name: 'skew: +2', type: chartType, opacity, xbins },
    ],
    layout: lay({ title })
  });

  const chancyNormalInteger = [];
  const chancyNormalIntegerSkewedLeft = [];
  const chancyNormalIntegerSkewedRight = [];
  const chancyNormalIntegerSkewedFarLeft = [];
  const chancyNormalIntegerSkewedFarRight = [];
  type = 'normal_integer';
  min = 0;
  max = 100;
  title = `rng.chancy({type: "${type}", min: ${min}, max: ${max}, skew: -2/-1/0/+1/+2 })`;
  for (let i = 0; i < samples; i++) {
    chancyNormalInteger.push(rng.chancy({ min, max, type }));
    chancyNormalIntegerSkewedLeft.push(rng.chancy({ min, max, type, skew: -1 }));
    chancyNormalIntegerSkewedRight.push(rng.chancy({ min, max, type, skew: 1 }));
    chancyNormalIntegerSkewedFarLeft.push(rng.chancy({ min, max, type, skew: -2 }));
    chancyNormalIntegerSkewedFarRight.push(rng.chancy({ min, max, type, skew: 2 }));
  }
  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: chancyNormalInteger, name: 'skew: 0', type: chartType, opacity, xbins: { size: 1 } },
      { x: chancyNormalIntegerSkewedLeft, name: 'skew: -1', type: chartType, opacity, xbins: { size: 1 } },
      { x: chancyNormalIntegerSkewedRight, name: 'skew: +1', type: chartType, opacity, xbins: { size: 1 } },
      { x: chancyNormalIntegerSkewedFarLeft, name: 'skew: -2', type: chartType, opacity, xbins: { size: 1 } },
      { x: chancyNormalIntegerSkewedFarRight, name: 'skew: +2', type: chartType, opacity, xbins: { size: 1 } },
    ],
    layout: lay({ title })
  });

  const chancyNormalIntegerNoMin = [];
  const chancyNormalIntegerNoMinSkewedLeft = [];
  const chancyNormalIntegerNoMinSkewedRight = [];
  type = 'normal_integer';
  mean = 50;
  stddev = 10;
  title = `rng.chancy({type: "${type}", mean: ${mean}, stddev: ${stddev}, skew: -1/0/+1 })`;
  for (let i = 0; i < samples; i++) {
    chancyNormalIntegerNoMin.push(rng.chancy({ mean, stddev, type }));
    chancyNormalIntegerNoMinSkewedLeft.push(rng.chancy({ mean, stddev, type, skew: -1 }));
    chancyNormalIntegerNoMinSkewedRight.push(rng.chancy({ mean, stddev, type, skew: 1 }));
  }

  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: chancyNormalIntegerNoMin, name: 'skew: 0', type: chartType, opacity, xbins: { size: 1 } },
      { x: chancyNormalIntegerNoMinSkewedLeft, name: 'skew: -1', type: chartType, opacity, xbins: { size: 1 } },
      { x: chancyNormalIntegerNoMinSkewedRight, name: 'skew:  +1', type: chartType, opacity, xbins: { size: 1 } },
    ],
    layout: lay({ title })
  });

  const dice1d4 = [];
  const dice1d6 = [];
  const dice1d8 = [];
  const dice1d10 = [];
  const dice1d12 = [];
  const dice1d20 = [];
  const dice2d6 = [];
  const dice3d6 = [];
  const dice4d6 = [];
  const dice1d6plus1 = [];
  const dice1d6plus2 = [];
  const dice1d6plus3 = [];
  const dice1d6plus4 = [];
  const dice1d6plus5 = [];
  const dice1d6plus6 = [];
  title = 'rng.chancy(diceroll); or rng.dice(diceroll);';
  for (let i = 0; i < samples / 10; i++) {
    dice1d4.push(rng.dice('1d4'));
    dice1d6.push(rng.dice('1d6'));
    dice1d8.push(rng.dice('1d8'));
    dice1d10.push(rng.dice('d10'));
    dice1d12.push(rng.dice('d12'));
    dice1d20.push(rng.dice('d20'));
    dice2d6.push(rng.dice('2d6'));
    dice3d6.push(rng.dice('3d6'));
    dice4d6.push(rng.dice('4d6'));
    dice1d6plus1.push(rng.dice('1d6+1'));
    dice1d6plus2.push(rng.dice('1d6+2'));
    dice1d6plus3.push(rng.dice('1d6+3'));
    dice1d6plus4.push(rng.dice('1d6+4'));
    dice1d6plus5.push(rng.dice('1d6+5'));
    dice1d6plus6.push(rng.dice('1d6+6'));
  }

  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: dice1d4, name: '1d4', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice1d6, name: '1d6', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice1d8, name: '1d8', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice1d10, name: '1d10', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice1d12, name: '1d12', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice1d20, name: '1d20', type: chartType, opacity, xbins: { size: 1 } },
    ],
    layout: lay({ title })
  });

  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: dice1d6, name: '1d6', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice2d6, name: '2d6', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice3d6, name: '3d6', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice4d6, name: '4d6', type: chartType, opacity, xbins: { size: 1 } },
    ],
    layout: lay({ title })
  });

  div = newEl(container, title);

  Plotly.newPlot(div, {
    data: [
      { x: dice1d6, name: '1d6+0', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice1d6plus2, name: '1d6+2', type: chartType, opacity, xbins: { size: 1 } },
      { x: dice1d6plus4, name: '1d6+4', type: chartType, opacity, xbins: { size: 1 } },
      // { x: dice1d6plus6, name: '1d6+6', type: chartType, opacity, xbins: { size: 1 } },
    ],
    layout: lay({ title, barmode: 'group', bargap: 0.1, bargroupgap: 0 })
  });
});
