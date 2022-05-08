var System = java.lang.System
var vthid_runscript1 = 'vth_runscripts1'
var testData = execution.getVariable("testData")
var vthInput = execution.getVariable("vthInput")
var testscripts_status = "unknown";

var testResultMessage = "test scripts result: pass."

try {
  //get output from vthid_hostlistcheck call
  var testExecution = execution.getVariable('otf-execution-testExecution');
  var data = null;
  testExecution.testHeadResults.forEach(function(item, index, array) {
    if(item.bpmnVthTaskId == vthid_runscript1 ){
      var statusCode = item['statusCode']
      if(statusCode != 200){
        throw "VTH ssh fails with statusCode:" + statusCode
      }
      data = item['testHeadResponse']['vthResponse']['resultData']['output'];
    }
  })

  if (data.indexOf("status:pass")!=-1){
    testscripts_status = "pass"
  }
  else{
    testscripts_status = false
    testResultMessage = "test scripts result: " + testscripts_status
  }
}
catch(err) {
  testscripts_status = "error"
  testResultMessage = "Couldn't verify if test scripts status. error:"+ err
}

execution.setVariable("testscripts_status", testscripts_status);
execution.setVariable("testResultMessage", testResultMessage);
