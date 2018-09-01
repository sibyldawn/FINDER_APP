import React, { Component } from 'react';

export default class Rooms extends Component {
    render() {
        console.log("rooms", this.props.rooms);
        return (
            <div className="rooms-list">
        
                {this.props.rooms.map(room => {
                    const active = this.props.roomId === room.id ? "active" : "";
                    return (
                        <li key={room.id} className={"room" + active}>
                            <a  href="#" onClick={() => this.props.subscribeToRoom(room.id)}>#{room.name}</a>
                        </li>
                    )
                })}
            </div>
        );
    }
}