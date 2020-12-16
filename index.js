const express = require('express');
const codigoInputTitulo = require('./componentes/codigoTitulo/CodigoInput');
const codigoInputConvenio = require('./componentes/codigoConvenio/CodigoInput');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const info = [];

app.post('/', (req, res) => {
  
  var codigo = new String;
  codigo = req.body.codigo;
  var codFormatado = codigo.split("");

  if (!codigo) {
    return res.status(500).send({ message: 'Falha ao ler codigo' })
  };

  if (codFormatado.length == 47) {
    info.push(codigoInputTitulo.codigoInputTitulo(codFormatado));
    var a = info.pop();
    return res.json({ a });

  } else {

    if (codFormatado.length == 48) {
      info.push(codigoInputConvenio.codigoInputConvenio(codFormatado));
      var a = info.pop();
      return res.json({ a });
    } else {

      return res.json({ "Linha digitada": "Tamanho invalido" });;
    }
  };
});

app.listen(8080, () => console.log('API iniciada em http://localhost:8080'));