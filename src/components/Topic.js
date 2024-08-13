import React, { useState } from 'react';

function Topic() {
  // 상태 초기화
  const [topic, setTopic] = useState('');
  const [savedTopic, setSavedTopic] = useState(''); // 저장된 주제 
  const [isEditing, setIsEditing] = useState(false);

  // 입력 값 변경 처리
  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  // 저장 처리
  const handleSave = () => {
    if (topic.trim() !== '') {
      setSavedTopic(topic);
      setIsEditing(false);
    }
  };

  // 수정 시작 처리
  const handleEditStart = () => {
    setIsEditing(true);
  };

  // 수정 취소 처리
  const handleEditCancel = () => {
    setTopic(savedTopic); // 수정 취소 시 저장된 값으로 복원
    setIsEditing(false);
  };

  return (
    <div className="topic">
      <h1>My Goal</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={topic}
            onChange={handleInputChange}
            placeholder="목표 입력"
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </div>
      ) : (
        <div>
          <p>{savedTopic || '목표 주제를 정해주세요.'}</p>
          <button onClick={handleEditStart}>수정</button>
        </div>
      )}
    </div>
  );
}

/**
 * Today I Learned
 * || 연산자는 두 개의 값을 비교하여 첫 번째 값이 falsy (즉, null, undefined, 0, NaN, 빈 문자열 '', false 등)일 때 두 번째 값을 반환
 *  
 * 삼항 연산자
 * 구문: condition ? valueIfTrue : valueIfFalse
 * 사용 방법: 조건(Condition)에 따라 두 가지 값 중 하나를 선택하는 간결한 방법입니다.
 * 용도: 조건부 렌더링, 간단한 조건부 로직 처리 등에서 유용합니다.
 */

export default Topic;
