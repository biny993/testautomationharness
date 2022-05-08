var System = java.lang.System
var vthid_check_testasserted = 'vth_check_testasserted'
var testData = execution.getVariable("testData")
var vthInput = execution.getVariable("vthInput")
var testscripts_asserted = false;

var testResultMessage = "test scripts result: pass."

try {
  //get output from vthid_hostlistcheck call
  var testExecution = execution.getVariable('otf-execution-testExecution');
  var data = null;
  testExecution.testHeadResults.forEach(function(item, index, array) {
    if(item.bpmnVthTaskId == vthid_check_testasserted ){
      var statusCode = item['statusCode']
      if(statusCode != 200){
        throw "VTH ssh fails with statusCode:" + statusCode
      }
      data = item['testHeadResponse']['vthResponse']['resultData']['output'];
    }
  })

  if (data.indexOf("status:pass")!=-1){
    testscripts_asserted = true
  }
  else{
    testscripts_asserted = false
    testResultMessage = "test scripts result: " + testscripts_asserted
  }
}
catch(err) {
  testscripts_asserted = false
  testResultMessage = "Couldn't verify if test scripts status. error:"+ err
}

execution.setVariable("testscripts_asserted", testscripts_asserted);
execution.setVariable("testResultMessage", testResultMessage);
