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
    date: '01 JAN 2026',
  }));

  // Fit to screen
  const fitToScreen = () => {
    const screenWidth = window.innerWidth;
    const certWidth = 3579;
    const newZoom = Math.floor((screenWidth / certWidth) * 100);
    setZoom(newZoom);
  };

  const generatePDFs = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/generate-certificates',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            students: formattedStudents,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      const blob = await response.blob();

      // Download ZIP
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificates.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      alert('Error generating certificates');
      console.error(error);
    }
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
      <div>
        <button
          onClick={generatePDFs}
          className='px-4 py-2 bg-green-600 text-white rounded mb-4'
        >
          Generate All Certificates
        </button>
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
            scale={zoom / 100}
          />
        </>
      )}
    </div>
  );
}
