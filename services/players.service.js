const { Player } = require('../models');


const playersService = {
    //hämtar lista av players
   async getAll(){
     const players = await Player.findAll() 
     return players; 
    }

}





module.exports = playersService;