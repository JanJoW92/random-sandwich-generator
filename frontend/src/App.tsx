import React, { useState } from "react";

const App: React.FC = () => {
  const [sandwiches, setSandwiches] = useState<
    { bread: string; main: string; sauces: string[]; vegetables: string[]; spicy: boolean }[]
  >([]);

  const breads = ["Brown Bread", "Milk Bread", "White Bread", "Sugar-free Bread"];
  const mains = ["Chicken", "Beef", "Mutton"];
  const sauces = ["Mayo", "Ketchup", "Mustard", "Hot Sauce", "Ranch", "Sriracha", "Chili Garlic Sauce"];
  const spicyList = ["Hot Sauce", "Sriracha", "Chili Garlic Sauce"];

  function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getSauces(): string[] {
    const selected: string[] = [];
    while (selected.length < 2) {
      const s = getRandom(sauces);
      if (!selected.includes(s)) selected.push(s);
    }
    return selected;
  }

  function getVegetables(main: string): string[] {
    let vegList: string[] = [];
    if (main === "Beef") vegList = ["Lettuce", "Tomatoes"];
    if (main === "Chicken") vegList = ["Cucumbers", "Onions"];
    if (main === "Mutton") vegList = ["Basil", "Olives", "Grated Carrot"];

    const selected: string[] = [];
    const count = Math.floor(Math.random() * vegList.length) + 1;
    while (selected.length < count) {
      const v = getRandom(vegList);
      if (!selected.includes(v)) selected.push(v);
    }
    return selected;
  }

  function createSandwich() {
    const bread = getRandom(breads);
    const main = getRandom(mains);
    const sauceList = getSauces();
    const vegetables = getVegetables(main);
    const isSpicy = sauceList.some((s) => spicyList.includes(s));

    setSandwiches([...sandwiches, { bread, main, sauces: sauceList, vegetables, spicy: isSpicy }]);
  }

  function removeSandwich(index: number) {
    setSandwiches(sandwiches.filter((_, i) => i !== index));
  }

  return (
    <div className="app">
      <style>{`
        body {
      
        .app {
          padding: 40px;
          background-image: url(https://static.vecteezy.com/system/resources/previews/066/300/848/non_2x/tasty-sandwiches-with-meat-on-plates-ingredients-arranged-on-background-for-menu-free-photo.jpg);
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          font-family: Segoe UI, sans-serif;
          text-align: center;
          min-height: 100vh;
        }

        h1 {
          color: #074107;
          margin-bottom: 30px;
        }

        button.create {
          padding: 12px 24px;
          background: linear-gradient(90deg, #6dd5ed, #2193b0);
          color: white;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, background 0.3s;
        }

        button.create:hover {
          background: linear-gradient(90deg, #2193b0, #6dd5ed);
          transform: scale(1.1);
        }

        .sandwich-list {
          max-width: 600px;
          margin: 20px auto;
        }

        .sandwich {
          background: radial-gradient(#ffffff, #eee, #8b8b8b);
          border-radius: 12px;
          padding: 8px;
          margin-bottom: 25px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          position: relative;
          animation: fadeIn 0.5s ease;
        }

        .sandwich:hover {
          transform: scale(1.03);
          transition: transform 0.2s ease;
        }

        .remove-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
        }

        .remove-btn:hover {
          background-color: #c0392b;
        }

        ul {
          list-style: none;
          padding-left: 0;
        }

      `}</style>

      <h1>🥪 Random Sandwich Creator</h1>

      <button className="create" onClick={createSandwich}>
        Create Sandwich
      </button>

      <div className="sandwich-list">
        {sandwiches.map((s, index) => (
          <div className="sandwich" key={index}>
            <button className="remove-btn" onClick={() => removeSandwich(index)}>
              Remove
            </button>
            <h3>🥪 Your Sandwich</h3>
            <ul>
              <li><b>Bread:</b> {s.bread}</li>
              <li><b>Main:</b> {s.main}</li>
              <li><b>Sauces:</b> {s.sauces.join(", ")}</li>
              <li><b>Vegetables:</b> {s.vegetables.join(", ")}</li>
              <li><b>Spicy:</b> {s.spicy ? "Yes 🌶️" : "No"}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;