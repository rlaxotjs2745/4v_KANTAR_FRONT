import {useEffect, useState} from "react";
export function useCheckbox() {
    const [isAllChecked, setAllChecked] = useState(false);
    const [checkedState, setCheckedState] = useState(new Array(99).fill(false));
    const [checkedCount, setCheckedCount] = useState(0);

    useEffect(()=>{
        getCheckedRows()
        getCheckedRowsCount()
    })

    const handleAllCheck = () => {
        setAllChecked((prev) => !prev);
        let array = new Array(99).fill(!isAllChecked);
        setCheckedState(array);
    };

    const handleMonoCheck = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
            if (currentState === true) {
                return sum + 1;
            }
            return sum;
        }, 0);
        setAllChecked(checkedLength === updatedCheckedState.length);
    };

    const getCheckedRows = () => {
        const rows = document.querySelectorAll("tbody tr");
        let checkedRows = 0;
        rows.forEach((row, index) => {
            const checkbox = row.querySelector("input[type='checkbox']");
            if (checkbox.checked) {
                row.classList.add("selected");
                checkedRows++;
            } else {
                row.classList.remove("selected");
            }
        });
        return checkedRows;
    };

    const getCheckedRowsCount = () => {
        const count = getCheckedRows();
        setCheckedCount(count);
    };

    const handleResetCheck = () => {
        setAllChecked(false);
        setCheckedState(new Array(99).fill(false));
    };

    return {
        isAllChecked,
        checkedState,
        checkedCount,
        handleAllCheck,
        handleMonoCheck,
        getCheckedRows,
        getCheckedRowsCount,
        handleResetCheck,
    };

}