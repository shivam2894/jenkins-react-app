import "../../style/HomeCards.css";
import graphh from "../../images/graphh.jpg"
import excel from "../../images/excel.jpg"
import inventory from "../../images/inventory.jpg"
import overstocked from "../../images/overstocked.jpg"
import pc from "../../images/pc.jpg"
import reducecost from "../../images/reducecost.png"

function HomeCards() {
  return (
    <>
      <div className="flex items-center">
        {/* <div className="container2 d-flex align-items-center justify-content-center flex-wrap"> */}
        <div className="container2 flex items-center flex-wrap columns-3 justify-evenly">
          {/* -------------- */}
          <div className="box2 w-80 h-80 lg:w-[360px] lg:h-[360px]">
            <div className="body2">
              <div className="imgContainer2">
                <img
                  src={graphh}
                  // src="https://images.pexels.com/photos/3601422/pexels-photo-3601422.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                  className="shadow-2xl shadow-black"
                />
              </div>
              <div className="content2 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <h3 className="text-white font-serif text-2xl mb-2">
                    Using Data to make better decisions.
                  </h3>
                  <p className="fs-6 text-white">
                    ✓ A good practice to keep your inventory costs low with the
                    help of statistics and sales figures.
                    <br />✓ Data can also help with other insights such as
                    information about a specific product
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------- */}
          <div className="box2 w-80 h-80 lg:w-[360px] lg:h-[360px]">
            <div className="body2">
              <div className="imgContainer2">
                {" "}
                <img
                  // src="https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  src={inventory}
                  alt=""
                  className="shadow-2xl shadow-black"
                />
              </div>
              <div className="content2 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <h3 className="text-white font-serif text-2xl mb-2">
                    Inventory Management
                  </h3>
                  <p className="fs-6 text-white">
                    ✓ Complete visibility of your stock movement
                    <br />
                    ✓ Quickly glance at available stock while receiving new
                    order
                    <br />✓ Prevent shortage of critical raw material
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------- */}
          <div className="box2 w-80 h-80 lg:w-[360px] lg:h-[360px]">
            <div className="body2">
              <div className="imgContainer2">
                <img
                  // src="https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  src={overstocked}
                  alt=""
                  className="shadow-2xl shadow-black"
                />
              </div>
              <div className="content2 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <h3 className="text-white font-serif text-2xl mb-2">
                    Reducing Overstock inventory.
                  </h3>
                  <p className="fs-6 text-white">
                    ✓ No excess inventory and related storage costs.
                    <br />
                    ✓ Reduction in cost of spoilage.
                    <br />✓ Why rely on emergency stock, try JIT inventory
                    management approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------------ */}
          <div className="box2 w-80 h-80 lg:w-[360px] lg:h-[360px]">
            <div className="body2">
              <div className="imgContainer2">
                <img
                  // src="https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  src={excel}
                  alt=""
                  className="shadow-2xl shadow-black"
                />
              </div>
              <div className="content2 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <h3 className="text-white font-serif text-2xl mb-2">
                    Easy integration with your Excel spreadsheets
                  </h3>
                  <p className="fs-6 text-white">
                    ✓ Single-click setup to integrate with your existing Excel
                    Spreadsheets
                    <br />✓ Automated data transfer to reduce accounting errors
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------------ */}
          <div className="box2 w-80 h-80 lg:w-[360px] lg:h-[360px]">
            <div className="body2">
              <div className="imgContainer2">
                <img
                  // src="https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  src={reducecost}
                  alt=""
                  className="shadow-2xl shadow-black"
                />
              </div>
              <div className="content2 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <h3 className="text-white font-serif text-2xl mb-2">
                    Cost Reduction
                  </h3>
                  <p className="fs-6 text-white">
                    ✓ Keeping track of costs.
                    <br />
                    ✓ Reducing shipping costs.
                    <br />✓ Optimizing the Order Management Process.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------------ */}
          <div className="box2 w-80 h-80 lg:w-[360px] lg:h-[360px]">
            <div className="body2">
              <div className="imgContainer2">
                <img
                  src={pc}
                  // src="https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  alt=""
                  className="shadow-2xl shadow-black"
                />
              </div>
              <div className="content2 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <h3 className="text-white font-serif text-2xl mb-2">
                    Track all your Purchase and Sales Transactions
                  </h3>
                  <p className="fs-6 text-white">
                    ✓ Timeline view of every activity in sales and purchase
                    transactions
                    <br />✓ Faster documentation and proactive tracking to stay
                    ahead of deadlines
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------------ */}
        </div>
      </div>
    </>
  );
}

export default HomeCards;
