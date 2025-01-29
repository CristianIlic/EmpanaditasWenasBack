import cron from 'cron';
import https from 'https';
import http from 'http';
import 'dotenv/config'

const backendUrl = process.env.API_URL;

const job = new cron.CronJob('*/14 * * * *', function () {
  console.log('Reiniciando server');

  const httpModule = backendUrl?.startsWith('https') ? https : http;

  const req = httpModule.get(backendUrl, (res) => {
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('Servidor reiniciado exitosamente');
      } else {
        console.error(`Error: Servidor respondió con código ${res.statusCode}`);
        console.error('Respuesta de error:', data);
      }
    });
  });

  req.on('error', (err) => {
    console.error('Error detallado durante el reinicio:', {
      message: err.message,
      code: err.code,
      stack: err.stack,
      url: backendUrl
    });
  });

  req.setTimeout(10000, () => {
    req.destroy();
    console.error('Timeout: La petición tardó demasiado');
  });

  req.end();
});

job.addCallback(function(error) {
  if (error) {
    console.error('Error en la ejecución del CronJob:', error);
  }
});

export {job};