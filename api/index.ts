import server from './src/app'
import db from './src/db'
import { users } from './src/seeders/users'
import { rols } from './src/seeders/rols';

const { User, Rol } = db

const PORT = process.env.PORT || 3000

db.sequelize.sync({ force: true }).then(() => {
  // Crea los users por defecto que se encuentran en ./seeders/users.ts
  const rolsArr: typeof Rol[] = [];
  rols.forEach(r => {
    const rol = Rol.create(r)
    rolsArr.push(rol)
  })

  users.forEach(u => {
    // const user = User.create(u)
    User.create(u)
    // user.setRol(rolsArr[2])
  });

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})
