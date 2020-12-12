const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const codigoInputTitulo = require('./componentes/codigoTitulo/CodigoInput');
const codigoInputConvenio = require('./componentes/codigoConvenio/CodigoInput');

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
  if (codFormatado.length == 47) {
    var aux = codigoInputTitulo.codigoInputTitulo(codFormatado);
    info.push(aux);
    return res.json({ codigo });
  } else {
    if (codFormatado.length == 48) {
      var aux = codigoInputConvenio.codigoInputConvenio(codFormatado);
      info.push(aux);
      return res.json({ codigo });
    } else {
      return res.json({ "Linha digitada": "Invalida" });;
    }
  };
});

app.listen(8080, () => console.log('API iniciada em http://localhost:8080'));


