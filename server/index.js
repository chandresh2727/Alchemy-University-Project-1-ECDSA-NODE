const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04f9864962a115dbc07472421006ba5dae784330d85dca4c47208f0fc7c601681f1dd70056f3e4807d579f7e07ce2199eabd12b42d5481dd1f35e379853ca384aa": 100,
  "0404cf8f067dd27be8dc2f5a9db58378612dc236e1a8b5bdc5fa41de374ac9dba13d404487441c396f959d3d1d234db44e2da78fdac1f2925e625beea4719ae7ff": 50,
  "046fb72628f661ef39c94f83a4af476564a45aa09ab5fd6b22c7a9c795bb0610980fdd0820392fa21ffc42ff7119b4c07baecfde3b6d9839177253f7081ae87ec3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // Sigature function 
  // Recover the public address from the public key 

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
