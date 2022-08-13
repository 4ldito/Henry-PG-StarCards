import server from './src/app';
import db from "./src/db";
import { users } from './src/seeders/users';

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: true }).then(() => {
    // Crea los users por defecto que se encuentran en ./seeders/users.ts
    users.map(u => {
        db.User.create(u);
    })

    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
})