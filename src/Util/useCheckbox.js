import {useEffect, useState} from "react";
export function useCheckbox(dataCount) {
    const [isAllChecked, setAllChecked] = useState(false);
    const [checkedState, setCheckedState] = useState(new Array(dataCount).fill(false));
    const [checkedCount, setCheckedCount] = useState(0);

    useEffect(()=>{
        getCheckedRows()
        getCheckedRowsCount()
    }, [checkedState])

    const handleAllCheck = () => {
        setAllChecked((prev) => !prev);
        let array = new Array(dataCount).fill(!isAllChecked);
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
        const rows = document.querySelectorAll("#merge_list tbody tr");
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
        setCheckedState(new Array(dataCount).fill(false));
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

export function useCheckbox2(dataCount) {
    const [isAllChecked2, setAllChecked2] = useState(true);
    const [checkedState2, setCheckedState2] = useState(new Array(dataCount).fill(false));
    const [checkedCount2, setCheckedCount2] = useState(0);

    useEffect(() => {
        const newCheckedState = new Array(dataCount).fill(isAllChecked2);
        setCheckedState2(newCheckedState);
    }, [isAllChecked2, dataCount]);

    useEffect(()=>{
        getCheckedRows2()
        getCheckedRowsCount2()
    });

    useEffect(() => {
        const newCheckedState = new Array(checkedState2.length).fill(isAllChecked2);
        setCheckedState2(newCheckedState);
    }, [isAllChecked2]);

    const handleAllCheck2 = () => {
        setAllChecked2(!isAllChecked2);
        const array = new Array(checkedState2.length).fill(!isAllChecked2);
        setCheckedState2(array);
    };


    const handleMonoCheck2 = (position) => {
        const updatedCheckedState = checkedState2.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState2(updatedCheckedState);
        const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
            if (currentState === true) {
                return sum + 1;
            }
            return sum;
        }, 0);
        // setAllChecked2(checkedLength === updatedCheckedState.length);
    };

    // const handleMonoCheck2 = (position) => {
    //     const updatedCheckedState = checkedState2.map((item, index) =>
    //         index === position ? !item : item
    //     );
    //     setCheckedState2(updatedCheckedState);
    //     setAllChecked2(updatedCheckedState.every(state => state));
    // };

    const getCheckedRows2 = () => {
        const rows = document.querySelectorAll("#merge_modal tbody tr");
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

    const getCheckedRowsCount2 = () => {
        const count = getCheckedRows2();
        setCheckedCount2(count);
    };

    const handleResetCheck2 = () => {
        setAllChecked2(false);
        setCheckedState2([]);
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