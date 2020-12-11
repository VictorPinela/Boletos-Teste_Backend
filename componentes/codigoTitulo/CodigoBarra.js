exports.codBarra = (cod) => {
  var info = [];
  var barra = orgBarra(cod);
  if (barra != 0) {
    var val = recolheValor(barra);
    var venc = recolheVencimento(barra);
    info.push({ "Codigo de barra": barra });
    info.push({ "Valor": val });
    info.push({ "Vencimento": venc });
    return info;
  } else {
    return 0;
  }
};


function recolheValor(cod) {
  var i, aux = 0, val;
  for (i = 9; i <= 18; i++) {
    aux += cod[i];
  }
  val = parseInt(aux) / 100;
  return (val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
};

function recolheVencimento(cod) {
  var i, aux = 0;
  for (i = 5; i <= 8; i++) {
    aux += cod[i];
  }
  var a = parseInt(aux);
  a -= 1000;
  var data = new Date(2000, 6, 3);
  data.setDate(data.getDate() + a);
  var venc = formataData(data);
  return (venc);
};

function orgBarra(cod) {
  var aux = [];
  var i, segval;
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
  segval = segvalidacao(aux);
  if (segval == 1) {
    return aux;
  } else {
    return 0;
  }
};

function segvalidacao(cod) {
  var chave = cod[4];
  var i, mult = 2, aux = 0;
  for (i = 43; i >= 0; i--) {
    if (i != 4) {
      aux += cod[i] * mult;
      mult++;
      if (mult == 10) {
        mult = 2
      }
    };
  };
  aux = aux % 11;
  aux = 11 - aux;
  if (aux == 0 || aux == 10 || aux == 11) {
    aux = 1;
  };
  if (aux == chave) {
    return 1;
  } else {
    return 0;
  }
};

function formataData(data) {
  var dia = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = (mes.length == 1) ? '0' + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
};
