const codigoValidacao = require('./Validacao');
const codBarra = require('./CodigoBarra');

exports.codigoInputTitulo = (codigo) => {

    var info = [];

    if (codigoValidacao.codigoValidacao(codigo)) {
        info = codBarra.codBarra(codigo);
        return info;
    } else {
        info.push({ "Linha digitada": "Invalida" });
        return info;
    };
};