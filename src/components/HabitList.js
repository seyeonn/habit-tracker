import React, { useState } from 'react';
import '../habitList.css'; // 테이블 스타일을 위한 CSS 파일

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

function HabitList() {
  // 상태 초기화
  const [weeks, setWeeks] = useState('');
  const [tableData, setTableData] = useState([]);
  const [goalCount, setGoalCount] = useState(0); // 'O'의 개수를 저장할 상태
  const [totalCells, setTotalCells] = useState(0); // 총 셀의 개수를 저장할 상태

  // 입력 값이 변경될 때 호출되는 함수
  const handleRowChange = (e) => {
    setWeeks(e.target.value); // 입력 필드의 값 저장
  };

  // 주어진 행 수로 테이블 데이터 생성
   const generateTableData = (rowCount) => {
    // rowCount X 요일 수 만큼의 배열 생성 후 'X'로 채움
    return Array.from({ length: rowCount }, () => Array(daysOfWeek.length).fill('X'));
  };

  // 테이블 데이터 업데이트 및 '0'의 갯수 카운트
  const updateTableData = (newData) => {
    setTableData(newData); // 갱신된 데이터 테이블 상태에 저장(갱신)
    setGoalCount(newData.flat().filter(cell => cell === 'O').length); // 갱신된 테이블 데이터의 '0' 갯수 카운트 갱신
  };

  // 테이블 생성 버튼 클릭 처리
  const handleGenerateTable = () => {
    const rowCount = parseInt(weeks, 10); // 10진수인 Int형으로 타입 변환

    if (!isNaN(rowCount) && rowCount > 0) {
      const newTableData = generateTableData(rowCount); // 테이블 데이터 생성 및 상태 업데이트
      setTotalCells(rowCount * daysOfWeek.length); // 총 셀의 개수 계산 및 저장
      updateTableData(newTableData);
    } else { // 유효하지 않은 입력일 경우, 테이블 및 상태 초기화
      setTableData([]);
      setGoalCount(0);
      setTotalCells(0);
    }
  };

  // 셀 클릭 핸들러 함수 (rowIndex, colIndex: 클릭한 셀의 위치)
  const handleCellClick = (rowIndex, colIndex) => {
    setTableData(prevData => {
      const newData = prevData.map((row, rIndex) => 
        rIndex === rowIndex 
          ? row.map((cell, cIndex) => cIndex === colIndex ? (cell === 'X' ? 'O' : 'X') : cell) 
          : row
      );
      updateTableData(newData); // 셀 클릭 후 테이블 데이터 업데이트 및 'O' 개수 계산
      return newData; // 새로운 테이블 데이터를 반환
    });
  };

  return (
    <div className="habitList">
      <div>
        <label>
          Goal Weeks :
          <input type="number" value={weeks} onChange={handleRowChange} placeholder="weeks" />
        </label>
        <button onClick={handleGenerateTable}>생성</button>
      </div>
      <div>
        <h3> 나의 목표 달성일 : {goalCount} / {totalCells}</h3>
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
                    <td
                      key={colIndex}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      style={{ cursor: 'pointer' }}
                    >
                      {cell}
                    </td>
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
 * const newTableData = tableData.map(row => [...row]);
 * -> 기존 tableData를 복사하여 newTableData를 생성한다.
 * 
 * newTableData.flat()
 * -> 다차원 배열을 일차원 배열로 평탄화한다.
 * -> flat() 메서드는 배열의 모든 하위 배열 요소를 하나의 배열로 병합한다.
 * 
 * 예시)
 * [
 *  ['X', 'O', 'X'],
 *  ['O', 'X', 'O'],
 *  ['X', 'X', 'O']
 * ]
 * 
 * ->
 * 
 * ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'X', 'O']
 */
