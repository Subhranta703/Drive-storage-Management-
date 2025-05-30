const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const indexRouter = require('./routes/index.routes')

dotenv.config();
const connectToDB = require('./config/db');
connectToDB();

const auth = require('./middleware/auth');
app.use(auth); // Simulate logged-in user

const uploadRoutes = require('./routes/upload.routes');
app.use(uploadRoutes);


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

app.use('/',indexRouter)
app.use('/user', userRouter)

app.listen(3000 , () => {
    console.log('server is running on port 3000');
})