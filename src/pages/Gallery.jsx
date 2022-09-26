import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1/Header";
import PageHeader from "../common/pageHeader";
import CTA from "../components/section/cta/v2";
import Footer from "../components/section/footer/v3";
import { useEffect, useState } from "react";
import axios from "axios";
import './Gallerystyle.css'
import Spinner from "../components/spinner/Spinner";
const Gallery = () => {
  const { isBanner, setisBanner, stateAddress, stateContract } = useModal();
  const [isAddress, SetisAddress] = useState(false);
  //create a state variable to store the data in array
  const [data, setData] = useState([]);
  const [nftdata, setNftdata] = useState([]);
  //create a boolean variable to check if the data is loaded or not
  const [loading, setLoading] = useState(false);
 
  const pool = [
    {
      collection: "Discovery",
      Rewards: 0.10,
      Exchange: "2 NFTs/Quarter",
    },
    {
      collection: "Angel & Devil",
      Rewards: 0.5,
      Exchange: "10 NFTs/Quarter"
    },
    {
      collection: "Chaos",
      Rewards: 1,
      Exchange: "25 NFTs/Quarter or 100 FOT/Quarter"
    }

  ]

  const options = {
    method: 'GET',
    url: 'https://api.nftport.xyz/v0/nfts/0x014e897defaf2adb41c117d853aafb8729b78b44',
    params: { chain: 'polygon', include: 'metadata'},
    headers: {
      'Content-Type': 'application/json',
      Authorization: '0b4d39b3-8ce8-43b6-99f0-427226147a55'
    }
  };



  const GETNFTS = async () => {
    const accountbalance = await stateContract.methods.balanceOf(stateAddress).call();
    for (let i = 0; i < accountbalance; i++) {
      const tokenid = await stateContract.methods.tokenOfOwnerByIndex(stateAddress, i).call();
      let tokenuri = await stateContract.methods.tokenURI(tokenid).call();
      let tokenuridata = await axios.get(tokenuri);
      let tokenuridata1 = tokenuridata.data;

      setNftdata(nftdata => [...nftdata, tokenuridata1]);
      let tokenuridata2 = tokenuridata1.image;
      setData(data => [...data, tokenuridata2]);
      // console.log(tokenuridata.data.name);


      //displaying attributes of each nft
      // for(let i=0;i<tokenuridata.data.attributes.length;i++)
      //   {       
      //           let tokenuridata2=tokenuridata.data;
      //            console.log(tokenuridata2.attributes[i].value);
      //   }
      setLoading(true);
    }
  }
  useEffect(() => {
    setData([]);
    if (isBanner)
      setisBanner(false)
    stateAddress ? SetisAddress(true) : SetisAddress(false)
    if (stateContract)
      GETNFTS()
    //eslint-disable-next-line
  }, [stateAddress, stateContract]);

  return (
    <>
      <Layout>
        <GlobalStyles />
        <Header />
        <PageHeader title="NFT" />
        <div className='row px-4 mx-3 pt-2 mt-3'>
          <div className="toptable">
            <h1 className="heading">Fantasy NFT Staking Pool Active Rewards</h1>
            <div className="cardrow row mt-5 mb-5 mx-0">
              {pool.map((item,id) => {
                return (
                    <div key={id} className="headingrow card">
                      <div className="arrow"></div>
                      <div className="parent">
                      </div>
                      <div className="card-body">
                        <h2 className="card-title">{item.collection}</h2>
                        <h3 className="rewards">Rewards Per Day</h3>
                        <h4 className="card-text">{item.Rewards} FOT</h4>
                        <h3 className="rewards">Exchangeable</h3>
                        <h4 className="exchange">{item.Exchange}</h4>
                      </div>
                    </div>
                )
              }
              )}
            </div>
          </div>
          <div className='secondtable'>
            <h1 className="heading">FOT Token Stake Farms</h1>
            <table className='table table-bordered table-dark' style={{ borderRadius: '14px' }} >
              <thead className='thead-light' style={{ fontSize: '20px' }}>
                <tr>
                  <th scope='col'>Farm Pools</th>
                  <th scope='col'>Harvest Daily Earnings</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '18px' }}>
                <tr>
                  <td>Stake FOT to Earn FOT</td>
                  <td className='amount' data-test-id='rewards-summary-ads'>
                    <span className='amount'>0.01 FOT</span>&nbsp;<span className='currency'>Per FOT Staked</span>
                  </td>
                </tr>
                <tr>
                  <td>Stake FOT to Earn FOT™</td>
                  <td className='amount' data-test-id='rewards-summary-ac'>
                    <span className='amount'>0.005 FOT™</span>&nbsp;<span className='currency'>Per FOT Staked</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <h5 style={{ color: "blue" }}>FOT™ could be use for upgrade NFT or trade for secret FNFT item</h5>
    

          </div>
        </div>

        {isAddress ? <h1>NFTS FOUND</h1> :<h1>WALLET NOT CONNECTED</h1>}

        <div className="container">
          {loading ? (
          <div className="row">
            {data.map((item,keyindex) => {
              return (
                <div className="col-md-4" key={keyindex}>
                  <div className="nftcard mb-3" style={{ width: "18rem" }}>
                    <img src={item} alt="nft" className="img-fluid" />
                    <div className="card-body">
                      <p className="card-title">{nftdata[keyindex].name}</p>
                    </div>
                    <button className="CardButton btn btn-primary">Stake this NFT</button>
                  </div>
                </div>
              )
            })}
          </div>
          ) : isAddress?(
            <div className="row flex" style={{justifyContent:"center"}}>
              <div style={{width:"max-content"}}>
              <Spinner/>
              </div>
           </div>
              ) : (
                null
              )}
        </div>
        <CTA />
        <Footer />
      </Layout>
    </>
  );
};

export default Gallery;