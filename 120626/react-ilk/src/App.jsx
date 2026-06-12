import { useState } from 'react'
import Demo1 from './components/Demo1'
import Demo2Component from './components/Demo2'
import Demo3PropsBasic from './components/Demo3PropsBasic'
import Demo4PropsChild from './components/Demo4PropsChild'
//import './App.css'
import Demo5Rendering from './components/Demo5Rendering'
import Demo6ListRendering from './components/Demo6ListRendering'
import Demo7EventHandling from './components/Demo7EventHandling'
import Demo8ReadOnlyProps from './components/Demo8ReadOnlyProps'
import Demo9DefaultProps from './components/Demo9DefaultProps'

function App() {
  const [selectedDemo, setSelectedDemo] = useState(1);
  const renderDemo =()=>{
    switch(selectedDemo){
      case 1:
        return <Demo1/>;;
      case 2: 
        return <Demo2Component/>;
      case 3: 
        return <Demo3PropsBasic/>;
      case 4:
        return <Demo4PropsChild/>;
      case 5:
        return <Demo5Rendering/>;
      case 6:
        return <Demo6ListRendering/>;
      case 7:
        return <Demo7EventHandling/>;
      case 8:
        return <Demo8ReadOnlyProps/>;
      case 9:
        return <Demo9DefaultProps/>;
      default:
        return <Demo1/>;
    }
  }

  const demolar=[
    {id:1, ad: "Demo1" },
    {id:2, ad: "Demo2" },
    {id:3, ad: "Demo3" },
    {id:4, ad: "Demo4" },
    {id:5, ad: "Demo5" },
    {id:6, ad: "Demo6" },
    {id:7, ad: "Demo7" },
    {id:8, ad: "Demo8" },
    {id:9, ad: "Demo9" }
  ]
  return (
    <>
      <div className="p-4">
        <div className="border">
          <div className="p4 bg-orange-300">
              <h1 className='text-white text-xl'>React ve Props Paneli</h1>
          </div>
          <div className="grid grid-cols-4">
            <div className="border-r">
              <div className="sidebar-list">
                {demolar.map((demo)=>(
                  <button key={demo.id} onClick={()=>setSelectedDemo(demo.id)} className={selectedDemo === demo.id? "bg-blue-500 text-white": "bg-gray-100"}>{demo.ad}</button>
                ))}
              </div>
            </div>
            <div className="col-span-3">
              <div className="p-4">
                {renderDemo()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
