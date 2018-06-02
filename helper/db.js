const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://movie_db:yunus1234@ds245680.mlab.com:45680/movie-api');

    mongoose.connection.on('open',()=>{
        console.log('MongoDB:Connected');
    });

    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB:Error',err);
    });

    mongoose.Promise=global.Promise;
};