const express = require('express');
const handlebars = require('express-handlebars');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.engine('html', handlebars());
app.set('view engine', 'html');
app.set('views', './pages');

app.use(express.static('static'));
app.locals.layout = false;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/pokemon/:id', async (req, res) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`;
  const response = await fetch(url);
  const pokemon = await response.json();

  res.render('pokemon', {
    pokemon,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
