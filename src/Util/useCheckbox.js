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
        const rows = document.querySelectorAll(".page tbody tr");
        let checkedRows = 0;
        rows.forEach((row, index) => {
            const checkbox = row.querySelector(".page input[type='checkbox']");
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

export function useCheckbox2() {
    const [isAllChecked2, setAllChecked2] = useState(false);
    const [checkedState2, setCheckedState2] = useState(new Array(99).fill(false));
    const [checkedCount2, setCheckedCount2] = useState(0);

    useEffect(()=>{
        getCheckedRows2()
        getCheckedRowsCount2()
    })

    const handleAllCheck2 = () => {
        setAllChecked2((prev) => !prev);
        let array = new Array(99).fill(!isAllChecked2);
        setCheckedState2(array);
    };

    const handleMonoCheck2 = (position) => {
        const updatedCheckedState2 = checkedState2.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState2(updatedCheckedState2);
        const checkedLength2 = updatedCheckedState2.reduce((sum, currentState2) => {
            if (currentState2 === true) {
                return sum + 1;
            }
            return sum;
        }, 0);
        setAllChecked2(checkedLength2 === updatedCheckedState2.length);
    };

    const getCheckedRows2 = () => {
        const rows = document.querySelectorAll(".modal tbody tr");
        let checkedRows = 0;
        rows.forEach((row, index) => {
            const checkbox = row.querySelector(".modal input[type='checkbox']");
            if (checkbox.checked) {
                row.classList.add("selected");
                checkedRows++;
            } else {
                row.classList.remove("selected");
            }
        });
        return checkedRows;
    };

    const getCheckedRowsCount2 = () => {
        const count = getCheckedRows2();
        setCheckedCount2(count);
    };

    const handleResetCheck2 = () => {
        setAllChecked2(false);
        setCheckedState2(new Array(99).fill(false));
    };

    return {
        isAllChecked2,
        checkedState2,
        checkedCount2,
        handleAllCheck2,
        handleMonoCheck2,
        getCheckedRows2,
        getCheckedRowsCount2,
        handleResetCheck2,
    };

}