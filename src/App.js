import { useEffect, useState } from 'react';
import './App.css';

const X = () => (
  <div className="x">
    <i />
    <i />
  </div>
);

const L = () => (
  <div className="l">
    <i />
  </div>
);

const O = () => <i />;

const Hundred = () => (
  <>
    <div className="ten">
      <X />
      <X />
      <X />
      <X />
    </div>
    <div className="five">
      <O />
      <O />
      <O />
      <O />
    </div>
  </>
);

const calculateScores = (points) => {
  const h = Math.floor(points / 100);
  const u = (Math.round(((points / 100) - h) * 100)) / 10;
  let r10 = Math.floor(u);
  let uu = r10 / 2;
  let x = Math.floor(uu);
  let l = ((uu - x) * 10) / 5;
  let r5 = ((u - r10) * 10) / 5;

  if (x === 4 && l === 1 && r5 === 0) {
    l = 0;
    r5 = 2;
  } else if (x === 4 && l === 1 && r5 === 1) {
    l = 0;
    r5 = 3;
  }

  return {
    hundreds: Array.from({ length: h }, (_, i) => i),
    xs: Array.from({ length: x }, (_, i) => i),
    ls: Array.from({ length: l }, (_, i) => i),
    fs: Array.from({ length: r5 }, (_, i) => i)
  };
};

const App = () => {
  const [target, setTarget] = useState(localStorage.getItem('dominoTarget') || 355);
  const [targetInput, setTargetInput] = useState('');
  const [tError, setTError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [points, setPoints] = useState(JSON.parse(localStorage.getItem('dominoPoints')) || { A: 0, B: 0 })

  const [shapes, setShapes] = useState({ A: { hundreds: [], xs: [], ls: [], fs: [] }, B: { hundreds: [], xs: [], ls: [], fs: [] } });


  useEffect(() => {
    setShapes((prevState) => ({
      ...prevState,
      A: calculateScores(points.A)
    }));
  }, [points.A]);

  useEffect(() => {
    setShapes((prevState) => ({
      ...prevState,
      B: calculateScores(points.B)
    }));
  }, [points.B]);

  useEffect(() => {
    localStorage.setItem('dominoPoints', JSON.stringify(points));
  }, [points]);

  const handleSubmitTarget = () => {
    const number = parseInt(targetInput);
    console.log(number);
    if (!number || number <= 0) {
      setTError('Target must be a number >= 0');
      console.log('error')
    } else {
      setTarget(number);
      setShowPopup(false);
      setPoints({ A: 0, B: 0 });
      localStorage.setItem('dominoTarget', number);
      console.log('success');
    }
  }

  return (
    <div className="app">
      <div className="top">
        <button id='restart' onClick={() => { setShowPopup(true); setTError(null) }}>Restart</button>
      </div>
      <div className="buttons">
        <div className="a">
          <div className='increment'>
            <button onClick={() => setPoints({ B: points.B, A: points.A + 5 })}>
              <div className='five'><i /></div>
            </button>
            <button onClick={() => setPoints({ B: points.B, A: points.A + 10 })}>
              <div className="l"><i /></div>
            </button>
            {/* <button onClick={() => setPoints({ B: points.B, A: points.A + 15 })}>15</button>
            <button onClick={() => setPoints({ B: points.B, A: points.A + 20 })}>20</button> */}
          </div>
          <div className='decrement'>
            <button onClick={() => setPoints({ B: points.B, A: points.A - 5 })}><div className='five'><i /></div></button>
            <button onClick={() => setPoints({ B: points.B, A: points.A - 10 })}><div className="l"><i /></div></button>
            {/* <button onClick={() => setPoints({ B: points.B, A: points.A - 15 })}>15</button>
            <button onClick={() => setPoints({ B: points.B, A: points.A - 20 })}>20</button> */}
          </div>
        </div>

        <div className="b">
          <div className='increment'>
            <button onClick={() => setPoints({ A: points.A, B: points.B + 5 })}><div className='five'><i /></div></button>
            <button onClick={() => setPoints({ A: points.A, B: points.B + 10 })}><div className="l"><i /></div></button>
            {/* <button onClick={() => setPoints({ A: points.A, B: points.B + 15 })}>15</button>
            <button onClick={() => setPoints({ A: points.A, B: points.B + 20 })}>20</button> */}
          </div>
          <div className='decrement'>
            <button onClick={() => setPoints({ A: points.A, B: points.B - 5 })}><div className='five'><i /></div></button>
            <button onClick={() => setPoints({ A: points.A, B: points.B - 10 })}><div className="l"><i /></div></button>
            {/* <button onClick={() => setPoints({ A: points.A, B: points.B - 15 })}>15</button>
            <button onClick={() => setPoints({ A: points.A, B: points.B - 20 })}>20</button> */}
          </div>
        </div>
      </div>

      <h2 className='target'>{target}</h2>
      <div className="points">
        <h2 style={(points.A > points.B) && points.A >= target ? { color: '#85d3c3' } : points.A === points.B ? { color: '#f1e194' } : points.A > points.B ? { color: '#2273ff' } : { color: '#f15771' }}>{points.A}</h2>
        <h2 style={(points.B > points.A) && points.B >= target ? { color: '#85d3c3' } : points.B === points.A ? { color: '#f1e194' } : points.B > points.A ? { color: '#2273ff' } : { color: '#f15771' }}>{points.B}</h2>
      </div>
      <div className="container">
        <div className="first">
          <h1>A</h1>
          <div className="content">
            {shapes.A.hundreds.map(h => (
              <Hundred key={h} />
            ))}
            <div className="ten">
              {shapes.A.xs.map(x => (
                <X key={x} />
              ))}
              {shapes.A.ls.map(l => (
                <L key={l} />
              ))}
            </div>
            <div className="five">
              {shapes.A.fs.map(f => (
                <O key={f} />
              ))}
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="second">
          <h1>B</h1>
          <div className="content">
            {shapes.B.hundreds.map(h => (
              <Hundred key={h} />
            ))}
            <div className="ten">
              {shapes.B.xs.map(x => (
                <X key={x} />
              ))}
              {shapes.B.ls.map(l => (
                <L key={l} />
              ))}
            </div>
            <div className="five">
              {shapes.B.fs.map(f => (
                <O key={f} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>Mohammed JM - 2023</p>
      </div>

      {showPopup && <div className="popup">
        <div className="pwrapper">
          <label>Target:</label>
          <input type="text" placeholder='ex: 355' value={targetInput} onChange={(e) => setTargetInput(e.target.value)} />
          <div className="buts">
            <button onClick={() => setShowPopup(false)}>cancel</button>
            <button onClick={handleSubmitTarget}>confirm</button>
          </div>
          {tError && <p className='terror'>{tError}</p>}
        </div>
      </div>}

    </div>
  );
}

export default App;