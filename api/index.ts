import server from './src/app'
import db from './src/db'
import { users } from './src/seeders/users'
import { rols } from './src/seeders/rols'
import { starsPack } from './src/seeders/starsPack'

const { User, Rol, StarsPack } = db

const PORT: number | string = process.env.PORT !== undefined ? process.env.PORT : 3000

db.sequelize.sync({ force: true }).then(() => {
  // Crea los users por defecto que se encuentran en ./seeders/users.ts
  const rolsArr: Array<typeof Rol> = []
  rols.forEach(r => {
    const rol = Rol.create(r)
    rolsArr.push(rol)
  })

  users.forEach(u => {
    // const user = User.create(u)
    User.create(u)
    // user.setRol(rolsArr[2])
  })

  starsPack.forEach((sp) => {
    StarsPack.create(sp)
  })

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
