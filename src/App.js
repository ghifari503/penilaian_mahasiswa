import React, { useState } from 'react';
import './App.css';

function App() {
  const [penilaian, setPenilaian] = useState({});
  const [output, setOutput] = useState(null);

  const handlePenilaianChange = (aspek, mahasiswa, nilai) => {
    // Batasi nilai menjadi maksimum 10
    if (nilai > 10) {
      nilai = 10;
    }

    setPenilaian(prevState => ({
      ...prevState,
      [aspek]: {
        ...prevState[aspek],
        [mahasiswa]: nilai
      }
    }));
  };

  const handleSimpanClick = () => {
    const output = {};
    for (let aspek in penilaian) {
      output[`aspek_penilaian_${aspek}`] = {};
      for (let mahasiswa in penilaian[aspek]) {
        output[`aspek_penilaian_${aspek}`][`mahasiswa_${mahasiswa}`] = penilaian[aspek][mahasiswa];
      }
    }
    console.log(output); // Output penilaian ke konsol (bisa diganti dengan proses penyimpanan data ke backend)

    // Set output ke state
    setOutput(output);

    // Reset penilaian ke default (nilai kosong)
    setPenilaian({});
  };

  return (
    <div className="App">
      <h1>Aplikasi Penilaian Mahasiswa</h1>
      <table>
        <thead>
          <tr>
            <th>Mahasiswa</th>
            <th>Aspek Penilaian 1</th>
            <th>Aspek Penilaian 2</th>
            <th>Aspek Penilaian 3</th>
            <th>Aspek Penilaian 4</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, index) => index + 1).map(mahasiswa => (
            <tr key={mahasiswa}>
              <td>Mahasiswa {mahasiswa}</td>
              {Array.from({ length: 4 }, (_, index) => index + 1).map(aspek => (
                <td key={aspek}>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={penilaian[aspek]?.[mahasiswa] || ''}
                    onChange={e => handlePenilaianChange(aspek, mahasiswa, parseInt(e.target.value))}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSimpanClick}>Simpan</button>

      {output && (
        <div className="output-container">
          <h2>Output Penilaian</h2>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
