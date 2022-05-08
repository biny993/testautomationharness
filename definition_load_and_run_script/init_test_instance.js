var System = java.lang.System

var vthid_loadscript1 = 'vth_loadscripts1'
var vthid_runscript1 = 'vth_runscripts1'
var vthid_pingtarget1 = 'vth_pingtarget1'

var testData = execution.getVariable("testData")
var vthInput = execution.getVariable("vthInput")

var testinstance_init = false;

var testResultMessage = "initiate test instance's variables"

try {
        
    //init testRetryMax
    var testRetryMax = execution.getVariable("testRetryMax")
    if (!testRetryMax)
    {
        testRetryMax = 0
        execution.setVariable("testRetryMax", testRetryMax)
    }

    execution.setVariable("ocloudreachable", false)
    execution.setVariable("testscripts_ready", false)
    execution.setVariable("testscripts_status", "unknown")

    var targetHost = execution.getVariable("targetHost")
    var username = execution.getVariable("username")
    var password = execution.getVariable("password")
    

    // //get inputs
    // var testVthInput = execution.getVariable('vthInput');
    // var data = null;
    // var vthInput_pingtarget1 = testVthInput[vthid_pingtarget1]

    // // if username is provisioned, overwrite it in each VTH
    // if (username)
    // {
    //     vthInput_pingtarget1['vthInput']['testData']['targetHost'] = targetHost
    // }
    // else
    // {
    //     targetHost = vthInput_pingtarget1['vthInput']['testData']['targetHost']
    // }

    // var vthInput_vthid_loadscript1 = testVthInput[vthid_loadscript1]
    
    // if (username)
    // {
    //     vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['host'] = targetHost
    //     vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['credentials']['username'] = username
    //     vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['credentials']['password'] = password
    // }
    // else
    // {
    //     targetHost = vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['host']
    //     username = vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['credentials']['username']
    //     password = vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['credentials']['password']
    // }

    // var vthInput_vthid_runscript1 = testVthInput[vthid_runscript1]

    // if (username)
    // {
    //     vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['host'] = targetHost
    //     vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['credentials']['username'] = username
    //     vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['credentials']['password'] = password
    // }
    // else
    // {
    //     targetHost = vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['host']
    //     username = vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['credentials']['username']
    //     password = vthInput_vthid_loadscript1['vthInput']['testConfig']['jumpServer']['credentials']['password']
    // }
    testinstance_init = true
}
catch(err) {
  testinstance_init = false
  testResultMessage = "Couldn't initiate test instance's variables. error:"+ err
}

execution.setVariable("testinstance_init", testinstance_init);
execution.setVariable("testResultMessage", testResultMessage);
