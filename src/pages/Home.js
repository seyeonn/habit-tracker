import React from 'react';
import profileImage from '../images/profile.jpeg';
import TodoList from '../components/TodoList';

function Home() {
  return (
    <div>
      <h2>Habit Tracker</h2>
      <p> {user.name}의 습관 기르기 프로젝트 !!!</p>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
      <TodoList />
    </div>
  );
}

const user = {
    name: '세연',
    imageUrl: profileImage,
    imageSize: 90,
};

export default Home;
