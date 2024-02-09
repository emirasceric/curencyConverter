import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [selectedCurrency1, setSelectedCurrency1] = useState("EUR");
  const [selectedCurrency2, setSelectedCurrency2] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [currencies, setCurrencies] = useState([]);

  // Vaš API ključ
  const apiKey = "PI5DYvZkXw79dcttXnne3ARnxaxfBGum";

  useEffect(() => {
    const fetchRates = async () => {
      if (!amount) return;
      try {
        const response = await fetch(`https://api.apilayer.com/currency_data/convert?to=${selectedCurrency2}&from=${selectedCurrency1}&amount=${amount}`, {
          method: 'GET',
          headers: {
            'apikey': apiKey
          }
        });
        const data = await response.json();
        setConvertedAmount(data.result);
      } catch (error) {
        console.error("Error fetching conversion:", error);
      }
    };

    fetchRates();
  }, [selectedCurrency1, selectedCurrency2, amount, apiKey]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.apilayer.com/currency_data/list", {
          method: 'GET',
          headers: {
            'apikey': apiKey
          }
        });
        const data = await response.json();
        setCurrencies(Object.keys(data.currencies));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, [apiKey]);

  const handleSwitch = () => {
    setSelectedCurrency1(selectedCurrency2);
    setSelectedCurrency2(selectedCurrency1);
  };

  return (
    <div className="App">
      <label>
        Iznos:
        <input
          placeholder="Unesite iznos"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <br />

      <label>
        Valuta 1:
        <select
          value={selectedCurrency1}
          onChange={(e) => setSelectedCurrency1(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>

      <br />

      <button onClick={handleSwitch}>⇔</button>

      <br />

      <label>
        Valuta 2:
        <select
          value={selectedCurrency2}
          onChange={(e) => setSelectedCurrency2(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>

      <br />
      <br />

      <p className="iznos">
        Konvertirani iznos: {Number(convertedAmount).toFixed(3)} {selectedCurrency2}
      </p>
    </div>
  );
};

export default App;
