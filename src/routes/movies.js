const express = require('express');
const readJsonData = require('../utils/fs/readJsonData');
const writeJsonData = require('../utils/fs/writeJsonData');

const movies = '../../movies.json';

const route = express.Router();

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readFile = await readJsonData(movies);
  const filterById = readFile.find((element) => element.id === Number(id));
  if (!filterById) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  return res.status(200).json(filterById);
});

route.get('/', async (req, res) => {
  const readFile = await readJsonData(movies);
  return res.status(200).json(readFile);
});

route.post('/', async (req, res) => {
  const { body } = req;
  const readFile = await readJsonData(movies);
  const newMovie = await writeJsonData(movies, 
    [...readFile, { id: readFile[readFile.length - 1].id + 1, ...body }]);
    if (newMovie.movie !== body.movie) {
      return res.status(404).json({ message: 'Erro ao Cadastrar' });
    }
  return res.status(201).json(newMovie);
});

route.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const readFile = await readJsonData(movies);
  const finded = readFile.find((movie) => movie.id === Number(id));
  if (!finded) {
    return res.status(404).json({ message: 'Filme não encontrado' });
  }
  const upDate = readFile.map((movie) => (
    movie.id === Number(id) ? { id: movie.id, ...body } : movie));
  await writeJsonData(movies, upDate);
  return res.status(200).json({ id: Number(id), ...body });
});

route.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const readFile = await readJsonData(movies);
  const deletedArr = readFile.filter((movie) => movie.id !== Number(id));
  await writeJsonData(movies, deletedArr);
  return res.status(200).json({ message: 'Filme deletado com sucesso' });
});

module.exports = route;