import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuoteContext } from '../context/QuoteContext';
import doorStyles from '../data/doorStyles.json';
import orderOptions from '../data/orderOptions.json';

export default function Configurator() {
  const { setConfig } = useContext(QuoteContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doorStyle: '',
    woodSpecies: '',
    finishType: '',
    construction: '',
    color: '',
    priceTier: ''
  });

  const [availableWoods, setAvailableWoods] = useState([]);

  // Handle door style change and auto-set priceTier
  const handleDoorStyleChange = (e) => {
    const selected = e.target.value;
    const matchedStyle = doorStyles.find(d => d.doorStyle === selected);

    if (matchedStyle) {
      const woodOptions = [
        matchedStyle.standardWood,
        ...matchedStyle.alternateWoods
      ];

      setAvailableWoods(woodOptions);
      setForm({
        ...form,
        doorStyle: selected,
        woodSpecies: woodOptions[0],
        priceTier: matchedStyle.priceColumn
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setConfig(form);
    navigate('/entry');
  };

  return (
    <div>
      <h2>Step 1: Choose Your Cabinet Configuration</h2>

      {/* Door Style */}
      <label>Door Style:</label>
      <select name="doorStyle" value={form.doorStyle} onChange={handleDoorStyleChange}>
        <option value="">-- Select Door Style --</option>
        {doorStyles.map((style, i) => (
          <option key={i} value={style.doorStyle}>{style.doorStyle}</option>
        ))}
      </select>

      {/* Wood Species */}
      <label>Wood Species:</label>
      <select name="woodSpecies" value={form.woodSpecies} onChange={handleChange}>
        <option value="">-- Select Wood Species --</option>
        {availableWoods.map((wood, i) => (
          <option key={i} value={wood}>{wood}</option>
        ))}
      </select>

      {/* Finish Type */}
      <label>Finish Type:</label>
      <select name="finishType" value={form.finishType} onChange={handleChange}>
        <option value="">-- Select Finish --</option>
        {orderOptions["Finish Type"]?.map((opt, i) => (
          <option key={i} value={opt.name}>{opt.name}</option>
        ))}
      </select>

      {/* Construction */}
      <label>Construction Type:</label>
      <select name="construction" value={form.construction} onChange={handleChange}>
        <option value="">-- Select Construction --</option>
        {orderOptions["Box Construction"]?.map((opt, i) => (
          <option key={i} value={opt.name}>{opt.name}</option>
        ))}
      </select>

      {/* Optional: Color */}
      <label>Color:</label>
      <input
        name="color"
        type="text"
        placeholder="Enter color"
        value={form.color}
        onChange={handleChange}
      />

      <br /><br />
      <button onClick={handleNext} disabled={!form.doorStyle}>Next</button>
    </div>
  );
}
