import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { socketAtom } from '../recoil/atom';
import { Button, Modal, Input } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { LOBBY_ROUTE, GAME_ROUTE } from '../constants/router.constant';

interface ILobbyWaitingRoomProps {
  id: string,
}
export const LobbyWaitingRoom = (props: ILobbyWaitingRoomProps): JSX.Element => {
  const history = useHistory();
  const params: any = useParams();

  const [socket,] = useRecoilState(socketAtom);
  const [data, setData] = useState<any>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInGame, setIsInGame] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({ playerName: '', playerColor: '#ffffff', roomId: params['id'] });


  useEffect(() => {
    socket.on('game-info', (data: any) => {
      console.log(`[${new Date().toISOString()}]`, data);
      setIsInGame(true);
      setData(data);
      if (params['id'] !== data['roomId']) {
        history.push(LOBBY_ROUTE + "/" + data['roomId'])
      }
    });
    return () => {
      socket.off('game-info');
    }
    //eslint-disable-next-line
  }, []);

  const handleStartGame = () => {
    history.push(GAME_ROUTE);
  }

  const handleJoinGame = () => {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
    socket.emit("register-game", userInfo);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {props.id}
      {  isInGame ? <div>
        <Button className="bg-blue-100 hover:bg-blue-500 text-blue-700 hover:text-white font-semibold rounded-xl"
          onClick={handleStartGame}>Start</Button>
        <table className="table-auto w-6/12">
          <thead>
            <tr className="w-full h-8">
              <th className="w-6/12">Player Name</th>
              <th className="w-6/12">Player Color</th>
            </tr>
          </thead>
          <tbody>
            {data && data['roomId'] && data['players'].map((player: any, index: number) => {
              return (
                <tr key={player['playerName'] + index} className="w-full h-8">
                  <td className="w-6/12">{player['playerName']}</td>
                  <td className="w-6/12"><input disabled value={player['playerColor']} type="color" /></td>
                </tr>
              )
            })}
          </tbody>
        </table></div> : <div onClick={handleJoinGame}>
          Join game
        </div>}
      <Modal title={userInfo['roomId'] ? "Room = " + userInfo['roomId'] : "Create new game"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Display Name" value={userInfo['playerName']} onChange={(e) => setUserInfo({ ...userInfo, playerName: e.target.value })} />
        <Input className="mt-4" placeholder="Color" type="color" value={userInfo['playerColor']} onChange={(e) => setUserInfo({ ...userInfo, playerColor: e.target.value })} />
      </Modal>
    </div>
  )
}