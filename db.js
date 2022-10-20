import { createClient } from 'urql';

const query = `
{
  listPromotions {
    data {
      _id
      title
      img
    }
  }
}
`;

let token = `fnAEyRPatvAAS-NyeZ__gnOl9irmJNCKA54Rm1V2`;
let url = 'https://graphql.us.fauna.com/graphql';

export const getData = async (region) => {

  if((region === 'FR') || (region === 'DE')) {
    token = `fnAEyQ4M9fAAyzq3hnegxEZI0yysL9-RCk2WFCgb`;
    url = 'https://graphql.eu.fauna.com/graphql';
  }

  const client = createClient({
    url,
    fetchOptions: () => {
      return {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const result = await client.query(query).toPromise();
  return result.data.listPromotions.data;
};