import styles from "./message.module.css";
import React, { useEffect } from "react";
import { render } from "react-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useSSREffect } from "@utils/hooks";
//图标
const svgType = (() => {
    const map = new Map([
        [
            'error',
            'M12.71,7.291c-0.15-0.15-0.393-0.15-0.542,0L10,9.458L7.833,7.291c-0.15-0.15-0.392-0.15-0.542,0c-0.149,0.149-0.149,0.392,0,0.541L9.458,10l-2.168,2.167c-0.149,0.15-0.149,0.393,0,0.542c0.15,0.149,0.392,0.149,0.542,0L10,10.542l2.168,2.167c0.149,0.149,0.392,0.149,0.542,0c0.148-0.149,0.148-0.392,0-0.542L10.542,10l2.168-2.168C12.858,7.683,12.858,7.44,12.71,7.291z M10,1.188c-4.867,0-8.812,3.946-8.812,8.812c0,4.867,3.945,8.812,8.812,8.812s8.812-3.945,8.812-8.812C18.812,5.133,14.867,1.188,10,1.188z M10,18.046c-4.444,0-8.046-3.603-8.046-8.046c0-4.444,3.603-8.046,8.046-8.046c4.443,0,8.046,3.602,8.046,8.046C18.046,14.443,14.443,18.046,10,18.046z'
        ],
        [
            'success',
            'M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03'
        ],
        [
            'warn',
            'M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221'
        ],
        [
            'info',
            'M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z'
        ]
    ])
    return (type) => map.get(type) || map.get('info');
})();

//单个message 
const Message = ({ msg, type, onClose }) => {
    useSSREffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => {
            t && clearTimeout(t);
        };
    }, []);
    return (
        <div className={styles.message}>
            <div>
                <svg className={styles.svgIcon}  >
                    <path fill="none" d={svgType(type)}></path>
                </svg>
            </div>
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

class MessageWrapper extends React.Component {
    state = {
        msgList: []
    }
    add = ({ type, msg }) => {
        this.setState({
            msgList: [...this.state.msgList, [type, msg, nanoid(2)]]
        })
    };
    delete = () => {
        this.setState({
            msgList: this.state.msgList.slice(1)
        })
    };
    render() {
        const msgList = this.state.msgList;
        return (
            <>
                {msgList.map(([type, msg, _id]) =>
                    <Message
                        key={_id}
                        msg={msg}
                        type={type}
                        onClose={this.delete.bind(this)}
                    />
                )}
            </>
        )
    }

}

//工厂
const message = (function () {
    let container, messageWrapper;
    //ssr
    (typeof document !== 'undefined') && (container = getContainer());
    (typeof document !== 'undefined') && (messageWrapper = render(<MessageWrapper />, container));
    const msgType = (type) => (msg) => {
        messageWrapper.add({ type, msg });
    }
    return {
        warning: msgType('warn'),
        error: msgType('error'),
        success: msgType('success'),
        info: msgType('info')
    }
})()

export default message;