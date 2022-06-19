import getConfig from 'next/config';
const {hostname}=getConfig().publicRuntimeConfig;
const baseUrl=`http://${hostname}/api`;
const articlePath=`${baseUrl}/blob`;
const userPath=`${baseUrl}/user`;
const userBlobPath=`${baseUrl}/userBlob`;
const userListsPath=`${baseUrl}/userList`;

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
    "userPublishedBlob":`${userBlobPath}/getPublishBlob`,
    "userDraftedBlob":`${userBlobPath}/getDraftBlob`,
    "userBlobUpdate":`${userBlobPath}/updateBlob`,
    "userBlobDelete":`${userBlobPath}/deleteBlob`,
    "userLists":`${userListsPath}`,
    "userdirectList":`${userListsPath}/getList`,
    "userListsCreate":`${userListsPath}/newList`,
    "userListsDelete":`${userListsPath}/deleteList`,
    "userListsFavor":`${userListsPath}/favorBlob`,
    "userListsUnfavor":`${userListsPath}/unfavorBlob`
}