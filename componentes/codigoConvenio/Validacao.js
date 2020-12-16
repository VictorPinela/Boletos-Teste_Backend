exports.codigoValidacao = (codigo) => {

  var dv = codigo[2];

  if (Valida(codigo, dv, 0, 11) &&
    Valida(codigo, dv, 12, 23) &&
    Valida(codigo, dv, 24, 35) &&
    Valida(codigo, dv, 36, 47)) {
    return true;
  } else {
    return false;
  };
};

function Valida(cod, dv, ini, fim) {

  var chave = cod[fim];
  var aux, i, cont = 0, mult = 2, val;

  if (dv == 6 || dv == 7) {
    for (i = fim - 1; i >= ini; i -= 2) {
      aux = cod[i] * 2;

      if (aux >= 10) {
        aux = aux - 9;
      }
      cont += aux;
    }

    for (i = fim - 2; i >= ini; i -= 2) {
      cont += parseInt(cod[i]);
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
    for (i = fim - 1; i >= ini; i--) {
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
