import React from 'react'

function UpdateGig() {

    

    return (
        <form onSubmit={e => this.handleSubmit(e)}>
            <label>Title:</label>
            <input type="text" name="title" value={title} onChange={e => this.handleChange(e)}></input>
            <label>Description:</label>
            <input type="text" name="description" value={description} onChange={e => this.handleChange(e)}></input>
            <label>City:</label>
            <input type="text" name="city" value={city} onChange={e => this.handleChange(e)}></input>
            <label>Date</label>
            <input type="date" name="date" value={displayDateInput(date)} onChange={e => this.handleChange(e)}></input>
            <label>Genre:</label>
            <input type="text" name="genre" value={genre} onChange={e => this.handleChange(e)}></input>
            <label>Duration:</label>
            <input type="number" name="durationHours" value={durationHours} onChange={e => this.handleChange(e)}></input><span> hours</span>
            <label>Reward per hour:</label>
            <input type="number" name="pricePerHour" value={pricePerHour} onChange={e => this.handleChange(e)}></input>€/hr

            <button type="submit">Save</button>
            <button onClick={this.toggleEditGig}>Discard</button>
            <button onClick={this.props.handleDelete(_id)}>Delete</button>
         </form>
    )
}

export default UpdateGig
