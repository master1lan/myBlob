import {__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT} from "@utils/modal";



export default function Tooltip(props) {
    const { children, ...resProps } = props;
    return (
        <__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT
            {...resProps}
        >
            {children}
        </__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT>
    )
}
