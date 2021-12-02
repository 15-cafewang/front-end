import { useEffect } from "react";

const SIZE = 200;

export const useInterSectionObserver = (callback, pageRef, target, list) => {
  useEffect(() => {
    // observer 첫번째 인자로 callback(entries, observer), 두번째 인자로 options (생략 가능)
    // 관찰할 대상(target)이 등록되거나 가시성(보이는지 보이지 않는지)에 변화가 생기면 관찰자는 콜백을 실행.
    const observer = new IntersectionObserver(([entry], observer) => {
      // 순서 2. 콜백실행 : 교차상태가 false 일 때(뷰포트에 안보일 때)는 그냥 return
      if (!entry.isIntersecting) {
        return;
      }

      // 순서 2. 콜백실행 : 교차상태가 true 일때(뷰포트에 보일 때) if문 안에 동작 실행
      if (entry.isIntersecting) {
        callback(++pageRef.current);
      }
    });

    // list가 변할 때마다 useEffect가 다시 실행된다.
    // 원래 받아와야 하는 데이터 크기 보다 현재 데이터 길이가 작으면 DB에 있는 데이터를 전부 받아온거기 때문에 그때 observer의 관찰을 중지한다.
    if (pageRef.current * SIZE > list.length) {
      observer.disconnect();
      return;
    }

    // 순서 1. 관찰 대상 등록
    if (target) {
      observer.observe(target);
    }

    // clean up 콜백
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [target, list]);
};
