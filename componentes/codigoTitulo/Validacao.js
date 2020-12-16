exports.codigoValidacao = (codigo) => {

  if (Valida(codigo, 0, 9) &&
    Valida(codigo, 10, 20) &&
    Valida(codigo,21, 31)) {
    return true;
  } else {
    return false;
  };
};

function Valida(cod, ini, fim) {
  var chave = cod[fim];
  var aux, i, cont = 0, mod = 0;

  for (i = fim - 1; i >= ini; i -= 2) {
    aux = cod[i] * 2;
    if (aux >= 10) {
      aux = aux - 9;
    }
    cont += aux;
  }

  for (i = fim - 2 ; i >= ini; i -= 2) {
    cont += parseInt(cod[i]);
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
