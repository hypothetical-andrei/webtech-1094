import React from 'react'
import CrewMember from './CrewMember'
import CrewMemberStore from './CrewMemberStore'
import CrewMemberAddForm from './CrewMemberAddForm'

class ShipDetails extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      crewMembers: []
    }

    this.cancel = () => {
      this.props.onCancel()
    }

    this.store = new CrewMemberStore(this.props.item)

    this.add = (crewMember) => {
      this.store.addOne(crewMember)
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }
  }

  componentDidMount () {
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        crewMembers: this.store.data
      })
    })
  }

  render () {
    return (
      <div>
        i will be the ship details for {this.props.item}
        <div>
          {
            this.state.crewMembers.map(e => <CrewMember item={e} key={e.id} onDelete={this.delete} />)
          }
        </div>
        <div>
          <CrewMemberAddForm onAdd={this.add} />
        </div>
        <input type='button' value='cancel' onClick={this.cancel} />
      </div>
    )
  }
}

export default ShipDetails