var System = java.lang.System
var vthid_loadscript1 = 'vth_loadscripts1'
var testData = execution.getVariable("testData")
var vthInput = execution.getVariable("vthInput")
var testscripts_ready = false;

var testResultMessage = "test scripts are loaded and ready to run."

try {
  //get output from vthid_hostlistcheck call
  var testExecution = execution.getVariable('otf-execution-testExecution');
  var data = null;
  testExecution.testHeadResults.forEach(function(item, index, array) {
    if(item.bpmnVthTaskId == vthid_loadscript1 ){
      var statusCode = item['statusCode']
      if(statusCode != 200){
        throw "VTH ssh fails with statusCode:" + statusCode
      }
      data = item['testHeadResponse']['vthResponse']['resultData']['output'];
    }
  })

  if (data.indexOf("status:pass")!=-1){
    testscripts_ready = true
  }
  else{
    testscripts_ready = false
    testResultMessage = "test scripts are not loaded appropriately."
  }
}
catch(err) {
  testscripts_ready = false
  testResultMessage = "Couldn't verify if test scripts are ready. error:"+ err
}

execution.setVariable("testscripts_ready", testscripts_ready);
execution.setVariable("testResultMessage", testResultMessage);
