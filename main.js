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



   app.post('/api/players',async(req,res)=>{

    const {name,jersey,position,team} = req.body
    try {
        const user = await Player.create({name,jersey,position,team})
    
        return res.json(user)
      } catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
      
    });

    app.put('/api/players/:playerId',async (req,res)=>{
      const playerId = req.params.playerId
      const {name,jersey,position} = req.body
     
      try {
          const user = await Player.findOne({
              where: {id:playerId}
            })
     
        user.name = name
        user.jersey = jersey
        user.position = position
        user.team = team
     
        await user.save()
     
        return res.status(204).json({err:'ok'})
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
      }
     
    });
  
    app.delete('/api/players/:id',playersController.delete)
        
      app.listen(port, async () => {
        await migrationhelper.migrate()
        console.log(`Example app listening on port ${port}`)
      })
    