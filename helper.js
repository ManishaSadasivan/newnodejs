import client from "./index.js";
import express from 'express';

const router= express.Router();

async function getmoviesbyid(id) {
    return await client.db('movies').collection('moviedetails').findOne({ id: id });
}

async function getmovies() {
    return await client.db('movies').collection('moviedetails').find().toArray();
}

async function addnewmovie(newmovie) {
    return await client.db('movies').collection('moviedetails').insertMany(newmovie);
}

async function deletemovie(id) {
    return await client.db('movies').collection('moviedetails').deleteOne({ id: id });
}

async function editMovie(id, editedMovie) {
    return await client.db('movies')
        .collection('moviedetails')
        .updateOne({ id: id }, { $set: editedMovie });
}
export  {getmoviesbyid,getmovies,addnewmovie,deletemovie,editMovie};