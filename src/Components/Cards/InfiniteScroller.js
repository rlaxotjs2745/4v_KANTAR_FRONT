import React, {useEffect, useState} from 'react';

function InfiniteScroller({ items }) {
    const [list, setList] = useState([]);
    const perPage = 10; // 스크롤 할때 몇개씩 불러올지
    const [isLoading, setIsLoading] = useState(false); // 추가
    const [endReached, setEndReached] = useState(false);

    useEffect(() => {
        if (items) {
            setList(items.slice(0, 20));
        }
    }, [items]); // 아이템 받아온 뒤로 기본 처음 20개 잘라서 리스트에 집어넣음.

    function loadMore() {
        setList(prevList => {
            const updatedList = [...prevList, ...items.slice(prevList.length, prevList.length + perPage)];
            return updatedList;
        });
    }

    useEffect(() => {

        console.log(list.length, '리스트 개수', items.length, '서버에서 받은 개수')
        if (list.length === items.length) {
            setEndReached(true);
        }
    }, [list, items]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

        function handleScroll() {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            if (scrollTop + clientHeight >= scrollHeight) {
                if(endReached !== true) {
                    console.log('실행 되는중')
                    loadMore();
                }
            }
        }

    }, [endReached])

    console.log(endReached)


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
            {/*{endReached ? null : <button type="button" onClick={loadMore}>더보기</button>} 지금은 더보기 버튼 가리고 무한스크롤 */}
        </>
    );
}

export default InfiniteScroller;