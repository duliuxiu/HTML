/**
 * Created by Administrator on 2017/9/26 0026.
 */
exports.sql={
    getAllCompanyEnds:'SELECT applyID,positionID,userID,`status`,companyID,jobname,duration,PartTimeTypeID,workplace,recruitNumber,username,parttimetype.type from apply join position on apply.positionID = position.ID JOIN `user`on apply.userID = `user`.ID  JOIN parttimetype on PartTimeTypeID = parttimetype.ID  where status ="已拒绝" and companyID = (SELECT company.ID FROM `user`,company WHERE company.employer=`user`.ID AND `user`.loginID = ?)'
};