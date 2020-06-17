const fetch = require('node-fetch');

async function callApi(uri, options = {}) {
  let data;
  try {
    data = await loadData(uri, options);
    return data;
  } catch (err) {
    const { body, status } = err;
    const error = new Error(body ? body : err);
    error.status = status ? status : 500;
    error.body = body;
    console.error({ callApiFetchErr: error });
    throw error;
  }
}

async function loadData(uri, options = {}) {
  const response = await fetch(uri, options);
  const contentType = response.headers.get('content-type');
  const { status } = response;
  console.log({ status, contentType });
  if (status >= 200 && status < 300) {
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return response.text();
    }
  } else {
    return getErrorBody(response, contentType).then((body) => {
      return Promise.reject({
        body,
        status,
      });
    });
  }
}

async function getErrorBody(response, contentType = 'text') {
  let body;
  if (contentType.includes('application/json')) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  return body;
}

module.exports = callApi;
