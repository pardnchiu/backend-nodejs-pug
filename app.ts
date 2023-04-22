let express       = require("express");
let partials      = require("express-partials");
let errorHandler  = require("express-error-handler");
let path          = require("path");
let http          = require("http");
let parser        = require(`${__dirname}/resources/models/parser`);
// const session       = require(`${__dirname}/resources/models/session`);
let cname         = require(`${__dirname}/resources/models/cname`);
let morgan        = require(`${__dirname}/resources/models/morgan`);
let minify        = require(`${__dirname}/resources/models/minify`);
let strExtension  = require(`${__dirname}/resources/models/extension/string`);
let numExtension  = require(`${__dirname}/resources/models/extension/number`);
let app = express();

app.set("views", path.join("/", `${__dirname}/resources/views`));
app.set("view engine", "pug");
app.use("/", express.static(`${__dirname}/public`));
app.use(partials());
app.use(parser.json);
app.use(parser.body);
app.use(parser.cookie);
// app.use(session);
app.use(cname);
app.use(morgan);
app.use(minify);

app.use("/", require(`${__dirname}/routes/map.ts`));
// app.use('/', require(`${__dirname}/routes/post.ts`));

http.createServer(app).listen(process.env.PORT, (req: any, res: any) => {
  console.log(`mode: ${process.env.ENV}, port: ${process.env.PORT}.`);
});