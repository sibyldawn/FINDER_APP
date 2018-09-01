import React from 'react'

class NewRoomForm extends React.Component {
    render () {
        return (
            <div className="new-room-form">
                <form>
                    <input
                        // onChange={this.}
                        type="text" 
                        placeholder="NewRoomForm" 
                        required />
                    <button id="create-room-btn" type="submit">+</button>
            </form>
        </div>
        )
    }
}

export default NewRoomForm