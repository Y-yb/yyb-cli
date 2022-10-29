#!/usr/bin/env node

const utile = require ("util");
const promisify = utile.promisify;
const figlet = promisify(require("figlet"));
const clear = require("clear");
const inquirer = require("inquirer");
const packageConfig = require('../../package.json')
const { log } = require("../lib/api"); 

const opt = {
  "Ant-Design-Pro-V5（PC端）": "V5",
  "react-mobile(移动端)": "mobile",
  '安装依赖': 'install',
  "运行程序": 'start',
  "当前版本": 'version',
  "退出": "quit",
};

const question = [
  {
    type: "rawlist" /* 选择框 */,
    message: "请选择要执行的操作？😎😎😎",
    name: "operation",
    choices: Object.keys(opt),
  }
];



async function query(){
  const answer = await inquirer.prompt(question);
  console.log("answer", answer);
  if (answer.operation === "退出") return;
  if (answer.operation === "当前版本"){
    log(`当前版本号：${packageConfig.version}`)
    return
  }
  //@ts-ignore
  await require(`../lib/${opt[answer.operation]}`)();
  return
}

export function init (){
  clear();

  log(
    figlet.textSync("YYB-CLI!", {
      horizontalLayout: "full",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    }), 'blue'
  )

  query();
}