const Codigo = require('../app')

// list
exports.listBoletos = (req, res) => {
    try {
        const data = res.json({ Codigo });
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao carregar o codigo do boleto.' });
    }
};

// create
exports.createBoleto = (req, res) => {
    try {
        const Codigo = req.body.codigo

        console.log(Codigo)

        res.status(201).send({ message: 'Boleto cadastrada com sucesso!' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar a boleto.' });
    }
};