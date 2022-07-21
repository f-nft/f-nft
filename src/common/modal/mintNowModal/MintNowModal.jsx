import { useState } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/fnft.gif";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import { MdPriceChange } from "react-icons/md";
import { mint } from "../walletModal/WalletModal";
// import Countdown from "../../../components/section/countdown/countDown";

const MintNowModal = () => {
  const [count, setCount] = useState(1);
  const { mintModalHandle } = useModal();
  const reload = () => window.location.reload();
  var counts = count.toFixed(3);
  return (
    <>
      <MintModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>Collect YOUR NFT before end</h2>
              {/* <Countdown style={{ maxWidth: "100%", margin: "top", maginLeft: "-50px", maginRight: "-50px" }}
                timeTillDate="08 30 2022, 6:00 am"
                timeFormat="MM DD YYYY, h:mm a" /> */}
              <div className="mint_img">
                <img src={mintImg} alt="f-nft mint" />
                <h5 style={{ color: "red" }}>Please Refesh Page if You Change The Network</h5> 
              </div>
              <Button onClick={() => mintModalHandle()} onExit={reload}>
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
                    {localStorage.getItem("ethPrice") ? (
                      <h5>
                        {localStorage.getItem("ethPrice") * count} ETH
                      </h5>
                    ) : (
                    <h5 id="price"> {0.05 * count} ETH</h5>
                    )}
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
                      <button onClick={() => setCount(count + 1)}>+</button>
                    </div>
                    <h5>
                      <span>{MdPriceChange.counts} $60</span> USD
                    </h5>
                  </li>
                </ul>
              </div>
              <div className="modal_mint_btn">
                <Button lg variant="mint" onClick={(e)=>mint(count,e)}>
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