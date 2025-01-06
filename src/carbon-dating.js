const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

function dateSample(sampleActivity) {
  if (typeof sampleActivity !== 'string' || isNaN(sampleActivity) || sampleActivity <= 0) {
    return false;
  }

  const activity = parseFloat(sampleActivity);
  const decayConstant = Math.LN2 / HALF_LIFE_PERIOD;
  const age = Math.log(MODERN_ACTIVITY / activity) / decayConstant;
  return age > 0 ? Math.ceil(age) : false;
}

module.exports = {
  dateSample
};
