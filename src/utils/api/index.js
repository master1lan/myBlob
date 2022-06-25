const isDevMode = process.env.NODE_ENV === 'development';
const localHost = '127.0.0.1:7001';
const proHost = '106.52.210.180:7001';

const hostname = isDevMode ? localHost : proHost;

// const hostname=localHost;
const baseUrl = `http://${hostname}/api`,
    articlePath = `${baseUrl}/blob`,
    userPath = `${baseUrl}/user`,
    userBlobPath = `${baseUrl}/userBlob`,
    userListsPath = `${baseUrl}/userList`,
    uploadPath = `${baseUrl}/img`;

export const URL=`http://${hostname}`; 


export default {
    "articleSave": `${articlePath}/save`,
    "articleSearch": `${articlePath}/search`,
    "articles": `${articlePath}/`,
    "articleIds": `${articlePath}/id`,
    "userRegister": `${userPath}/register`,
    "userLogin": `${userPath}/login`,
    "userLoginWithjwt": `${userPath}/login_jwt`,
    "userInfo": `${userPath}/get_userinfo`,
    "changeInfo": `${userPath}/edit_userinfo`,
    "userPublishedBlob": `${userBlobPath}/getPublishBlob`,
    "userDraftedBlob": `${userBlobPath}/getDraftBlob`,
    "userBlobUpdate": `${userBlobPath}/updateBlob`,
    "userBlobDelete": `${userBlobPath}/deleteBlob`,
    "userLists": `${userListsPath}`,
    "userdirectList": `${userListsPath}/getList`,
    "userListsCreate": `${userListsPath}/newList`,
    "userListsDelete": `${userListsPath}/deleteList`,
    "userListsFavor": `${userListsPath}/favorBlob`,
    "userListsUnfavor": `${userListsPath}/unfavorBlob`,
    "userLOGOupload": `${uploadPath}/uploadUserLOGO`,
    "uploadImg": `${uploadPath}/uploadImg`,
}