import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from '../components/header/header';
import Nav from '../components/nav/nav';
import Home from '../pages/home/home';
import Article from '../pages/article/article';
import Chart from '../pages/chart/chart';
import Color from '../pages/color/color';
import NotFound from '../pages/404/404';

import style from './router.module.scss';

const history: any = createBrowserHistory();

class router extends React.Component {
    render() {
        let layout = (
            <div>
                <Header />
                <div className={style['container']}>
                    <Nav />
                    <Switch>
                        <Route exact path={`/`} component={Home} />
                        <Route exact path={`/home`} component={Home} />
                        <Route path={`/article/:id`} component={Article} />
                        <Route exact path={`/article`} component={Article} />
                        <Route exact path={`/chart`} component={Chart} />
                        <Route exact path={`/color`} component={Color} />
                        <Redirect to='/notFound' />
                    </Switch>
                </div>
            </div>
        );
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/notFound' component={NotFound} />
                    <Route render={() => layout} />
                </Switch>
            </Router>
        );
    }
}

export default router;
