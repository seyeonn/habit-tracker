import React, { useState } from 'react';
import profileImage from '../images/profile.jpeg';

function MyPage() {
  const [user, setUser] = useState({ // 사용자 정보 상태 초기화
    name: '세연',
    image: null, // 이미지 파일 상태 (파일이 업로드되면 Data URL로 저장)
    imageSize: 90,
  });

  // 사용자 이름 변경 핸들러
  const handleNameChange = (e) => {
    setUser(prevUser => ({
      ...prevUser,
      name: e.target.value
    }));
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져오기
    if (file) {
      const reader = new FileReader();
      // 파일이 읽힌 후 호출되는 함수
      reader.onloadend = () => {
        setUser(prevUser => ({ // 이미지 파일의 Data URL을 상태에 저장
          ...prevUser,
          image: reader.result
        }));
      };
      // 파일을 Data URL로 읽기
      reader.readAsDataURL(file);
    }
  };

  // 이미지 크기 변경 핸들러
  const handleImageSizeChange = (e) => {
    setUser(prevUser => ({
      ...prevUser,
      imageSize: parseInt(e.target.value)
    }));
  };

  return (
    <div className='myPage'>
      <p>{user.name}의 습관 기르기 프로젝트 !!!</p>
      <img
        className="avatar"
        src={user.image || profileImage} // 사용자가 업로드한 이미지가 없을 경우 기본 이미지 사용
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize, // 이미지 크기 설정
          height: user.imageSize
        }}
      />
      <div>
        <h3>프로필 수정</h3>
        <div>
          <label>
            이름:
            <input 
              type="text" 
              value={user.name}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            프로필 이미지:
            <input 
              type="file" 
              accept="image/*" // 이미지 파일만 선택 가능
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div>
          <label>
            이미지 크기:
            <input 
              type="number" 
              value={user.imageSize}
              onChange={handleImageSizeChange} 
              min="30" // 최소 크기 제한
              max="300" // 최대 크기 제한
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
