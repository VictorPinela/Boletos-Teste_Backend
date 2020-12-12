//  Imprtoando o framework express
const express = require('express');

//  Recebe o caminho para ad funções que serão utilizadas
const codigoInputTitulo = require('./componentes/codigoTitulo/CodigoInput');
const codigoInputConvenio = require('./componentes/codigoConvenio/CodigoInput');

//  Instanciado a aplicação
const app = express();

//  Cuidando para que os dados que estão entrando são do tipo json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//  Variavel que ira agir como um banco de dados locas
const info = [];

//  Montando o metodo get que ira retornar os dados 
app.get('/', (req, res) => {

  //  Retirando os dados do "bando de dados" para que não haja conflitos futuros
  var boleto = info.pop();

  //  Enviando os dados no formato json
  return res.json({ boleto });
});


//  Montando o metodo post que ira receber os dados
app.post('/', (req, res) => {

  /*  Criando uma variavel que ira receber a linha digitada como uma string para que possa ser trabalhada digito
      por digito*/
  var codigo = new String;

  //  Recebendo o valor do codigo da linha digitada no body 
  codigo = req.body.codigo;

  //  Separando os digitos para serem trabalhados individualmente
  var codFormatado = codigo.split("");

  //  Verificando se houve falhas ao receber o codigo
  if (!codigo) {

    //  Caso haja falha retornar o erro com status 500 e mensagem de falha
    return res.status(500).send({ message: 'Falha ao ler codigo' });
  };
  //  Caso não haja falhas proceguir com o codigo

  //  Verificando se o tamanho do codigo é de 47 digitos, pois assim o codigo sera do formato Titulo
  if (codFormatado.length == 47) {

    /*  Caso seja do formato Titulo enviar a linha digitada para que seja trabalhada no arquivo codigoInput
        da pasta codigoTitulo e colocar o retorno das informações no "banco de dados" */
    info.push(codigoInputTitulo.codigoInputTitulo(codFormatado));

    //  Apresentar o retorno da aplicação com a linha digitada
    return res.json({ codigo });

  } else {

    //  Verificando se o tamanho do codigo é de 48 digitos, pois assim o codigo sera do formato Convenio
    if (codFormatado.length == 48) {

      /*  Caso seja do formato Convenio enviar a linha digitada para que seja trabalhada no arquivo codigoInput
        da pasta codigoConvenio e colocar o retorno das informações no "banco de dados" */
      info.push(codigoInputConvenio.codigoInputConvenio(codFormatado));

      //  Apresentar o retorno da aplicação com a linha digitada
      return res.json({ codigo });

    } else {

      //  Caso a linha digitada não seja de nenhum dos dois tamanhos retornar erro
      return res.json({ "Linha digitada": "Tamanho invalido" });;
    }
  };
});

//  Iniciando o aplicativo na porta 8080
app.listen(8080, () => console.log('API iniciada em http://localhost:8080'));


