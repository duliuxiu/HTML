/**
 * Created by C5 on 2017/8/1.
 */
var jsData=[{
    "companyName":"Ruff",
    "logopath":"comlogo07.png",
    "pingjiaCount":"35",
    "zhiweiCount":"18",
    "performRate":"98%",
    "web":"数据服务，硬件",
    "details":"我们是一家专注于简化物联网开发的公司，欢迎愿意不断学习成长，挑战自己舒适区的人与我们并肩奋战",
    "place":"上海",
    "type":"成长型（A轮）"
},
    {
        "companyName":"oTMS",
        "logopath":"comlogo08.png",
        "pingjiaCount":"22",
        "zhiweiCount":"27",
        "performRate":"84%",
        "web":"移动互联网",
        "details":"引领互联运输之道",
        "place":"上海",
        "type":"成长型（B轮）"
    },
    {
        "companyName":"壹米滴答",
        "logopath":"comlogo01.png",
        "pingjiaCount":"109",
        "zhiweiCount":"23",
        "performRate":"91%",
        "web":"企业服务",
        "details":"共建中国最强物流网络平台",
        "place":"上海",
        "type":"成长型（B轮）"
    },
    {
        "companyName":"斗象科技",
        "logopath":"comlogo09.png",
        "pingjiaCount":"153",
        "zhiweiCount":"33",
        "performRate":"97%",
        "web":"信息安全",
        "details":"互联网安全领导者（www.tophant.com - FreeBuf，漏洞盒子，网藤风险感知）",
        "place":"上海",
        "type":"成长型（B轮）"
    },
    {
        "companyName":"融之家",
        "logopath":"comlogo10.png",
        "pingjiaCount":"53",
        "zhiweiCount":"22",
        "performRate":"91%",
        "web":"移动互联网，金融",
        "details":"国内领先的互联网金融平台，致力于为借款人提供最好的借款服务",
        "place":"上海",
        "type":"成长型（B轮）"
    },
    {
        "companyName":"CareerFrog",
        "logopath":"comlogo11.png",
        "pingjiaCount":"73",
        "zhiweiCount":"34",
        "performRate":"99%",
        "web":"教育",
        "details":"大学生职业咨询&求职教育的领导品牌",
        "place":"上海",
        "type":"成长型（B轮）"
    }]
function showInfo() {
    var ul = document.getElementById('ul_con2');
    ul.innerHTML = '';

    for (var i = 0; i < jsonData.length; i++) {

        ul.innerHTML +=
            '<li class="fl"> ' +
            '<dl class="item_cont">' +
            '<dt class="item_cont_left">' +
            '<a href="">' +
            '<img src="./../images/'+ jsonData[i].logopath + '" alt="" width="100px" height="100px">' +
            '</a>' +
            '</dt>' +
            '<dd class="item_cont_right">' +
            '<h3><a href="">' + jsonData[i].companyName + '</a></h3>' +
            '<div class="sub_title">' +
            '<p><a href=""><span>' + jsonData[i].pingjiaCount + '</span>条面试评价</a></p>' +
            '<p><a href=""><span>' + jsonData[i].zhiweiCount + '</span>个在招职位</a></p>' +
            '<p><a href=""><span>' + jsonData[i].performRate + '</span>简历处理率</a></p>' +
            '</div>' +
            '</dd>' +
            '</dl>' +
            '<p class="details">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ jsonData[i].details + '</p>' +
            '<div class="company_state">' +
            '<span class="web"><i></i>&nbsp&nbsp' + jsonData[i].web + '</span>' +
            '<span class="place"><i></i>&nbsp&nbsp' + jsonData[i].place + '</span>' +
            ' <span class="type"><i></i>&nbsp&nbsp' + jsonData[i].type + '</span>' +
            '</div>' +
            '</li>';


    }
}