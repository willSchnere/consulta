const express = require('express'); 
// Importa o módulo 'express' para criar um servidor web.

const db = require('./db'); 
// Importa o arquivo de conexão com o banco de dados (db.js).

const app = express(); 
// Cria uma instância da aplicação Express.

app.use(express.json()); 
// Configura o Express para aceitar requisições no formato JSON.

const port = 3000; 
// Define a porta onde o servidor vai rodar.

let veiculos = []; 
// Variável local para armazenar veículos (não utilizada no banco, mas na memória).

// CREATE TABLE veiculos (...); 
// Comentário que mostra a estrutura da tabela no banco de dados (caso necessário criar).

// Rota para inserir um novo veículo
app.post('/inserir', (req, res) => {
    const { marca, modelo, ano, cor, proprietario } = req.body;
    // Extrai dados do corpo da requisição (dados enviados pelo cliente).

    db.query(
        `INSERT INTO veiculos (marca, modelo, ano, cor, proprietario) VALUES (?, ?, ?, ?, ?)`,
        [marca, modelo, Number(ano), cor, proprietario],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na inserção:', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    // Insere os dados no banco de dados utilizando placeholders (?) para evitar SQL Injection.
    
    res.send(`Veículo inserido!\n\nMarca: ${marca} \nModelo: ${modelo} \nAno: ${ano} \nCor: ${cor} \nProprietário: ${proprietario}`);
    // Envia uma resposta confirmando a inserção do veículo.
});

// Rota para buscar todos os veículos
app.get('/veiculos', (req, res) => {
    db.query(
        `SELECT * FROM veiculos`,
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos' });
            }
            // Retorna os resultados da consulta em formato JSON.
            return res.json(results);
        }
    );
});

// Rota para atualizar um veículo por ID
app.put('/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { marca, modelo, ano, cor, proprietario } = req.body;
    // Extrai o ID da URL e os outros dados do corpo da requisição.

    db.query(
        `UPDATE veiculos SET marca = ?, modelo = ?, ano = ?, cor = ?, proprietario = ? WHERE id = ?`,
        [marca, modelo, Number(ano), cor, proprietario, id],
        function(err, results, fields) {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos' });
            }
            res.send(`Veículo atualizado!\n${id}\nMarca: ${marca} \nModelo: ${modelo} \nAno: ${ano} \nCor: ${cor} \nProprietário: ${proprietario}`);
            // Confirma a atualização do veículo e envia a resposta.
        }
    );
});

// Rota para deletar um veículo por ID
app.delete('/deletar/id/:id', (req, res) => {
    const { id } = req.params;
    // Extrai o ID da URL.

    db.query(
        `DELETE FROM veiculos WHERE ID = ?`,
        [id],
        function(err, results, fields){
            if(err){
                console.error('Erro para deletar',err);
                return res.status(500).json({error:'Erro para deletar'});
            }
            return res.json(results);
            // Retorna o resultado da operação de deletar.
        }
    );
});

// Rota para deletar um veículo por modelo
app.delete('/deletar/modelo/:modelo', (req, res) => {
    const {modelo} = req.params;
    // Extrai o modelo da URL.

    db.query(
        `DELETE FROM veiculos where modelo = ?`,
        [modelo],
        function(err, results, fields){
            if(err){
                console.error('Erro para deletar',err);
                return res.status(500).json({error:'Erro para deletar'});
            }
            return res.json(results);
            // Retorna o resultado da operação de deletar por modelo.
        }
    );
});

// Rota para buscar veículo por ID
app.get('/veiculos/:id', (req, res) => {
    const {id} = req.params;
    // Extrai o ID da URL.

    db.query(
        `SELECT * FROM veiculos where id = ?`,
        [id],
        function(err, results, fields){
            if(err){
                console.error('Erro para buscar',err);
                return res.status(500).json({error:'Erro para buscar'});
            }
            return res.json(results);
            // Retorna o veículo com o ID especificado.
        }
    );
});

// Rota para buscar veículo por ano
app.get('/veiculos/ano/:ano', (req, res) => {
    const {ano} = req.params;
    // Extrai o ano da URL.

    db.query(
        `SELECT * FROM veiculos where ano = ?`,
        [ano],
        function(err, results, fields){
            if(err){
                console.error('Erro para buscar',err);
                return res.status(500).json({error:'Erro para buscar'});
            }
            return res.json(results);
            // Retorna todos os veículos com o ano especificado.
        }
    );
});

// Rota para buscar veículos da cor azul
app.get('/veiculos/cor/azul', (req, res) => {
    db.query(
        `SELECT * FROM veiculos WHERE cor = "azul"`,
        function(err, results, fields){
            if(err){
                console.error('Erro para buscar',err);
                return res.status(500).json({error:'Erro para buscar'});
            }
            return res.json(results);
            // Retorna todos os veículos que têm a cor "azul".
        }
    );
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Server listening on  http://localhost:${port}`);
});
