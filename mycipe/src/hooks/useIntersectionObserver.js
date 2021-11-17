import { useEffect } from "react";

const SIZE = 7;

export const useInterSectionObserver = (callback, pageRef, target, list) => {
  useEffect(() => {
    // observer 첫번째 인자로 callback, 두번째 인자로 options
    const observer = new IntersectionObserver(([entry], observer) => {
      // 교차상태가 false 일 때는 그냥 return
      if (!entry.isIntersecting) return;

      // 교차상태 일때 실행하는 콜백 정의
      if (entry.isIntersecting) {
        callback(++pageRef.current);
      }
    });

    // 원래 받아와야 하는 데이터 크기 보다 현재 데이터 길이가 작으면 DB에 있는 데이터를 전부 받아온거기 때문에 observer를 중지
    if (pageRef.current * SIZE > list.length) {
      observer.disconnect();
      return;
    }

    // 로딩중일 때, observer가 target을 관찰
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [target, list]);
};
