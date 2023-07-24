

const Skeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="card" aria-hidden="true">
        <div className="card-body">
          {/* <h5 className="card-title placeholder-glow">
            <span className="placeholder col-7"></span>
          </h5> */}
          <p className="card-text placeholder-glow" style={{height:"60%", width:"100%",marginBottom:"10px"}}></p>
          <p className="card-text placeholder-glow" style={{height:"7%", width:"95%",marginTop:"10px"}}></p>
          <p className="card-text placeholder-glow" style={{height:"7%", width:"95%",marginTop:"10px"}}></p>
          <p className="card-text placeholder-glow" style={{height:"7%", width:"55%",marginTop:"10px"}}></p>
          {/* <a
            href="#"
            className="btn btn-primary disabled placeholder col-6"
          ></a> */}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
