import React, {useEffect, useState} from 'react';

function InfiniteScroller({ items }) {
    const [list, setList] = useState(items ? items.slice(0, 10) : []);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false); // 추가

    useEffect(() => {
        if (items) {
            setList(items.slice(0, 20));
        }
    }, [items]);

    console.log(list, '받은 리스트 내역')

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function handleScroll() {

        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (
            scrollTop + clientHeight >= scrollHeight
        ) {
            loadMore();
        }
    }


    function loadMore() {
        setList(prevList => [...prevList, ...items.slice(prevList.length, prevList.length+perPage)]);
    }


    return (
        <>
            {list.map(item => (
                <tr>
                    <td>{item.person}</td>
                    <td>{item.chapter}</td>
                    <td>{item.subchapter}</td>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                </tr>
            ))}
            {/*<button type="button" onClick={loadMore}>Load More</button>*/}
        </>
    );
}

export default InfiniteScroller;