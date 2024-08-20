import React, { useState } from 'react';
import '../habitList.css'; // 테이블 스타일을 위한 CSS 파일

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

function HabitList() {
  // 상태를 초기화합니다.
  const [rows, setRows] = useState('');
  const [tableData, setTableData] = useState([]);

  // 입력 값이 변경될 때 호출되는 함수
  const handleRowChange = (e) => {
    setRows(e.target.value);
  };

  // 테이블 생성 버튼 클릭 처리
  const handleGenerateTable = () => {
    const rowCount = parseInt(rows, 10); // 10진수인 Int형으로 타입 변환
  
    if (!isNaN(rowCount) && rowCount > 0) {
      const data = []; // 2차원 배열을 저장할 빈 배열
  
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const row = []; // 현재 행을 저장할 빈 배열
  
        for (let colIndex = 0; colIndex < daysOfWeek.length; colIndex++) {
          // 각 셀의 값을 생성하여 현재 행 배열에 추가
          row.push(`R${rowIndex + 1}C${colIndex + 1}`);
        }
  
        // 현재 행 배열을 2차원 배열에 추가
        data.push(row);
      }
  
      setTableData(data); // 생성된 2차원 배열을 상태에 저장
    } else {
      setTableData([]); // 입력이 유효하지 않은 경우 빈 배열로 초기화
    }
  };
  
  return (
    <div className="habitList">
      <div>
        <label>
          Goal Weeks :
          <input type="number" value={rows} onChange={handleRowChange} placeholder="weeks" />
        </label>
        <button onClick={handleGenerateTable}>생성</button>
      </div>
      <div>
        {tableData.length > 0 && ( // 해당 조건이 true일 때만 <table> 내부 요소가 렌더링된다.
          <table>
            <thead>
              <tr>
                {daysOfWeek.map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HabitList;

/**
 * {tableData.length > 0 && (
 *  <table>
 *    ...
 *  </table>
 * )}
 * 
 * -> 논리 AND (&&) 연산자를 사용한 조건부 렌더링
 * tableData.length > 0 조건이 true일 때만 <table> 요소가 렌더링됩니다.
 * 그렇지 않으면 아무것도 렌더링 되지 않는다.
 * 
 * 
 */
