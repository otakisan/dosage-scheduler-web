var express = require('express');
var app = express();

var Sequelize = require('sequelize');
// Or you can simply use a connection uri
var sequelize = new Sequelize('postgres://medicine:medicine@localhost:5432/medicinedb');

// http://stackoverflow.com/questions/21114499/how-to-make-sequelize-use-singular-table-names
var dosageSchedule = sequelize.define('dosage_schedule', 
{
  id: { type: Sequelize.INTEGER, primaryKey: true}, // primaryKeyを指定しないとエラー（項目名でチェックしている？）
  gtin: Sequelize.STRING,
  jan_code: Sequelize.STRING,
  summary: Sequelize.STRING,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
},
{
  // 下記フラグをOFFにしないと、SELECT発行時に、updatedAt, createdAtが自動付与される（これらのカラムがないとエラー）
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // 下記フラグをONにしないと、define名の複数形をテーブル名としてしまう
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
}).schema('med');

// 個別にdosageSchedule.schema('med')としても、dosageScheduleの状態自体は変化しない。
// 戻り値を使用する必要がある（なので、上記では関数を連続でコールしている）


app.get('/', function (req, res) {
  res.send('Hello World 3003!//n');
});

app.get('/ormtest', function (req, res) {
  const param = req.query.q;
  dosageSchedule.findOne({ where: {gtin: param} })
  .then(function(schedule) {
    if(schedule) {
      res.json([schedule]);
    } else {
      res.json([]);
    }
  });
});

app.listen(3003, function () {
  console.log('Example app listening on port 3003!');
});