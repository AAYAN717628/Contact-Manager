const mongoose = require('mongoose');

class connectionModuler{

static async createMongooseConnection(url =""){
if(!url) throw new Error('You have to pass mongoose connection url')
try {
    mongoose.connect(url).then(success => console.log('Connection Has Been Established With Mongoose'))
} catch (err){
    console.warn('Something went wrong at Backend Side !')
}
}


}

module.exports = connectionModuler;