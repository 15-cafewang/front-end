/* toolkit 사용법 

# 가서 읽어보세요!
cttl(커멘드)+링크클릭
전체적인 툴킷 이용: https://blog.rhostem.com/posts/2020-03-04-redux-toolkits
정의, 액션, 슬라이스 : https://chanhuiseok.github.io/posts/redux-2/

# ToolKit만 깔면, 리덕스사용을 위해 깔았던 immer thunk등의 패키지가 내장되어있음

# 명령어
NPM에서,  npm install @reduxjs/toolkit
Yarn에서, yarn add @reduxjs/toolkit


툴킷에서는 훅을 이용해서 리덕스를 관리합니다!
자세한 참고는 공식문서 https://redux-toolkit.js.org/introduction/getting-startedv 요기 공식문서에 [API reference]가서 읽어보십쇼!
여기선 자주사용할것 같은 훅만 같이볼게요!


# 스토어
{ configStore }로 쓰고, 이아이를 이용하면 
middlewayComply나 Compose등을 생략할 수 있습니다!
combineReducer처럼 reducer들을 모아 줄 수도 있슴다!



//counter 라는 리듀서가 있다고 가정하고, 스토어에서 counter를 담당하는 리듀서를 모아줌
export default configureStore({ // 2.
  reducer: {
    reducer: counterReducer, 
  },
});



# 액션
{ createAction }을 써서, 액션을 생성한다.
첫번째 파라미터는 타입, 두번째 파라미터는 payload로 들어간다.

    const addTodo = createAction("todos/add", function prepare(text) {
        return {
            payload: {
                text,
                createdAt: new Date().toISOString()
            }
        };
        });
        addTodo("Write more docs"); // 아래의 객체를 리턴한다.
    //리턴결과는 아래와 같다.
    {
        type: 'todos/add',
        payload: {
             text: 'Write more docs',
             createdAt: '2019-10-03T07:53:36.581Z'      
        }
    }
액션은 우리가 심화주차 강의에서 지금까지 쓴것과 크게 다르지 않다 !

# 리듀서
======before
const reducer = (prevState, action) => {
 switch (action.type) {
   case "LOG_IN":
     return {
       ...prevState,
       isLogIn: true,
       userId: action.data.userId,
       data: action.data
     };
     
     
======after
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: 'John'
  age: 20
};
const userSlice = createSlice({
  name: 'USERS',
  initialState,
  reducers: {
    setName(state, action) {
      const name = action.payload;
      state.name = name;
    },
    setAge(state, action) {
      const age = action.payload;
      state.age = age;
    }
  }
})
export const { setName, setAge } = userSlice.actions;
export default userSlice.reducer; 
**/

/*
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

// redux toolkit은 immer 라이브러리를 사용하기 때문에, mutable 하게 로직을 작성 할 수 있다.
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

// 각 리듀서 함수 마다 액션이 생성된다.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice;
*/
