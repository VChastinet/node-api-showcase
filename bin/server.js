const app = require('../app');

const port = process.env.PORT || '6660';

app.listen(port, () => console.log(`Connected to port: ${port}`));
