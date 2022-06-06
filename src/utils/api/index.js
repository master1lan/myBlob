
const articlePath=`http://127.0.0.1:7001/api/blob`;
const userPath=`http://127.0.0.1:7001/api/user`;

export default{
    "articleSave":`${articlePath}/save`,
    "articleSearch":`${articlePath}/search`,
    "articles":`${articlePath}/`,
    "articleIds":`${articlePath}/id`,
    "userRegister":`${userPath}/register`,
    "userLogin":`${userPath}/login`,
    "userLoginWithjwt":`${userPath}/login_jwt`,
    "userInfo":`${userPath}/get_userinfo`,
    "changeInfo":`${userPath}/edit_userinfo`,
}