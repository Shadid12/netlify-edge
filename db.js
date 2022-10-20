import faunadb from "faunadb";
export const q = faunadb.query;

export const getClient = (region) => {
  let config = {
    secret: 'fnAEyRPatvAAS-NyeZ__gnOl9irmJNCKA54Rm1V2',
    domain: 'db.us.fauna.com',
  };
  if (region === 'DE' || region === 'FR') {
    config = {
      secret: "fnAEyQ4M9fAAyzq3hnegxEZI0yysL9-RCk2WFCgb",
      domain: 'db.eu.fauna.com',
    }
  }
  return new faunadb.Client(config)
};