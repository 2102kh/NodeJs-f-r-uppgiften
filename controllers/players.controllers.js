const { Player } = require('../models')
const playersService = require('../services/players.service')

const playersController = {
        async getAll(req,res){
            const players = await playersService.getAll();
            const result = players.map(p=>({
                id: p.id,
                name: p.name,
                jersey: p.jersey,
                position: p.position,
                team: p.team
               
            })) 
            res.json(players) 
        },
        async delete(req,res){
            const playerId = Number(req.params.id);
            console.log(typeof playerId)
            const playersList = await playersService.getAll();
            const findedIndexPlayer = await playersList.findIndex(player=>player.id === playerId)
            if(findedIndexPlayer !== -1){
                playersList.splice(findedIndexPlayer,1)
               //ska lägga i service följande 
                await Player.destroy({
                  where: {
                    id: playerId
                  }
                  });
                res.send(`Player med id:${playerId} raderad`)
            }else{
                res.status(404).send(`Player med id:${playerId}Finns inte`)
            }

        },
        async post(req,res){

          const {name,jersey,position,team} = req.body
          try {
              const user = await Player.create({name,jersey,position,team})
          
              return res.json(user)
            } catch (err) {
              console.log(err)
              return res.status(500).json(err)
            }
            
          },
        async put(req,res){
          const playerId = req.params.playerId
          const {name,jersey,position,team} = req.body
         
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
         
        }
             
        
 }



module.exports = playersController;
