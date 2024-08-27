import React, { useState } from 'react';
import '../habitList.css'; // 테이블 스타일을 위한 CSS 파일

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

function HabitList() {
  // 상태 초기화
  const [rows, setRows] = useState('');
  const [tableData, setTableData] = useState([]);
  const [goalCount, setGoalCount] = useState(0); // 'O'의 개수를 저장할 상태
  const [totalRows, setTotalRows] = useState(0); // 총 행의 개수를 저장할 상태
  const [totalCells, setTotalCells] = useState(0); // 총 셀의 개수를 저장할 상태

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
          // 각 셀의 값을 생성하여 현재 행 배열에 추가 (기본값은 'X')
          row.push('X');
        }
  
        // 현재 행 배열을 2차원 배열에 추가
        data.push(row);
      }
  
      setTableData(data); // 생성된 2차원 배열을 상태에 저장
      setGoalCount(0); // 테이블 생성 시 'O'의 개수 초기화
      setTotalRows(rowCount); // 총 행의 개수 저장
      setTotalCells(rowCount * daysOfWeek.length); // 총 셀의 개수 계산 및 저장
    } else {
      setTableData([]); // 입력이 유효하지 않은 경우 빈 배열로 초기화
      setGoalCount(0); // 'O'의 개수 초기화
      setTotalRows(0); // 총 행의 개수 초기화
      setTotalCells(0); // 총 셀의 개수 초기화
    }
  };

  // 셀 클릭 핸들러 함수 (rowIndex, colIndex: 클릭한 셀의 위치)
  const handleCellClick = (rowIndex, colIndex) => {
    const newTableData = tableData.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          // 클릭된 셀의 값이 'X'면 'O'로, 그렇지 않으면 'X'로 변경
          return cell === 'X' ? 'O' : 'X';
        }
        return cell;
      })
    );

    setTableData(newTableData);

    // 'O'의 개수를 새로 계산하여 상태 업데이트
    const countGoal = newTableData.flat().filter(cell => cell === 'O').length;
    setGoalCount(countGoal);
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
