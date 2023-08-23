//const { senha } = require("./bancodedados.js")

const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query

    if (!senha_banco) {
        return res.status(400).json({ mensagem: "A senha do banco não foi informada" })
    }

    if ('Cubos123Bank' != senha_banco) {
        return res.status(403).json({ mensagem: "A senha está incorreta" })
    }

    next()
}

module.exports = {
    validarSenha
}