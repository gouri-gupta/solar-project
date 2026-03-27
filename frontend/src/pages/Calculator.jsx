import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiQuestionMarkCircle } from "react-icons/hi"
import { useState } from 'react';
import {calculateSavings} from '../utils/calculatorLogic.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Calculator = () => {
    const { t, i18n } = useTranslation();

    let navigate=useNavigate()

    let [isInputCorrect,setInput]=useState(true)
    let [result,setResult]=useState(false)

    let [currData,setData]=useState({
        monthlyBill:"",
        propertyType:"residential",
        roofArea:""
    })

    //{requiredKW,monthlySavings,minCost,maxCost,minPayback,maxPayback}
    let [output,setOuput]=useState({
        requiredKW:0,
        monthlySavings:0,
        minCost:0,
        maxCost:0,
        minPayback:0,
        maxPayback:0
    })

    let {monthlyBill,propertyType,roofArea}=currData
    let {requiredKW,monthlySavings,minCost,maxCost,minPayback,maxPayback}=output

    let handleChange=(e)=>{
        let {name,value}=e.target
        setData({ ...currData, [name]: value })
    }

    async function sendData(obj){
        try {
            let k=await axios.post(`${BASE_URL}/api/calculator`,obj)
        } 
        catch (error) {
            console.log(error.message)
        }
    }

    let calculate=(e)=>{
        e.preventDefault()
        if(monthlyBill==""){
            setResult(false);
            setInput(false)
        }
        else{
            let obj=calculateSavings(Number(monthlyBill),propertyType,Number(roofArea));
            setOuput(obj)
            setResult(true)
            setInput(true)
            //save to database {bill,propertyType,roofAreaProvided,estimatedKW}
            let newObj={propertyType,bill:Number(monthlyBill),roofAreaProvided:false,estimatedKW:obj.requiredKW};
            if(Number(roofArea)>0){
                newObj["roofAreaProvided"]=true;
            }
            sendData(newObj)
        }
    }


    return (
        <main className=' flex flex-col gap-4 bg-gray-100'> {/**border border-black */}
             
             {/**Title of page */}
            <div className=' flex flex-col content-center items-center'> {/**border border-blue-800 */}
                <h1 className='text-[#003366] text-4xl md:text-5xl lg:text-6xl font-bold italic p-2'>{t("calculator")}</h1>
                <h1 className='text-[#004C99] text-lg md:text-xl lg:text-2xl italic font-semibold p-2'>{t("calculatorPage.headline")}</h1>
            </div>

            {/**Soalr calculator inputs */}
            <div className='border border-[#E0E0E0] bg-white rounded-xl shadow-md max-w-xl mx-auto '>
                <form action="" method="post" className=' flex flex-col gap-5 m-2'> {/**border border-orange-700 */}
                    {/**monthly bill */}
                    <section className=''> {/**border border-green-800 */}
                        <div className=''>
                            <label className='text-[#333333] text-xl font-sans font-bold'>{t("calculatorPage.inputs.monthlyBill.label")} </label> 
                            <span className='inline-block align-baseline text-[#333333]' title={t("calculatorPage.inputs.monthlyBill.helper")}><HiQuestionMarkCircle /></span>
                        </div>
                        <input type="text" name="monthlyBill" value={monthlyBill} onChange={handleChange} className="w-full m-1 border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/> 
                    </section>

                    {/**property type */}
                    <section className=''> {/**border border-green-800 */}
                        <div>
                            <label className='text-[#333333] text-xl font-sans font-bold'>{t("calculatorPage.inputs.propertyType.label")} </label> 
                            <span className='inline-block align-baseline text-[#333333]' title={t("calculatorPage.inputs.propertyType.helper")}><HiQuestionMarkCircle /></span>
                        </div>
                        <select name="propertyType" id="" onChange={handleChange} className="w-full m-1 border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]">
                            <option value="residential" className=''>{t("calculatorPage.inputs.propertyType.options.residential")}</option>
                            <option value="commercial">{t("calculatorPage.inputs.propertyType.options.commercial")}</option>
                        </select>
                    </section>

                    {/**Roof area */}
                    <section className=''> {/**border border-green-800 */}
                        <div>
                            <label className='text-[#333333] text-xl font-sans font-bold'>{t("calculatorPage.inputs.roofArea.label")} </label>
                            <span className='inline-block align-baseline text-[#333333]' title={t("calculatorPage.inputs.roofArea.helper")}><HiQuestionMarkCircle /></span>
                        </div>
                        <input type="text" name='roofArea' value={roofArea} onChange={handleChange} className="w-full m-1 border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/>
                    </section>

                    {/**Calculate button */}
                    <section className=' flex justify-center'> {/**border border-green-800 */}
                        <button onClick={calculate} className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold shadow-md hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition">{t("calculatorPage.button.calculate")}</button>
                    </section>
                
                </form>
            </div>

            {/**Invalid Inputs */}
            {
                isInputCorrect==false && (
                    <div className='flex justify-center m-2'>
                        <h1 className='text-red-600 text-xl font-sans font-bold'>Please enter all the valid information</h1>
                    </div>
                )
            }

            {/**Soalr calculator output */}
            {
                result && isInputCorrect && (
                    <div className=' bg-yellow-50 border border-yellow-200 m-2 flex flex-col justify-center items-center gap-4 p-6 rounded-xl shadow-md max-w-xl mx-auto'>
                        <h1 className='text-[#333333] text-xl font-sans font-bold'>{t("calculatorPage.results.capacity")}: {requiredKW} kW</h1>
                        <h1 className='text-[#333333] text-xl font-sans font-bold'>{t("calculatorPage.results.savings")} : {Number(monthlySavings).toLocaleString("en-IN")}</h1> 
                        <h1 className='text-[#333333] text-xl font-sans font-bold'>{t("calculatorPage.results.cost")} : {Number(minCost).toLocaleString("en-IN")} - {Number(maxCost).toLocaleString("en-IN")}</h1>
                        <h1 className='text-[#333333] text-xl font-sans font-bold'>{t("calculatorPage.results.payback")} : {minPayback} - {maxPayback}</h1>
                        <p className='text-[#333333] text-base font-sans italic'>{t("calculatorPage.disclaimer")}</p>

                        <div className='flex flex-col items-center gap-4 m-2'>
                            <h1 className='text-2xl font-bold font-sans text-[#004C99] italic'>{t("calculatorPage.cta.line")} {t("calculatorPage.cta.call")}</h1>
                            <button onClick={()=>navigate("/contact/sitevisit")} className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold shadow-md hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition">{t("calculatorPage.cta.requestVisit")}</button>
                        </div>
                    </div>
                )
            }
        </main>
    )
}

export default Calculator
