

export function calculateSavings(monthlyBill,property,roofArea){
    let monthlyUnits = monthlyBill / 7;
    
    //Estimate required solar capacity (kW)
    let requiredKW=(monthlyUnits/135)

    //Roof area validation
    //1 kW ≈ 100 sq.ft
    let requiredRoofArea=requiredKW*100

    requiredKW=Math.ceil(requiredKW)

    //Estimate monthly savings
    //Monthly Savings = Units generated × 7
    //Recommended kW × 135
    let unitsGenerated=requiredKW*135
    let monthlySavings=unitsGenerated*7

    //Estimate installation cost (range)
    /*
    Indian market averages (2025):

Residential: ₹55,000–₹65,000 per kW

Commercial: ₹45,000–₹55,000 per kW
    */
    //Min cost = kW × lower range
    // Max cost = kW × upper range
    let minCost=0
    let maxCost=0
    if(property=="residential"){
         minCost=requiredKW*55000
         maxCost=requiredKW*65000
    }
    else{
         minCost=requiredKW*45000
        maxCost=requiredKW*55000
    }

    //Payback period (years)
    //Payback (years) = System Cost / Annual Savings
    //Annual Savings=Monthly savings × 12
    let annualSavings=monthlySavings*12
    let maxPayback=maxCost/annualSavings
    let minPayback=minCost/annualSavings

    
    monthlySavings=Math.round(monthlySavings)
    minCost=Math.round(minCost)
    maxCost=Math.round(maxCost)
    minPayback=Number(minPayback.toFixed(1))
    maxPayback=Number(maxPayback.toFixed(1))

    let obj={requiredKW,monthlySavings,minCost,maxCost,minPayback,maxPayback}
    return obj;
}

