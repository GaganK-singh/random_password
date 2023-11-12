import { useState, useCallback, useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasChar, setHasChar] = useState(true);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null); // useRef is used to get the reference of the element

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
    //or we can use the below code
    // window.navigator.clipboard.writeText(password);
  }, [password]);

// useCallback is used to prevent the function from being created again and again and to optimize the performance
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (hasNumbers) {
      str += "0123456789";
    }
    if (hasChar) {
      str += "!@#$%^&*()_+{}";
    }
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length) + 1);
    }
    setPassword(pass);
  }, [length, hasNumbers, hasChar, setPassword]);


// useEffect is used to call the function when the component is mounted and when the state changes
  useEffect(() => {
    passwordGenerator();
  },[length, hasNumbers, hasChar]);

  return (
  <>
    <div className="bg-black w-full h-[100vh] my-0 py-8">
      <div className="w-full max-w-md mx-auto shadow-lg shadow-slate-400 rounded-lg px-4 py-2 text-black bg-gray-100">
        <div className="text-center text-xl mb-2">Password Generator</div>
        <div className="flex overflow-hidden ">
          <input type="text" ref={passwordRef} value={password} placeholder="password" readOnly className="rounded-lg outline-none shadow-inner shadow-slate-400 w-full py-1 px-3 mr-2" />
          <button onClick={copyToClipboard} className="outline-none rounded-lg bg-purple-800 text-white px-3 py-0.5 shrink-0" >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2 my-3">
          <div className="flex items-center gap-x-2">
            <input type="range" min={6} max={100} value={length} onChange={(e) => { setLength(e.target.value) }} className="cursor-pointer" />
            <label>Length:{length}</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input type="checkbox" defaultChecked={hasNumbers} id="numInput" onChange={() => { setHasNumbers((prev) => !prev) }} />
            <label> Numbers </label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input type="checkbox" defaultChecked={hasChar} id="charInput" onChange={() => { setHasChar((prev) => !prev) }} />
            <label>Characters</label>
          </div>

        </div>
      </div>
    </div>
  </>
  )
}

export default App
