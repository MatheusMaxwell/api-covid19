const app = require('./config/express')();
const port = app.get('port');



//* 19 * * *
//0 */6 * * *

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

