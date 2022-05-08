var System = java.lang.System
var vthid_pingtarget1 = 'vth_pingtarget1'
var testData = execution.getVariable("testData")
var vthInput = execution.getVariable("vthInput")
var ocloudreachable = false;

var testResultMessage = "target system is reachable."

try {
  //get output from vthid_hostlistcheck call
  var testExecution = execution.getVariable('otf-execution-testExecution');
  var data = null;
  testExecution.testHeadResults.forEach(function(item, index, array) {
    if(item.bpmnVthTaskId == vthid_pingtarget1 ){
      var statusCode = item['statusCode']
      if(statusCode != 200){
        throw "VTH ping fails with statusCode:" + statusCode
      }
      data = item['testHeadResponse']['vthResponse']['resultData']['result'];
    }
  })

  if (data.indexOf("1 received")!=-1){
    ocloudreachable = true
  }
  else{
    alreadyDeployed = false
    testResultMessage = "target system is not reachable."
  }
}
catch(err) {
  ocloudreachable = false
  testResultMessage = "Couldn't verify is target system is reachable. error:"+ err
}

execution.setVariable("ocloudreachable", ocloudreachable);
execution.setVariable("testResultMessage", testResultMessage);
