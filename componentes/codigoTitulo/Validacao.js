//  Realiza validação da linha digitada

//  Função principal
exports.codigoValidacao = (codigo) => {

//  Separa as tres partes da linha digitada que possuem o digito verificador
  if (Valida1(codigo) &&
    Valida2(codigo) &&
    Valida3(codigo)) {

      //  Caso as tres linhas sejam validas retorna o valor true
    return true;
  } else {

    //  Caso alguma das linhas seja invalida retorna o valor false
    return false;
  };
};

//  Realiza avalidação da primeira parte da linha digitada utilizando o modulo 10
function Valida1(cod) {

  //  Receber o digito veirficador da primeira parte da linha
  var chave = cod[9];

  //  Declaração de variaveis para realização do codigo
  var aux, i, cont = 0, mod = 0;

  //  Recebe os valores da linha qeu serão multiplicados por 2, da direita para a esquerda, pulando um digito
  for (i = 8; i >= 0; i -= 2) {

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
  for (i = 7; i >= 0; i -= 2) {

    //  Transforma a string do valor recebido em inteiro e adiciona a contagem
    cont += parseInt(cod[i]);
  }

  //  Calcula o resto da divisão por 10 da contagem
  mod = cont % 10;

  //  Caso o resto seja igual a 0 retorna com o valor 10 para que a diante, na subtração por 10, seja igual a 0
  if (mod == 0) {
    mod = 10;
  }

  //  Realiza a subtração por 10 e verifica se o valor obtido é igual a chave
  if (10 - mod == chave) {

    //  Caso seja igual retorna o valor true
    return true;
  } else {

    //  Caso não seja igual retorna o valor false
    return false;
  }
};

//  Realiza a validação da mesma forma que a função valida1 porem para a segunda parte da linha digitada
function Valida2(cod) {
  var chave = cod[20];
  var aux, i, cont = 0, mod = 0;
  for (i = 19; i >= 10; i -= 2) {
    aux = cod[i] * 2;
    if (aux >= 10) {
      aux = aux - 9;
    }
    cont += aux;
  }
  for (i = 18; i >= 10; i -= 2) {
    cont += cod[i] * 1;
  }
  mod = cont % 10;
  if (mod == 0) {
    mod = 10;
  }
  if (10 - mod == chave) {
    return true;
  } else {
    return false;
  }
};


//  Realiza a validação da mesma forma que a função valida1 porem para a terceira parte da linha digitada
function Valida3(cod) {
  var chave = cod[31];
  var aux, i, cont = 0, mod = 0;
  for (i = 30; i >= 21; i -= 2) {
    aux = cod[i] * 2;
    if (aux >= 10) {
      aux = aux - 9;
    }
    cont += aux;
  }
  for (i = 29; i >= 21; i -= 2) {
    cont += cod[i] * 1;
  }
  mod = cont % 10;
  if (mod == 0) {
    mod = 10;
  }
  if (10 - mod == chave) {
    return true;
  } else {
    return false;
  }
};
