import cron from 'cron';
import https from 'https';
import 'dotenv/config'

const backendUrl = process.env.DATABASE_URL;
const job = new cron.CronJob('*/14 * * * *', function () {
  console.log('Reiniciando server');

  https.get(backendUrl, (res) => {
    if (res.statusCode === 200) {
      console.log('Servidor reiniciado');
    } else {
      console.error(
        `falló reiniciar el servidor con el codigo: ${res.statusCode}`
      );
    }
  })
  .on('error', (err) => {
    console.error('Error durante el reinicio:', err.message);
  });
});

export {job}; 