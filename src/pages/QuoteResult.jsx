import { useContext } from 'react';
import { QuoteContext } from '../context/QuoteContext';
import cabinetData from '../data/cabinetData.json';
import orderOptions from '../data/orderOptions.json'; 

export default function QuoteResult() {
  const { config, cabinetEntries } = useContext(QuoteContext);

  const getBasePrice = (sku) => {
    const item = cabinetData.find(c => c.sku === sku);
    if (!item) return 0;
    return item.prices[config.priceTier] || 0;
  };

  const getMultiplier = () => {
    let multiplier = 1.0;

    
    const finish = orderOptions["Finish Type"]?.find(f => f.name === config.finishType);
    const construction = orderOptions["Box Construction"]?.find(c => c.name === config.construction);

    if (finish && typeof finish.upcharge === 'number') multiplier += finish.upcharge;
    if (construction && typeof construction.upcharge === 'number') multiplier += construction.upcharge;

    return multiplier;
  };

  const multiplier = getMultiplier();

  const total = cabinetEntries.reduce((sum, entry) => {
    const base = getBasePrice(entry.sku);
    return sum + base * multiplier * Number(entry.quantity);
  }, 0);

  return (
    <div>
      <h2>Final Quote</h2>
      <h3>Selections:</h3>
      <ul>
        {Object.entries(config).map(([k, v]) => (
          <li key={k}><strong>{k}:</strong> {v}</li>
        ))}
      </ul>

      <h3>Cabinets:</h3>
      <ul>
        {cabinetEntries.map((cab, i) => {
          const base = getBasePrice(cab.sku);
          const adjusted = (base * multiplier).toFixed(2);
          return (
            <li key={i}>
              {cab.quantity}x {cab.sku} → Base: ${base}, Final: ${adjusted} each
            </li>
          );
        })}
      </ul>

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
