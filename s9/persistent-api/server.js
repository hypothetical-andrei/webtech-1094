const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')

const sequelize = new Sequelize('sequelize_tests', 'app1', 'welcome123', {
  dialect: 'mysql'
})

const Ship = sequelize.define('ship', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20]
    }
  },
  portOfSail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 30]
    }
  },
  displacement: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 5
    }
  }
})

const CrewMember = sequelize.define('crewMember', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 40]
    }
  }, 
  role: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['CAPTAIN', 'FIRST_MATE', 'CREW', 'MECHANIC']
  }
})

Ship.hasMany(CrewMember)

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

// get /ships?filter=a&page=1&pageSize=5
app.get('/ships', async (req, res, next) => {
  const query = {
    where: {}
  }
  if (req.query.filter) {
    query.where.name = {
      [Op.like]: `%${req.query.filter}%`
    }
  }
  let pageSize = 10
  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
  }
  if (req.query.page) {
    const page = parseInt(req.query.page)
    query.limit = pageSize
    query.offset = page * pageSize
  }
  try {
    const ships = await Ship.findAll(query)
    res.status(200).json(ships)
  } catch (err) {
    next(err)
  }
})

app.post('/ships', async (req, res, next) => {
  try {
    await Ship.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

app.get('/ships/:sid', async (req, res, next) => {
  try {
    const ship = await Ship.findByPk(req.params.sid)
    if (ship) {
      res.status(200).json(ship)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/ships/:sid', async (req, res, next) => {
  try {
    const ship = await Ship.findByPk(req.params.sid)
    if (ship) {
      await ship.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/ships/:sid', async (req, res, next) => {
  try {
    const ship = await Ship.findByPk(req.params.sid)
    if (ship) {
      await ship.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/ships/:sid/crew-members', async (req, res, next) => {
  try {
    const ship = await Ship.findByPk(req.params.sid, {
      include: [CrewMember]
    })
    if (ship) {
      res.status(200).json(ship.crewMembers)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.post('/ships/:sid/crew-members', async (req, res, next) => {
  try {
    const ship = await Ship.findByPk(req.params.sid)
    if (ship) {
      const crewMember = new CrewMember(req.body)
      crewMember.shipId = ship.id
      await crewMember.save()
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/ships/:sid/crew-members/:cmid', async (req, res, next) => {
  try {
    const ship = await Ship.findByPk(req.params.sid)
    if (ship) {
      const crewMembers = await ship.getCrewMembers({ id: req.params.cmid })
      const crewMember = crewMembers.shift()
      if (crewMember) {
        res.status(200).json(crewMember)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/ships/:sid/crew-members/:cmid', async (req, res, next) => {
  try {
    const ship = await Ship.findByPk(req.params.sid)
    if (ship) {
      const crewMembers = await ship.getCrewMembers({ id: req.params.cmid })
      const crewMember = crewMembers.shift()
      if (crewMember) {
        crewMember.name = req.body.name
        crewMember.role = req.body.role
        await crewMember.save()
        res.status(202).json({ message: 'accepted'})
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/ships/:sid/crew-members/:cmid', async (req, res, next) => {
  try {
    const ship = await Ship.findByPk(req.params.sid)
    if (ship) {
      const crewMembers = await ship.getCrewMembers({ id: req.params.cmid })
      const crewMember = crewMembers.shift()
      if (crewMember) {
        await crewMember.destroy()
        res.status(202).json({ message: 'accepted'})
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)