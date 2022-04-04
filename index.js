// const { response } = require('express');
// const express = require('express');

import express from 'express';
import {MongoClient} from 'mongoDB';
import dotenv from "dotenv" ;

import bcrypt from"bcrypt";
import jwt from "jsonwebtoken";
import {getmoviesbyid,getmovies,addnewmovie,deletemovie,editMovie} from './helper.js'
import {MovieRouter} from './movie.js';
const app = express();
// dotenv.config();
// dotenv.config()
// console.log(process.env);
// const mongoURL="mongodb://localhost";
const mongoURL="mongodb+srv://Movies:BRUno@cluster0.x7ulm.mongodb.net" ;
async function createConnection(){

 const client=new MongoClient(mongoURL);
await client.connect();
console.log("mongo connection established");
return client;
}

 export const client= await createConnection();
app.use(express.json());

// const Port=4000;
const Port = process.env.PORT;

// const moviedetails=[{"id":"100","name":"Iron man 2","poster":"https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg","rating":7,"summary":"With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.","trailer":"https://www.youtube.com/embed/wKtcmiifycU"},{"id":"101","name":"No Country for Old Men","poster":"https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg","rating":8.1,"summary":"A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.","trailer":"https://www.youtube.com/embed/38A__WT3-o0"},{"id":"102","name":"Jai Bhim","poster":"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg","summary":"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case","rating":8.8,"trailer":"https://www.youtube.com/embed/nnXpbTFrqXA"},{"id":"103","name":"The Avengers","rating":8,"summary":"Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.","poster":"https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg","trailer":"https://www.youtube.com/embed/eOrNdBpGMv8"},{"id":"104","name":"Interstellar","poster":"https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg","rating":8.6,"summary":"When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.","trailer":"https://www.youtube.com/embed/zSWdZVtXT7E"},{"id":"105","name":"Baahubali","poster":"https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg","rating":8,"summary":"In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.","trailer":"https://www.youtube.com/embed/sOEg_YZQsTI"},{"id":"106","name":"Ratatouille","poster":"https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=","rating":8,"summary":"Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.","trailer":"https://www.youtube.com/embed/NgsQ8mVkN8w"}]

app.get('/', function (request, response) {
    response.send("hello world !!!!")
}
)

// app.get('/movies',async function (request, response) {
//     //  response.send(moviedetails)
//     const movielist=  await getmovies();
//     console.log(movielist);
//     response.send(movielist);
// })
//moving movie related api to movie.js under routes



// app.get('/movies/:id',async function (request, response) {
//     const {id}=request.params;
//     // const movie=moviedetails.filter((data)=>data.id===id
//     // const movie=moviedetails.find((data)=>data.id===id

//     const movie = await getmoviesbyid(id);
//     console.log(movie);
//     movie ? response.send(movie) : response.status(404).send("No Such Movie Found");
     
   
// }


// )

app.post('/addmovie',async function (request, response) {
    //    db.movies.insertMany(newmovie)
   const newmovie=request.body;
   console.log(newmovie);
const Addedmovie= await addnewmovie(newmovie);
console.log(Addedmovie);
response.send(Addedmovie);
})

//**moving edit movie part into movie,js router  */

// app.put('/editmovie/:id',async function(request, response) {
//     const {id}=request.params;
//     const editedMovie=request.body;
//     const result=  await editMovie(id, editedMovie);
// response.send(result);
// console.log(result);
// })

app.delete('/movies/:id',async function (request, response) {
    const {id}=request.params;
    // const movie=moviedetails.filter((data)=>data.id===id
    // const movie=moviedetails.find((data)=>data.id===id

    const movie=  await deletemovie(id);
    console.log(movie);
    movie ? response.send(movie): response.status(404).send("No Such Movie to DELETE");
     
   
})

app.use('/movies',MovieRouter)



async function genPassword(password){
    const salt= await bcrypt.genSalt(10);
    const hasedpassword= await bcrypt.hash(password, salt);
    return hasedpassword;
}

   
app.post("/user/signup",async function (request,response){

    const {username,password}=request.body;
console.log(username,password);
const encryptedpassword= await genPassword(password)
        const newuser={
        username:username,
        password:encryptedpassword,
    };
    console.log(encryptedpassword);
  const result=await client.db('movies')
  .collection('user')
  .insertOne(newuser);
response.send(result);
})

app.post("/user/login",async function (request, response){
    const {username,password}=request.body;

    const searchusername= await client.db('movies').collection('user').findOne({username:username});
   console.log(searchusername);
if(!searchusername)
{
    response.send({message:"invalid credentials"})

}
else{
    const searchpassword= searchusername.password;
    console.log("searchedpassword"+password);
    const ispasswordmatched=await bcrypt. compare(password,searchpassword);
    console.log(searchpassword);
    console.log(ispasswordmatched);
    if(ispasswordmatched)
    {
        const token=jwt.sign({id:searchusername._id},'secretkeyy')
        console.log(token)
        response.send({message:"login success",token:token})
    }
    else{
        response.send({message:"invalid credential"})
    }

}
   
})

app.listen(Port,()=>console.log('listening on port 4000'));
//hashing given password
// async function genPassword(password){
// const salt= await bcrypt.genSalt(10);
// console.log(salt);
// const hasedPassword=await bcrypt.hash(password,salt);
// console.log(hasedPassword);
// }
// genPassword("manisha");


export  default client;





