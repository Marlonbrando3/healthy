import {React, useState, createContext, useRef} from 'react'
import Calculator from './Calculator'

export const calc = createContext();

export default function MainView() {

  const [submited, setSubmited] = useState(false);
  const [results, setResults] =useState(false)

  const [PPM, setPPM] = useState('')
  const [CPM, setCPM] = useState('')
  const [resultCPM, setresultCPM] = useState('')

  const dishes = useRef();

  const [data, setData] = useState([
    {name:'sex', value:'female'},
    {name:'age', value:''},
    {name:'height', value:''},
    {name:'weight', value:''},
    {name:'activity', value:'1.2'},
    {name:'aim', value:'-300'}
])


  const resultsDiv = useRef();

  if(results === true){
      resultsDiv.current.style.height = "100%"
      resultsDiv.current.style.paddingTop = "60px"
  } 
  
  if (results === false && resultsDiv.current !== undefined ) {
    resultsDiv.current.style.height = "0px"
    resultsDiv.current.style.padding = "0px"
  } 

  let sex = ''
  let age = ''
  let height = ''
  let weight = ''
  let activity = ''
  let aim = ''

  data.map(e => {

    if(e.name === 'sex' && e.value === "female"){
      sex = "kobietą"
    }
    if(e.name === 'sex' && e.value === "male"){
      sex = "mężczyzną"
    }

    if(e.name === 'age'){
      age = " w wieku "+e.value+ " lat."
    }

    if(e.name === 'height'){
      height  =  " Twój wzrost to "+e.value+" cm."
    }

    if(e.name === 'weight'){
      weight  =  " Ważysz "+e.value+" kg"
    }

    if(e.name === 'activity'){
      if(e.value === '1.2') {
        activity  =  " Twoja aktywność jest bardzo niska"
      }
      if(e.value ===  '1.375') {
        activity  = " Twoja aktywność jest niska"
      }
      if(e.value ===  '1.55') {
        activity  = " Twoja aktywność jest na średnim poziomie"
      }
      if(e.value === '1.725') {
        activity  = " Twoja aktywność jest na wysokim poziomie"
      }
      if(e.value === '1.9') {
        activity  = " Twoja aktywność jest na bardzo wysokim poziomie"
      }
    }

    if(e.name === 'aim'){
      if(e.value === '-300') {
        aim  =  " i chcesz schudnąć"
      }
      if(e.value ===  '0') {
        aim  = " i chcesz utrzymać swoją wagę"
      }
      if(e.value ===  '300') {
        aim  = " i chcesz przytyć"
      }
    }

  })

  const handleFreeDishes = () => {
    dishes.current.style.height = "600px"
    dishes.current.style.top = "50px"
  }

  const handleFreeDishesClose = () => {
    dishes.current.style.height = "0px"

  }

  let summary = "Jesteś " + sex + age + height + weight + activity + aim

  return (
    <div className='h-[700px] w-full pt-20 '>
      <div ref={dishes} className='bg-white absolute -top-[100vh] w-[70vw] h-[70vh] duration-150 overflow-hidden left-48 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]'>
        <div onClick={handleFreeDishesClose} className='bg-red-900 w-20 text-center text-white float-right cursor-pointer'>zamknij</div>
        <form className='mt-28 lg:w-[800px] h-[420px] mx-auto'>
          <p className='px-20 text-2xl'>Abyśmy mogli przesłać Ci <span className='bg-green-500 text-white px-1'>propozycję kilku posiłków</span> zapisz się na nasz newsletter <span className='bg-green-500 text-white px-1'>uzupełniając dane niżej.</span></p>
          <div className='flex flex-col my-10 h-[220px] justify-between px-40'>
            <input type="text" required className='border-2 border-green-700 rounded-md h-11 pl-2' placeholder='Imię i nazwisko'></input>
            <input type="mail" required className='border-2 border-green-700 rounded-md h-11 pl-2' placeholder='Adres email'></input>
            <div className='flex items-start'>
                <input type="checkbox" required className='border rounded-md m-1 h-5 w-5 cursor-pointer' placeholder='adres email'></input>
                <div><p>Wyrażam zgodę na przesyłanie informacji handlowych drogą mailową</p></div>
              </div>
              <button className='bg-green-500 text-white rounded-md w-[120px] mx-auto py-1 text-2xl cursor-pointer'>Wyślij</button>
          </div>
        </form>
      </div>
        <div className="w-full mx-auto flex justify-center">
            <div className='bg-white lg:w-1/2 md:2/3 sm:w-full h-full flex justify-items-center'>
              <calc.Provider value={{submited, setSubmited, results, setResults, data, setData, PPM, setPPM, CPM, setCPM, resultCPM, setresultCPM}}>
                <Calculator />
              </calc.Provider>
            </div>
            <div className="bg-cover bg-center bg-[url('../images/apple.jpeg')] lg:w-1/2 w-full md:block lg:static absolute">
              <div ref={resultsDiv} className='bg-white h-0 duration-300 overflow-hidden'>
                <div className='text-xl font-[400] pb-5'> 
                  {summary}
                </div>
                <div className='text-xl font-[400]'>
                  Podstawowe dziennie zapotrzebowanie kaloryczne wynosi
                </div>
                <p className='text-2xl bg-green-500 w-32 text-white'>{Math.round(PPM)} kcal</p>
                <div className='text-xl font-[400] mt-4'>
                  Całkowite dziennie zapotrzebowanie kaloryczne wynosi
                </div>
                <p className='text-2xl bg-green-500 w-32 text-white'>{Math.round(CPM)} kcal</p>
                <div className='text-xl font-[400] mt-4'>
                  Aby realizować cel {aim} dostarczaj dziennie
                </div>
                <p className='text-2xl bg-green-500 w-32 text-white'>{Math.round(resultCPM)} kcal</p>
                <div onClick={handleFreeDishes} className='bg-green-500 text-white mt-10 w-[250px] px-3 py-2 rounded-md text-xl text-center cursor-pointer font-[200]'>Przykładowe przepisy</div>
              </div>
            </div>
        </div>
    </div>
  )
}
