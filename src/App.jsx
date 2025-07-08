import { useState,useCallback , useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [numbers,setNumbers]= useState(false);
  const [Characters,setCharacters]= useState(false);
  const [password,setPassword]= useState("");
  const passRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) str +="0123456789";
    if(Characters) str +="!@#$%^&*?/";

    for (let i = 1; i <= length; i++){
      let index = Math.floor((Math.random()*str.length )+1);
      pass += str.charAt(index)
    }

    setPassword(pass)

  },[length,numbers,Characters])

  // useEffect(()=>{passwordGenerator()} ,   // use this when u want to auto-generate password on page reload 
  // [length,setCharacters,setLength,passwordGenerator])

  const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    passRef.current?.select();

  },[password])


  return (
    <>
    <div className='w-full max-w-md mx-auto my-8 rounded-lg shadow-md text-amber-600 bg-gray-800
    px-4 py-3 '>
      <h2 className='text-3xl font-bold' >Password Generator</h2>
      <input type="text" value={password} 
       className='outlin-none h-10 w-80 mt-3 rounded-2xl bg-white px-2 py-1 '
       placeholder= "Generate Password" 
       readOnly
       ref={passRef}
       />
       <button className='bg-blue-700 text-white ml-1 copy-btn' 
       onClick={copyPassword}
       >Copy</button>
    <div className='flex gap-x-2'>
      <div className='flex items-center gap-x-1 mt-1'>
        <input type="range" min={8} max={20} 
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label>length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1 mt-1'>
        <input type="checkbox" 
        className='cursor-pointer'
        onChange={()=>{setNumbers(prev => !prev)}}/>
        <label>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1 mt-1'>
        <input type="checkbox" 
        className='cursor-pointer'
        onChange={()=>{setCharacters((prev) => !prev)}}/>
        <label>Characters</label>
      </div>
    </div>
    <button className='bg-white mt-3 rounded-3xl text-amber-600' onClick={passwordGenerator}>Generate Password</button>
    </div>

   
    </>
  )
}

export default App
