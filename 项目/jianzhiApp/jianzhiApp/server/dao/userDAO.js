/**
 * Created by lzhan on 2017/8/25.
 */
var pool=require('./db_pool').pool;
var userSql=require('./userSql').sql;
exports.userDao={
    getPasswordById:function (telephone,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(userSql.getPasswordById,[telephone],function (error,result) {
                // console.log(telephone+'这里是电话号码');
                if(error){
                    console.log(error.message+' from getpasswordbyid');
                    callback('e004');
                    return;
                }
                console.log(result);
                callback(result);
                client.release();
            })
        })
    },

    addUser:function (user,callback) {
      console.log(user);
        this.getPasswordById(user.telephone,function (result) {
            if(result.length==0){
                pool.getConnection(function (error,client) {
                    if(error){
                        return
                    }
                    client.query(userSql.addUser,[user.telephone,user.password],function (error,result) {
                        if(error){
                            callback('e004');
                            return;
                        }
                        callback(result.affectedRows);
                        client.end();
                    })
                })
            }else {
                callback('5');
            }


        })


    },
    createToken:function (telephone,token,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(userSql.createToken,[telephone,token],function (error,result) {
                if(error){
                    console.log(error.message);
                    callback('e004');
                    return;
                }

                callback(result);
                client.release();
            })
        })
    },
    getUserIcon:function (userId,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(userSql.getUserIcon,[userId],function (error,result) {
                if(error){
                    console.log(error.message+' from getpasswordbyid');
                    callback('e004');
                    return;
                }
                console.log(result)
                callback(result);
                client.release();
            })
        })
    },
    updateUserIcon:function (userId,iconName,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                callback('e004');
                return;
            }
            client.query(userSql.updateUserIcon,[iconName,userId],function (error,result) {
                if(error){
                    console.log(error.message+' from getpasswordbyid');
                    callback('e004');
                    return;
                }

                callback(result);
                // console.log(result[0][0].result);
                client.release();
            })
        })
    },
    getUserCompany:function (userId,callback) {
        pool.getConnection(function (error,client) {
            if(error){
                return
            }
            client.query(userSql.getUserCompany,[userId],function (error,result) {
                if(error){
                    console.log(error.message+' from getpasswordbyid');
                    callback('e004');
                    return;
                }
                // console.log(result);
                callback(result);
                client.release();
            })
        })
    },
    addUserInfo:function (model,callback) {
      pool.getConnection(function (error,client) {
          if(error){
              return
          }
          client.query(userSql.selectLoginId,[model.loginId],function (error,result) {
            console.log(result);
              if(error){
                  console.log(error.message+' from getpasswordbyid');
                  callback('e004');
                  return;
              }
              if(result.length==0){
                // //插入语句
                pool.getConnection(function (error,client) {
                  if(error){
                    return
                  }
                  client.query(userSql.addUserInfo,[model.loginId,model.name,model.age,model.sex,model.telephone,
                    model.height,model.weigh],function (error,result) {
                    if(error){
                      console.log(error.message+' from getpasswordbyid');
                      callback('e004');
                      return;
                    }
                    // console.log(result);
                    callback(result.affectedRows);
                    client.release();
                  })
                })


              }else {
                //更新语句
                pool.getConnection(function (error,client) {
                  if(error){
                    return
                  }
                  client.query(userSql.updateUserInfo,[model.name,model.age,model.sex,model.telephone,
                    model.height,model.weight,model.loginId],function (error,result) {
                    if(error){
                      console.log(error.message+' from getpasswordbyid');
                      callback('e004');
                      return;
                    }
                    // console.log(result);
                    callback(result.affectedRows);
                    client.release();
                  })
                })
              }
              // console.log(result);
              // callback(result);
              // client.release();
          })
      })

    }
}
