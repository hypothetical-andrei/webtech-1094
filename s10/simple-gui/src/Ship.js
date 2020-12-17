import React from 'react'

class Ship extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.item.name,
      portOfSail: this.props.item.portOfSail,
      displacement: this.props.item.displacement
    }

    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }

    this.edit = () => {
      this.setState({
        isEditing: true
      })
    }

    this.cancel = () => {
      this.setState({
        isEditing: false
      })
    }

    this.save = () => {
      this.props.onSave(this.props.item.id, {
        name: this.state.name,
        portOfSail: this.state.portOfSail,
        displacement: this.state.displacement
      })

      this.setState({
        isEditing: false
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.select = () => {
      this.props.onSelect(this.props.item.id)
    }
  }
  render () {
    const { item } = this.props
    return (
      <div>
        {
          this.state.isEditing ?
            <>
              <span>
                <input type='text' value={this.state.name} name='name' onChange={this.handleChange} />
              </span>
              <span>
                <input type='text' value={this.state.portOfSail} name='portOfSail' onChange={this.handleChange} />
              </span>
              <span>
                <input type='text' value={this.state.displacement} name='displacement' onChange={this.handleChange} />
              </span>
              <span>
                <input type='button' value='cancel' onClick={this.cancel} />
                <input type='button' value='save' onClick={this.save} />
              </span>
            </>
          :
            <>
              <span>{item.name}</span>
              <span>{item.portOfSail}</span>
              <span>{item.displacement}</span>
              <span>
                <input type='button' value='delete' onClick={this.delete} />
                <input type='button' value='edit' onClick={this.edit} />
                <input type='button' value='select' onClick={this.select} />
              </span>
            </>
        }
      </div> 
    )
  }
}

export default Ship

