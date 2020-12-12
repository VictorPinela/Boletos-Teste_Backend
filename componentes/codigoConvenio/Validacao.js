//  Realiza validação da linha digitada

//  Função principal
exports.codigoValidacao = (codigo) => {

  //  Recolhe o digito que ira informar se sera utilizado o modulo 10 ou 11
  var dv = codigo[2];

  //  Separa as tres partes da linha digitada que possuem o digito verificador
  if (Valida1(codigo, dv) &&
    Valida2(codigo, dv) &&
    Valida3(codigo, dv) &&
    Valida4(codigo, dv)) {

    //  Caso as tres linhas sejam validas retorna o valor true
    return true;
  } else {

    //  Caso alguma das linhas seja invalida retorna o valor false
    return false;
  };
};

//  Realiza avalidação da primeira parte da linha digitada
function Valida1(cod, dv) {

  //  Receber o digito veirficador da primeira parte da linha
  var chave = cod[11];

  //  Declaração de variaveis para realização do codigo
  var aux, i, cont = 0, mult = 2, val;

  //  Caso o digito seja 6 ou 7 sera utilizado o modulo 10
  if (dv == 6 || dv == 7) {

    //  Recebe os valores da linha qeu serão multiplicados por 2, da direita para a esquerda, pulando um digito
    for (i = 10; i >= 0; i -= 2) {

      //  Multiplicando o digito recebido pelo respectivo multiplicador
      aux = cod[i] * 2;

      //  Verificando se o resultado possui dois digito
      if (aux >= 10) {

        /*  No caso de haver dois digitos eles devem ser somados individualmente, o caso mais formal para isso seria 
        usar aux / 10 para obter a dezena e aux % 10 para a unidade, porem como a maior multiplicação possivel 
        é 9 * 2 = 18 significa que se houver uma dezena ela sempre sera o digito 1, neste caso tudo o que é 
        presciso fazer é subtrair 10 para obter a unidade, assim (aux/10)+(aux%10) nesse casó é igual á aux - 9*/
        aux = aux - 9;
      }

      //  Somando o numero obtido a contagem
      cont += aux;
    }

    //  Recebe os valores da linha qeu serão multiplicados por 1, da direita para a esquerda, pulando um digito
    for (i = 9; i >= 0; i -= 2) {

      //  Transforma a string do valor recebido em inteiro e adiciona a contagem
      cont += parseInt(cod[i]);
    }

    //  Calcula o resto da divisão por 10 da contagem
    val = cont % 10;

    //  Caso o resto seja igual a 0 retorna com o valor 10 para que a diante, na subtração por 10, seja igual a 0
    if (val == 0) {
      val = 10;
    }

    //  Realiza a subtração por 10 e verifica se o valor obtido é igual a chave
    if (10 - val == chave) {
      //  Caso seja igual retorna o valor true
      return true;
    } else {

      //  Caso não seja igual retorna o valor false
      return false;
    }
  }

  //  Caso o digito seja 6 ou 7 sera utilizado o modulo 11
  if (dv == 8 || dv == 9) {

    //  Passa por cada digito do codigo da direita para a esquerda 
    for (i = 10; i >= 0; i--) {

      //  Realiza a multiplicação de a cordo com a posição no codigo e incrementa na contagem
      cont += cod[i] * mult;

      //  Incrementa o multiplicador
      mult++

      //  Verifica se o multiplicador chagou a 10
      if (mult == 10) {

        //  Retorna o multiplicado ao primeiro valor que é 2
        mult = 2;
      }
    }

    //  Calcula o resto da divisão por 11
    aux = cont % 11;

    //  Verifica se o resto da divisão é 0 ou 1
    if (aux == 1 || aux == 0) {

      //  Caso seja, recebe o valor 0
      val = 0;
    } else {

      //  Verifica se o resto da divisão é 10
      if (aux == 10) {

        //  Caso seja, recebe o valor 1
        val = 1;
      } else {

        //  Caso o resto não seja 0, 1 ou 10, retorna a subtração de 11 pelo resto 
        val = 11 - aux;
      }
    };
  }

  //  Verifica se o valor obtido é igual a chave
  if (val == chave) {

    //  Caso seja igual retorna o valor true
    return true;
  } else {

    //  Caso não seja igual retorna o valor false
    return false;
  }
};

//  Realiza a validação da mesma forma que a função valida1 porem para a segunda parte da linha digitada
function Valida2(cod, dv) {
  var chave = cod[23];
  var aux, i, cont = 0, mod = 0, mult = 2, val;
  if (dv == 6 || dv == 7) {
    for (i = 22; i >= 12; i -= 2) {
      aux = cod[i] * 2;
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 21; i >= 12; i -= 2) {
      cont += cod[i] * 1;
    }
    val = cont % 10;
    if (val == 0) {
      val = 10;
    }

    if (10 - val == chave) {
      return true;
    } else {
      return false;
    }
  }
  if (dv == 8 || dv == 9) {
    for (i = 22; i >= 12; i--) {
      cont += cod[i] * mult;
      mult++
      if (mult == 10) {
        mult = 2;
      }
    }
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
};

//  Realiza a validação da mesma forma que a função valida1 porem para a terceira parte da linha digitada
function Valida3(cod, dv) {
  var chave = cod[35];
  var aux, i, cont = 0, mod = 0, mult = 2, val;
  if (dv == 6 || dv == 7) {
    for (i = 34; i >= 24; i -= 2) {
      aux = cod[i] * 2;
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 33; i >= 24; i -= 2) {
      cont += cod[i] * 1;
    }
    val = cont % 10;
    if (val == 0) {
      val = 10;
    }

    if (10 - val == chave) {
      return true;
    } else {
      return false;
    }
  }
  if (dv == 8 || dv == 9) {
    for (i = 34; i >= 24; i--) {
      cont += cod[i] * mult;
      mult++
      if (mult == 10) {
        mult = 2;
      }
    }
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
};

//  Realiza a validação da mesma forma que a função valida1 porem para a quarta parte da linha digitada
function Valida4(cod, dv) {
  var chave = cod[47];
  var aux, i, cont = 0, mod = 0, mult = 2, val;
  if (dv == 6 || dv == 7) {
    for (i = 46; i >= 36; i -= 2) {
      aux = cod[i] * 2;
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 45; i >= 36; i -= 2) {
      cont += cod[i] * 1;
    }
    val = cont % 10;
    if (val == 0) {
      val = 10;
    }

    if (10 - val == chave) {
      return true;
    } else {
      return false;
    }
  }
  if (dv == 8 || dv == 9) {
    for (i = 46; i >= 36; i--) {
      cont += cod[i] * mult;
      mult++
      if (mult == 10) {
        mult = 2;
      }
    }
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
};
