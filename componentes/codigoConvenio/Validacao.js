exports.primValidacao = (codigo) => {
  var dv = codigo[2];
  if (Valida1(codigo, dv) &&
    Valida2(codigo, dv) &&
    Valida3(codigo, dv) &&
    Valida4(codigo, dv)) {
    return true;
  } else {
    return false;
  };
};

function Valida1(cod, dv) {
  var chave = cod[11];
  var aux, i, cont = 0, mult = 2, val;
  if (dv == 6 || dv == 7) {
    for (i = 10; i >= 0; i -= 2) {
      aux = cod[i] * 2;
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 9; i >= 0; i -= 2) {
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
    for (i = 10; i >= 0; i--) {
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
