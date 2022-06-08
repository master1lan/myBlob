/**
 * 今天来实现antd的message组件
 * message.success //成功
 * message.error //错误
 * message.warning //警告
 * message.info //信息
 * message.loading //加载
 * 第一步应该创建一个容器，每一个message都可以提前点击销毁或者定时销毁
 */
import { unmountComponentAtNode, render } from "react-dom";
import { useEffect, useRef } from "react";
import styles from "./message.module.css";


//message 组件
const Message = ({ msg, onClose }) => {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => {
            t && clearTimeout(t);
        };
    }, []);
    return (
        <div className={styles.message}>
            <p><span>{msg}</span></p>
        </div>
    );
};

const getContainer = () => {
    const container = document.querySelector('#MessageWrapper');
    if (!container) {
        const _container = document.createElement('div');
        _container.id = 'MessageWrapper';
        _container.className = styles.MessageWrapper;
        document.body.appendChild(_container);
        return _container;
    }
    return container;
}

//公用message方法
const _message = (type) => (msg) => {
    const container = getContainer();
    const _dom = document.createElement("div");

    container.appendChild(_dom);

    const hanldeClose = () => {
        unmountComponentAtNode(_dom);
        container.removeChild(_dom);
    };

    render(
        <Message
            msg={msg}
            type={type}
            onClose={hanldeClose}
        />,
        _dom
    );
};
const Wrapper=(type)=>{
    //先获得挂载结点
    let container;
    (typeof document!=='undefined')&&(container=getContainer());
    //
    const hanldeClose = (_dom)=>() => {
        unmountComponentAtNode(_dom);
        // container.removeChild(_dom);
    };
    return (msg)=>{
        const _dom = document.createElement("div");
        render(<Message 
        msg={msg}
        onClose={hanldeClose(_dom)}
        type={type}
        />
        ,container)

        
    }
}


const error = _message("error");
// const error=Wrapper('error');
// const warning = _message("warning");
// const success = _message("success");
// const info = _message("info");

export default {
    error,
//     warning,
//     success,
//     info,
};