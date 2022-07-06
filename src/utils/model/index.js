import styles from "./model.module.css";

//容器
const getContainer = () => {
    const container = document.querySelector('#ModelWrapper');
    if (!container) {
        const _container = document.createElement('div');
        _container.id = 'MessageWrapper';
        _container.className = styles.MessageWrapper;
        document.body.appendChild(_container);
        return _container;
    }
    return container;
}

const Model=(function(){
    let container;
    //ssr
    (typeof document !== 'undefined') && (container = getContainer());
    return ({children})=>()
})()