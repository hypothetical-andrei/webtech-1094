import React from 'react'

class ShipAddForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      portOfSail: '',
      displacement: ''
    }

    this.add = (evt) => {
      this.props.onAdd({
        name: this.state.name,
        portOfSail: this.state.portOfSail,
        displacement: this.state.displacement
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }
  render () {
    return (
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="portOfSail">Port</label>
          <input type="text" id="portOfSail" name="portOfSail" value={this.state.portOfSail} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="displacement">Displacement</label>
          <input type="text" id="displacement" name="displacement" value={this.state.displacement} onChange={this.handleChange} />
        </div>
        <div>
          <input type="button" value="add" onClick={this.add} />
        </div>
      </div>
    )
  }
}

export default ShipAddForm