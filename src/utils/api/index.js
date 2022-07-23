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
    uploadPath = `${baseUrl}/img`,
    recommendPath=`${baseUrl}/next`;

export const URL=`http://${hostname}`; 


export default {
    "articleSearch": `${articlePath}/search`,
    "articles": `${articlePath}/`,
    "articleIds": `${articlePath}/id`,
    "userRegister": `${userPath}/register`,
    "userLogin": `${userPath}/login`,
    "userLoginWithjwt": `${userPath}/login_jwt`,
    "userAllName":`${userPath}/all`,
    "userInfo": `${userPath}/get_userinfo`,
    "changeInfo": `${userPath}/edit_userinfo`,
    "userPublishedBlob": `${userBlobPath}/getPublishBlob`,
    "userDraftedBlob": `${userBlobPath}/getDraftBlob`,
    "userBlobUpdate": `${userBlobPath}/updateBlob`,
    "userBlobDelete": `${userBlobPath}/deleteBlob`,
    "userListsAll":`${userListsPath}/all`,
    "userLists": `${userListsPath}`,
    "userdirectList": `${userListsPath}/getList`,
    "userListsCreate": `${userListsPath}/newList`,
    "userListsDelete": `${userListsPath}/deleteList`,
    "userListsFavor": `${userListsPath}/favorBlob`,
    "userListsUnfavor": `${userListsPath}/unfavorBlob`,
    "uploadImg": `${uploadPath}/uploadImg`,
    "recommendBlobs":`${recommendPath}/getBlobsRecommend`,
    "recommendUsers":`${recommendPath}/getUsersRecommend`,
}