import React from 'react'

class NewRoomForm extends React.Component {

    constructor() {
        super()
        this.state = {
            roomName: ''
        }
    }


    handleChange=(e) =>{
        this.setState({
            roomName: e.target.value
        })
    }
    
    handleSubmit=(e)=> {
        e.preventDefault()
        this.props.createRoom(this.state.roomName)
        this.setState({
            rommName:''
        })
    }
   

    render () {
        return (
            <div className="new-room-form" onSubmit={this.handleSubmit}>
                <form>
                    <input
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        type="text" 
                        placeholder="Create a Room" 
                        required />
                    <button id="create-room-btn" type="submit">+</button>
            </form>
        </div>
        )
    }
}

export default NewRoomForm