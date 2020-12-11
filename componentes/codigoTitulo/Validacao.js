exports.primValidacao = (codigo) => {
    var val1 = Valida1(codigo);
    var val2 = Valida2(codigo);
    var val3 = Valida3(codigo);
    if (val1 == 1 && val2 == 1 && val3 == 1) {
      return 1;
    } else {
      return 0;
    };
  };
  
  function Valida1(cod) {
    var chave = cod[9];
    var aux, i, cont = 0, mod = 0;
    for (i = 8; i >= 0; i -= 2) {
      aux = cod[i] * 2;
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 7; i >= 0; i -= 2) {
      aux = cod[i] * 1;
      cont += aux;
    }
    mod = cont % 10;
    if(mod == 0){
      mod = 10;
    }
    if (10 - mod == chave) {
      return 1;
    } else {
      return 0;
    }
  };
  
  function Valida2(cod) {
    var chave = cod[20];
    var aux, i, cont = 0, mod = 0;
    for (i = 19; i >= 10; i -= 2) {
      aux = cod[i] * 2;
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 18; i >= 10; i -= 2) {
      aux = cod[i] * 1;
      cont += aux;
    }
    mod = cont % 10;
    if(mod == 0){
      mod = 10;
    }
    if (10 - mod == chave) {
      return 1;
    } else {
      return 0;
    }
  };
  
  function Valida3(cod) {
    var chave = cod[31];
    var aux, i, cont = 0, mod = 0;
    for (i = 30; i >= 21; i -= 2) {
      aux = cod[i] * 2;
      if (aux >= 10) {
        aux = aux - 10 + 1;
      }
      cont += aux;
    }
    for (i = 29; i >= 21; i -= 2) {
      aux = cod[i] * 1;
      cont += aux;
    }
    mod = cont % 10;
    if(mod == 0){
      mod = 10;
    }
    if (10 - mod == chave) {
      return 1;
    } else {
      return 0;
    }
  };
  