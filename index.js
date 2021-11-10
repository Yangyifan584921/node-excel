const express = require('express')
const app = express()
const mysql = require('mysql')
const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')

const db = mysql.createConnection({
  // host: 'db.mysqlslave0.mijiaoyu.cn',
  // user: 'zhaonan',
  // password: 'zhaonan',
  // database: 'dxmPro'
  host: 'localhost',
  user: 'root',
  password: '1020043895',
  database: '620231417_library'
})
db.connect((err) => {
  if(err) {
    throw err
  }
  console.log('链接成功')
})

/**
 * 查询语句
 * @param { string } tableName 表名
 * @param { Function } sucCallback 成功的回调方法
 * @param { Function } errCallback 失败的回调方法
 */
 function selectData(id, sucCallback, errCallback) {
  // const sql = 'select * from ' + tableName;
  const sql1 = 'SELECT * FROM `cor_scheduleorderitem` WHERE incomeitemcode=' + id;
  db.query(sql, (error, results, fields)=> {
      if (error) {
          errCallback(error);
          return;
      }
      sucCallback(results);
  });
}

// get方法获取所有账号信息列表
// app.get("/gg_account/list", function (req, res) {
//   // 查询相应数据表，返回数据
//   selectData('books', (suc) => {
//       res.send({code: 200, message: "Success!", data: suc, total: suc.length});
//       readxlsx()
//   }, (err) => {
//       res.send({code: 500, message: "Error!", data: err});
//   });
// })
function readxlsx () {
  let sheets = xlsx.parse(fs.readFileSync(path.join(__dirname, '南城.xlsx')));
  sheets.forEach(sheet => {
    if(typeof sheet.name === 'number') {
      selectData('books', (suc) => {
        console.log('data', suc)
      }, (err) => {
          res.send({code: 500, message: "Error!", data: err});
      });
    }
  })
}
readxlsx()

function writexlsx() {
  var buffer = xlsx.build(data);
  fs.writeFile('./resut.xls', buffer, function (err)
  {
      if (err)
          throw err;
      console.log('Write to xls has finished');
      
  // 读xlsx
      var obj = xlsx.parse("./" + "resut.xls");
      console.log(JSON.stringify(obj));
  }
  );
}
app.listen(3000, () => {
  console.log('接口已启动')
})
