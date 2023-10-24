function OddCalculator(totalNumber, luckyNumbers) {
  if (totalNumber === 1 && luckyNumbers === 1) {
    return 3.8;
  } else if (totalNumber === 2 && luckyNumbers === 2) {
    return 15;
  } else if (totalNumber === 3 && luckyNumbers === 2) {
    return 3;
  } else if (totalNumber === 3 && luckyNumbers === 3) {
    return 35;
  } else if (totalNumber === 4 && luckyNumbers === 2) {
    return 1;
  } else if (totalNumber === 4 && luckyNumbers === 3) {
    return 8;
  } else if (totalNumber === 4 && luckyNumbers === 4) {
    return 100;
  } else if (totalNumber === 4 && luckyNumbers === 3) {
    return 8;
  } else if (totalNumber === 5 && luckyNumbers === 2) {
    return 1;
  } else if (totalNumber === 5 && luckyNumbers === 3) {
    return 3;
  } else if (totalNumber === 5 && luckyNumbers === 4) {
    return 15;
  } else if (totalNumber === 5 && luckyNumbers === 5) {
    return 300;
  } else if (totalNumber === 6 && luckyNumbers === 3) {
    return 1;
  } else if (totalNumber === 6 && luckyNumbers === 4) {
    return 10;
  } else if (totalNumber === 6 && luckyNumbers === 5) {
    return 70;
  } else if (totalNumber === 6 && luckyNumbers === 6) {
    return 1800;
  } else if (totalNumber === 7 && luckyNumbers === 3) {
    return 1;
  } else if (totalNumber === 7 && luckyNumbers === 4) {
    return 6;
  } else if (totalNumber === 7 && luckyNumbers === 5) {
    return 12;
  } else if (totalNumber === 7 && luckyNumbers === 6) {
    return 120;
  } else if (totalNumber === 7 && luckyNumbers === 7) {
    return 2150;
  } else if (totalNumber === 8 && luckyNumbers === 4) {
    return 4;
  } else if (totalNumber === 8 && luckyNumbers === 5) {
    return 8;
  } else if (totalNumber === 8 && luckyNumbers === 6) {
    return 68;
  } else if (totalNumber === 8 && luckyNumbers === 7) {
    return 600;
  } else if (totalNumber === 8 && luckyNumbers === 8) {
    return 3000;
  } else if (totalNumber === 9 && luckyNumbers === 4) {
    return 3;
  } else if (totalNumber === 9 && luckyNumbers === 5) {
    return 6;
  } else if (totalNumber === 9 && luckyNumbers === 6) {
    return 18;
  } else if (totalNumber === 9 && luckyNumbers === 7) {
    return 120;
  } else if (totalNumber === 9 && luckyNumbers === 8) {
    return 1800;
  } else if (totalNumber === 9 && luckyNumbers === 9) {
    return 4200;
  } else if (totalNumber === 10 && luckyNumbers === 4) {
    return 2;
  } else if (totalNumber === 10 && luckyNumbers === 5) {
    return 4;
  } else if (totalNumber === 10 && luckyNumbers === 6) {
    return 12;
  } else if (totalNumber === 10 && luckyNumbers === 7) {
    return 40;
  } else if (totalNumber === 10 && luckyNumbers === 8) {
    return 400;
  } else if (totalNumber === 10 && luckyNumbers === 9) {
    return 2500;
  } else if (totalNumber === 10 && luckyNumbers === 10) {
    return 5000;
  } else {
    return 0;
  }
}

export default OddCalculator;
