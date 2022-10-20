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

let token = Deno.env.get('FAUNA_SECRET_US');
let url = 'https://graphql.us.fauna.com/graphql';

export const getData = async (region) => {

  if((region === 'FR') || (region === 'DE')) {
    token = Deno.env.get('FAUNA_SECRET_EU');
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