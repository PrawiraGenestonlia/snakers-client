import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { HOME_ROUTE, LOBBY_ROUTE, GAME_ROUTE } from '../constants/router.constant';
import { HomePage } from '../pages/home.page';
import { LobbyPage } from '../pages/lobby.page';
import { GamePage } from '../pages/game.page';

const router = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to={HOME_ROUTE} />} />
        <Route exact path={HOME_ROUTE} component={HomePage} />
        <Route exact path={LOBBY_ROUTE} component={LobbyPage} />
        <Route exact path={LOBBY_ROUTE + "/:id"} component={LobbyPage} />
        <Route exact path={GAME_ROUTE} component={GamePage} />
      </Switch>
    </Router>
  )
}

export default router;