import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { socketAtom } from '../recoil/atom';

interface IChildren {
  children: JSX.Element;
}

export const SocketIOWrapper = (props: IChildren) => {

  const [socket,] = useRecoilState(socketAtom);

  useEffect(() => {
    socket.on('error', (error: string) => {
      window.alert(error);
    });
    return () => {
      socket.off('error');
    }
    //eslint-disable-next-line
  }, []);

  return (props.children)
}