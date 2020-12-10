const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const codigoInput = require('./componentes/CodigoInput');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const info = [];

app.get('/', (req, res) => {
  var boleto = info.pop();
  return res.json({ boleto });
});

app.post('/', (req, res) => {
  var codigo = new String;
  codigo = req.body.codigo;
  var codFormatado = codigo.split("");

  if (!codigo) {
    return res.status(500).send({ message: 'Falha ao ler codigo' });
  };
  var aux = codigoInput.codigoInput(codFormatado);
  if (aux == 0) {
    return res.status(500).send({ message: 'Codigo invalido' });
  } else {
    info.push(aux);
    return res.json({ codigo });
  };
});

app.listen(8080, () => console.log('Express started at http://localhost:8080'));


