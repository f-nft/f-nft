import { useState } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/fnft.gif";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { MdPriceChange } from "react-icons/md";
import { NFTCONTRACT } from './../../config/config';



const MintNowModal = () => {

  const [count, setCount] = useState(1);
  const { mintModalHandle, walletAddress,stateRate, statePrice, stateCrypto,
    stateContract,stateWeb3,stateChainId
  } = useModal();
  var price = statePrice;
  var crypto = stateCrypto;
  var contract=stateContract;
  var Web3Alc=stateWeb3;
  console.log(Web3Alc);
  const reload = () => window.location.reload();
  var counts = count.toFixed(1);
  async function mintnative(numberofNFTs) {
    try {
      var rate = stateRate;
      var account = walletAddress;
      var _mintAmount = numberofNFTs;
      // var mintRate = Number(await contract.methods.cost().call());
      var mintValue = rate * price;
      var totalAmount=mintValue * _mintAmount;
      //eslint-disable-next-line
      if(stateChainId==0x1)
      totalAmount = price*_mintAmount;
      //convert totalAmount to wei

      var totalAmountWei = Web3Alc.utils.toWei(totalAmount.toString(), "ether");
      await Web3Alc.eth.getMaxPriorityFeePerGas().then((tips) => {
        Web3Alc.eth.getBlock("pending").then((block) => {
          var baseFee = Number(block.gasLimit);
          var maxPriority = Number(tips);
          var maxFee = baseFee + maxPriority;
          console.log("Mint PID Function")

          // contract.methods.mint(account, _mintAmount)
          //   .send({
          //     from: account,
          //     value: totalAmountWei,
          //     gasPrice: baseFee,
          //     maxFeePerGas: maxFee,
          //     maxPriorityFeePerGas: maxPriority,
          //     gasLimit: "0x" + baseFee.toString(16)
          //   }).on("transactionHash", function (hash) {})
          //   .on("confirmation",function(confirmationNumber, receipt){})
          //   .then(function(data){
          //     console.log(data);
          //   })
          contract.methods.mintpid(NFTCONTRACT,numberofNFTs,1)
            .send({
              from: account,
              // value: totalAmountWei,
              //for testing purpose we have set value to 0
              value:0,
              gasPrice: baseFee,
              maxFeePerGas: maxFee,
              maxPriorityFeePerGas: maxPriority,
              gasLimit: "0x" + baseFee.toString(16)
            }).on("transactionHash", function (hash) {})
            .on("confirmation",function(confirmationNumber, receipt){})
            .then(function(data){
              console.log(data);
            })
        })
          .catch((err) => alert(err.message));
      })
        .catch((err) => alert(err.message));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <MintModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>Collect YOUR NFT before end</h2>
              <div className="mint_img">
                <img src={mintImg} alt="f-nft mint" style={{ borderRadius: "15px", borderWidth: "5px", borderColor: "#ffffff", textAlign: "center", borderShadow: "#ffffff" }} />
                <h5 style={{ color: "red", textAlign: "center", textShadow: "#372873" }} onClick={reload}>Please Refesh if You Change The Network</h5>
                {{crypto} ?
                    (<span>You Are Connected to {crypto} Network</span>) :
                    (<span></span>)}<br />
              </div>
              <Button onClick={() => mintModalHandle()} onClose={reload}>
                <FiX />
              </Button>
            </div>
            <div className="modal_body text-center">
              <div className="mint_count_list">
                <ul>
                  <li>
                    <h5>Remaining</h5>
                    <h5>
                      8,282/<span>10,000</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Price Total</h5>
                    {(price) === null ?
                      <h5> ETH</h5> :
                      < h5 >{(price * count).toFixed(5)} {(crypto)}</h5>}
                  </li>
                  <li>
                    <h5>Quantity</h5>
                    <div className="mint_quantity_sect">
                      <button
                        onClick={() =>
                          count > 1 ? setCount(count - 1) : count
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        id="quantity"
                        value={counts}
                        onChange={(e) => setCount(e.target.value)}
                      />
                      <button onClick={() => setCount(count + 1)}>
                        +
                      </button>
                    </div>
                    <h5>
                      <span>{MdPriceChange.counts}{count * localStorage.getItem("usdRate")}</span> USD
                    </h5>
                  </li>
                </ul>
              </div>
              <div className="modal_mint_btn">
                <Button lg variant="mint" onClick={(e) => mintnative(count)}>
                  Mint Now
                </Button>
              </div>
            </div>
            <div className="modal_bottom_shape_wrap">
              <span className="modal_bottom_shape shape_left">
                <img src={hoverShape} alt="f-nft nft hover shape" />
              </span>
              <span className="modal_bottom_shape shape_right">
                <img src={hoverShape} alt="f-nft nft hover shape" />
              </span>
            </div>
          </div>
        </div>
      </MintModalStyleWrapper>
    </>
  );
};

export default MintNowModal;
