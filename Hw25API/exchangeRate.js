$(document).ready(function () {
  $(".box").hide();
  //to connnnect exchange rate
  if($("#input").val() == undefined){
    $("#input1").val(Number(0));
  }
  connectData();
    $("#input1").keyup(function () {
      let inputValue1 = Number($("#input1").val());
      let selectValue1 = Number($("#cCode1").val());
      let selectValue2 = Number($("#cCode2").val());
      let result1 = (inputValue1 / selectValue1) * selectValue2;
      $("#input2").val(result1.toFixed(2));
    });
    $("#cCode1").change(function () {
      let inputValue1 = Number($("#input1").val());
      let selectValue2 = Number($("#cCode2").val());
      let result1 = (inputValue1 / $(this).val()) * selectValue2;
      $("#input2").val(result1.toFixed(2));
    });
    $("#input2").keyup(function () {
      let inputValue2 = Number($("#input2").val());
      let selectValue1 = Number($("#cCode1").val());
      let selectValue2 = Number($("#cCode2").val());
      let result2 = (inputValue2 / selectValue2) * selectValue1;
      $("#input1").val(result2.toFixed(2));
    });
    $("#cCode2").change(function () {
      let inputValue2 = Number($("#input2").val());
      let selectValue1 = Number($("#cCode1").val());
      let result2 = (inputValue2 / $(this).val()) * selectValue1;
      $("#input1").val(result2.toFixed(2));
    });
});

async function connectData() {
  //fetch is promise base and pending state
  await fetch(
    " https://v6.exchangerate-api.com/v6/b9e0971a0d2cca0884e74bdc/latest/USD"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (const key in data.conversion_rates) {
        $("#cCode1").append(
          `<option value="${data.conversion_rates[key]}">${key}</option>`
        );
        $("#cCode2").append(
          `<option value="${data.conversion_rates[key]}">${key}</option>`
        );
      }
    })
    .catch((error) => console.log(error));
  $(".box").show();
  $(".load").hide();
}
//for in (use obj loop) & for of
// // let selectCode = $("#cCode option:selected").text();
