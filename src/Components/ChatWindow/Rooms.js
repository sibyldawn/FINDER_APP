import React, { Component } from 'react';

export default class Rooms extends Component {
    render() {
        console.log("rooms", this.props.rooms);
        return (
            <div className="rooms-list">
        
                {this.props.rooms.map(room => {
                    return (
                        <li key={room.id} className="room">
                            <a href="#">#{room.name}</a>
                        </li>
                    )
                })}
            </div>
        );
    }
}