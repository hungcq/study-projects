export default fetchImplementation => store => next => (action) => {
  if (action.type === 'FETCH') {
    const { url, params } = action;
    const urlWithAccountId = url.includes('?') ? `${url}&accountId=${store.getState().auth.account.id}` : `${url}?accountId=${store.getState().auth.account.id}`;
    const token = store.getState().auth.accessToken;
    return wrapAccessToken(urlWithAccountId, params, token)(fetchImplementation);
  }
  return next(action);
};

const wrapAccessToken = (url, params, token) => fetchImplementation => {
  params.headers = params.headers || {};
  // params.headers['X-BIZWEB-APP-FPAGE-TOKEN'] = token;
  params.headers['Content-Type'] = 'application/json';

  if (ENV !== 'production') {
    console.group(`NETWORK [${params.method || 'GET'}]@ ${new Date().toLocaleString()}`);
    console.log({
      url,
      params
    });
    console.groupEnd('NETWORK');
  }

  return (
    fetchImplementation(url, params)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        try {
          throw new Error(res.json().message || res.statusText);
        } catch (e) {
          throw e;
        }
      })
      .catch(e => {
        if (ENV !== 'production') {
          console.group(`NETWORK [${params.method || 'GET'}]@ ${new Date().toLocaleString()}`);
          console.log({
            url,
            params
          });
          console.log(e);
          console.groupEnd('NETWORK');
        } else {
          console.log(e);
        }
      })
  );
};

export const fetch = (url, params = {}) => {
  return {
    type: 'FETCH',
    url,
    params
  };
};
