import logo from './logo.svg';
import './App.css';
import VideoPlayer from 'react-video-js-player';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <VideoPlayer src="https://happyvideo.s3.amazonaws.com/Lab1_manual.pdf+-+Profile+1+-+Microsoft%E2%80%8B+Edge+2021-10-04+00-35-09.mp4"/>

      </header>
    
      ;<>
  <style
    type="text/css"
    dangerouslySetInnerHTML={{
      __html:
        " .btcpay-form { display: inline-flex; align-items: center; justify-content: center; } .btcpay-form--inline { flex-direction: row; } .btcpay-form--block { flex-direction: column; } .btcpay-form--inline .submit { margin-left: 15px; } .btcpay-form--block select { margin-bottom: 10px; } .btcpay-form .btcpay-custom-container{ text-align: center; }.btcpay-custom { display: flex; align-items: center; justify-content: center; } .btcpay-form .plus-minus { cursor:pointer; font-size:25px; line-height: 25px; background: #DFE0E1; height: 30px; width: 45px; border:none; border-radius: 60px; margin: auto 5px; display: inline-flex; justify-content: center; } .btcpay-form select { -moz-appearance: none; -webkit-appearance: none; appearance: none; color: currentColor; background: transparent; border:1px solid transparent; display: block; padding: 1px; margin-left: auto; margin-right: auto; font-size: 11px; cursor: pointer; } .btcpay-form select:hover { border-color: #ccc; } #btcpay-input-price { -moz-appearance: none; -webkit-appearance: none; border: none; box-shadow: none; text-align: center; font-size: 25px; margin: auto; border-radius: 5px; line-height: 35px; background: #fff; } #btcpay-input-price::-webkit-outer-spin-button, #btcpay-input-price::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; } "
    }}
  />
  <form
    method="POST"
    action="https://btcpay277994.lndyn.com/api/v1/invoices"
    className="btcpay-form btcpay-form--block"
  >
    <input
      type="hidden"
      name="storeId"
      defaultValue="6c6v7HxhzS5cPDiupYfCYXjEZkYeKDAZAhdNKMWWMdCS"
    />
    <div className="btcpay-custom-container">
      <div className="btcpay-custom">
        <button
          className="plus-minus"
          onclick="event.preventDefault(); var el=document.querySelector('#btcpay-input-price'); var price = parseInt(el.value); if((price - 1 )< 1) { el.value = 1} else {el.value = parseInt(el.value) - 1 }"
        >
          -
        </button>
        <button
          className="plus-minus"
          onclick="event.preventDefault(); var el=document.querySelector('#btcpay-input-price'); var price = parseInt(el.value); if((price + 1 )> 20) { el.value = 20} else {el.value = parseInt(el.value) + 1 }"
        >
          +
        </button>
      </div>
      <select name="currency">
        <option value="USD" selected>
          USD
        </option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
        <option value="BTC">BTC</option>
      </select>
    </div>
    <input
      type="image"
      className="submit"
      name="submit"
      src="https://btcpay277994.lndyn.com/img/paybutton/pay.svg"
      style={{ width: 209 }}
      alt="Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"
    />
  </form>
</>

    </div>
  );
}

export default App;
