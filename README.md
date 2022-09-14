<h1 align="center">StarCards</h1>
<img src="https://i.ibb.co/SfKhMg2/Sin-t-tulo-1-Mesa-de-trabajo-1.png" alt="starcards"/>
<p align="center">Web card game, inspired by StarCraft with e-commerce implementations</p>

## Introduction

This is a students group project presented as a final exam, making use of all the technologies learned at the Henry Bootcamp.


## Project Objectives

- Build a JavaScript App from scratch
- Connect learned concepts
- Learn and practice GIT workflow / teamwork
- Use scrum agile methodology

## Stack of Technologies

### Front End:
HTML, CSS, Javascript, React, Redux

### Back End:
Node.js, Express, Sequelize, JWT, Nodemailer, Passport

### Connection:
Socket.io, Firebase

### Database:
PostgreSQL

## **Starting Instructions** 

__IMPORTANT:__ Necessary version of node and NPM 

 * __Node__: 16.15.0 or higher
 * __NPM__: 8.5.5 or higher

 
## BoilerPlate

The boilerPlate has two folders: `api` and `client`.

Inside `api` you must have to create a file called: `.env` 
that has the following form: 

```
The boilerPlate has two folders: api and client.
Inside api you must have to create a file called: .env that has the following form:

DB_USER={postgresUser}
DB_PASSWORD={postgresPassword}
DB_HOST=localhost
DB_NAME={databaseName}
PORT={port}
PGPORT=5432
ACCESS_TOKEN={accesTokenMercadoPago}
purchaseCompletedURL={urlFront}/purchase-completed
```

You have to replace {postgresUser}, {postgresPassword}, {databaseName}, {port}, {accesTokenMercadoPago} and {urlFront} with your own credentials to connect to postgres database, and Mercadopago services. This file will be ignored by github, as it contains sensitive information (the credentials).

Inside client you must have to create a file called: .env that has the following form:

VITE_BASE_URL="http://localhost:{port}/"
VITE_CHAT_URL="http://localhost:{port}/"

{port} must be the same as api.

## Next 
### _Connect the data base_

 - Go to your postgres database manager and create a new database called `starcards`, this is the name of the database to which we will connect.

### _Install the necessary package to run it_

- Open the project console
    + Inside `api` folder, run the command line, `npm install`
    + Inside `client` folder, run the command line, `npm install` 

### _Run the project_

- Open the project console
    + Inside `api` folder, run the command line, `npm start`
        
    + Inside `client` folder, run the command line, `npm start` (go to http://localhost:5173/) 

# For testing

- You can find in `api/index.js`
    + `const forceFlag = true;`, switch it between " true " ( if you want reset database in each load ) or " false "( if you dont want reset database in each load ) 

- You can use a testing admin user with login credentials:
    + username : `admin@starcards.com`
    + password : `asd123`


# Project Screens 

- Landing-Page
<img src="https://i.ibb.co/BqKrKVT/Landing-Page.png" alt="starcards"/>
<hr></hr>

- Register with new credentials or using your Google account
<img src="https://i.ibb.co/JtKQfxT/Register.png" alt="starcards"/>
<hr></hr>

- Verify your email with the token you receive
<img src="https://i.ibb.co/XLDdGqz/Verification-Mail.png" alt="starcards"/>
<hr></hr>

- Explore the Store: Stars, Card Packs and Cards
<img src="https://i.ibb.co/WFsJ4Px/Cards-Store.png" alt="starcards"/>
<hr></hr>

- Product details
<img src="https://i.ibb.co/8NY2RPX/Pack-Detail.png" alt="starcards"/>
<hr></hr>

- Add products to your cart and pay with Stars or with MercadoPago
<img src="https://i.ibb.co/c6nxY5m/Cart.png" alt="starcards"/>
<hr></hr>

- Check your user profile: inventory (set decks), private chats, followed friends list and configuration
<img src="https://i.ibb.co/D4wP5m0/Profile.png" alt="starcards"/>
<hr></hr>

- Review cards you own
<img src="https://i.ibb.co/kDG52Wz/Album.png" alt="starcards"/>
<hr></hr>

- Moderate users and store products, and check transactions as admin
<img src="https://i.ibb.co/t8YSkHG/Admin.png" alt="starcards"/>
<hr></hr>

- Enter de playroom, check the ranking list of users, your games' history and the public chat
<img src="https://i.ibb.co/s1ZJzyV/Playroom.png" alt="starcards"/>
<hr></hr>
