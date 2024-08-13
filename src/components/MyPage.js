import React from 'react';
import profileImage from '../images/profile.jpeg';

function MyPage() {
    return(
        <div className='myPage'>
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
        </div>
    )
}

const user = {
    name: '세연',
    imageUrl: profileImage,
    imageSize: 90,
};

export default MyPage;