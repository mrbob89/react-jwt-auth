const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/dev');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
