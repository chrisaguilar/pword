import { exec } from './exec';

(async() => {
  try {

    await exec();

  } catch (e) {
    throw e;
  }
})();
