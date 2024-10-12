// Importando o Express
import express from "express";

// Declarando o Router do Express
const router = express.Router();

// Importando o Cliente da pasta Model
import Cliente from "../models/Cliente.js";
 
// Rota Clientes
router.get("/clientes", function (req, res) {
  Cliente.findAll().then((clientes) => {
    res.render("clientes", {
      clientes: clientes,
    });
  });
});
 
// Rota de Cadastro de clientes
router.post("/clientes/new", (req, res) => {
 
  // Recebendo os dados do formulario e gravando nas variáveis
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
 
  Cliente.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco,
    //PROMISE (.then)
  }).then(() => {
    res.redirect("/clientes");
  });
});
 
// Rota de exclusão de clientes
// Essa rota possui um parametro ID
router.get("/clientes/delete/:id", (req, res) => {
 
  // Coletar o id que veio na URL
  const id = req.params.id;
 
  // Método para excluir registros
  Cliente.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((error) => {
      console.log(error);
    });
});
 
// Rota de edição de clientes
router.get("/clientes/edit/:id", (req, res) => {
 
  const id = req.params.id;
 
  Cliente.findByPk(id).then((cliente) => {
    res.render("clienteEdit", { cliente: cliente });
  }).catch((error) =>{
    console.log(error)
  })
});

// Rota de alteração de clientes
router.post("/clientes/update/", (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    Cliente.update({
        nome: nome,
        cpf : cpf,
        endereco : endereco
    },
    {where: {id:id}}
    ).then(() => {
        res.redirect("/clientes");
    }).catch((error) => {
        console.log(error)
    })
})

// Todos devem ser exportados
export default router;
 
 
