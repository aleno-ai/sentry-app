import utils from './utils';

const login = async (apiKey: string) => {
  console.log('login', apiKey);
  await utils.sleep(2_000);
  return true;
};

const QUERIES = {
  login,
};

export default QUERIES;
