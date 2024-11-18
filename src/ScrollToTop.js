import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation(); // 現在のパスを取得

    useEffect(() => {
        window.scrollTo(0, 0); // ページの一番上にスクロール
    }, [pathname]); // パスが変わるたびに実行

    return null;
};

export default ScrollToTop;
