import express from 'express';
import {getmovies,getmoviesbyid,editMovie} from './helper.js';
const router=express.Router();
router.get('/',async function (request, response) {
    //  response.send(moviedetails)
    const movielist=  await getmovies();
    console.log(movielist);
    response.send(movielist);
})
router.get('/:id',async function (request, response) {
    const {id}=request.params;
    // const movie=moviedetails.filter((data)=>data.id===id
    // const movie=moviedetails.find((data)=>data.id===id

    const movie = await getmoviesbyid(id);
    console.log(movie);
    movie ? response.send(movie) : response.status(404).send("No Such Movie Found");
})

router.put('/editmovie/:id',async function(request, response) {
    const {id}=request.params;
    const editedMovie=request.body;
    const result=  await editMovie(id, editedMovie);
response.send(result);
console.log(result);
})
 export const MovieRouter = router;

