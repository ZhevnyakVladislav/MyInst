import { useState, useEffect, useCallback } from 'react';

const START_LOADING_CONDITION = 250;

const useInfiniteScroll = (func, hasMoreItems, isLoading) => {
    // const [loading, setLoading] = useState(true);
    const [isFetching, setFetching] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(
        () => {
            if (!isLoading) {
                setFetching(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isLoading]
    );

    useEffect(
        () => {
            if (!isFetching) return;
            fetchData(page);

        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fetchData, isFetching]
    );

    useEffect(
        () => {
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('scroll', handleBottomScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('scroll', handleBottomScroll);
            };
        },
        [handleBottomScroll, handleScroll, hasMoreItems]
    );

    const handleScroll = useCallback(
        () => {
            if (
                document.documentElement.offsetHeight -
                (window.innerHeight + document.documentElement.scrollTop) >=
                START_LOADING_CONDITION
            ) {
                return;
            }

            hasMoreItems && setFetching(true);
        },
        [hasMoreItems]
    );

    const handleBottomScroll = useCallback(
        () => {
            if (
                window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight
            ) {
                return;
            }
            // if (isFetching) setLoading(true);
        },
        []
    );

    const fetchData = useCallback(
        (page) => {
            func(page);
            setPage(page + 1);

        },
        [func]
    );

    // return loading;
};

export default useInfiniteScroll;