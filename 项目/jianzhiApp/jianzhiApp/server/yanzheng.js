/**
 * Created by Administrator on 2017/9/25.
 */
var uuid = require('node-uuid');
var crypto = require('crypto');
var moment = require('moment');
var http = require('http');
var alidayuUrl = 'http://dysmsapi.aliyuncs.com/';
var config = {
    AppKey: 'LTAIArQCgWFWrqlf',
    AppSecret: 'tizpPFUivlG3E8sAmrFVmZnLqQUV1x'
};
var obj = {
    AccessKeyId: config.AppKey,
    Action: 'SendSms',
    Format: 'JSON',
    PhoneNumbers: '',
    RegionId: 'cn-hangzhou',
    SignName: '猎户兼职',
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: uuid.v1(),
    SignatureVersion: '1.0',
    TemplateCode: 'SMS_100850007',
    TemplateParam: "{\"code\":\"" + "111111" + "\"}",
    Timestamp: '',
    Version: '2017-05-25'
}
var sms = {
    NORMAL_TEMPPLATE: 'SMS_78770029',
    REGISTER_TEMPLATE: 'SMS_75995228',
    CHANGEPROJECT_TEMPLATE: 'SMS_75995226',
    FORGETPASSS_TEMPLATE: 'SMS_75995225',
    sendMessage: function (phone, TemplateCode, TemplateParam, callback) {
        var sendurl = this.url(phone, TemplateCode, TemplateParam);
        var req = http.request(sendurl, function (res) {
            var status = res.statusCode;
            if (status != 200) {
                callback(new Error('网络异常'));
            }
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                var value = JSON.parse(chunk);
                if (value.Code != 'OK') {
                    console.log(chunk);
                    callback(new Error('短信发送异常'));
                } else {
                    callback(chunk);
                }
            }).on('error', function (e) {
                callback(new Error('发送短信异常'));
            });
        });
        req.write('执行完毕');
        req.end();
    },
    sign: function (params, accessSecret) {
        var param = {}, qstring = [];
        var oa = Object.keys(params);
        for (var i = 0; i < oa.length; i++) {
            param[oa[i]] = params[oa[i]];
        }
        for (var key in param) {
            qstring.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]));
        }
        qstring = qstring.join('&');
        var StringToSign = 'GET' + '&' + encodeURIComponent('/') + '&' + encodeURIComponent(qstring);
        accessSecret = accessSecret + '&';
        var signature = crypto.createHmac('sha1', accessSecret).update(StringToSign).digest().toString('base64');
        signature = signature.replace(/\*!/, '%2A').replace(/%7E/, '~');
        return signature;
    },
    url: function (phone, TemplateCode, TemplateParam) {
        var timestamp = moment(new Date().getTime() - 3600 * 1000 * 8).format("YYYY-MM-DDTHH:mm:ss") + 'Z';
        obj.PhoneNumbers = phone;
        obj.SignatureNonce = uuid.v1();
        obj.TemplateCode = TemplateCode;
        obj.TemplateParam = TemplateParam;
        obj.Timestamp = timestamp;
        var sign = this.sign(obj, config.AppSecret);
        var arr = [];
        for (var p in obj) {
            arr.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        arr.push(encodeURIComponent('Signature') + '=' + encodeURIComponent(sign));
        var msg = arr.join('&');
        var sendurl = alidayuUrl + '?' + msg;
        return sendurl;
    },
};
// 验证函数
// sms.sendMessage("15993339727","SMS_100850007","{\"code\":\"" + "${code}" + "\"}",function (result) {
//     console.log('>>>'+result);
// });

module.exports = sms;