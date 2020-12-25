import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { socketAtom } from '../recoil/atom';

export const SnakeGame = () => {
  const [socket,] = useRecoilState(socketAtom);

  useEffect(() => {
    socket.on("game-info", (data: any) => {
      console.log(data);
    });
    return () => {
      socket.off('game-info');
    }
  }, [socket]);

  return (
    <div>

    </div>
  )
}