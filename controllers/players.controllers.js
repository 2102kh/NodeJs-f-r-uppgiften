const { Player } = require('../models')
const playersService = require('../services/players.service')

const playersController = {
        async getAll(req,res){
            const players = await playersService.getAll();
            // const result = players.map(p=>({
            //     id: p.id,
            //     name: p.name,
            //     jersey: p.jersey,
            //     position: p.position,
            //     team: p.team
               
            // })) 
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


        }
        
 }



module.exports = playersController;
