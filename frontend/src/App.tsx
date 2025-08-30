import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, AppBar, Toolbar, Container } from "@mui/material";
import { useState } from "react";

type Sandwich = {
  bread: string;
  main: string;
  sauces: string[];
  vegetables: string[];
  isSpicy: boolean;
};

function HomePage() {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);

  const getBread = () => {
    const breads = ["Brown Bread", "Milk Bread", "White Bread", "Sugar-free Bread"];
    return breads[Math.floor(Math.random() * breads.length)];
  };

  const getMain = () => {
    const mains = ["Chicken", "Beef", "Mutton"];
    return mains[Math.floor(Math.random() * mains.length)];
  };

  const getSauce = () => {
    const sauces = ["Mayo", "Ketchup", "Mustard", "Hot Sauce", "Ranch", "Sriracha", "Chili Garlic Sauce"];
    const selected: string[] = [];
    while (selected.length < 2) {
      const randomSauce = sauces[Math.floor(Math.random() * sauces.length)];
      if (!selected.includes(randomSauce)) selected.push(randomSauce);
    }
    return selected;
  };

  const getVegetables = (main: string) => {
    let vegList: string[] = [];
    if (main === "Beef") vegList = ["Lettuce", "Tomatoes"];
    if (main === "Chicken") vegList = ["Cucumbers", "Onions"];
    if (main === "Mutton") vegList = ["Basil", "Olives", "Grated Carrot"];

    const selectedVeggies: string[] = [];
    while (selectedVeggies.length < vegList.length) {
      const randomVeg = vegList[Math.floor(Math.random() * vegList.length)];
      if (!selectedVeggies.includes(randomVeg)) selectedVeggies.push(randomVeg);
    }
    return selectedVeggies;
  };

  const createSandwich = () => {
    const main = getMain();
    const newSandwich = {
      bread: getBread(),
      main,
      sauces: getSauce(),
      vegetables: getVegetables(main),
      isSpicy: false,
    };
    setSandwiches([...sandwiches, newSandwich]);
  };

  const removeSandwich = (index: number) => {
    setSandwiches(sandwiches.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url(https://static.vecteezy.com/system/resources/previews/066/300/848/non_2x/tasty-sandwiches-with-meat-on-plates-ingredients-arranged-on-background-for-menu-free-photo.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 3,
        pt: 20,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3, color: "#F8F8FF", textShadow: "1px 1px 10px rgb(4, 19, 0)" }}>
        🥪 Random Sandwich Generator
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={createSandwich}
        sx={{
          mb: 3,
          fontSize: "1.2rem",
          fontWeight: "bold",
          borderRadius: "20px",
          paddingX: 4,
          paddingY: 1.5,
          ":hover": { transform: "scale(1.05)" },
        }}
      >
        Create Sandwich
      </Button>

      {sandwiches.map((sandwich, index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            width: 500,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.57)",
            transition: "transform 0.2s",
            ":hover": { transform: "scale(1.02)" },
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ borderBottom: "1px solid #ccc", pb: 1 }}>
              Bread: {sandwich.bread}
            </Typography>
            <Typography variant="body1" sx={{ borderBottom: "1px solid #ccc", pb: 1 }}>
              Main: {sandwich.main}
            </Typography>
            <Typography variant="body1" sx={{ borderBottom: "1px solid #ccc", pb: 1 }}>
              Sauces: {sandwich.sauces.join(", ")}
            </Typography>
            <Typography variant="body1">
              Vegetables: {sandwich.vegetables.join(", ")}
            </Typography>

            <Button
              variant="outlined"
              color="error"
              onClick={() => removeSandwich(index)}
              sx={{
                mt: 1,
                width: "100%",
                borderRadius: "8px",
                ":hover": { backgroundColor: "#ffe5e5" },
              }}
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function AboutPage() {
  return (
    <Container sx={{ mt: 45, mb: 42.4, textAlign: "center" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 5 }}>
        About This Project
      </Typography>
      <Typography variant="h6">
        This project is a fun random sandwich generator built with React, React Router, and MUI.
        You can create custom sandwiches with random bread, fillings, sauces, and veggies.
        Explore it, generate delicious combinations, and get hungry! 🥪
      </Typography>
    </Container>
  );
}

export default function App() {
  return (
    <Router>
      <AppBar position="fixed" sx={{ backgroundColor: "#009400" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">🥪 Sandwich Generator</Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <Box sx={{ backgroundColor: "gray", color: "black", py: 2, textAlign: "center", mt: "auto" }}>
        <Typography variant="body2">© 2025 Sandwich Generator</Typography>
      </Box>
    </Router>
  );
}