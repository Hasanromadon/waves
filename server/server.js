require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');
const routes = require('./routes');
const { handleError, convertToApiError } = require('./middleware/apiError');

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
}).then(() => console.log('connected to DB'));
// body parse
app.use(express.json());

/// sanitize
app.use(xss());
app.use(mongoSanitize());

// passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// routes
app.use('/api', routes);

/// HANDLE ERRORS
/// if the error not recognized....convert to api error
app.use(convertToApiError);
app.use((err, req, res) => {
  handleError(err, res);
});

app.use(express.static('client/build'));
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
