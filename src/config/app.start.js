import initDb from "./databases/initDb.js";

const startApp = async () => {
  console.log('Starting app...');
  try {
    await initDb();
  } catch (error) {
    console.error('App cannot get start.\n', error);
  };
};

export default startApp;