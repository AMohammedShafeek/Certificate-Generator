import * as XLSX from 'xlsx';

export default function ExcelUpload({ onDataLoaded }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      onDataLoaded(json);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <input
      type="file"
      accept=".xlsx,.xls"
      onChange={handleFile}
      className="mb-4"
    />
  );
}
