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
    const rowCount = parseInt(rows, 10);

    if (!isNaN(rowCount) && rowCount > 0) {
      const data = Array.from({ length: rowCount }, (_, rowIndex) =>
        Array.from({ length: daysOfWeek.length }, (_, colIndex) => `R${rowIndex + 1}C${colIndex + 1}`)
      );
      setTableData(data);
    } else {
      setTableData([]);
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
        {tableData.length > 0 && (
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
                    <td key={colIndex}>&nbsp;</td>
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
