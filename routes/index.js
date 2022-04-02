var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll(); // cria uma promessa
    res.render('index', { title: 'Catalogo de Filmes', docs });
  } catch (err) {
    next(err);
  }
})
//configurando a rota do tipo novo registo
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: {"titulo":"","sinopse":"","duracao":""
                      ,"dataLancamento":"","imagem":"","categorias":""}, action: '/new' });
});

//configurando a rota para salvar o novo registo
router.post('/new', async (req, res, next) => {
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = parseInt(req.body.duracao);
  const dataLancamento = req.body.dataLancamento
  const imagem = req.body.imagem
  const categorias = req.body.categorias
 
  try {
    const result = await global.db.insert({ titulo, sinopse, duracao, dataLancamento, imagem, categorias });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})
//rota de acesso a edição do registro
router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
 
  try {
    const doc = await global.db.findOne(id);
    res.render('new', { title: 'Edição de Catalogo', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const duracao = parseInt(req.body.duracao);
  const dataLancamento = req.body.dataLancamento;
  const imagem = req.body.imagem;
  const categorias = req.body.categorias;

  try {
    const result = await global.db.update(id, { titulo, sinopse, duracao, dataLancamento, imagem, categorias });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
 
  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;