import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout.component';
import { LobbyTable } from '../components/lobby-table.component';
import { LobbyWaitingRoom } from '../components/lobby-waiting-room.component';

export const LobbyPage = () => {
  const params: any = useParams();
  return (
    <Layout title="LOBBY">
      {
        params && params['id'] ?
          <LobbyWaitingRoom id={params['id']} /> : <LobbyTable />
      }
    </Layout>
  )
}