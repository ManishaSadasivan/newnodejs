import client from "./index.js";
import express from 'express';

const router= express.Router();

function getmovies() {
    app.get('/movies', async function (request, response) {
        //  response.send(moviedetails)
        const movielist = await client.db('movies').collection('moviedetails').find().toArray();
        console.log(movielist);
        response.send(movielist);
    });
}


export default {getmovies};