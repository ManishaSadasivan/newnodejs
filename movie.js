import express from 'express';
import {getmovies,getmoviesbyid} from './helper.js';
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
 export const MovieRouter = router;

