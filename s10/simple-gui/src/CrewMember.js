import React from 'react'

class CrewMember extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.item.name,
      role: this.props.item.role
    }

    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }

    this.save = () => {
      this.props.onSave(this.props.item.id, {
        name: this.state.name,
        role: this.state.role
      })
      this.setState({
        isEditing: false
      })
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

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }
  render () {
    const { item } = this.props
    return (
      <div>
        {
          this.state.isEditing ?
            <>
              <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
              <input type="text" id="role" name="role" value={this.state.role} onChange={this.handleChange} />
              <input type='button' value='cancel' onClick={this.cancel} />
              <input type='button' value='save' onClick={this.save} />
            </>
          :
            <>
              <span>
                {item.name}
              </span>
              <span>
                {item.role}
              </span>
              <span>
                <input type='button' value='delete' onClick={this.delete} />
                <input type='button' value='edit' onClick={this.edit} />
              </span>
            </>
        }
      </div>
    )
  }
}

export default CrewMember