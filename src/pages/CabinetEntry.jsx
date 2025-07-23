import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuoteContext } from '../context/QuoteContext';
import cabinetData from '../data/cabinetData.json'; 

export default function CabinetEntry() {
  const { setCabinetEntries } = useContext(QuoteContext);
  const [rows, setRows] = useState([{ sku: '', quantity: '', notes: '' }]);
  const navigate = useNavigate();

  const normalizeSku = (sku) => sku.trim().toUpperCase();

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);

    const isLastRow = index === rows.length - 1;
    const isFilled = updated[index].sku && updated[index].quantity;

    if (isLastRow && isFilled) {
      setRows([...updated, { sku: '', quantity: '', notes: '' }]);
    }
  };

  const handleNext = () => {
    const cleaned = rows
      .filter(r => r.sku && r.quantity)
      .map(r => ({
        ...r,
        sku: normalizeSku(r.sku)
      }));

    setCabinetEntries(cleaned);
    navigate('/quote');
  };

  const isValidSku = (sku) => {
    return cabinetData.some(c => c.sku === normalizeSku(sku));
  };

  return (
    <div>
      <h2>Step 2: Enter Cabinet SKUs</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const skuNormalized = normalizeSku(row.sku);
            const skuIsValid = !row.sku || isValidSku(row.sku);

            return (
              <tr key={i}>
                <td>
                  <input
                    value={row.sku}
                    onChange={e => handleChange(i, 'sku', e.target.value)}
                    placeholder="e.g. W1242"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={e => handleChange(i, 'quantity', e.target.value)}
                    min="1"
                  />
                </td>
                <td>
                  <input
                    value={row.notes}
                    onChange={e => handleChange(i, 'notes', e.target.value)}
                    placeholder="Optional"
                  />
                </td>
                <td>
                  {row.sku && !skuIsValid ? (
                    <span style={{ color: 'red' }}>⚠️ Not found</span>
                  ) : (
                    row.sku && <span style={{ color: 'green' }}>✓ OK</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
