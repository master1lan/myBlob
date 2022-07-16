import api from "@utils/api";




//获取所有用户名字
export async function getStaticPaths(){
    const data=await fetch(api.userAllName);
    const json=await data.json();
    return {
        paths:json.data.map(value=>{return{params:{id:value}}}),
        fallback:true
    }
}

export async function getStaticProps({params}){
    // const 
}


//此页面是用于展示从别人角度看个人页面的，暂未完成