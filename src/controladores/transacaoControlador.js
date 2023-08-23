let { contas, depositos, saques, transferencias } = require("../bancodedados")
const { format } = require("date-fns")

const depositar = (req, res) => {
    let { numero_conta, valor } = req.body

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "O campo numero_conta é obrigatório" })
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "O campo valor é obrigatório" })
    }

    const contaCliente = contas.find((conta) => {
        return conta.idConta === (numero_conta)
    })

    if (!contaCliente) {
        return res.status(404).json({ mensagem: "Conta não encontrada" })
    }

    if (valor === 0) {
        return res.status(404).json({ mensagem: "O valor do depósito não pode estar zerado" })
    }

    if (valor < 0) {
        return res.status(404).json({ mensagem: "O valor do depósito não ser negativo" })
    }

    const indiceConta = contas.findIndex(id => id.idConta === numero_conta)

    let saldo = contas[indiceConta].saldo

    let saldoAtualizado = saldo + valor

    contas[indiceConta].saldo = saldoAtualizado

    const data = new Date()
    const dataFormatada = format(data, "dd/MM/yyyy H:mm:ss")

    const registroDeposito = {
        data: dataFormatada,
        numero_conta,
        valor
    }

    depositos.push(registroDeposito)
    //console.log(registroDeposito)
    return res.status(200).json({ mensagem: "Depósito realizado com sucesso" })
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta) {
        return res.status(404).json({ mensagem: "O campo numero_conta é obrigatório" })
    }

    if (!valor) {
        return res.status(404).json({ mensagem: "O campo valor é obrigatório" })
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

    const indiceConta = contas.findIndex(id => id.idConta === numero_conta)

    if (senha !== contas[indiceConta].usuario.senha) {
        return res.status(404).json({ mensagem: "A senha está incorreta" })
    }
    let saldo = contas[indiceConta].saldo


    if (saldo === 0) {
        return res.status(404).json({ mensagem: "Não há saldo disponível para saque" })
    }

    if (saldo < valor) {
        return res.status(404).json({ mensagem: "Saldo insuficiente" })
    }

    let saldoAtualizado = saldo - valor

    contas[indiceConta].saldo = saldoAtualizado

    const data = new Date()
    const dataFormatada = format(data, "dd/MM/yyyy H:mm:ss")

    const registroSaque = {
        data: dataFormatada,
        numero_conta: numero_conta,
        valor
    }

    saques.push(registroSaque)
    //console.log(registroSaque)

    return res.status(200).json({ mensagem: "Saque realizado com sucesso" })
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem) {
        return res.status(404).json({ mensagem: "O campo conta de origem é obrigatório" })
    }

    if (!numero_conta_destino) {
        return res.status(404).json({ mensagem: "O campo conta de destino é obrigatório" })
    }

    if (!valor) {
        return res.status(404).json({ mensagem: "O campo valor é obrigatório" })
    }

    if (!senha) {
        return res.status(404).json({ mensagem: "O campo senha é obrigatório" })
    }

    const contaClienteOrigem = contas.find((conta) => {
        return conta.idConta === Number(numero_conta_origem)
    })

    if (!contaClienteOrigem) {
        return res.status(404).json({ mensagem: "Conta de Origem não encontrada" })
    }

    const contaClienteDestino = contas.find((conta) => {
        return conta.idConta === Number(numero_conta_destino)
    })

    if (!contaClienteDestino) {
        return res.status(404).json({ mensagem: "Conta de destino não encontrada" })
    }

    const indiceContaOrigem = contas.findIndex(id => id.idConta === numero_conta_origem)
    const indiceContaDestino = contas.findIndex(id => id.idConta === numero_conta_destino)

    if (senha !== contas[indiceContaOrigem].usuario.senha) {
        return res.status(404).json({ mensagem: "A senha está incorreta" })
    }

    let saldoContaOrigem = contas[indiceContaOrigem].saldo
    let saldoContaDestino = contas[indiceContaDestino].saldo

    if (saldoContaOrigem === 0) {
        return res.status(404).json({ mensagem: "Não é possível realizar transferência com saldo zerado" })
    }

    if (saldoContaOrigem < valor) {
        return res.status(404).json({ mensagem: "Saldo insuficiente para realizar a transação" })
    }

    let saldoContaOrigemAtualizado = saldoContaOrigem - valor
    let saldoContaDestinoAtualizado = saldoContaDestino + valor

    contas[indiceContaOrigem].saldo = saldoContaOrigemAtualizado
    contas[indiceContaDestino].saldo = saldoContaDestinoAtualizado

    const data = new Date()
    const dataFormatada = format(data, "dd/MM/yyyy H:mm:ss")

    let registroTransferencias = {
        data: dataFormatada,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(registroTransferencias)
    //console.log(transferencias)

    return res.status(200).json({ mensagem: "Transferência realizada com sucesso" })
}

module.exports = {
    depositar,
    sacar,
    transferir,
}

