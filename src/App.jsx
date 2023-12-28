import {useState,useCallback,useEffect,useRef} from 'react'



function App() {
  const [length,setLength]=useState(8)
  const [numbersAllowed,setNumberAllowed]=useState(false)
  const [charsAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState(false)
  const passwordRef=useRef(null)
 const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIZKLMONPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numbersAllowed)str+="0123456789"
  if(charsAllowed)str+="!@#$%^&*"
  for(let i=1;i<=length;i++)
  {
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
    
  }
  setPassword(pass)
 },[length,numbersAllowed,charsAllowed,setPassword])
 const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current.select()
  passwordRef.current.setSelectionRange(0,999)
  window.navigator.clipboard.writeText(password)
 },[password])
 useEffect(()=>{
   passwordGenerator(length,numbersAllowed,charsAllowed,passwordGenerator)
 },[length,numbersAllowed,charsAllowed,passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'> 
    <h1 className="text white text center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password}  className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard} className='px-3 py-0.5 shrink outline-none bg-blue-700'>copy</button>
      </div>
      <div className="flex text sm gap-x-2">
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap x-1'>
        <input type="checkbox" 
        
          defaultChecked={numbersAllowed}
          id='numberInput'
          onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap x-1'>
        <input type="checkbox" 
        
          defaultChecked={charsAllowed}
          id='characterInput'
          onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
          <label>Character</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
