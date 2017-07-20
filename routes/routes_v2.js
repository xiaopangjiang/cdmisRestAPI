
// global var
var version = '/api/v2'

// 3rd packages

// self-defined configurations
// var config = require('../config')

// models
var Wechat = require('../models/wechat')

// middlewares
var getNoMid = require('../middlewares/getNoMid')
var tokenManager = require('../middlewares/tokenManager')
var aclChecking = require('../middlewares/aclChecking')

// controllers
var aclsettingCtrl = require('../controllers_v2/aclsetting_controller')
var niaodaifuCtrl = require('../controllers_v2/niaodaifu_controller')
var alluserCtrl = require('../controllers_v2/alluser_controller')
var devicedataCtrl = require('../controllers/devicedata_controller')
var reviewCtrl = require('../controllers_v2/review_controller')
var labtestImportCtrl = require('../controllers_v2/labtestImport_controller')
var serviceCtrl = require('../controllers_v2/service_controller')
var orderCtrl = require('../controllers_v2/order_controller')
var wechatCtrl = require('../controllers_v2/wechat_controller')
var counseltempCtrl = require('../controllers_v2/counseltemp_controller')
var expenseCtrl = require('../controllers_v2/expense_controller')
var dictTypeOneCtrl = require('../controllers_v2/dictTypeOne_controller')
var dictTypeTwoCtrl = require('../controllers_v2/dictTypeTwo_controller')
var dictDistrictCtrl = require('../controllers_v2/dictDistrict_controller')
var dictHospitalCtrl = require('../controllers_v2/dictHospital_controller')
var versionCtrl = require('../controllers_v2/version_controller')

var commentCtrl = require('../controllers_v2/comment_controller')
var adviceCtrl = require('../controllers_v2/advice_controller')
var complianceCtrl = require('../controllers_v2/compliance_controller')
var vitalSignCtrl = require('../controllers_v2/vitalSign_controller')
var patientCtrl = require('../controllers_v2/patient_controller')
var doctorCtrl = require('../controllers_v2/doctor_controller')
var counselCtrl = require('../controllers_v2/counsel_controller')
var communicationCtrl = require('../controllers_v2/communication_controller')
var taskCtrl = require('../controllers_v2/task_controller')

