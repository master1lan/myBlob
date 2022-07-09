import { useEffect, useMemo, useState } from "react"
/**
 * hook封装
 */



export const useOnClickOutside = (ref, callback) => {
    const handler = (event) => {
        if (!ref.current?.contains(event.target)) {
            callback();
        }
    }
    useEffect(() => {
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
    useEffect(() => {
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
    const [windowWidth, setWidth] = useState(0);
    const [distance, setDistance] = useState({});
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        const { innerWidth } = window,
            targetRECT = targetELE.current,
            contentRECT = contentELE.current;
        if (perfetway === 'LR') {
            //左右，判断放在左边还是右边更合适
            const L = targetRECT.offsetLeft - contentRECT.offsetWidth,
                R = innerWidth - (targetRECT.offsetLeft + targetRECT.offsetWidth + contentRECT.offsetWidth);
            if (L >= R) {
                //放在左边
                setDistance({
                    transform: `translate(${targetRECT.offsetLeft - contentRECT.offsetWidth
                        }px,${targetRECT.offsetTop - Math.floor(contentRECT.offsetHeight / 3)
                        }px)`
                });
            } else {
                //放在右边
                setDistance({
                    transform: `translate(${targetRECT.offsetLeft + targetRECT.offsetWidth
                        }px,${targetRECT.offsetTop - Math.floor(contentRECT.offsetHeight / 3)
                        }px)`
                });
            }
        } else {
            const T=targetRECT.getBoundingClientRect().top-contentRECT.offsetHeight;
            if (T>0) {
                //放在上面
                setDistance({
                    transform: `translate(${targetRECT.offsetLeft+ (targetRECT.offsetWidth>>1)-(contentRECT.offsetWidth>>1)
                        }px,${
                            targetRECT.offsetTop-contentRECT.offsetHeight
                        }px)`
                });
            } else {
                //放在下面
                setDistance({
                    transform: `translate(${targetRECT.offsetLeft+ (targetRECT.offsetWidth>>1)-(contentRECT.offsetWidth>>1)
                        }px,${targetRECT.offsetTop + targetRECT.offsetHeight
                        }px)`
                });
            }
        }
    }, [windowWidth]);
    return distance;

}