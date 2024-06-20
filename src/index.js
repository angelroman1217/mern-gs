import app from './app.js';
import { connectDB } from './db.js';
import { swaggerDocs } from './swagger.js';

connectDB();
app.listen(3000)
console.log('Server on port', 3000);
swaggerDocs(app, 3000)