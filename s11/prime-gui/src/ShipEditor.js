import React from 'react'
import store from './ShipStore'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

import './ShipEditor.css'

class ShipEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ships: [],
      isAddDialogShown: false,
      ship: {
        name: '',
        displacement: '',
        portOfSail: ''
      }
    }

    this.hideDialog = () => {
      this.setState({
        isAddDialogShown: false
      })
    }

    this.showDialog = () => {
      this.setState({
        isAddDialogShown: true
      })
    }

    this.save = () => {
      store.addOne(this.state.ship)
      this.setState({
        isAddDialogShown: false
      })
    }

    this.handleShipChange = (evt) => {
      const ship = this.state.ship
      ship[evt.target.name] = evt.target.value
      this.setState({
        ship: ship
      })
    }

    this.tableFooter = (
      <div className='centered'>
        <Button icon="pi pi-plus" className="p-button-rounded p-button-outlined" onClick={this.showDialog} />
      </div>
    ) 

    this.addDialogFooter = (
      <div className='centered'>
        <Button label='Save' icon="pi pi-save" className="p-button-rounded p-button-outlined" onClick={this.save} />
      </div>
    )
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
    return (
      <div className='ship-editor'>
        <DataTable  value={this.state.ships} 
                    header='List of ships' 
                    footer={this.tableFooter}>
          <Column header='Name' field='name' />
          <Column header='Port of sail' field='portOfSail' />
          <Column header='Displacement' field='displacement' />
        </DataTable>
        <Dialog   visible={this.state.isAddDialogShown} 
                  onHide={this.hideDialog} 
                  header='Add a ship'
                  footer={this.addDialogFooter} 
                  className='p-fluid'>
        <div className='p-field'>
          <label htmlFor="name">Name</label>
          <InputText type="text" id="name" name="name" value={this.state.ship.name} onChange={this.handleShipChange} />
        </div>
        <div className='p-field'>
          <label htmlFor="portOfSail">Port</label>
          <InputText type="text" id="portOfSail" name="portOfSail" value={this.state.ship.portOfSail} onChange={this.handleShipChange} />
        </div>
        <div className='p-field'>
          <label htmlFor="displacement">Displacement</label>
          <InputText type="text" id="displacement" name="displacement" value={this.state.ship.displacement} onChange={this.handleShipChange} />
        </div>
        </Dialog>
      </div>
    )
  }
}

export default ShipEditor
