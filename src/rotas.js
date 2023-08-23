const express = require("express")
const contaControlador = require("./controladores/contacontrolador")
const transacaoControlador = require("./controladores/transacaoControlador")
const { validarSenha } = require("./intermediarios")

const rotas = express()

rotas.get("/contas", validarSenha, contaControlador.listarContas)
rotas.post("/contas", contaControlador.criarConta)
rotas.put("/contas/:idConta/:usuario", contaControlador.atualizarConta)
rotas.delete("/contas/:idConta", contaControlador.deletarConta)
rotas.post("/transacoes/depositar", transacaoControlador.depositar)
rotas.post("/transacoes/sacar", transacaoControlador.sacar)
rotas.post("/transacoes/transferir", transacaoControlador.transferir)
rotas.get("/contas/saldo", contaControlador.consultarSaldo)
rotas.get("/contas/extrato", contaControlador.consultarExtrato)

module.exports = rotas