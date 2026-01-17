import { useState, useEffect } from 'react';
import ExcelUpload from './components/ExcelUpload';
import CertificatePreview from './components/CertificatePreview';
import { toTitleCase } from './utills/textFormat';

export default function App() {
  const [students, setStudents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [zoom, setZoom] = useState(25);

  const formattedStudents = students.map((s) => ({
    name: toTitleCase(s.NAME),
    category: s.CATEGORY,
    position: s.PRIZE,
    date: '15 JAN 2026',
  }));

  // Fit to screen
  const fitToScreen = () => {
  const screenWidth = window.innerWidth;
  const certWidth = 3579;
  const newZoom = Math.floor((screenWidth / certWidth) * 100);
  setZoom(newZoom);
};

  return (
    <div className='flex flex-col items-center justify-center gap-5 p-4'>
      <div className='flex items-center justify-center'>
        <ExcelUpload onDataLoaded={setStudents} />

        <select
          className='mb-4 p-2 border'
          onChange={(e) => setActiveIndex(Number(e.target.value))}
        >
          {formattedStudents.map((s, i) => (
            <option key={i} value={i}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex items-center gap-4 mb-4'>
        <label>Zoom:</label>
        <input
          type='range'
          min='1'
          max='100'
          step='1'
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <span>{zoom}%</span>

        <button className='px-3 py-1 border rounded' onClick={fitToScreen}>
          Fit to Screen
        </button>

        <button
          className='px-3 py-1 border rounded'
          onClick={() => setZoom(25)}
        >
          Reset
        </button>
      </div>

      {formattedStudents.length > 0 && (
        <>
          <CertificatePreview
            student={formattedStudents[activeIndex]}
            scale={zoom/100}
          />
        </>
      )}
    </div>
  );
}
