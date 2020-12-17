import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class ShipStore {
  constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll () {
    try {
      const response = await fetch(`${SERVER}/ships`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_ALL_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_ALL_ERROR')
    }
  }

  async addOne(ship) {
    try {
      await fetch(`${SERVER}/ships`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ship)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_ONE_ERROR')
    }
  }

  async deleteOne(id) {
    try {
      await fetch(`${SERVER}/ships/${id}`, {
        method: 'delete'
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_ONE_ERROR')
    }
  }

  async saveOne(id, ship) {
    try {
      await fetch(`${SERVER}/ships/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ship)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_ONE_ERROR')
    }
  }
}

const store = new ShipStore()

export default store