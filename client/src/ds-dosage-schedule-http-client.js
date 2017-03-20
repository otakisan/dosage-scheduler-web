import DSHttpClient from './ds-http-client'

function search(query, cb) {
  return DSHttpClient.search('ormtest', query, cb);
}

const Client = { search };
export default Client;