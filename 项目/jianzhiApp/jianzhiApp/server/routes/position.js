var express = require('express');
var router = express.Router();
var positionDao=require('./../dao/positionDAO').positionDao;

/* GET home page. */
router.get('/', function(req, res, next) {
    positionDao.getAllPositions(function (result) {
      if(result.length==0){
        res.json(null);
      }else{
        res.json(result);
      }
  })
});

router.post('/postJob',function (req,res,next) {
    var model = req.body;

    if(model&&model.userID){
        positionDao.getCompanyId(model.userID,function (result) {


          if(result.length!=0&&result[0]!=0){
            model.companyID=result[0].ID;
            positionDao.postJob(model,function (result) {

              if(result==1){
                positionDao.getpositionID(function (result) {
                  var positionID = result[0].positionID;
                  model.positionID=positionID;
                  positionDao.addJob(model,function (result) {

                    if(result==1){
                      res.json({'stateCode':6})
                    }else {
                      res.json({'stateCode':0})
                    }
                  })
                });
              }else {
                // if(result==5){
                  console.log('没有给职位表添加进数据');
                  res.json({'stateCode':5})
                // }
              }
            })
          }else{
            res.json({'stateCode':9})
          }
        })
    }else {
        console.log('为从页面获取到数据');
        res.send('未获取到数据');
        res.json({'stateCode':7})
    }
});

router.post('/apply',function (req,res,next) {
    // console.log(req);

    var userId=req.body[0];
    var userID=userId.name;
    // console.log(userID);
    if(userID){

        positionDao.getUserID(userID,function (result) {
            console.log(JSON.stringify(result)+'这是查询到的用户id');
            // console.log(result+'这是返回的消息');
            if(result!=0){
                var userID = result[0].ID;
                userId.userID=userID;
                positionDao.addUserid(userId,function (result) {
                    if(result==1){
                        // console.log('申请成功');
                        res.json({'stateCode':1})
                    }
                })


            }else {
                res.json({'stateCode':3})
            }


        })
    }else {
        res.json({'stateCode':2});
    }
});

router.get('/job',function (req,res,next) {
    positionDao.getAllJobs(function (result) {
        if(result.length==0){
            res.json(null);
        }else {
            res.json(result);
        }
        console.log('js');
    })
});


module.exports = router;
