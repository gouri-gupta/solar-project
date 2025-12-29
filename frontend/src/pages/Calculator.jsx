import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiQuestionMarkCircle } from "react-icons/hi"
import { useState } from 'react';
import {calculateSavings} from '../utils/calculatorLogic.js'
import { useNavigate } from 'react-router-dom';

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
        }
    }


    return (
        <>
            <h1>{t("calculatorPage.headline")}</h1>
            <form action="" method="post">
                <label>{t("calculatorPage.inputs.monthlyBill.label")}</label> <HiQuestionMarkCircle />
                <input type="text" name="monthlyBill" value={monthlyBill} onChange={handleChange}/> <br /> <br />

                <label>{t("calculatorPage.inputs.propertyType.label")}</label> <HiQuestionMarkCircle />
                <select name="propertyType" id="" onChange={handleChange}>
                    <option value="residential">{t("calculatorPage.inputs.propertyType.options.residential")}</option>
                    <option value="commercial">{t("calculatorPage.inputs.propertyType.options.commercial")}</option>
                </select> <br /> <br />

                <label>{t("calculatorPage.inputs.roofArea.label")}</label> <HiQuestionMarkCircle />
                <input type="text" name='roofArea' value={roofArea} onChange={handleChange}/> <br /> <br />

                <button onClick={calculate}>{t("calculatorPage.button.calculate")}</button>
                
            </form>

            {
                isInputCorrect==false && (
                    <div>
                        <h1>Please enter all the valid information</h1>
                    </div>
                )
            }


            {
                result && isInputCorrect && (
                    <div>
                        <h1>{t("calculatorPage.results.capacity")}: {requiredKW} kW</h1>
                        <h1>{t("calculatorPage.results.savings")} : {Number(monthlySavings).toLocaleString("en-IN")}</h1> 
                        <h1>{t("calculatorPage.results.cost")} : {Number(minCost).toLocaleString("en-IN")} - {Number(maxCost).toLocaleString("en-IN")}</h1>
                        <h1>{t("calculatorPage.results.payback")} : {minPayback} - {maxPayback}</h1>
                        <p>{t("calculatorPage.disclaimer")}</p>

                        <h1>{t("calculatorPage.cta.line")} {t("calculatorPage.cta.call")}</h1>
                        <button onClick={()=>navigate("/contact/sitevisit")}>{t("calculatorPage.cta.requestVisit")}</button>
                    </div>
                )
            }
        </>
    )
}

export default Calculator
