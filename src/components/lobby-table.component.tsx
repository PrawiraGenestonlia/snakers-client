import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { socketAtom } from '../recoil/atom';
import { Button, Modal, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { LOBBY_ROUTE } from '../constants/router.constant';
import 'reactjs-popup/dist/index.css';

export const LobbyTable = () => {
  const history = useHistory();
  const [socket,] = useRecoilState(socketAtom);
  const [rooms, setRooms] = useState<Array<string>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ playerName: '', playerColor: '#ffffff', roomId: '' });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    socket.emit("register-game", userInfo);
    history.push(LOBBY_ROUTE + '/0');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  useEffect(() => {
    socket.emit("rooms");
    socket.on('rooms', (data: any) => {
      console.log(data);
      setRooms(data);
    });
  }, [socket]);

  useEffect(() => {
    if (!isModalVisible) {
      setUserInfo({ ...userInfo, roomId: '' });
    }
    //eslint-disable-next-line
  }, [isModalVisible]);

  return (
    <div className="w-full h-full">
      <Button className="bg-blue-100 hover:bg-blue-500 text-blue-700 hover:text-white font-semibold rounded-xl"
        onClick={showModal}>Create new game</Button>
      <table className="table-auto w-6/12">
        <thead>
          <tr className="w-full h-8">
            <th className="w-4/12">Num</th>
            <th className="w-4/12">Room Id</th>
            <th className="w-4/12">Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room: string, index: number) => {
            return (
              <tr key={room + index} className="w-full h-8">
                <td>{index + 1}</td>
                <td>{room}</td>
                <td onClick={() => {
                  setUserInfo({ ...userInfo, roomId: room });
                  showModal()
                }}>Join</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal title={userInfo['roomId'] ? "Room = " + userInfo['roomId'] : "Create new game"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Display Name" value={userInfo['playerName']} onChange={(e) => setUserInfo({ ...userInfo, playerName: e.target.value })} />
        <Input className="mt-4" placeholder="Color" type="color" value={userInfo['playerColor']} onChange={(e) => setUserInfo({ ...userInfo, playerColor: e.target.value })} />
      </Modal>
    </div >
  )
}