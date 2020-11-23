const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

app.engine('html', handlebars());
app.set('view engine', 'html');
app.set('views', './pages');
app.locals.layout = false;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
