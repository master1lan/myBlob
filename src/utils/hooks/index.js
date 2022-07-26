import { useEffect, useMemo, useState, useLayoutEffect } from "react"
import { isBrowser, geteleToBodyOffset, thorttleFn, debounce } from "@utils/tools";
import { useRouter } from "next/router";
import api from "@utils/api";
/**
 * hook封装
 */
export const useSSREffect = isBrowser() ? useLayoutEffect : useEffect;

/**
 * 
 * @param {ref} ref 
 * @param {Function} callback
 * 点击外部收起modal，此方法已废弃 
 */
export const useOnClickOutside = (ref, callback) => {
    const handler = (event) => {
        if (!ref.current?.contains(event.target)) {
            callback();
        }
    }
    useSSREffect(() => {
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, [callback, ref]);
}


export const useClientRect = (ele) => {
    const [clientRect, setClientRect] = useState(null);
    //更新元素的clientRect，使用useMemo确保只创建一次updateClientRect方法
    const updateClientRect = useMemo(() => {
        return () => {
            setClientRect(ele.current.getBoundingClientRect());
        };
    }, []);
    //只有当react组件didMount时，才能取得元素的clientRect
    useSSREffect(() => {
        if (ele.current) {
            updateClientRect();
        }
    }, []);
    return clientRect;
}

//计算tooltip的坐标
export const usePlacement = (targetELE, contentELE, perfetway = 'LR') => {
    /**
     * 根据各边界的距离先确定选择哪个方向
     * LR表示只判断左边或者右边
     * TB表示只判断上面或者下面
     */
    const [windowWidth, setWidth] = useState(1024);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [distance, setDistance] = useState({});
    useSSREffect(() => {
        setWidth(window.innerWidth);
    }, []);
    perfetway !== 'LR' && useSSREffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollDistance(window.scrollY);
                    ticking = false;
                });
            };
            ticking = true;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useSSREffect(() => {
        let ticking = false;
        const handleResize = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setWidth(window.innerWidth);
                    ticking = false;
                });
            };
            ticking = true;
        },
        handleThort=debounce(handleResize,100);
        window.addEventListener('resize', handleThort);
        return () => window.removeEventListener('resize', handleThort);
    }, []);
    useSSREffect(() => {
        const { innerWidth } = window,
            targetRECT = targetELE.current,
            contentRECT = contentELE.current,
            targetOffset = geteleToBodyOffset(targetRECT),
            contentOffset = geteleToBodyOffset(contentRECT);
        if (perfetway === 'LR') {
            //左右，判断放在左边还是右边更合适
            const L = targetOffset.offsetLeft - contentOffset.offsetWidth,
                R = innerWidth - (targetOffset.offsetLeft + targetOffset.offsetWidth + contentOffset.offsetWidth);
            if (L >= R) {
                //放在左边
                setDistance({
                    transform: `translate(${targetOffset.offsetLeft - contentOffset.offsetWidth
                        }px,${targetOffset.offsetTop - Math.floor(contentOffset.offsetHeight / 3)
                        }px)`
                });
            } else {
                //放在右边
                setDistance({
                    transform: `translate(${targetOffset.offsetLeft + targetOffset.offsetWidth
                        }px,${targetOffset.offsetTop - Math.floor(contentOffset.offsetHeight / 3)
                        }px)`
                });
            }
        } else {
            const T = targetRECT.getBoundingClientRect().top - contentOffset.offsetHeight;
            if (T > 0) {
                //放在上面
                setDistance({
                    transform: `translate(${targetOffset.offsetLeft + (targetOffset.offsetWidth >> 1) - (contentOffset.offsetWidth >> 1)
                        }px,${targetOffset.offsetTop - contentOffset.offsetHeight
                        }px)`
                });
            } else {
                //放在下面
                setDistance({
                    transform: `translate(${targetOffset.offsetLeft + (targetOffset.offsetWidth >> 1) - (contentOffset.offsetWidth >> 1)
                        }px,${targetOffset.offsetTop + targetOffset.offsetHeight
                        }px)`
                });
            }
        }
    }, [windowWidth, scrollDistance]);
    return distance;
}


