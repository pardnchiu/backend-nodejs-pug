module.exports = (req: any, res: any) => {
  console.log(`
  測試測試
  chiuchingwei@icloud.com
  0978960727
  https://joball.tw
  leeyu@asdf 
  https://pardn.io
  0916518069
  https://www.facebook.com/groups/706885799804902/user/100006165014359/
  https://www.facebook.com/chiuchingwei
  #test #test2 #test
  `.$tags())
  var test = "test";
  var test2 = "123";
  console.log(test._(1, test2))
  res.render("index", {
    head: {
      noindex     : false,
      title       : "Nodejs + Pug",
      description : "",
      cover       : "",
      path        : "",
      icon        : "",
      param       : req.params,
      query       : req.query
    },
    json: {
    }
  });
}