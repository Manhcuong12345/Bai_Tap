//Viet ham ket noi
const mongoose = require('mongoose');
async function connect(){
   try{
    await mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log('Connect successfully')
   }catch(e){
    console.log('Connect fail!!!')
   }
}

module.exports = {connect}
