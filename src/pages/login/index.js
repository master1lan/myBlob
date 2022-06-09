import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import { userLogin } from "@utils/context";
import { useRouter } from "next/router";
import api from "@utils/api";
import Cookie from "js-cookie";
import message from "@utils/message/test";
export default function Home() {
  //reactHookForm api
  const { register, handleSubmit, formState: { errors } } = useForm();
  //context状态管理
  const { setUser, user, isLoggedIn } = userLogin();
  const router = useRouter();
  //登录函数
  const loginUser = data => {
    // console.log(JSON.stringify(data));
    message.error('输入密码'+Math.random()*100);
    message.warning('输入密码'+Math.random()*100);
    message.success('输入密码'+Math.random()*100);
    message.info('输入密码'+Math.random()*100);
    // fetch(api.userLogin,{
    //   method:"POST",
    //   headers:{
    //     'Content-Type': 'application/json'
    //   },
    //   body:JSON.stringify(data)
    // }).then(res=>res.json()).then(res=>{
    //   console.log(res);
    //   Datathen(res);
    // })
  };
  //注册函数
  const regiterUser=data=>{
    // console.log(data);
    fetch(api.userRegister,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    }).then(res=>res.json()).then(res=>{
      console.log(res);
      Datathen(res);
    })
  }
  const Datathen=res=>{
    if(res.code===500){
      //显示错误原因
      console.log(res.msg);
    }else if(res.code===200){
      //先设置好cookie
      Cookie.set('jwt',res.data.token);
      setUser({
        username:res.data.username,
        uuid:res.data.uuid
      });
      router.push("/");
    }
  }
  return (
    <div className={styles.container}>
      <form  className={styles.form}>
        <div><h2><span>Login or register</span></h2></div>
        <div >
          <label className={styles.label}>
            <span>账号</span>
            <input  {...register("username", { required: true,pattern:/[\w\u4e00-\u9fa5]{2,12}/ })} />
          </label>
          <label className={styles.label}>
            <span>密码</span>
            <input {...register("password", { required: true,maxLength:30,minLength:5,pattern:/^\w+$/i })} />
          </label>
        </div>
        <div className={styles.bottonContainer}>
          <button type="submit" onClick={handleSubmit(regiterUser)} >注册</button>
          <button type="submit" onClick={handleSubmit(loginUser)} >登录</button>
        </div>
      </form>
    </div>
  )
}
