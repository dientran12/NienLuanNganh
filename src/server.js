
import cors from 'cors'
require('dotenv').config()
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import initWebRouter from './route/web'
import connectDB from './config/connectDB'

const app = express()
const port = process.env.PORT
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())

initWebRouter(app)

connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
