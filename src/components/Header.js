import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyPage from './MyPage';
import TodoList from './TodoList';
import Main from '../pages/Main';

function Header() {
  return (
      <Router>
        <header>
            <h1>Habit Tracker</h1>
            <nav>
                <Link to="/">My Habits</Link>
                <Link to="/todoList">My TodoList</Link>
                <Link to="/myPage">My Page</Link>
            </nav>
        </header>

        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/todoList" element={<TodoList />} />
            <Route path="/myPage" element={<MyPage />} />
        </Routes>
    </Router>
  );
}


/**
 * npm install react-router-dom
 * 
 * React에서 페이지 내 탐색을 처리하기 위해 react-router-dom과 같은 라우팅 라이브러리를 사용하면, 
 * <a> 태그 대신 <Link> 컴포넌트를 사용할 수 있다.
 * <Link> 컴포넌트는 React Router의 일부로, 내부 링크를 처리하고 페이지 전환을 수행한다.
 * 
 * react-router-dom 구성
 * BrowserRouter: 라우팅 기능을 제공하는 최상위 컴포넌트로 모든 라우트와 링크 컴포넌트를 이 컴포넌트 안에 배치합니다. (Router)
 * Link 컴포넌트: 내부 링크를 생성하며, to 속성에 페이지 경로를 설정한다. <a> 태그처럼 동작하지만, 페이지 전환이 브라우저의 새로 고침 없이 이루어진다.
 * Routes와 Route 컴포넌트: URL 경로와 컴포넌트를 매핑하여 라우팅을 정의한다. element 속성에 렌더링할 컴포넌트를 지정한다.
 */

export default Header;
