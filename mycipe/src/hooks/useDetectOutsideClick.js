import { useState, useEffect } from "react";

/**
el: React.RefObject<HTMLDivElement> 
initialState: boolean
 */
export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (el.current && !el.current.contains(e.target)) {
        // ref 객체의 current, 즉 ref에 값이 잡히는 경우 (렌더 메서드 안에서 ref가 엘리먼트에게 전달되었을 때)

        // ref 객체의 current요소가 e.target(클릭한 요소)를 포함하고 있지 않다면, 내부의 컴포넌트가 아닌 외부를 클릭한 경우

        // setIsActive(!isActive) isActive를 반대로
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
