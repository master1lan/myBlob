import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import { userLogin } from "@utils/context";
export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { setUser, user, isLoggedIn } = userLogin();
  const onSubmit = data => {
    console.log({ setUser, user, isLoggedIn });
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div >
          <label className={styles.label}>
            <span>账号</span>
            <input defaultValue="test" {...register("example")} />
          </label>
          <label className={styles.label}>
            <span>密码</span>
            <input {...register("exampleRequired", { required: true })} />
          </label>
        </div>
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <div className={styles.bottonContainer}>
          <button type="submit" >注册</button>
          <button>登录</button>
        </div>
      </form>
    </div>
  )
}
