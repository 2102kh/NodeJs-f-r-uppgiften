const { sequelize, Player } = require('./models')
const migrationhelper = require('./migrationhelper')

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"

// var bodyParser = require('body-parser')
app.use(express.json())
app.use(cors())

//ALL PLAYERS
 
app.get('/api/players',async (req,res)=>{
    let players = await Player.findAll()
    let result = players.map(p=>({
        id: p.id,
        name: p.name,
        jersey: p.jersey,
        position: p.position,
       
    }))
     res.json(result)
  });

  app.post('/api/player',async(req,res)=>{

    const {name,jersey,position} = req.body
    try {
        const user = await Player.create({name,jersey,position})
    
        return res.json(user)
      } catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
    });

    
        app.put('/api/players/playerId',async (req,res)=>{
            const playerId = req.params.playerId
            const {name,jersey,position} = req.body
        
            try {
        
                const newUser = await Player.update({
                    where: { id:playerId}
                  })
          
              newUser.name = name
              newUser.jersey = jersey 
              newUser.position = position
              
          
              await user.save()
          
              return res.status(204).json({err:'ok'})
            } catch (err) {
              console.log(err)
              return res.status(500).json({ error: 'Something went wrong' })
            }
        
        });

    app.listen(port, async () => {
        await migrationhelper.migrate()
        console.log(`Example app listening on port ${port}`)
      })
    