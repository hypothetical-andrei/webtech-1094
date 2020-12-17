import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class CrewMemberStore {
  constructor (shipId) {
    this.shipId = shipId
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll () {
    try {
      const response = await fetch(`${SERVER}/ships/${this.shipId}/crew-members`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_ALL_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_ALL_ERROR')
    }
  }

  async addOne(crewMember) {
    try {
      await fetch(`${SERVER}/ships/${this.shipId}/crew-members`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(crewMember)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_ONE_ERROR')
    }
  }

  async deleteOne(id) {
    try {
      await fetch(`${SERVER}/ships/${this.shipId}/crew-members/${id}`, {
        method: 'delete'
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_ONE_ERROR')
    }
  }

  async saveOne(id, crewMember) {
    try {
      await fetch(`${SERVER}/ships/${this.shipId}/crew-members/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(crewMember)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_ONE_ERROR')
    }
  }
}

export default CrewMemberStore