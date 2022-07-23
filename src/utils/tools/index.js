import { jwtLogin } from "@utils/middleware";


/**
* 文本框根据输入内容自适应高度
* @param                {HTMLElement}        输入框元素
* @param                {Number}                设置光标与输入框保持的距离(默认0)
* @param                {Number}                设置最大高度(可选)
*/
export function autoTextarea(elem, extra, maxHeight) {
    extra = extra || 0;
    let isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
            let val = elem.currentStyle[name];
            if (name === 'height' && val.search(/px/i) !== 1) {
                let rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            };
            return val;
        } : function (name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));
    const change = function () {
        let scrollTop, height,
            padding = 0,
            style = elem.style;
        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;
        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };
    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};



/**
 * 页面路由拦截，用在登录上
 * @param {上下文} context 
 */
export const middlewareWithLogin = async (context) => {
    const isLogin = await jwtLogin(context.req);
    if (!isLogin) {
        return {
            redirect: {
                destination: "/login"
            }
        }
    }
    return {
        props: {}
    }
}

/**
 * 获取简述
 * @param {dom节点列表} domList 
 * @returns 
 */
export function HTMLToString(domList) {
    if (!domList) {
        return '';
    }
    return domList.innerText.replaceAll('\n', '').trim();
}

/**
 * 闭包实现查询文章是否被收藏
 */
export const isBlobIncludes = (() => {
    const map = new Map();
    let oldArr;
    return (arr, targetList, target) => {
        if (!Array.isArray(arr) || !target) {
            return false;
        }
        if (!oldArr) {
            oldArr = Array.from(arr);
        } else if (oldArr.length !== arr.length) {
            map = new Map();
            oldArr = Array.from(arr);
        } else if (JSON.stringify(oldArr) !== JSON.stringify(arr)) {
            map = new Map();
            oldArr = Array.from(arr);
        }
        const temp = `${targetList}_${target}`;
        if (map.has(temp)) {
            return map.get(temp);
        }
        const targetArr = arr.find(list => list._id === targetList);
        if (!targetArr) {
            map.set(temp, false);
            for (let length = arr.length, i = 0; i < length; i++) {
                if (arr[i].content.includes(target)) {
                    map.set(temp, true);
                    break;
                }
            }
        } else {
            const res = targetArr.content.includes(target);
            map.set(temp, res);
        }
        return map.get(temp);
    }
})();

/**
 * 
 */

export function isBrowser() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/**
 * 
 * @param {Element} ele 
 */
export function geteleToBodyOffset(ele) {
    const obj = {
        offsetTop: ele.offsetTop, offsetLeft: ele.offsetLeft,
        offsetWidth: ele.offsetWidth, offsetHeight: ele.offsetHeight
    };
    while (ele.offsetParent) {
        ele = ele.offsetParent;
        obj.offsetTop += ele.offsetTop;
        obj.offsetLeft += ele.offsetLeft;
    }
    return obj;
}


/**
 * 节流函数,指连续触发事件但是在 n 秒中只执行一次函数
 */

export function thorttleFn(fn,absTime=3000){
    let time=0;
    return function(){
        let curTime=new Date();
        if(time===0){
            fn.apply(this,arguments);
            time=curTime;
        }else if(curTime-time>=absTime){
            time=curTime;
            fn.apply(this,arguments);
        }
    }
}


/**
 * 防抖函数,触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
 */

export function debounce(fn, delay) {
    // 维护一个 timer，用来记录当前执行函数状态
    let timer = null;
    return function() {
      // 清理掉正在执行的函数，并重新执行
      clearTimeout(timer);
      timer = setTimeout(()=>{fn.apply(this,arguments)}, delay);
    }
  }
