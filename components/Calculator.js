import React, { useState, useContext, useRef } from 'react'
import { calc } from './MainView'
import { useRouter } from 'next/router';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function Calculator() {

    const router = useRouter();

    const formFirst = useRef();
    const formSecond = useRef();

    const {submited, setSubmited, results, setResults, data, setData, PPM, setPPM, CPM, setCPM, resultCPM, setresultCPM} = useContext(calc)

    const handleCalcOptions = (e) => {

        e.preventDefault();

            if(results === false){
                formFirst.current.style.height = "0px"
                formSecond.current.style.height = "250px"
                setSubmited(true)
            }

        let sex = ''
        let age = ''
        let height = ''
        let weight = ''
        let activity = ''
        let aim = ''

        data.map(e => {
            if(e.name === "sex" && e.value === "female" ){
                sex = e.value
            }
            if(e.name === "sex" && e.value === "male" ){
                sex = e.value
            }
            if(e.name === "age"){
                age = e.value
            }
            if(e.name === "height"){
                height = e.value
            }
            if(e.name === "weight"){
                weight = e.value
            }
            if(e.name === "activity"){
                activity = e.value
            }
            if(e.name === "aim"){
                aim = e.value
            }
        })

        if(sex === "female" ){
            sex = e.value
            setPPM(655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age))
            setCPM((655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age))*activity)
            setresultCPM(((655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age))*activity) + parseInt(aim))
            console.log(parseInt(aim))
        }
        if(sex === "male" ){
            sex = e.value
            setPPM(66.47 + (13.75 * weight) + (5.003 * height) - (6.775 * age))
            setCPM((66.47 + (13.75 * weight) + (5.003 * height) - (6.775 * age))*activity)
            setresultCPM(((66.47 + (13.75 * weight) + (5.003 * height) - (6.775 * age))*activity) + parseInt(aim))
            console.log(parseInt(aim))
        }
    }

    // console.log(PPM)


    const handleAddData = (e) => {

        if(results === true){
            setResults(false)
        }

        let name = e.target.getAttribute('name')
        let value = e.target.value

        setData(data.map(e => {
            if(e.name === name){
                return {
                    ...e,
                    value:value
                }
            }
            else return e
        }))
    }

    const handleGoBack = () => {
        setSubmited(false)
        setResults(false)

        formFirst.current.style.height = "250px"
        formSecond.current.style.height = "0px"
    }
    
    const handleShowResults = () => {
        
        if(results === false){
            setResults(true)
        }

        if(results === true){
            window.location.reload(false)
        }
    }

    console.log(results)


  return (
    <div className='w-[700px] h-[500px] pt-20 md:pl-[60px] flex flex-col items-center'>
        <h1 className='uppercase font-[200] text-2xl pb-10 leading-6'>Kalkulator zapotrzebowania <span className='font-bold text-green-600 uppercase'><br></br>kalorycznego:</span></h1>
        <form ref={formFirst} className='duration-300 overflow-hidden w-[400px] h-[240px]' onSubmit={handleCalcOptions}>
            <div className='flex items-center'>
                <div className='px-4 py-1 rounded-l-md text-black text-2xl font-[200]'>Płeć:</div>
                    <div className='flex items-center px-2'>
                        <input onChange={handleAddData} name="sex" value="female" type="radio" className='rounded-r-md w-5 h-5 cursor-pointer' defaultChecked></input>
                        <label className='pl-2 text-xl font-[200]'>kobieta</label>
                    </div>
                    <div className='flex items-center px-4'>
                        <input onChange={handleAddData}  name="sex" value="male" type="radio" className='rounded-r-md w-5 h-5 cursor-pointer'></input>
                        <p className='pl-2 text-xl font-[200]'>mężczyzna</p>
                    </div>
                </div>
            <div className='flex w-full mt-2'>
                <div className='w-36 px-4 py-1 rounded-l-md bg-green-500 text-white text-2xl font-[200]'><p>Waga: </p></div>
                <input onChange={handleAddData} placeholder="Twoja aktualna waga w kg" name="weight" className='pl-2 border-r border-t border-b border-gray-900 rounded-r-md w-96 outline-none text-xl' required></input>
            </div>
            <div className=' flex mt-2'>
                <div className='w-36  px-4 py-1 rounded-l-md bg-green-500 text-white text-2xl font-[200]'><p>Wiek: </p></div>
                <input onChange={handleAddData} placeholder="Ile masz lat?" name="age" className='pl-2 border-r border-t border-b border-gray-900 rounded-r-md w-96 outline-none text-xl' required></input>
            </div>
            <div className=' flex mt-2'>
                <div className='w-36 px-4 py-1 rounded-l-md bg-green-500 text-white text-2xl font-[200]'><p>Wzrost: </p></div>
                <input onChange={handleAddData} placeholder="Ile masz wzrostu w cm" name="height" className='pl-2 border-r border-t border-b border-gray-900  rounded-r-md w-96 outline-none text-xl' required></input>
            </div>
            <button className='bg-green-500 text-white rounded-md w-52 border text-center float-right duration-300 mt-2 px-3 py-1 text-2xl font-[200] cursor-pointer hover:border hover:border-green-500 hover:bg-white hover:text-black'>Następny krok</button>
        </form>
        <form ref={formSecond} onSubmit={handleCalcOptions} className='h-0 duration-300 overflow-hidden w-[400px]'>
            <div className='mt-4 mb-1 text-lg'>Jaki jest poziom Twojej aktywności fizycznej?</div>
            <div className='flex w-full'>
                <select onChange={handleAddData} name="activity" className='text-2xl font-[200] text-white px-4 py-1 border border-green-500 bg-green-500 rounded-md w-full outline-none' required>
                    <option value="1.2">Poziom bardzo niski</option>
                    <option value="1.375">Poziom niski</option>
                    <option value="1.55">Poziom umiarkowany</option>
                    <option value="1.725">Poziom wysoki</option>
                    <option value="1.9">Poziom bardzo wysoki</option>
                </select>
                <HelpOutlineIcon className='my-auto ml-1 text-gray-300 cursor-pointer' />
            </div>
            <div className='mt-4 mb-1 text-lg'>Jaki jest Twój cel?</div>
            <div className='flex w-full'>
                <select onChange={handleAddData} name="aim" className='text-2xl font-[200] text-white px-4 py-1 border border-green-500 bg-green-500 rounded-md w-full outline-none' required>
                    <option value="-300">Chcę schudnąć</option>
                    <option value="0">Chcę utrzymać wagę</option>
                    <option value="300">Chcę przytyć</option>
                </select>
                <HelpOutlineIcon className='my-auto ml-1 text-gray-300 cursor-pointer' />
            </div>
            <div className='flex w-full justify-end mt-4 pr-7'>
                <div onClick={handleGoBack} className='bg-white text-black rounded-md w-24 mr-2 border border-black text-center float-right duration-300 mt-2 px-3 py-1 text-2xl font-[200] cursor-pointer hover:border hover:border-green-500 hover:text-green-500 hover:bg-white'>Cofnij</div>
                <button onClick={handleShowResults} className='bg-green-500 text-white rounded-md w-42 border text-center float-right duration-300 mt-2 px-3 py-1 text-2xl font-[200] cursor-pointer hover:border hover:border-green-500 hover:bg-white hover:text-black'>
                    {results === false &&<p>Oblicz wynik</p>}
                    {results &&<p>Zacznij od nowa</p>}
                </button>
            </div>
        </form>
    </div>
  )
}
