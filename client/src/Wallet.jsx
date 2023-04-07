import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp.getPublicKey(privateKey)); // This is for an private key address 
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1 className="text-edit">Your Wallet</h1>

      <div>
      <label className="text-edit">
        Private key
        <input className="text-edit" placeholder="Type here your private-key ex :- 02CD34" value={privateKey} onChange={onChange}></input>
      </label>
      </div>
      <div className="text-edit">
        Address :- {address.slice(0,20)}...
      </div> 
          <div className="balance text-edit">Balance: {balance}</div> 
    </div>
  );
}

export default Wallet;
