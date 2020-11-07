export const rollerCoaster = (lines: string[]) => {
  const inputs: string[] = lines[0].split(" ");
  // L is the number of places
  const L: number = parseInt(inputs[0]);
  // C is the number of rides per day
  const C: number = parseInt(inputs[1]);
  // N is the number of groups
  const N: number = parseInt(inputs[2]);
  // Groups of people
  const Pi: number[] = [];
  for (let i = 1; i < N + 1; i++) {
    Pi.push(parseInt(lines[i]));
  }

  const w = computeWinningsV2(L, C, Pi, N);
  console.log("answer:", w);
};

const computeWinningsV1 = (L: number, C: number, Pi: number[], N: number) => {
  let cache = new Map();

  let earning = 0;
  let idx = 0;

  let max_rides = C;

  let max_places = L;

  while (max_rides > 0) {
    console.log({ max_rides, idx });

    max_rides--;
    let occupied_places = 0;
    if (cache.has(idx)) {
      const data = cache.get(idx);
      occupied_places = data[0];
      idx = data[1];
    } else {
      let startIndex = idx;
      let i = 0;
      while (i < N && Pi[idx] + occupied_places <= max_places) {
        ++i;
        occupied_places += Pi[idx];
        idx = (idx + 1) % N;
      }
      cache.set(startIndex, [occupied_places, idx]);
    }
    earning += occupied_places;
  }

  return earning;
};

const computeWinningsV2 = (L: number, C: number, Pi: number[], N: number) => {
  const groups = [];
  const sequence = [Pi.toString()];
  
  let temp: number = Pi.shift()!;

  let offset = 0;

  let earning = 0;

  let max_places = L;

  let max_rides = C;

  do {
    let sum = 0;

    for (let i = 0; i <= Pi.length && sum + temp <= max_places; i++) {
      Pi.push(temp);
      sum += temp;
      temp = Pi.shift()!;
    }

    offset = sequence.indexOf(Pi.toString());
    sequence.push(Pi.toString());

    groups.push(sum);
  } while (offset === -1);

  let idx = 0;
  for (; idx < offset; idx++) {
    earning += groups[idx];
  }

  let rest = (max_rides - offset) % (groups.length - offset);

  for (; idx < groups.length; idx++) {
    earning += groups[idx] * (Math.floor((max_rides - offset) / (groups.length - offset)) + (rest > 0 ? 1 : 0));
    rest--;
  }
  return earning;
};
