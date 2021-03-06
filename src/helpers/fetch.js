import { generate } from 'shortid';
import request from 'request-promise-native';
import store from 'Root/store';

export default async (json) => {
  if (process.type === 'renderer') {
    try {
      const res = await global.fetch(store.getState().setting.url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: generate(),
          ...json,
        }),
        method: 'POST',
      });

      const parsed = await res.json();
      if (parsed.error) {
        return null;
      }

      return parsed;
    } catch (e) {
      return null;
    }
  }

  try {
    const res = await request.post(store.getState().setting.url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: generate(),
        ...json,
      }),
    });

    const parsed = JSON.parse(res);
    if (parsed.error) {
      return null;
    }

    return parsed;
  } catch (e) {
    return null;
  }
};
