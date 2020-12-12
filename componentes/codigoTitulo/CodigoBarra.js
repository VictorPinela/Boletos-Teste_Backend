//  Obtem o codigo de barra da linha digitada, realiza a verificação do codigo e extrai as informações

//  Função principal
exports.codBarra = (cod) => {

  //  Declaração da variavel que ira receber as informações
  var info = [];

  //  Obtem o codigo de barra da linha digitada
  var barra = orgBarra(cod);

  //  Confere se o codigo de barra foi recebido corretamente
  if (barra != false) {
    //  Caso o codigo de barras seja valido 

    //  Recolhe o valor e a data de vencimento do codigo de barra
    var val = recolheValor(barra);
    var venc = recolheVencimento(barra);

    //  Coloca as informações obtidas na variavel info
    info.push({ "Linha digitada": "Valida" });
    info.push({ "Valor": val });
    info.push({ "Vencimento": venc });
    info.push({ "Codigo de barra": barra });

    //  Retorna a variavel com as informações
    return info;

  } else {
    //  Caso o codigo de barras não seja valido 

    //  Retorna a informação de que a linha não é valida
    info.push({ "Linha digitada": "Invalida" });
    return info;
  };
};

//  Obtem o codigo de barra da linha digitada
function orgBarra(cod) {

  //  Variaveis que serão utilizadas na função
  var aux = [], i;

  //  Recebe o valor da linha digitada e organiza no codigo de barra
  for (i = 0; i < 4; i++) {
    aux[i] = cod[i];
  };
  for (i = 4; i < 9; i++) {
    aux[i + 15] = cod[i];
  };
  for (i = 10; i < 20; i++) {
    aux[i + 14] = cod[i];
  };
  for (i = 21; i < 31; i++) {
    aux[i + 13] = cod[i];
  };
  aux[4] = cod[32];
  for (i = 33; i < 47; i++) {
    aux[i - 28] = cod[i];
  };

  //  Realiza a validação do codigo de barra
  if (barraValidacao(aux)) {

    //  Caso o codigo seja valido retorno o propio codigo
    return aux;
  } else {

    //  Caso o codigo não seja valido retorna o valor falso
    return false;
  };
};


//  Realiza a validação do codigo de barra utilizando o modulo 11
function barraValidacao(cod) {

  //  Recebe o digito verificador
  var chave = cod[4];

  //  Variaveis que serão utilizadas na função
  var i, mult = 2, aux = 0;

  //  Passa por cada digito do codigo da direita para a esquerda  
  for (i = 43; i >= 0; i--) {

    //  Pula a posição do digito verificador
    if (i != 4) {

      //  Realiza a multiplicação de a cordo com a posição no codigo e incrementa na contagem
      aux += cod[i] * mult;

      //  Incrementa o multiplicador
      mult++;

      //  Verifica se o multiplicador chagou a 10
      if (mult == 10) {

        //  Retorna o multiplicado ao primeiro valor que é 2
        mult = 2;
      };
    };
  };

  //  Calcula o resto da divisão por 11
  aux = aux % 11;

  //  Subtrai de 11 o valor do resto da divisão
  aux = 11 - aux;

  //  Verifica se o resultado da subtração é 0, 10 ou 11
  if (aux == 0 || aux == 10 || aux == 11) {

    //  Caso seja, recebe o valor 1
    aux = 1;
  };

  //  Verifica se o resultado obtido é igual a chave recolhida
  if (aux == chave) {

    //  Caso seja, retorna o valor true
    return true;

  } else {

    // Caso não seja, retorna o valor false
    return false;
  }
};

//  Recolhe o valor do codigo de barra
function recolheValor(cod) {

  //  Variaveis que serão utilizadas na função
  var i, aux = 0, val;

  //  Recolhe do codigo a informação do valor
  for (i = 9; i <= 18; i++) {
    aux += cod[i];
  }

  //  Trasnforma a strig dos valor em inteiro com duas casas decimais
  val = parseInt(aux) / 100;

  //  Formata o valor recebido e o retorna
  return (val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
};

//  Recolhe o vencimento do codigo de barra
function recolheVencimento(cod) {

  //  Variaveis que serão utilizadas na função
  var i, aux = 0, dias, venc;

  // Obtem do codigo de barras a informação dos dias passados da data padrão
  for (i = 5; i <= 8; i++) {
    aux += cod[i];
  }

  //  Transforma a string dos dias em inteiro e subtrai 1000 pois a contagem começa apartir dai 
  dias = parseInt(aux) - 1000;

  //  Cria uma variavel da data padrão - 03/07/2000
  var data = new Date(2000, 6, 3);

  //  Soma os dias passados dessa data padrão
  data.setDate(data.getDate() + dias);

  //  Formada a data a ser apresentada
  venc = formataData(data);

  //  Retorna a data de vencimento
  return (venc);
};

//  Formata o a data do vencimento
function formataData(data) {

  //  Recolhe o valor do dia
  var dia = data.getDate().toString();
  //  Caso o dia só possua um digito acrescenta um 0 na frente
  var diaF = (dia.length == 1) ? '0' + dia : dia;
  // Recolhe o valor do mes e acrescenta 1 pois a contagem dos meses começa em 0 = janeiro
  var mes = (data.getMonth() + 1).toString();
  //  Caso o mes só possua um digito acrescenta um 0 na frente
  var mesF = (mes.length == 1) ? '0' + mes : mes;
  //  Recolhe o valor do ano
  var anoF = data.getFullYear();
  //  Retorna a data no formato DD/MM/AAAA
  return diaF + "/" + mesF + "/" + anoF;
};
