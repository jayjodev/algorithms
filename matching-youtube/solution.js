var fs = require("fs");
var data_1000 = fs.readFileSync("./1000.txt").toString("utf-8");
var data_10000 = fs.readFileSync("./10000.txt").toString("utf-8");

function solution(input) {
  // Txt file 변환

  let a = [];
  let b = input.split(/\r\n/);
  for (let i = 0; i < b.length; i++) {
    a.push(b[i].split(","));
  }

  // 결과 값 출력
  let answer = [];

  for (let i = 0; i < a.length; i++) {
    let tem_answer = [];
    let obj = {};
    obj = a[i].reduce((a, b) => ((a[b] = ""), a), {});

    let arr = [];
    let tem_arr = [];
    for (let j = 0; j < a.length; j++) {
      let same_element = 0;
      for (let e = 0; e < a[j].length; e++) {
        if (a[j][e] in obj) {
          same_element++;
        }
      }
      if (i !== j) {
        tem_arr.push(same_element);
        arr.push([j + 1, same_element]);
      }
    }
    let max_number = Math.max(...tem_arr);

    for (let r = 0; r < arr.length; r++) {
      if (arr[r][1] === max_number) {
        tem_answer.push([i + 1, arr[r][0]]);
      }
    }
    answer.push(tem_answer);
  }
  return answer;
}

function write_result(n, result_data) {
  fs.writeFile(
    `./solution${n}.json`,
    JSON.stringify(result_data),
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("File saved");
      }
    }
  );
}

// 487.062ms 0.49초
console.time("function #1");
let result_1000 = solution(data_1000);
write_result(1000, result_1000);
console.timeEnd("function #1");

// 46002.384ms 46초
console.time("function #2");
let result_10000 = solution(data_10000);
write_result(10000, result_10000);
console.timeEnd("function #2");