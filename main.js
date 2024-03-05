const { sequelize, Player } = require('./models')
const migrationhelper = require('./migrationhelper')
const playersController = require('./controllers/players.controllers')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3002 // "Radiofrekvens"

// var bodyParser = require('body-parser')
app.use(express.json())
app.use(cors())

//ALL PLAYERS
 app.get('/api/players',playersController.getAll);
 app.post('/api/players',playersController.post);
 app.put('/api/players/:playerId',playersController.put);
 app.delete('/api/players/:id',playersController.delete);


   
 app.listen(port, async () => {
  await migrationhelper.migrate()
  console.log(`Example app listening on port ${port}`)
 })        
    
    