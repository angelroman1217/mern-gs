import app from './app.js';
import { connectDB } from './db.js';
import { swaggerDocs } from './swagger.js';

connectDB();
app.listen(4000)
console.log('Server on port', 4000);
swaggerDocs(app, 4000)