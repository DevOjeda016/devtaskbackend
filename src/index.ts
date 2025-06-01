import app from './app';
import config from './config/index';

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} http://127.0.0.1:${PORT}`);
});
