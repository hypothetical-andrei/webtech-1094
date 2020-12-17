class Robot {
  constructor (name) {
    this.name = name
  }

  move () {
    console.log(`${this.name} is moving`)
  }
}

const r0 = new Robot('ordinary robot')
r0.move()

class Weapon {
  constructor (description) {
    this.description = description
  }

  fire () {
    console.log(`firing ${this.description}`)
  }
}

// function Weapon(description) {
//   this.description = description
//   this.fire = function () {
//     console.log(`firing ${this.description}`)
//   }
// }

class CombatRobot extends Robot {
  constructor (name) {
    super(name)
    this.weapons = []
  }

  addWeapon (weapon) {
    this.weapons.push(weapon)   
  }

  fire () {
    console.log('firing all weapons')
    for (const weapon of this.weapons) {
      weapon.fire()
    }   
  }
}

let cr0 = new CombatRobot('combat robot')
cr0.fire()
cr0.move()

let w0 = new Weapon('pew pew laser')
cr0.addWeapon(w0)
cr0.fire()

// some code
Robot.prototype.fly = function () {
  console.log(`${this.name} is flying`)
}

cr0.fly()

const f0 = cr0.fly

f0.apply(cr0)

const f1 = f0.bind(r0)
f1()
