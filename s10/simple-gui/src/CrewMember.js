import React from 'react'

class CrewMember extends React.Component {
  constructor (props) {
    super(props)

    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }
  }
  render () {
    const { item } = this.props
    return (
      <div>
        <span>
          {item.name}
        </span>
        <span>
          {item.role}
        </span>
        <span>
          <input type='button' value='delete' onClick={this.delete} />
        </span>
      </div>
    )
  }
}

export default CrewMember