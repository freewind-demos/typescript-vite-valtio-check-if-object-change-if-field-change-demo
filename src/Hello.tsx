import React, {FC, useEffect} from 'react';
import './Hello.pcss';
import {proxy, useSnapshot} from 'valtio';

const store = proxy({
    user: {
      name: 'aaa'
    },
    user2: {
      name: 'bbb'
    },
    changeName: (value: string) => {
      console.log("### new value: ", value)
      // Use `store` here
      store.user.name = value
    },
    hello: () => console.log(`Hello, ${store.user}`)
  }
);

export const Hello: FC = () => {
  const snap = useSnapshot(store);

  useEffect(() => {
    console.log("### snap.user is changed", snap.user);
  }, [snap.user])

  useEffect(() => {
    console.log("### snap.user2 is changed", snap.user2);
  }, [snap.user2])

  return <div className={'Hello'}>
    <h1>Hello {snap.user.name}</h1>
    <input type={'text'} value={snap.user.name} onChange={(event) => store.changeName(event.target.value)}/>
  </div>;
}
