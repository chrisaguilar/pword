import { exec } from './exec';

(async() => {
  try {

    await exec();

  } catch (e) {
    return console.error(e) as any;
  }
})();