module.exports = function (app, webEntry, acl) {
  // app.get('/', function(req, res){
  //   res.send("Server Root");
  // });

  // 刷新token
  app.get(version + '/token/refresh', tokenManager.verifyToken(), tokenManager.refreshToken)

  // dict
  app.get(version + '/dict/typeTwo', tokenManager.verifyToken(), dictTypeTwoCtrl.getCategory)
  app.get(version + '/dict/typeTwo/codes', tokenManager.verifyToken(), dictTypeTwoCtrl.getTypes)
  app.get(version + '/dict/typeOne', tokenManager.verifyToken(), dictTypeOneCtrl.getCategory)
  app.get(version + '/dict/district', tokenManager.verifyToken(), dictDistrictCtrl.getDistrict)
  app.get(version + '/dict/hospital', tokenManager.verifyToken(), dictHospitalCtrl.getHospital)

  // csq
  app.post(version + '/acl/userRoles', tokenManager.verifyToken(), aclsettingCtrl.addUserRoles(acl), alluserCtrl.changerole)
  app.post(version + '/acl/removeUserRoles', tokenManager.verifyToken(), aclsettingCtrl.removeUserRoles(acl), alluserCtrl.changerole)
  app.get(version + '/acl/userRoles', tokenManager.verifyToken(), aclsettingCtrl.userRoles(acl))
  app.get(version + '/acl/userRole', tokenManager.verifyToken(), aclsettingCtrl.hasRole(acl))

  app.get(version + '/acl/roleUsers', tokenManager.verifyToken(), aclsettingCtrl.roleUsers(acl))
  app.post(version + '/acl/roleParents', tokenManager.verifyToken(), aclsettingCtrl.addRoleParents(acl))
  app.post(version + '/acl/removeRoleParents', tokenManager.verifyToken(), aclsettingCtrl.removeRoleParents(acl))
  app.post(version + '/acl/removeRole', tokenManager.verifyToken(), aclsettingCtrl.removeRole(acl))

  app.post(version + '/acl/allow', tokenManager.verifyToken(), aclsettingCtrl.allow(acl))
  app.post(version + '/acl/removeAllow', tokenManager.verifyToken(), aclsettingCtrl.removeAllow(acl))
  app.get(version + '/acl/allow', tokenManager.verifyToken(), aclsettingCtrl.allowedPermissions(acl))
  app.get(version + '/acl/isAllowed', tokenManager.verifyToken(), aclsettingCtrl.isAllowed(acl))

  app.post(version + '/acl/removeResource', tokenManager.verifyToken(), aclsettingCtrl.removeResource(acl))
  app.get(version + '/acl/areAnyRolesAllowed', tokenManager.verifyToken(), aclsettingCtrl.areAnyRolesAllowed(acl))
  app.get(version + '/acl/resources', tokenManager.verifyToken(), aclsettingCtrl.whatResources(acl))

  // devicedata
  app.post(version + '/devicedata/BPDevice/binding', tokenManager.verifyToken(), devicedataCtrl.bindingDevice)
  app.post(version + '/devicedata/BPDevice/debinding', tokenManager.verifyToken(), devicedataCtrl.debindingDevice)
  app.post(version + '/devicedata/BPDevice/data', tokenManager.verifyToken(), devicedataCtrl.receiveBloodPressure)
  app.get(version + '/devicedata/devices', tokenManager.verifyToken(), devicedataCtrl.getDeviceInfo)

  // wf
  app.get(version + '/alluser/count', tokenManager.verifyToken(), alluserCtrl.countAlluserList)
  app.get(version + '/alluser/userList', tokenManager.verifyToken(), alluserCtrl.getAlluserList(0))
  app.get(version + '/alluser/doctorList', tokenManager.verifyToken(), alluserCtrl.getAlluserList(1))
  app.get(version + '/alluser/patientList', tokenManager.verifyToken(), alluserCtrl.getAlluserList(2))
  app.get(version + '/alluser/nurseList', tokenManager.verifyToken(), alluserCtrl.getAlluserList(3))
  app.get(version + '/alluser/insuranceList', tokenManager.verifyToken(), alluserCtrl.getAlluserList(4))
  app.get(version + '/alluser/healthList', tokenManager.verifyToken(), alluserCtrl.getAlluserList(5))
  app.get(version + '/alluser/adminList', tokenManager.verifyToken(), alluserCtrl.getAlluserList(6))
  app.post(version + '/alluser/alluser', tokenManager.verifyToken(), alluserCtrl.checkAlluser, alluserCtrl.updateAlluserList)

  app.post(version + '/alluser/register', alluserCtrl.registerTest(acl), getNoMid.getNo(1), alluserCtrl.register(acl))
  app.post(version + '/alluser/cancelUser', tokenManager.verifyToken(), alluserCtrl.checkAlluser, alluserCtrl.cancelAlluser)
  app.post(version + '/alluser/unionid', tokenManager.verifyToken(), alluserCtrl.setOpenId, alluserCtrl.checkBinding, alluserCtrl.setOpenIdRes)
  app.post(version + '/alluser/openId', tokenManager.verifyToken(), alluserCtrl.checkAlluser, alluserCtrl.setMessageOpenId)
  app.get(version + '/alluser/openId', tokenManager.verifyToken(), alluserCtrl.checkAlluser, alluserCtrl.getMessageOpenId)
  app.post(version + '/alluser/reset', tokenManager.verifyToken(), alluserCtrl.reset)
  app.post(version + '/alluser/login', alluserCtrl.openIdLoginTest, alluserCtrl.checkBinding, alluserCtrl.login)
  app.post(version + '/alluser/logout', tokenManager.verifyToken(), alluserCtrl.logout)
  app.get(version + '/alluser/userID', tokenManager.verifyToken(), alluserCtrl.getAlluserID)
  app.post(version + '/alluser/sms', tokenManager.verifyToken(), alluserCtrl.sendSMS)
  app.get(version + '/alluser/sms', tokenManager.verifyToken(), alluserCtrl.verifySMS)
  app.get(version + '/alluser/agreement', tokenManager.verifyToken(), alluserCtrl.getAlluserAgreement)
  app.post(version + '/alluser/agreement', tokenManager.verifyToken(), alluserCtrl.updateAlluserAgreement)

  app.post(version + '/expense/rechargeDoctor', tokenManager.verifyToken(), alluserCtrl.checkDoctor, expenseCtrl.rechargeDoctor)
  app.get(version + '/expense/records', tokenManager.verifyToken(), expenseCtrl.getRecords)
  // gy
  // review
  app.post(version + '/review/reviewInfo', tokenManager.verifyToken(), reviewCtrl.postReviewInfo)
  app.get(version + '/review/certificate', tokenManager.verifyToken(), reviewCtrl.getCertificate)
  app.get(version + '/review/reviewInfo', tokenManager.verifyToken(), reviewCtrl.getReviewInfo)
  app.get(version + '/review/countByStatus', tokenManager.verifyToken(), reviewCtrl.countByStatus)

  // labtestImport
  app.get(version + '/labtestImport/listByStatus', tokenManager.verifyToken(), labtestImportCtrl.listByStatus)
  app.get(version + '/labtestImport/photoList', tokenManager.verifyToken(), labtestImportCtrl.photoList)
  app.post(version + '/labtestImport', tokenManager.verifyToken(), getNoMid.getNo(11), labtestImportCtrl.saveLabtest)
  app.post(version + '/labtestImport/edit', tokenManager.verifyToken(), labtestImportCtrl.editLabtest)
  app.get(version + '/labtestImport', tokenManager.verifyToken(), labtestImportCtrl.getLabtest)
  app.get(version + '/labtestImport/photoByLabtest', tokenManager.verifyToken(), labtestImportCtrl.photoByLabtest)
  app.post(version + '/labtestImport/labelphoto', tokenManager.verifyToken(), labtestImportCtrl.pullurl, labtestImportCtrl.pushurl, labtestImportCtrl.checkImportStatus, labtestImportCtrl.updateUserLatest)
  app.get(version + '/labtestImport/countByStatus', tokenManager.verifyToken(), labtestImportCtrl.countByStatus)

  // doctor_services
  app.get(version + '/services', tokenManager.verifyToken(), serviceCtrl.getServices)
  app.post(version + '/services/status', tokenManager.verifyToken(), serviceCtrl.changeServiceStatus)
  app.post(version + '/services/charge', tokenManager.verifyToken(), serviceCtrl.setCharge)
  app.post(version + '/services/relayTarget', tokenManager.verifyToken(), serviceCtrl.setRelayTarget)
  app.post(version + '/services/setSchedule', tokenManager.verifyToken(), serviceCtrl.setServiceSchedule)
  app.post(version + '/services/deleteSchedule', tokenManager.verifyToken(), serviceCtrl.deleteServiceSchedule)
  app.post(version + '/services/setSuspend', tokenManager.verifyToken(), serviceCtrl.setServiceSuspend)
  app.post(version + '/services/deleteSuspend', tokenManager.verifyToken(), serviceCtrl.deleteServiceSuspend)
  // 咨询问卷填写(新增自动转发功能)
  app.post(version + '/counsel/questionaire', tokenManager.verifyToken(), counseltempCtrl.getSessionObject, counseltempCtrl.getDoctorObject, getNoMid.getNo(2), counseltempCtrl.saveQuestionaire, counseltempCtrl.counselAutoRelay)

  // YQC
  // comment - debug complete 2017-07-17
  app.get(version + '/comment/commentsByDoc', tokenManager.verifyToken(), commentCtrl.getDoctorObject, commentCtrl.getCommentsByDoc)
  app.get(version + '/comment/commentsByCounsel', tokenManager.verifyToken(), commentCtrl.getCommentsByCounselId)
  // advice - debug complete 2017-07-17
  app.get(version + '/advice', tokenManager.verifyToken(), adviceCtrl.getAdvice)
  app.post(version + '/advice', tokenManager.verifyToken(), adviceCtrl.postAdvice)
  // compliance - debug complete 2017-07-17
  app.get(version + '/compliance', tokenManager.verifyToken(), complianceCtrl.getComplianceByDay)
  app.post(version + '/compliance', tokenManager.verifyToken(), complianceCtrl.getCompliance, complianceCtrl.updateCompliance)
  // vitalSign 2017-07-14
  app.get(version + '/vitalSign/vitalSigns', tokenManager.verifyToken(), patientCtrl.getPatientObject, vitalSignCtrl.getVitalSigns)
  app.post(version + '/vitalSign/vitalSign', tokenManager.verifyToken(), vitalSignCtrl.getPatientObject, vitalSignCtrl.getVitalSign, vitalSignCtrl.insertData)
  // counsel 2017-07-17 debug 1-
  app.get(version + '/counsel/counsels', tokenManager.verifyToken(), counselCtrl.getDoctorObject, counselCtrl.getCounsels)
  app.post(version + '/counsel/questionaire', tokenManager.verifyToken(), counselCtrl.getSessionObject, counselCtrl.getDoctorObject, getNoMid.getNo(2), counselCtrl.saveQuestionaire, counselCtrl.counselAutoRelay)
  app.get(version + '/counsel/status', tokenManager.verifyToken(), counselCtrl.getPatientObject, counselCtrl.getDoctorObject, counselCtrl.getStatus)
  app.post(version + '/counsel/status', tokenManager.verifyToken(), counselCtrl.getPatientObject, counselCtrl.getDoctorObject, counselCtrl.getStatus, counselCtrl.changeCounselStatus, counselCtrl.changeConsultationStatus)
  app.post(version + '/counsel/type', tokenManager.verifyToken(), counselCtrl.getPatientObject, counselCtrl.getDoctorObject, counselCtrl.getStatus, counselCtrl.changeCounselType)
  app.post(version + '/counsel/commentScore', tokenManager.verifyToken(), counselCtrl.getPatientObject, counselCtrl.getDoctorObject, getNoMid.getNo(3), counselCtrl.insertCommentScore)
  // communication 2017-07-14
  app.get(version + '/communication/counselReport', tokenManager.verifyToken(), communicationCtrl.getCounselReport)
  // app.post(version + '/communication/newTeam', tokenManager.verifyToken(), getNoMid.getNo(4), communicationCtrl.newTeam)
  app.post(version + '/communication/team', tokenManager.verifyToken(), communicationCtrl.newTeam)
  app.post(version + '/communication/deleteTeam', tokenManager.verifyToken(), communicationCtrl.deleteTeam)
  app.get(version + '/communication/team', tokenManager.verifyToken(), communicationCtrl.getTeam)
  app.post(version + '/communication/consultation', tokenManager.verifyToken(), communicationCtrl.checkTeam, communicationCtrl.checkCounsel, communicationCtrl.checkPatient, communicationCtrl.checkDoctor, communicationCtrl.newConsultation)
  // app.post(version + '/communication/consultation', tokenManager.verifyToken(), getNoMid.getNo(5), communicationCtrl.checkTeam, communicationCtrl.checkCounsel, communicationCtrl.checkPatient, communicationCtrl.checkDoctor, communicationCtrl.newConsultation);
  app.get(version + '/communication/consultation', tokenManager.verifyToken(), communicationCtrl.getConsultation)
  app.post(version + '/communication/conclusion', tokenManager.verifyToken(), communicationCtrl.conclusion)
  app.post(version + '/communication/insertMember', tokenManager.verifyToken(), communicationCtrl.insertMember, communicationCtrl.updateNumber)
  app.post(version + '/communication/removeMember', tokenManager.verifyToken(), communicationCtrl.removeMember, communicationCtrl.updateNumber)
  app.post(version + '/communication/updateLastTalkTime', tokenManager.verifyToken(), communicationCtrl.getDoctor1Object, communicationCtrl.getDoctor2Object, communicationCtrl.removeDoctor, communicationCtrl.removeDoctor2, communicationCtrl.updateLastTalkTime2, communicationCtrl.updateLastTalkTime)
  app.post(version + '/communication/communication', tokenManager.verifyToken(), getNoMid.getNo(8), communicationCtrl.postCommunication)
  app.get(version + '/communication/communication', tokenManager.verifyToken(), communicationCtrl.getCommunication)
  // task 2017-07-14
  app.get(version + '/tasks', tokenManager.verifyToken(), taskCtrl.getTasks)
  app.post(version + '/tasks/status', tokenManager.verifyToken(), taskCtrl.updateStatus)
  app.post(version + '/tasks/time', tokenManager.verifyToken(), taskCtrl.updateStartTime)
  app.post(version + '/tasks/taskModel', tokenManager.verifyToken(), taskCtrl.removeOldTask, taskCtrl.getTaskModel, taskCtrl.insertTaskModel)
  app.get(version + '/tasks/task', tokenManager.verifyToken(), taskCtrl.getUserTask)
  app.post(version + '/tasks/task', tokenManager.verifyToken(), taskCtrl.getContent, taskCtrl.removeContent, taskCtrl.updateContent)
  // patient 2017-07-17
  app.get(version + '/patient/detail', tokenManager.verifyToken(), patientCtrl.getPatientDetail)
  app.get(version + '/patient/doctors', tokenManager.verifyToken(), patientCtrl.getDoctorLists)
  app.get(version + '/patient/myDoctors', tokenManager.verifyToken(), patientCtrl.getMyDoctor)
  // app.get(version + '/patient/myDoctors', tokenManager.verifyToken(), patientCtrl.getSessionObject, patientCtrl.getMyDoctor)
  app.get(version + '/patient/counselRecords', tokenManager.verifyToken(), patientCtrl.getSessionObject, patientCtrl.getCounselRecords)
  app.post(version + '/patient/detail', tokenManager.verifyToken(), patientCtrl.checkPatientId, patientCtrl.newPatientDetail)
  app.post(version + '/patient/editDetail', tokenManager.verifyToken(), patientCtrl.editPatientDetail)
  app.post(version + '/patient/diagnosis', tokenManager.verifyToken(), patientCtrl.getSessionObject, patientCtrl.insertDiagnosis, patientCtrl.editPatientDetail)
  // bindingMyDoctor改为关注医生
  // app.post(version + '/patient/bindingMyDoctor', tokenManager.verifyToken(), patientCtrl.debindingDoctor, patientCtrl.bindingMyDoctor, patientCtrl.bindingPatient, wechatCtrl.chooseAppId, Wechat.baseTokenManager('access_token'), wechatCtrl.messageTemplate)
  app.post(version + '/patient/changeVIP', tokenManager.verifyToken(), patientCtrl.changeVIP)
  app.post(version + '/patient/wechatPhotoUrl', tokenManager.verifyToken(), patientCtrl.wechatPhotoUrl)
  // doctor_Info
  app.post(version + '/doctor/detail', tokenManager.verifyToken(), doctorCtrl.insertDocBasic)
  // 需要查询class字典表（待定） ？？？这是啥
  app.get(version + '/doctor/myPatients', tokenManager.verifyToken(), doctorCtrl.getSessionObject, doctorCtrl.getPatientList)
  app.get(version + '/doctor/myPatientsByDate', doctorCtrl.getSessionObject, doctorCtrl.getPatientByDate)
  // app.get(version + '/doctor/getDoctorInfo', doctorCtrl.getDoctorObject, doctorCtrl.getDoctorInfo);
  app.get(version + '/doctor/detail', tokenManager.verifyToken(), doctorCtrl.getSessionObject, doctorCtrl.getCount1AndCount2, doctorCtrl.getComments, doctorCtrl.getDoctorInfo)
  app.get(version + '/doctor/myTeams', tokenManager.verifyToken(), doctorCtrl.getTeams)
  app.get(version + '/doctor/teamPatients', tokenManager.verifyToken(), doctorCtrl.getTeamObject, doctorCtrl.getGroupPatientList)
  // app.get(version + '/doctor/team', doctorCtrl.getTeamObject, doctorCtrl.getTeam);
  app.post(version + '/doctor/editDetail', tokenManager.verifyToken(), doctorCtrl.editDoctorDetail, doctorCtrl.updateTeamSponsor, doctorCtrl.updateTeamMember)
  app.get(version + '/doctor/myRecentDoctors', doctorCtrl.getDoctorObject, doctorCtrl.getRecentDoctorList)
  app.post(version + '/doctor/schedule', tokenManager.verifyToken(), doctorCtrl.insertSchedule)
  app.post(version + '/doctor/deleteSchedule', tokenManager.verifyToken(), doctorCtrl.deleteSchedule)
  app.get(version + '/doctor/schedules', tokenManager.verifyToken(), doctorCtrl.getSchedules)
  app.post(version + '/doctor/suspendTime', tokenManager.verifyToken(), doctorCtrl.insertSuspendTime)
  app.post(version + '/doctor/deleteSuspendTime', tokenManager.verifyToken(), doctorCtrl.deleteSuspendTime)
  app.get(version + '/doctor/suspendTime', tokenManager.verifyToken(), doctorCtrl.getSuspendTime)
  app.get(version + '/doctor/numbers', tokenManager.verifyToken(), doctorCtrl.getDocNum)
  app.get(version + '/doctor/AliPayAccount', tokenManager.verifyToken(), doctorCtrl.getAliPayAccount)
  app.post(version + '/doctor/AliPayAccount', tokenManager.verifyToken(), doctorCtrl.editAliPayAccount)
  // 患者端 关注医生
  app.post(version + '/patient/favoriteDoctor', tokenManager.verifyToken(), patientCtrl.bindingDoctor, patientCtrl.bindingPatient)
  // 患者端 申请主管医生
  app.post(version + '/patient/doctorInCharge', tokenManager.verifyToken(), serviceCtrl.requestDoctorInCharge, serviceCtrl.addPatientInCharge)
  // 患者端 获取关注医生列表
  app.get(version + '/patient/myFavoriteDoctors', tokenManager.verifyToken(), patientCtrl.getMyFavoriteDoctors)

  // niaodaifu
  /**
   * @swagger
   * /devicedata/niaodaifu/loginparam:
   *   get:
   *     tags:
   *       - 尿大夫
   *     description: 获取登录参数
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: client
   *         description: 客户端
   *         in: query
   *         required: true
   *         type: string
   *       - name: userbind
   *         description: 用户ID
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: 返回所需参数
   * /devicedata/niaodaifu/data:
   *   post:
   *     tags:
   *       - 尿大夫
   *     description: 接收检测数据
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: userbind
   *         description: 用户ID
   *         in: body
   *         required: true
   *         schema: string
   *       - name: suggestion
   *         description: 建议
   *         in: body
   *         required: true
   *         schema: string
   *       - name: desc
   *         description: 描述
   *         in: body
   *         required: true
   *         schema: string
   *       - name: created
   *         description: 时间戳
   *         in: body
   *         required: true
   *         schema: integer
   *       - name: data
   *         description: 检测数据
   *         in: body
   *         required: true
   *         schema: array    
   *     responses:
   *       200:
   *         description: 返回成功状态
   */
  app.get('/devicedata/niaodaifu/loginparam', niaodaifuCtrl.getLoginParam)
  app.post('/devicedata/niaodaifu/data', getNoMid.getNo(11), niaodaifuCtrl.receiveData)

  // wechat
  app.get(version + '/wechat/settingConfig', wechatCtrl.chooseAppId, Wechat.baseTokenManager("access_token"), wechatCtrl.settingConfig)
  // 获取用户基本信息
  app.get(version + '/wechat/getUserInfo', wechatCtrl.chooseAppId, wechatCtrl.gettokenbycode, wechatCtrl.getuserinfo)
  app.get(version + '/wechat/gettokenbycode', wechatCtrl.chooseAppId, wechatCtrl.gettokenbycode, wechatCtrl.returntoken)
  // 统一下单  根据code获取access_token，openid   获取数据库中的订单信息   获取微信统一下单的接口数据 prepay_id   生成微信PaySign
  // 输入：微信用户授权的code 商户系统生成的订单号 
  app.post(version + '/wechat/addOrder',  getNoMid.getNo(7), orderCtrl.insertOrder, wechatCtrl.chooseAppId, wechatCtrl.addOrder,wechatCtrl.getPaySign)
  // 订单支付结果回调 
  app.post(version + '/wechat/payResult', wechatCtrl.payResult)
  // 查询订单   orderNo 
  app.get(version + '/wechat/getWechatOrder',  wechatCtrl.chooseAppId,Wechat.baseTokenManager("access_token"), wechatCtrl.getWechatOrder)
  // 关闭订单   orderNo 
  app.get(version + '/wechat/closeWechatOrder',  wechatCtrl.chooseAppId,Wechat.baseTokenManager("access_token"), wechatCtrl.closeWechatOrder)
  
  // app.post(version + '/wechat/refund', orderCtrl.checkPayStatus('refund'), getNoMid.getNo(9), orderCtrl.refundChangeStatus('refundApplication'), wechatCtrl.chooseAppId, wechatCtrl.refund)
  // 退款接口
  app.post(version + '/wechat/refund', orderCtrl.checkPayStatus('refund'), getNoMid.getNo(9), orderCtrl.refundChangeStatus('refundApplication'), wechatCtrl.chooseAppId, wechatCtrl.refund, wechatCtrl.refundMessage)
  // 退款查询
  app.post('/wechat/refundquery', orderCtrl.checkPayStatus('refundquery'), wechatCtrl.chooseAppId, wechatCtrl.refundquery, orderCtrl.refundChangeStatus())
  // 消息模板
  app.post(version + '/wechat/messageTemplate',  wechatCtrl.chooseAppId, Wechat.baseTokenManager("access_token"), wechatCtrl.messageTemplate)
  // 下载
  app.get(version + '/wechat/download',  wechatCtrl.chooseAppId,Wechat.baseTokenManager("access_token"), wechatCtrl.download)
  // 创建永久二维码
  app.post(version + '/wechat/createTDCticket',  wechatCtrl.chooseAppId, Wechat.baseTokenManager("access_token"), wechatCtrl.createTDCticket, alluserCtrl.setTDCticket)

  // 接收微信服务器的post请求
  app.post(version + '/wechat', wechatCtrl.receiveTextMessage)
  // 接收微信服务器的get请求
  app.get(version + '/wechat', wechatCtrl.getServerSignature)

  // version
  app.get(version + '/version', versionCtrl.getVersionInfo)
  app.post(version + '/version', getNoMid.getNo(10), versionCtrl.insertVersionInfo)
}

