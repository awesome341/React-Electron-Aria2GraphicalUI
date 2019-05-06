import types from 'Root/actions';
import store from 'Root/store';
import fetch from 'Root/helpers/fetch';
import { sync } from 'Root/db';
import reAdd from '../add/reAdd';

export default async (id) => {
  const download = store.getState().downloads.find(i => i.id === id);

  if (download.downloadStatus === 'suspend' || download.downloadStatus === 'failed') {
    reAdd(id);
  } else {
    await fetch({
      method: 'aria2.unpause',
      params: [
        download.gid,
      ],
    });

    store.dispatch({
      type: types.downloads.RESUME,
      id,
    });
  }

  await sync();
};
