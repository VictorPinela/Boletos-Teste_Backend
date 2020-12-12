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
  }
};

//  Obtem o codigo de barra da linha digitada
function orgBarra(cod) {

  //  Variaveis que serão utilizadas na função
  var aux = [], i;

  //  Recebe o valor da linha digitada e organiza no codigo de barra
  for (i = 0; i < 11; i++) {
    aux[i] = cod[i];
  };
  for (i = 12; i < 23; i++) {
    aux[i - 1] = cod[i];
  };
  for (i = 24; i < 35; i++) {
    aux[i - 2] = cod[i];
  };
  for (i = 36; i < 47; i++) {
    aux[i - 3] = cod[i];
  };

  //  Realiza a validação do codigo de barra
  if (barraValidacao(aux)) {

    //  Caso o codigo seja valido retorno o propio codigo
    return aux;
  } else {

    //  Caso o codigo não seja valido retorna o valor falso
    return false;
  }
};

/*  Realiza a validação do codigo de barra da mesma forma qua a valida1 do arquivo Validacão porem 
    para o codigo todo*/
function barraValidacao(cod) {
  var dv = cod[2]
  var chave = cod[3];
  var i, mult = 2, aux = 0, cont = 0, val;
  if (dv == 6 || dv == 7) {
    for (i = 43; i >= 4; i -= 2) {
      aux = cod[i] * 2
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 2; i >= 0; i -= 2) {
      aux = cod[i] * 2
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 42; i >= 4; i -= 2) {
      cont += cod[i] * 1;
    }
    cont += cod[1] * 1;
    val = cont % 10;
    if (val == 0) {
      val = 10;
    }
    if (10 - val == chave) {
      return true;
    } else {
      return false;
    }
  } else {
    if (dv == 8 || dv == 9) {
      for (i = 43; i >= 0; i--) {
        if (i != 3) {
          cont += cod[i] * mult;
          mult++;
          if (mult == 10) {
            mult = 2
          }
        };
      };
      aux = cont % 11;
      if (aux == 1 || aux == 0) {
        val = 0;
      } else {
        if (aux == 10) {
          val = 1;
        } else {
          val = 11 - aux;
        }
      };
    }
    if (val == chave) {
      return true;
    } else {
      return false;
    }
  }
};

//  Recolhe o valor do codigo de barra
function recolheValor(cod) {

  //  Variaveis que serão utilizadas na função
  var i, aux = 0, val, dv = cod[2];

  //  Recolhe do codigo a informação do valor
  for (i = 4; i <= 14; i++) {
    aux += cod[i];
  }

  //  Caso o digito seja 6 ou 8 o valor é efetivo
  if (dv == 6 || dv == 8) {

    //  Trasnforma a strig dos valor em inteiro com duas casas decimais
    val = parseInt(aux) / 100;

    //  Formata o valor recebido e o retorna
    return (val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  }

  //  Caso o digito seja 7 ou 9 o valor é relativo
  if (dv == 7 || dv == 9) {

    //  retorna o codigo referente ao valor informando que o valor é relativo 
    return ({ "Valor referencia": aux });
  }
};

//  Recolhe o vencimento do codigo de barra
function recolheVencimento(cod) {

  //  Variaveis que serão utilizadas na função
  var i, aux = [], val;

  // Verifica o segmento para a identificação da empresa
  if (cod[1] != 6) {
    //  Caso seja diferente de 6 o campo livre começa no 20° digito do codigo

    // Obtem do codigo de barras a informação dos dias passados da data padrão
    for (i = 19; i <= 26; i++) {
      aux[i - 19] = cod[i];
    }

  } else {
    //  Caso seja 6 o campo livre começa no 23° digito do codigo

    // Obtem do codigo de barras a informação dos dias passados da data padrão
    for (i = 23; i <= 30; i++) {
      aux[i - 23] = cod[i];
    }
  }

  //  Recebe os valores referentes ao dia, mes e ano
  var a = aux[0] + aux[1] + aux[2] + aux[3];
  var m = aux[4] + aux[5];
  var d = aux[6] + aux[7];

  //  Transforma a string com os valores recebidos em inteiro
  var ano = parseInt(a);
  var mes = parseInt(m);
  var dia = parseInt(d);

  //  Verifica so o valor recebido do ano é um ano valido
  if (ano >= 2000 && ano <= 2030) {

    //  Verifica so o valor recebido do mes é um mes valido
    if (mes >= 1 && mes <= 12) {

      //  Verifica so o valor recebido do dia é um dia valido
      if (dia > 1 && dia <= 31) {
        //  Caso os valores recebidos sejam valido

        //  Retorna valor true
        val = true;

      } else {
        //  Caso valor recebido do dia seja invalido

        //  Retorna valor false
        val = false;
      }
    } else {
      //  Caso valor recebido do mes seja invalido

      //  Retorna valor false
      val = false;
    }
  } else {
    //  Caso valor recebido do ano seja invalido

    //  Retorna valor false
    val = false;
  }

  //  Verifica se a data é valida
  if (val) {
    //  Caso seja uma data valida

    //  Declara uma data com os valores recebidos
    var data = new Date(ano, mes, dia);

    //  Formada a data a ser apresentada
    var venc = formataData(data);

    //  Retorna a data de vencimento
    return (venc);
  } else {
    //  Caso seja uma data invalida

    //  Retorna esta informação
    return ("Não possui");
  };

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
