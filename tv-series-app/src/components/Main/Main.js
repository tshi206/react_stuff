import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Series from "../../containers/Series/Series";
import SingleSeries from "../../containers/SingleSeries/SingleSeries";

// This component defines all of our frontend routes
// noinspection JSUnusedLocalSymbols
const Main = props => (
    <Switch>
        <Route exact path="/" component={Series} />
        <Route path="/series/:id" component={SingleSeries} />
    </Switch>
);

export default Main;