import React from 'react'
import Ship from './Ship'
import ShipAddForm from './ShipAddForm'
import ShipDetails from './ShipDetails'
import store from './ShipStore'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      ships: [],
      selected: 0
    }

    this.add = (ship) => {
      store.addOne(ship)
    }

    this.delete = (id) => {
      store.deleteOne(id)
    }

    this.save = (id, ship) => {
      store.saveOne(id, ship)
    }

    this.select = (id) => {
      this.setState({
        selected: id
      })
    }

    this.cancel = () => {
      this.setState({
        selected: 0
      })
    }
  }

  componentDidMount () {
    store.getAll()
    store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        ships: store.data
      })
    })
  }

  render () {
    if (this.state.selected === 0) {
      return (
        <div>
          {
            this.state.ships.map(e => <Ship key={e.id} item={e} onDelete={this.delete} onSave={this.save} onSelect={this.select} />)
          }
          <ShipAddForm onAdd={this.add} />
        </div>
      ) 
    } else {
      return <ShipDetails onCancel={this.cancel} item={this.state.selected} />
    }
  }
}

export default App
