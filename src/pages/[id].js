import api from "@utils/api";


export default function Index({}){
    return(
        <div>hello</div>
    )
}



//获取所有用户名字
export async function getStaticPaths(){
    const data=await fetch(api.userAllName);
    const json=await data.json();
    return {
        paths:json.data.map(value=>{return{params:{id:`@${value.username}`}}}),
        fallback:false
    }
}

export async function getStaticProps({params}){
    // console.log(params);
    return {
        props:{

        }
    }
}


//此页面是用于展示从别人角度看个人页面的，暂未完成