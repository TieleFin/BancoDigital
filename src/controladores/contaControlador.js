let { contas, identificadorConta, saques, depositos, transferencias } = require("../bancodedados")

const listarContas = (req, res) => {
    return res.status(200).json(contas)
}

const criarConta = (req, res) => {
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const usuarios = contas.map(usuarioEncontrado => usuarioEncontrado.usuario)

    const cpfExistente = usuarios.find((cpfExistente) => {
        return cpfExistente.cpf === cpf
    })

    if (cpfExistente) {
        return res.status(400).json({ mensagem: "O CPF informado já possui uma conta" })
    }

    const emailExistente = usuarios.find((emailExistente) => {
        return emailExistente.email === email
    })

    if (emailExistente) {
        return res.status(400).json({ mensagem: "O email informado já está cadastrado em outra conta" })
    }

    if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório" })
    }

    if (!cpf) {
        return res.status(400).json({ mensagem: "O campo cpf é obrigatório" })
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: "O campo data_nascimento é obrigatório" })
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: "O campo telefone é obrigatório" })
    }

    if (!email) {
        return res.status(400).json({ mensagem: "O campo email é obrigatório" })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "O campo senha é obrigatório" })
    }

    const conta = {
        idConta: identificadorConta++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(conta)

    return res.status(201).json({ mensagem: "Conta criada com sucesso" })
}

const atualizarConta = (req, res) => {
    let { idConta } = req.params
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome) {
        return res.status(400).json({ mensagem: "O campo nome é obrigatório" })
    }

    if (!cpf) {
        return res.status(400).json({ mensagem: "O campo cpf é obrigatório" })
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: "O campo data_nascimento é obrigatório" })
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: "O campo telefone é obrigatório" })
    }

    if (!email) {
        return res.status(400).json({ mensagem: "O campo email é obrigatório" })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "O campo senha é obrigatório" })
    }

    const contaCliente = contas.find((conta) => {
        return conta.idConta === Number(idConta)
    })

    if (!contaCliente) {
        return res.status(404).json({ mensagem: "Conta não encontrada" })
    }

    const usuarios = contas.map(usuarioEncontrado => usuarioEncontrado.usuario)

    const indiceConta = contas.findIndex(id => id.idConta === Number(idConta))

    const indiceContaBuscaCpf = usuarios.findIndex(buscaCpf => buscaCpf.cpf === cpf)

    if (indiceConta === indiceContaBuscaCpf) {
    }

    if (indiceContaBuscaCpf === -1) {
    }

    if (indiceConta !== indiceContaBuscaCpf && indiceContaBuscaCpf !== -1) {
        return res.status(400).json({ mensagem: "O CPF informado já possui uma conta" })
    }

    const indiceContaBuscaEmail = usuarios.findIndex(buscaEmail => buscaEmail.email === email)

    if (indiceConta === indiceContaBuscaEmail) {
    }

    if (indiceContaBuscaEmail === -1) {
    }

    if (indiceConta !== indiceContaBuscaEmail && indiceContaBuscaEmail !== -1) {
        return res.status(400).json({ mensagem: "O email informado está cadastrado em outra conta" })
    }

    let usuarioAtualizado = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }

    contas[indiceConta].usuario = usuarioAtualizado

    return res.status(200).json({ mensagem: "Conta atualizada" })
}

const deletarConta = (req, res) => {
    let { idConta } = req.params

    const conta = contas.find((conta) => {
        return conta.idConta === Number(idConta)
    })

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada" })
    }

    contas = contas.filter((conta) => {
        return conta.idConta !== Number(idConta)
    })
    return res.status(200).json({ mensagem: "Conta deletada com sucesso" })
}

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta) {
        return res.status(404).json({ mensagem: "O campo número da conta é obrigatório" })
    }

    if (!senha) {
        return res.status(404).json({ mensagem: "O campo senha é obrigatório" })
    }

    const contaCliente = contas.find((conta) => {
        return conta.idConta === Number(numero_conta)
    })

    if (!contaCliente) {
        return res.status(404).json({ mensagem: "Conta não encontrada" })
    }

    const indiceConta = contas.findIndex(id => id.idConta === Number(numero_conta))
    const senhaUsuario = contas[indiceConta].usuario.senha

    if (Number(senha) !== senhaUsuario) {
        return res.status(404).json({ mensagem: "A senha está incorreta" })
    }

    let saldo = contas[indiceConta].saldo

    return res.status(200).json({ saldo: saldo })
}

const consultarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta) {
        return res.status(404).json({ mensagem: "O campo número da conta é obrigatório" })
    }

    if (!senha) {
        return res.status(404).json({ mensagem: "O campo senha é obrigatório" })
    }

    const contaCliente = contas.find((conta) => {
        return conta.idConta === Number(numero_conta)
    })

    if (!contaCliente) {
        return res.status(404).json({ mensagem: "Conta não encontrada" })
    }

    const indiceConta = contas.findIndex(id => id.idConta === Number(numero_conta))
    const senhaUsuario = contas[indiceConta].usuario.senha

    if (Number(senha) !== senhaUsuario) {
        return res.status(404).json({ mensagem: "A senha está incorreta" })
    }

    const saldo = contas[indiceConta].saldo


    let registroDeposito = depositos.filter((conta) => {
        return conta.numero_conta === Number(numero_conta)
    })

    let registroSaque = saques.filter((conta) => {
        return conta.numero_conta === Number(numero_conta)
    })


    let registroTransferenciasEnviadas = transferencias.filter((conta) => {
        return conta.numero_conta_origem === Number(numero_conta)
    })

    let registroTransferenciasRecebidas = transferencias.filter((conta) => {
        return conta.numero_conta_destino === Number(numero_conta)
    })

    let registro = {
        registroDeposito,
        registroSaque,
        registroTransferenciasEnviadas,
        registroTransferenciasRecebidas,
        saldo
    }

    return res.status(200).json(registro)
}

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deletarConta,
    consultarSaldo,
    consultarExtrato
}
