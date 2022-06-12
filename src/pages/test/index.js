import { useSelector, useDispatch } from "react-redux";
import {
    decrement,
    increment,
    incrementByAmount,
    selectTest
} from "@features/test";

export default function Test() {
    const count = useSelector(selectTest);
    const dispatch = useDispatch();
    return (
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>增加</button>
            <button onClick={() => dispatch(decrement())}>减少</button>
            <button onClick={() => dispatch(incrementByAmount(12))}>增加12</button>
        </div>
    )
}