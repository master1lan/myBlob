import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FetchLogin, FetchRegiter } from "@utils/fetchData";
import { useDispatch } from "react-redux";
import message from "@utils/message";

export default function Home() {
  //reactHookForm api
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div><h2><span>Login or register</span></h2></div>
        <div >
          <label className={styles.label}>
            <span>账号</span>
            <input type="text" {...register("username", { required: true, pattern: /[\w\u4e00-\u9fa5]{2,12}/ })} />
            {errors.username && message.error('账号格式错误!')}
          </label>
          <label className={styles.label}>
            <span>密码</span>
            <input type="password" {...register("password", { required: true, maxLength: 30, minLength: 5, pattern: /^\w+$/i })} />
            {errors.password && message.error('密码格式错误!')}
          </label>
        </div>
        <div className={styles.bottonContainer}>
          <button type="submit" onClick={handleSubmit(FetchLogin(router, dispatch))} >登录</button>
          <button type="submit" onClick={handleSubmit(FetchRegiter(router, dispatch))} >注册</button>
        </div>
      </form>
    </div>
  )
}
