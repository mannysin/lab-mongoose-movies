const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie')


mongoose.connect('mongodb://localhost/mongoose-movies', {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});

const celebrities = [
  {
    name : "Lebron James",
    occupation: "Athlete",
    catchPhrase: "Witness",
  },
  {
    name : "Gene Wilder",
    occupation: "Actor",
    catchPhrase: "The snozzberries taste like snozzberries!",
  },
  {
    name : "Frankie Valli",
    occupation: "Singer",
    catchPhrase: "I need you baby",
  },
];

const movies = [
  {
    title : "Willy Wonka and the Chocolate Factory",
    celebrity: "Gene Wilder",
    genre: "Thriller",
    plot: "Little poor boy passes tests to win the Chocolate factory",
  },
  {
    title : "Space Jam 2 ",
    celebrity: "Lebron James",
    genre: "Comedy & Family",
    plot: "Unknown yet",
  },
  {
    title : "Ironhack Massacre",
    celebrity: "Nick Borbe",
    genre: "Horror/Suspense",
    plot: "One man must save the building from a murderer",
  },
];

// Celebrity.create(celebrities)
//   .then((response)=>{
//       console.log(response);
//   })
//   .catch((err)=>{
//     console.log(err);
//   })

Celebrity.find()
.then(theCelebsFromDB => {
  movies.forEach(oneMovie => {
    theCelebsFromDB.forEach(oneCeleb => {
      if(oneMovie.celebrity === oneCeleb.name){
        oneMovie.celebrity = oneCeleb._id
      } else {
        oneMovie.celebrity;
      }
    })
  })
  Movie.create(movies)
   .then((response)=>{
       console.log(response);
   })
   .catch(err => {
     console.log("err with movies ----- ", err);
   })
})
  .catch((err)=>{
    console.log("err with celebs ====== ", err);
  })