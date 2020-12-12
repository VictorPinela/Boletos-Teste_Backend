const primValidacao = require('./Validacao');
const codBarra = require('./CodigoBarra');

exports.codigoInputConvenio = (codigo) => {
    var info = [];
    if (primValidacao.primValidacao(codigo)) {
        info = codBarra.codBarra(codigo);
        return info;
    } else {
        info.push({ "Linha digitada": "Invalida" });
        return info;
    };
};