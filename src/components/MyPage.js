import React, { useState } from 'react';
import profileImage from '../images/profile.jpeg';

function MyPage() {
  // 사용자 정보 상태 초기화
  const [user, setUser] = useState({
    name: '세연',
    image: null, // 이미지 파일 상태 (파일이 업로드되면 Data URL로 저장)
    imageSize: 90,
  });

  // 사용자 이름 변경 핸들러
  const handleNameChange = (e) => {
    setUser(prevUser => ({
      ...prevUser, // 이전 상태의 모든 프로퍼티 복사
      name: e.target.value
    }));
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져오기
    if (file) {
      const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
      // 파일이 읽힌 후 호출되는 함수
      reader.onloadend = () => {
        setUser(prevUser => ({
          ...prevUser,
          image: reader.result // 이미지 파일의 Data URL을 상태에 저장
        }));
      };
      // 파일을 Data URL로 읽기 시작
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
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default MyPage;

/**
 * const handleNameChange = (e) => {
 *  setUser(prevUser => ({
 *        ...prevUser,
 *        name: e.target.value 
 *     }));
 *   };
 * 
 * 현재 상태 유지: prevUser 객체의 기존 프로퍼티는 전개 연산자 ...prevUser를 통해 그대로 유지된다.
 * 특정 프로퍼티 업데이트: 입력 필드에서 새로 입력한 값을 name 프로퍼티로 설정하여 상태를 업데이트한다.
 * 
 * accept="image/*"
 * 
 * 파일 형식 제한: accept 속성은 사용자가 선택할 수 있는 파일의 형식을 제한한다. 
 * accept="image/*"는 이미지 파일만 선택할 수 있도록 설정한다. 
 * image/*는 모든 이미지 파일 유형을 의미하며, JPEG, PNG, GIF 등 다양한 이미지 포맷을 포함한다.
 * 
 * const reader = new FileReader();
 *       reader.onloadend = () => {
 *         setUser(prevUser => ({ 
 *           ...prevUser,
 *           image: reader.result
 *         }));
 *       };
 *       reader.readAsDataURL(file);
 * 
 * FileReader 객체: 파일을 읽기 위해 사용된다. 
 * reader.onloadend: 파일 읽기가 완료된 후 호출되는 이벤트 핸들러
 * reader.result: 파일의 Data URL
 * reader.readAsDataURL(file): 
 *  파일을 읽어 Data URL 형식으로 변환한다. 
 *  이 Data URL은 이미지를 인코딩한 문자열로, 브라우저에서 이미지를 표시할 때 사용한다.
 * 
 * reader.readAsDataURL(file); 호출이 나중에 나오는 이유
 * 
 * FileReader 객체의 이벤트 기반 처리 방식에 있다. 
 * FileReader를 사용하여 파일을 읽는 과정은 비동기적으로 수행이 된다.
 * 이때 파일의 데이터가 메모리에 로드되기 전에 onloadend 이벤트 핸들러가 등록된 것이다.
 * 파일이 성공적으로 읽히면, FileReader는 onloadend 이벤트를 호출한다. 
 * 이 이벤트 핸들러는 reader.result를 사용하여 파일의 내용을 액세스할 수 있게 해준다.
 * 
 * onloadend 핸들러는 FileReader가 파일을 읽기 시작하기 전에 설정하는 것이 좋다.
 * 
 * 이유 1: 핸들러가 파일 읽기 완료를 감지하기 위해
 * reader.readAsDataURL(file);를 호출하면 파일 읽기 작업이 시작되는데, 
 * 이 호출이 비동기적으로 진행되기 때문에 파일 읽기가 완료되기 전에 이벤트 핸들러를 설정해두어야 한다.
 * 만약 onloadend 핸들러를 readAsDataURL 호출 후에 설정하면, 이벤트가 발생하기 전에 핸들러가 설정되지 않을 수 있다. 
 * 결과적으로 파일 읽기 작업이 완료되었을 때 핸들러가 호출되지 않을 수 있습니다.
 * 
 * 이유 2: 비동기 작업의 타이밍 문제 방지
 * 비동기 작업이기 때문에, readAsDataURL 호출 후 파일 읽기 완료를 기다리기 전까지는 다른 코드가 실행될 수 있다. 
 * onloadend 핸들러를 readAsDataURL 호출 전에 설정하면, 
 * 파일 읽기 완료 시점에 핸들러가 제대로 작동하여 읽은 파일 데이터를 처리할 수 있다.
 */
