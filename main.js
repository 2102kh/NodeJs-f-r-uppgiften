const { Player } = require('./models')
const migrationhelper = require('./migrationhelper')
const playersController = require('./controllers/players.controllers')
const express = require('express')
const {check} = require('express-validator')
const {Op} = require('sequelize')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"

app.use(express.json())
// app.use(cors())
app.use(cors({
  origin:"http://localhost:5500",
  credentials:true 
}))


//ALL PLAYERS
//   app.get('/api/players',playersController.getAll);
 app.post('/api/players',playersController.post);
 app.put('/api/players/:playerId',playersController.put);
 app.delete('/api/players/:id',playersController.delete);


 
app.get('/api/players', check('q').escape(), async (req,res) => {
  let sortCol = req.query.sortCol || 'id';
  console.log(req.query.sortCol)
 
  let sortOrder = req.query.sortOrder || 'asc';
  console.log(req.query.sortOrder)
  let q =  req.query.q || '';
  let offset =   Number(req.query.offset) || 0;
  let page =  req.query.offset || 0;
  let limit = Number(req.query.limit) || 5;


  const allPlayers = await Player.findAndCountAll({
      where:{
          name:{
              [Op.like]: '%' + q + '%'
          }
      },
      order:[
          [sortCol,sortOrder]
      ],
      offset: offset,
      limit:limit
  })
  
  
  const total = allPlayers.count
    const result = allPlayers.rows.map(p=>{
        return {
           id:p.id,
           name:p.name,
           jersey:p.jersey,
           position:p.position,
           team:p.team
       }
    })
    return res.json({
        total,
        result
    })
})

  

 app.listen(port, async () => {
  await migrationhelper.migrate()
  console.log(`Example app listening on port ${port}`)
 })        
    
    