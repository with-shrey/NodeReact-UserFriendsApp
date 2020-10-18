import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {fetchUsers} from './features/users/userSlice'

const Users = React.lazy(() => import('./features/users/Users'))

function App() {
    return (
        <Suspense fallback={
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>Loading Application...</div>
            </div>
        }>
            <Switch>
                <Route path="/:id/friends" component={(props) => {
                    return <Users fetchUsers={() => fetchUsers(`/${props.match.params.id}/friends`)}/>
                }}/>
                <Route path="/:id/friend-of-friends" component={(props) => {
                    return <Users fetchUsers={() => fetchUsers(`/${props.match.params.id}/friend-of-friends`)}/>
                }}/>
                <Route path="/" component={(props) => {
                    return <Users fetchUsers={() => fetchUsers('')}/>
                }}/>
            </Switch>
        </Suspense>
    );
}

export default App;
