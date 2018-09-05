import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MatchFinder from './Components/MatchFinder/MatchFinder';
import Registration from './Components/Registration/Registration';
import Profile from './Components/Profile/Profile';
import ProfileSettings from './Components/ProfileSettings/ProfileSettings';
import Matches from './Components/Matches/Matches';
import Settings from './Components/Settings/Settings';
import JobMap from './Components/JobMap/JobMap';
import Messages from './Components/Messages/Messages';
import ChatWindow from './Components/ChatWindow/ChatWindow';
import JobMatched from './Components/JobMatched/JobMatched';
import Header from './Components/Header/Header';
import Card from './Components/Card/Card'
import MessageFeed from './Components/ChatWindow/MessageFeed';


export default (
        <Switch>
            <Route  exact path="/" component={MatchFinder}/>
            <Route  path ='/header' component={Header} />
            <Route  path="/Registration" component={Registration}/>
            <Route  path="/profile" component={Profile}/>
            <Route  path="/ProfileSettings" component={ProfileSettings}/>
            <Route  path="/Matches" component={Matches}/>
            <Route  path="/Settings" component={Settings}/>
            <Route  path="/JobMap" component={JobMap}/>
            <Route  path="/Messages" component={ChatWindow}/>
            <Route  path="/JobMatched" component={JobMatched}/>
            <Route  path="/Card" component={Card}/>
            <Route path="/messagefeed/:room_id" component={MessageFeed}/>
        </Switch>
)
