import React, { useState, useEffect } from 'react';
import './App.css';




const App = () => {
  // koristimo useState hook da bismo mogli mijenjati vrijednosti drop lista i inputa
  const [selectedCurrency1, setSelectedCurrency1] = useState('EUR');
  const [selectedCurrency2, setSelectedCurrency2] = useState('USD');
  const [amount, setAmount] = useState('');
  // koristimo useState hook da bismo mogli mijenjati rezultat konverzije i prikazati ga u output elementu
  const [convertedAmount, setConvertedAmount] = useState('');



  // lista valuta
  const currencies = ['EUR', 'USD', 'BAM', 'CHF', 'BTC'];



  // useEffect hook se poziva svaki puta kada se promijene vrijednosti u state-u
  useEffect(() => {
    // dohvatimo trenutne tečajeve preko API-ja
    const fetchRates = async () => {
      const response = await fetch(
        `https://api.exchangerate.host/latest?base=${selectedCurrency1}&symbols=${selectedCurrency2}`
        );
      const rates = await response.json();
    
      // izračunamo konvertirani iznos
      const rate = rates.rates[selectedCurrency2];
      const converted = (amount * rate).toFixed(2);
    
      setConvertedAmount(converted);
    };
    fetchRates();
  }, [selectedCurrency1, selectedCurrency2, amount]);



  //  // funkcija za zamjenu valuta
  const handleSwitch = () => {
    // zamijenimo odabrane valute
    setSelectedCurrency1(selectedCurrency2);
    setSelectedCurrency2(selectedCurrency1);
  };



  return (
    <div>
      <label>
        Iznos:
        <input
           placeholder='unesite iznos'
           type="number"
           value={amount}
           onChange={e => setAmount(e.target.value)}   
        />
        </label>

      <br />

      <label>
        Valuta 1:
        <select
          value={selectedCurrency1}
          onChange={e => setSelectedCurrency1(e.target.value)}>
          {currencies.map(currency => (

            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleSwitch}>&#8660;</button>
      <br />

      <label>
        Valuta 2:
        <select
          value={selectedCurrency2}
          onChange={e => setSelectedCurrency2(e.target.value)}
            >
           {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>

      <br />
      <br />
      
      <p>Konvertirani iznos: <input readOnly  defaultValue={convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, useGrouping: true })} /></p>



    </div>
  );
};

export default App;

