const mysql = require('mysql2'); 
// Importa o módulo mysql2 para usar a biblioteca de conexão com o MySQL.

const connection = mysql.createConnection({
    host:'localhost', 
    user: 'root', 
    password: 'root', 
    database: 'aula', 
});
// Cria uma conexão com o banco de dados, especificando o host, o nome de usuário, a senha e o nome do banco de dados.

connection.connect(err => {
    if(err){
        console.error('Erro ao conectar ao banco de dados',err);
        return;
    }
    console.log('Conectados ao banco dados');
});
// Tenta conectar ao banco de dados. Se ocorrer um erro, ele será exibido no console. Caso contrário, exibe uma mensagem de sucesso.

module.exports = connection; 
// Exporta o objeto de conexão para ser usado em outros arquivos.
