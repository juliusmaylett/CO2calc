var id = "169cv5RLUbmydenH6GrfhihUy2WdIUgAGH-XeeEfRUtU"
var ss = SpreadsheetApp.openById(id);
var UITemp = HtmlService.createTemplateFromFile("WebAppUI");
UITemp.evaluate();

function doGet(e) {     
  return HtmlService.createTemplateFromFile("WebAppUI")
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function userClicked(userInput) {
    
    // Calculating the results of different categories  
    var GUID = userInput.GUID;
    var electricityCO2 = getElectricityEmissions(userInput);
    var heatingCO2 = getHeatingEmissions(userInput);
    var foodCO2 = getFoodEmissions(userInput);
    var travellingCO2 = getTravellingEmissions(userInput);
    var waterUsageCO2 = getWaterUsageEmissions(userInput);
    var wasteHandlingCO2 = getWasteHandlingEmissions(userInput);
    var consumablesCO2 = getConsumablesEmissions(userInput);
    var leisureCO2 = getLeisureEmissions(userInput);
    var dataSheet = ss.getSheetByName("data");
            
    
   // Checking if the same GUID (the same browser session) has allready input some data on the sheet. If it has, delete the old data
   var data = ss.getDataRange().getValues();
   var sheetRow = 0;
   data.forEach(function (row) {
     if(row[9] == GUID) {
       ss.deleteRow(sheetRow + 1);
     }
     sheetRow+=1;
   });
    
    // Pushing the result data in Google Sheets
    dataSheet.appendRow([
      electricityCO2,
      heatingCO2, 
      foodCO2, 
      travellingCO2,
      waterUsageCO2, 
      wasteHandlingCO2, 
      consumablesCO2, 
      leisureCO2,
      new Date(), 
      GUID
      ]);
      



        
    // Calculating the average of users of the calculator
    var averages = [];
    averages.push(dataSheet.getRange("A2").getValue());
    averages.push(dataSheet.getRange("B2").getValue());
    averages.push(dataSheet.getRange("C2").getValue());
    averages.push(dataSheet.getRange("D2").getValue());
    averages.push(dataSheet.getRange("E2").getValue());
    averages.push(dataSheet.getRange("F2").getValue());
    averages.push(dataSheet.getRange("G2").getValue());
    averages.push(dataSheet.getRange("H2").getValue());

// Structuring data for the result chart
var data = [{
    label: "Heating",
    average: dataSheet.getRange("B2").getValue(),
    subLabels: [{
      label: "Room heating",
      value: getHeatingEmissions(userInput),
      backgroundColor: "#ef9a9a",
      borderColor: "#d50000"
    },{
      label: "Sauna",
      value: getSaunaHeatingEmissions(userInput),
      backgroundColor: "#ffcdd2",
      borderColor: "#d50000"
    }]
  }, {

    label: "Electricity",
    average: dataSheet.getRange("A2").getValue(),
    subLabels: [{
      label: "Electricity",
      value: getElectricityEmissions(userInput),
      backgroundColor: "#fff59d",
      borderColor: "#fbc02d"
    }]
  }, {

    label: "Water usage",
    average: dataSheet.getRange("E2").getValue(),
    subLabels: [{
      label: "Shower",
      value: getShowerEmissions(userInput),
      backgroundColor: "#90caf9",
      borderColor: "#2196f3"
    }, {
      label: "Dishes",
      value: getDishesEmissions(userInput),
      backgroundColor: "#bbdefb",
      borderColor: "#2196f3"
    }, {
      label: "Laundry",
      value: getLaundryEmissions(userInput),
      backgroundColor: "#e3f2fd",
      borderColor: "#2196f3"
    }, ]
  }, {

    label: "Leisure",
    average: dataSheet.getRange("H2").getValue(),
    subLabels: [{
      label: "Accomodation services",
      value: getAccomodationEmissions(userInput),
      backgroundColor: "#66bb6a",
      borderColor: "#4caf50"
    },{
      label: "Restaurants",
      value: getRestaurantEmissions(userInput),
      backgroundColor: "#81c784",
      borderColor: "#4caf50"
    }, {
      label: "Hobbies and instruments",
      value: getHobbiesEmissions(userInput),
      backgroundColor: "#a5d6a7",
      borderColor: "#4caf50"
    }, {
      label: "Games and toys",
      value: getGamesAnsToysEmissions(userInput),
      backgroundColor: "#c8e6c9",
      borderColor: "#4caf50"
    }, {
      label: "Pets",
      value: getPetsEmissions(userInput),
      backgroundColor: "#e8f5e9",
      borderColor: "#4caf50"
    },  ]
  }, {

    label: "Consumables",
    average: dataSheet.getRange("G2").getValue(),
    subLabels: [{
      label: "Electronics",
      value: getElectronicsEmissions(userInput),
      backgroundColor: "#ffa726",
      borderColor: "#ff9800"
    }, {
      label: "Furniture",
      value: getFurnitureEmissions(userInput),
      backgroundColor: "#ffb74d",
      borderColor: "#ff9800"
    }, {
      label: "Clothes and accessories",
      value: getClothesEmissions(userInput),
      backgroundColor: "#ffcc80",
      borderColor: "#ff9800"
    }, {
      label: "Handbags and suitcases",
      value: getBagsEmissions(userInput),
      backgroundColor: "#ffe0b2",
      borderColor: "#ff9800"
    }, {
      label: "Glass and plastic products",
      value: getGlassAnsPlasticProductsEmissions(userInput),
      backgroundColor: "#fff3e0",
      borderColor: "#ff9800"
    }]
  }, {

    label: "Waste handling",
    average: dataSheet.getRange("F2").getValue(),
    subLabels: [{
      label: "Mixed waste",
      value: getMixedWasteEmissions(userInput),
      backgroundColor: "#757575",
      borderColor: "#616161"
    }, {
      label: "Biowaste",
      value: getBiowasteEmissions(userInput),
      backgroundColor: "#757575",
      borderColor: "#616161"
    }, {
      label: "Cardboard",
      value: getWasteCardboardEmissions(userInput),
      backgroundColor: "#9e9e9e",
      borderColor: "#616161"
    }, {
      label: "Glass",
      value: getWasteGlassEmissions(userInput),
      backgroundColor: "#bdbdbd",
      borderColor: "#616161"
    }, {
      label: "Metal",
      value: getWasteMetalEmissions(userInput),
      backgroundColor: "#e0e0e0",
      borderColor: "#616161"
    }, {
      label: "Plastic",
      value: getWastePlasticEmissions(userInput),
      backgroundColor: "#eeeeee",
      borderColor: "#616161"
    }, {
      label: "Paper",
      value: getWastePaperEmissions(userInput),
      backgroundColor: "#f5f5f5",
      borderColor: "#616161"
    }, {
      label: "Electronics",
      value: getWasteElectronicsEmissions(userInput),
      backgroundColor: "#fafafa",
      borderColor: "#616161"
    }, {
      label: "Hazardous waste",
      value: getHazardousWasteEmissions(userInput),
      backgroundColor: "#fafafa",
      borderColor: "#616161"
    }]
  }, {

    label: "Food",
    average: dataSheet.getRange("C2").getValue(),
    subLabels: [{
      label: "Beef",
      value: getBeefEmissions(userInput),
      backgroundColor: "#00695c",
      borderColor: "#004d40"
    },{
      label: "Pork",
      value: getPorkEmissions(userInput),
      backgroundColor: "#00796b",
      borderColor: "#004d40"
    },{
      label: "Poultry",
      value: getPoultryEmissions(userInput),
      backgroundColor: "#00897b",
      borderColor: "#004d40"
    },{
      label: "Eggs",
      value: getEggsEmissions(userInput),
      backgroundColor: "#009688",
      borderColor: "#004d40"
    },{
      label: "Fish",
      value: getFishEmissions(userInput),
      backgroundColor: "#26a69a",
      borderColor: "#004d40"
    },{
      label: "Dairy products",
      value: getDairyProductsEmissions(userInput),
      backgroundColor: "#4db6ac",
      borderColor: "#004d40"
    },{
      label: "Cheese",
      value: getCheeseEmissions(userInput),
      backgroundColor: "#80cbc4",
      borderColor: "#004d40"
    },{
      label: "Other",
      value: getOtherFoodEmissions(userInput),
      backgroundColor: "#b2dfdb",
      borderColor: "#004d40"
    }]
  },

  {
    label: "Travelling",
    average: dataSheet.getRange("D2").getValue(),
    subLabels: [{
      label: "Cars",
      value: getCarsEmissions(userInput),
      backgroundColor: "#7e57c2",
      borderColor: "#673ab7"
    }, {
      label: "Motorbikes or mopeds",
      value: getTwoWheeledEmissions(userInput),
      backgroundColor: "#9575cd",
      borderColor: "#673ab7"
    }, {
      label: "Aviation",
      value: getAviationEmissions(userInput),
      backgroundColor: "#b39ddb",
      borderColor: "#673ab7"
    }, {
      label: "Cruising",
      value: getMarineTransportEmissions(userInput),
      backgroundColor: "#d1c4e9",
      borderColor: "#673ab7"
    }, {
      label: "Public transport",
      value: getPublicTransportEmissions(userInput),
      backgroundColor: "#ede7f6",
      borderColor: "#673ab7"
    }]
  }
];
    
return data;
   
  }
  
// Calculation of emissions in tCO2e divided in given categories

function getElectricityEmissions(userInput) {
  var totalElecEmissions = 0;
  
  var elecEmissionFactor = getElecEmissionFactor(userInput);
  
  var elecSaunaEmissions = 0;
  if (userInput.saunaType == 1) {
    elecSaunaEmissions = getSaunaHeatneed(userInput.saunaPerMonth) * elecEmissionFactor;
  }
  
  var electricCarCO2 = getElectricCarElectricityEmissions(userInput); // Needs to be implemented
  
  var householdElecCO2 = getAppliancesElecConsumption(userInput) * elecEmissionFactor;
  
  var minusElecHeating = 0;
  
  if (userInput.heatSource == 4) {
    var buildingHeatNeed = getBuildingHeatNeed(userInput);
    var CO2perKWh = getHeatSourceEmissions(userInput.heatSource);
    var efficiency = getHeatSourceEfficiency(userInput.heatSource);
    var municipalFactor = getMunicipalMultiplier(userInput.municipality);
    var roomTempFactor = getRoomTempMultiplier(userInput.roomTemp);
  
    var fixedHeat = buildingHeatNeed * municipalFactor;
    var totalHeat = userInput.housingArea * fixedHeat / efficiency / userInput.residents;
    var minusElecHeating = totalHeat * CO2perKWh;
  }
  
  var minusDishes = getDishesEmissions(userInput); // Calulated in water usage
  var minusLaundry = getLaundryEmissions(userInput); // Calulated in water usage
  

  
  
  if (userInput.elecDetail == 0) {
    totalElecEmissions = elecSaunaEmissions + electricCarCO2 + householdElecCO2  - minusElecHeating - minusDishes - minusLaundry;
  }
  
  if (userInput.elecDetail == 1) {
    totalElecEmissions = userInput.elecAnnualConsumption * elecEmissionFactor - minusElecHeating - minusDishes - minusLaundry;
  }
  
  if (userInput.elecDetail == 2) {
    totalElecEmissions = userInput.elecMonthlyBill / 0.14 * 12 * elecEmissionFactor - minusElecHeating - minusDishes - minusLaundry;
  }
  
  // Other variables
  return totalElecEmissions;
}

function getSaunaHeatingEmissions(userInput) {
    if (userInput.saunaType == 2) { // If the sauna type is "Wood", it is calculated as heating
    var saunaEmissions = getSaunaHeatneed(userInput.saunaPerMonth) * 0.395 / 0.77;
    return saunaEmissions;
  } 
  return 0;

}

function getHeatingEmissions(userInput) {
  
  var buildingHeatNeed = getBuildingHeatNeed(userInput);
  var CO2perKWh = getHeatSourceEmissions(userInput.heatSource);
  var efficiency = getHeatSourceEfficiency(userInput.heatSource);
  var municipalFactor = getMunicipalMultiplier(userInput.municipality);
  var roomTempFactor = getRoomTempMultiplier(userInput.roomTemp);
  
  var fixedHeat = buildingHeatNeed * municipalFactor;
  var totalHeat = userInput.housingArea * fixedHeat / efficiency / userInput.residents;
  var heatingEmissions = totalHeat * CO2perKWh;

  return heatingEmissions;
}

function getBeefEmissions(userInput) {
  if (userInput.diet > 0) { 
    return 0; 
  } else {
    if (userInput.detailedDiet === false) {
      var amount = userInput.portionSize * 18.8;
    } else {
      var amount = userInput.kGs[0];
    }
    return 19 * amount;
  }
}

function getPorkEmissions(userInput) {
  if (userInput.diet > 0) { 
    return 0; 
  } else {
    if (userInput.detailedDiet === false) {
      var amount = userInput.portionSize * 30.8;
    } else {
      var amount = userInput.kGs[1];
    }
    return 6 * amount;
  }
}

function getPoultryEmissions(userInput) {
  if (userInput.diet > 0) { 
    return 0; 
  } else {
    if (userInput.detailedDiet === false) {
      var amount = userInput.portionSize * 26.6;
    } else {
      var amount = userInput.kGs[2];
    }
    return 3 * amount;
  }
}

function getEggsEmissions(userInput) {
  if (userInput.diet > 3) { 
    return 0; 
  } else {
    if (userInput.detailedDiet === false) {
      var amount = userInput.portionSize * 11.9;
    } else {
      var amount = userInput.kGs[3];
    }
    return 4 * amount;
  }
}


function getFishEmissions(userInput) {
  if (userInput.diet > 3) { 
    return 0; 
  } else {
    if (userInput.detailedDiet === false) {
      var amount = userInput.portionSize * 14.9;
    } else {
      var amount = userInput.kGs[4];
    }
    return 3.7 * amount;
  }
}

function getDairyProductsEmissions(userInput) {
  if (userInput.diet > 3) { 
    return 0; 
  } else {
    if (userInput.detailedDiet === false) {
      var amount = userInput.portionSize * 151.6;
    } else {
      var amount = userInput.kGs[5];
    }
    return 1.9 * amount;
  }
}

function getCheeseEmissions(userInput) {
  if (userInput.diet > 3) { 
    return 0; 
  } else {
    if (userInput.detailedDiet === false) {
      var amount = userInput.portionSize * 24.9;
    } else {
      var amount = userInput.kGs[6];
    }
    return 13.9 * amount;
  }
}

function getOtherFoodEmissions(userInput){
  if (userInput.detailedDiet === false) {
    return 1.75 * 395.5 * userInput.portionSize;
  } else {
    var otherFoodKGs = 675 * userInput.portionSize;
    for (i = userInput.diet; i < userInput.kGs.length;i++) {
      otherFoodKGs -= userInput.kGs[i];
    }
    return 1.75 * otherFoodKGs;
  }
}


function getFoodEmissions(userInput) {
  var beef = getBeefEmissions(userInput);
  var pork = getPorkEmissions(userInput);
  var poultry = getPoultryEmissions(userInput);
  var eggs = getEggsEmissions(userInput);
  var fish = getFishEmissions(userInput);
  var dairy = getDairyProductsEmissions(userInput);
  var cheese = getCheeseEmissions(userInput);
  var other = getOtherFoodEmissions(userInput);

  return beef + pork + poultry + eggs + fish + dairy + cheese + other;
}

function getTravellingEmissions(userInput) {
  var carEmissions = getCarsEmissions(userInput);
  var publicTransportEmissions = getPublicTransportEmissions(userInput);
  var marineEmissions = getMarineTransportEmissions(userInput);
  var aviaEmissions = getAviationEmissions(userInput);
  var bikeEmissions = getTwoWheeledEmissions(userInput);
  
  return marineEmissions + aviaEmissions + publicTransportEmissions + bikeEmissions + carEmissions;
}

function getTwoWheeledEmissions(userInput) {
  if (userInput.twoWheeled == 0) { 
    return 0;
  } else {
    return (userInput.kmBike * userInput.consumptionBike * 2.35) / 100;
  }
}

function getCarsEmissions(userInput) {
  
  var carEmissions = 0;
  var types = [];
  var sizes = [];
  
  for (i = 0; i < userInput.cars[0].length; i++){
    
    var type = userInput.cars[0][i];
    var size = userInput.cars[1][i];
    
    if (type == "Gasoline") {
      types.push(0);
    } else if (type == "Diesel") {
      types.push(1);
    } else if (type == "Diesel hybrid") {
      types.push(2);
    } else if (type == "Gasoline hybrid") {
      types.push(3);
    } else if (type == "Electric") {
      types.push(4);
    }
    
    if (size == "Small") {
      sizes.push(0);
    } else if (size == "Medium"){
      sizes.push(1);
    } else if (size == "Large"){
      sizes.push(2);   
    }
  }

  var kms = userInput.cars[2];
  var elecPortions = userInput.cars[3];
  var consumptions = userInput.cars[4];

  // Car production emissions for an estimated 20 year vehicle lifecycle
  var productionEmissionsTable = [
      [3.8, 5.3, 8.2],
      [3.8, 5.3, 8.2],
      [4.5, 6.1, 9.1],
      [4.5, 6.1, 9.1],
      [7.0, 9.7, 14.8]
    ];
    
  var carProductionEmissions = 0;
  
  for (i = 0; i < types.length; i++) {
    carProductionEmissions += productionEmissionsTable[types[i]][sizes[i]] * 1000 / 20;
  }
  
  carEmissions += carProductionEmissions;
  
  
  // Electricity emissions of hybrids and EVs
  var elecConsumption = [0.15, 0.225, 0.3];
  
  var carElecConsumption = 0;
  
  for (i = 0; i < types.length; i++) {
    carElecConsumption += kms[i] * elecPortions[i] * elecConsumption[sizes[i]];
  }
  
  var elecEmissionFactor = getElecEmissionFactor(userInput);
  
  if (isNaN(elecEmissionFactor)){
    elecEmissionFactor = 0.141;
  } 

  var fuelEmissionFactors = [2.35, 2.6, 2.35, 2.6, elecEmissionFactor];
  var fuelEmissions = 0;
  
  for (i = 0; i < types.length; i++) {
    // Electricity emissions
    fuelEmissions += kms[i] * elecPortions[i] * elecConsumption[sizes[i]] * elecEmissionFactor;
    // Gasoline and diesel emissions
    fuelEmissions += kms[i] * (1 - elecPortions[i]) * consumptions[i] / 100 * fuelEmissionFactors[types[i]];
  }

  carEmissions += fuelEmissions;
  
  return carEmissions;
}


function getPublicTransportEmissions(userInput) {
  return userInput.publicTransport * 52 * 0.035;
}

function getMarineTransportEmissions(userInput) {
  return (userInput.marine * 45 * 0.31);
}

function getAviationEmissions(userInput) {
  var aviaOver3hHours = userInput.aviaOver3h * userInput.aviaTotal;
  var aviaEmissions = ((userInput.aviaTotal - aviaOver3hHours) * 0.259 + aviaOver3hHours * 0.132) * 750;
  return aviaEmissions;
}

function getWaterUsageEmissions(userInput) {
  
  var shower = getShowerEmissions(userInput);
  var dishes = getDishesEmissions(userInput);
  var laundry = getLaundryEmissions(userInput);
  
  return shower + dishes + laundry;
}

function getBiowasteEmissions(userInput) {
  return 78.6 * ((1 - userInput.biowaste) * 0.069 + userInput.biowaste * 0.037);
}

function getWasteCardboardEmissions(userInput) {
  return 10.7 * ((1 - userInput.cardboard) * 0.060 + userInput.cardboard * 0.017);
}

function getWasteGlassEmissions(userInput) {
  return 22.2 * ((1 - userInput.glass) * 0.570 + userInput.glass * 0.171);
}

function getWasteMetalEmissions(userInput) {
  return 11.7 * ((1 - userInput.metal) * 0.130 + userInput.metal * 0.037);
}

function getWastePlasticEmissions(userInput) {
  return 7 * ((1 - userInput.plastic) * 0.070 + userInput.plastic * 0.066);
}

function getWastePaperEmissions(userInput) {
  return 32 * ((1 - userInput.paper) * 1.050 + userInput.paper * 0.437);
}

function getWasteElectronicsEmissions(userInput) {
  return 10.2 * ((1 - userInput.electronicsWaste) * 0.720 + userInput.electronicsWaste * 0.072);
}

function getHazardousWasteEmissions(userInput) {
  return 0.3 * ((1 - userInput.hazardousWaste) * 1.410 + userInput.hazardousWaste * 1.410);
}

function getMixedWasteEmissions(userInput) {
  var wasteKGs = [78.6, 10.7, 22.2, 11.7, 7, 32, 10.2, 0.3];
  var amounts = [];
  amounts.push(userInput.biowaste);
  amounts.push(userInput.cardboard);
  amounts.push(userInput.glass);
  amounts.push(userInput.metal);
  amounts.push(userInput.plastic);
  amounts.push(userInput.paper);
  amounts.push(userInput.electronicsWaste);
  amounts.push(userInput.hazardousWaste);
  
  var mixedWasteKG = 78.1;
   
  for (i = 0; i < amounts.length; i++) {
    mixedWasteKG += (1 - amounts[i]) * wasteKGs[i];
  }
  
  return mixedWasteKG * 0.41;
}


function getWasteHandlingEmissions(userInput) {
  var biowaste = getBiowasteEmissions(userInput);
  var cardboard = getWasteCardboardEmissions(userInput);
  var glass = getWasteGlassEmissions(userInput);
  var metal = getWasteMetalEmissions(userInput);
  var plastic = getWastePlasticEmissions(userInput);
  var paper = getWastePaperEmissions(userInput);
  var electronics = getWasteElectronicsEmissions(userInput);
  var hazardous = getHazardousWasteEmissions(userInput);
  var mixed = getMixedWasteEmissions(userInput);

  return biowaste + cardboard + glass + metal + plastic + paper + electronics + hazardous + mixed;
}

function getElectronicsEmissions(userInput) {
  return userInput.elecSpent * 0.66 * (1 - (userInput.consumablesSecondHand/100));
}

function getFurnitureEmissions(userInput) {
  return userInput.furnSpent * 0.60 * (1 - (userInput.consumablesSecondHand/100));
}

function getClothesEmissions(userInput) {
  return userInput.clothSpent * 0.59 * (1 - (userInput.consumablesSecondHand/100));
}

function getBagsEmissions(userInput) {
  return userInput.bagSpent * 0.85 * (1 - (userInput.consumablesSecondHand/100));
}

function getGlassAnsPlasticProductsEmissions(userInput) {
  return userInput.glassSpent * 1 * (1 - (userInput.consumablesSecondHand/100));
}


function getConsumablesEmissions(userInput) {
  
  var elec = getElectronicsEmissions(userInput);
  var furn = getFurnitureEmissions(userInput);
  var cloth = getClothesEmissions(userInput);
  var bag = getBagsEmissions(userInput);
  var glass = getGlassAnsPlasticProductsEmissions(userInput);
  
  var total_emissions_consumables = elec + furn + cloth + bag + glass;

  return total_emissions_consumables;
}


function getLeisureEmissions(userInput) {
  
  var hobbies = getHobbiesEmissions(userInput);
  var gamesAndToys = getGamesAnsToysEmissions(userInput)
  var hotels = getAccomodationEmissions(userInput);
  var restaurants = getRestaurantEmissions(userInput);
  var petEmissions = getPetsEmissions(userInput);
  var total_emissions = hobbies + gamesAndToys + hotels + restaurants + petEmissions;
  return total_emissions;
}

function getHobbiesEmissions(userInput) {
  return 0.48 * userInput.hobbies * (1 - (userInput.leisureSecondHand / 100));
}

function getGamesAnsToysEmissions(userInput) {
  return 1.6 * userInput.games * (1 - (userInput.leisureSecondHand / 100));
}

function getAccomodationEmissions(userInput) {
  return 0.49 * userInput.hotels;
}

function getRestaurantEmissions(userInput) {
  
  return 0.50 * userInput.restaurants;
}

function getPetsEmissions(userInput){
  
  var quantities = userInput.pets[0];
  var sizes = userInput.pets[1];
  var diets = userInput.pets[2];
  
  var emissions = 0;
  
  var emiTable = [
    [31, 31],
    [101, 61],
    [337, 164]
  ];


  for (i = 0; i < quantities.length; i++) {
    var quantity = quantities[i];
    var size = sizes[i];
    var diet = diets[i];

    sizePar = 0;

    if (size == "Small") {
      sizePar = 0;
    } else if (size == "Medium") {
      sizePar = 1;
    } else {
      sizePar = 2;
    }

    dietPar = 0;

    if (diet == "Carnivore") {
      dietPar = 0;
    } else {
      dietPar = 1;
    }
    emissions = parseFloat(emissions) + parseFloat(quantity * emiTable[sizePar][dietPar]);
  }
  return Math.round(emissions);
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Sub functions start from here

function getHeatSourceEmissions(heatSource) {
  var heatTypeEmissions = [0.0, 0.164, 0.262, 0.127, 0.141, 0.395]; 
  return heatTypeEmissions[heatSource];
}

function getHeatSourceEfficiency(heatSource) {
  var heatTypeEmissions = [0.0, 0.95, 0.78, 2.9, 1.0, 0.77]; 
  return heatTypeEmissions[heatSource];
}

function getBuildingHeatNeed(userInput) {
  
  var proportional = [[0.0, 0.0, 0.0],
                      [0.56, 0.63, 0.65], 
                      [0.84, 0.94, 0.98], 
                      [0.84, 0.94, 0.98], 
                      [0.89, 0.98, 1.02], 
                      [1.19, 1.13, 1.16], 
                      [1.21, 1.13, 1.2], 
                      [1.28, 1.13, 1.09], 
                      [1.19, 1.13, 0.92]]; 
 
  var houseTypeBaseValues = [221.5, 149.7, 151.8]
  
  var baseValue = houseTypeBaseValues[userInput.housingType];
  var multiplier = proportional[userInput.houseAge][userInput.housingType];
  
  return multiplier * baseValue * 0.86;
}

function getMunicipalMultiplier(municipality) {
  let munips = {"20": 0.86, "5": 1.04, "9": 1.12, "10": 1.03, "16": 0.87, "18": 0.84, "19": 0.74, "35": 0.64, "43": 0.63, 
                "46": 1.06, "47": 1.89, "49": 0.7, "50": 0.77, "51": 0.77, "52": 1.03, "60": 0.64, "61": 0.85, "62": 0.62, 
                "65": 0.64, "69": 1.19, "71": 1.15, "72": 1.13, "74": 1.06, "75": 0.78, "76": 0.63, "77": 1.03, "78": 0.66, 
                "79": 0.79, "81": 0.88, "82": 0.84, "86": 0.85, "90": 1.07, "111": 0.86, "91": 0.68, "97": 0.92, "98": 0.87, 
                "102": 0.85, "103": 0.84, "105": 1.3, "106": 0.84, "108": 0.87, "109": 0.86, "139": 1.2, "140": 1.08, "142": 0.85, 
                "143": 0.9, "145": 0.91, "146": 1.15, "153": 0.93, "148": 1.79, "149": 0.68, "151": 0.88, "152": 0.91, "165": 0.85, 
                "186": 0.77, "167": 1.12, "169": 0.84, "170": 0.64, "171": 1.03, "172": 1, "176": 1.15, "177": 0.92, "178": 0.94, 
                "179": 1, "181": 0.9, "182": 0.99, "202": 0.72, "204": 1.08, "205": 1.24, "208": 1.1, "211": 0.87, "213": 1.02, 
                "214": 0.88, "216": 1.04, "217": 1.1, "218": 0.89, "224": 0.85, "226": 1.05, "230": 0.92, "231": 0.85, "232": 0.92, 
                "233": 1.01, "235": 0.69, "236": 1.05, "239": 1.06, "240": 1.18, "320": 1.64, "241": 1.22, "322": 0.66, "244": 1.15, 
                "245": 0.75, "249": 1.03, "250": 0.92, "256": 1.06, "257": 0.69, "260": 1.07, "261": 1.75, "263": 1.19, "265": 1.05, 
                "318": 0.62, "271": 0.79, "272": 0.95, "273": 1.66, "275": 1.04, "276": 1.12, "280": 0.87, "284": 0.75, "285": 0.77, 
                "286": 0.86, "287": 0.85, "288": 0.95, "290": 1.28, "291": 0.89, "295": 0.63, "297": 1.05, "300": 1.03, "301": 0.92, 
                "304": 0.7, "305": 1.66, "312": 1.06, "316": 0.86, "317": 1.2, "318": 0.62, "398": 0.86, "399": 0.9, "400": 0.73, 
                "407": 0.78, "402": 1.08, "403": 1.03, "405": 0.91, "408": 1.01, "410": 1.03, "416": 0.9, "417": 0.63, "418": 0.86, 
                "420": 1.03, "421": 1.07, "422": 1.23, "423": 0.73, "425": 1.16, "426": 1.08, "444": 0.76, "430": 0.84, "433": 0.85, 
                "434": 0.77, "435": 0.97, "436": 1.13, "438": 0.62, "440": 0.92, "441": 0.9, "475": 0.87, "478": 0.63, "480": 0.75, 
                "481": 0.72, "483": 1.12, "484": 0.79, "489": 0.89, "491": 0.93, "494": 1.17, "495": 1.05, "498": 1.75, "499": 0.88, 
                "500": 0.99, "503": 0.73, "504": 0.84, "505": 0.84, "508": 1.01, "507": 0.9, "529": 0.7, "531": 0.78, "535": 1.08, 
                "536": 0.87, "538": 0.73, "541": 1.24, "543": 0.77, "545": 0.87, "560": 0.84, "561": 0.75, "562": 0.89, "563": 1.13, 
                "564": 1.18, "309": 1.09, "576": 0.88, "577": 0.73, "578": 1.27, "445": 0.68, "580": 0.95, "581": 0.92, "599": 0.93, 
                "583": 1.68, "854": 1.62, "584": 1.06, "588": 0.91, "592": 1.03, "593": 1.03, "595": 1.06, "598": 0.91, "601": 1.16, 
                "604": 0.87, "607": 1.12, "608": 0.85, "609": 0.78, "611": 0.77, "638": 0.76, "614": 1.62, "615": 1.31, "616": 0.84, 
                "619": 0.86, "620": 1.3, "623": 0.92, "626": 1.2, "625": 1.11, "630": 1.23, "631": 0.72, "624": 0.77, "635": 0.87, 
                "636": 0.75, "678": 1.12, "710": 0.68, "680": 0.71, "681": 1.01, "683": 1.56, "684": 0.76, "686": 1.04, "687": 1.23, 
                "689": 0.94, "691": 1.07, "694": 0.85, "697": 1.28, "698": 1.6, "700": 0.93, "702": 0.92, "704": 0.73, "707": 1.07, 
                "729": 1.05, "783": 0.77, "732": 1.71, "734": 0.73, "736": 0.64, "790": 0.86, "738": 0.72, "739": 0.9, "740": 1.04, 
                "742": 1.73, "743": 0.92, "746": 1.07, "747": 0.86, "748": 1.13, "791": 1.16, "749": 1.06, "751": 1.24, "753": 0.75, 
                "755": 0.73, "758": 1.75, "759": 1.06, "761": 0.84, "762": 1.21, "765": 1.25, "766": 0.63, "768": 0.93, "771": 0.63, 
                "777": 1.34, "778": 1.04, "781": 0.88, "831": 0.9, "832": 1.38, "833": 0.7, "834": 0.84, "837": 0.87, "844": 1.05, 
                "845": 1.25, "846": 0.9, "848": 1.11, "849": 1.07, "850": 1.02, "851": 1.25, "853": 0.7, "857": 1.05, "858": 0.77, 
                "859": 1.16, "886": 0.79, "887": 0.86, "889": 1.27, "890": 1.84, "892": 1.05, "893": 0.92, "895": 0.71, "785": 1.25, 
                "905": 0.88, "908": 0.85, "92": 0.75, "915": 1.02, "918": 0.72, "921": 1.06, "922": 0.87, "924": 1.04, "925": 1.21, 
                "927": 0.78, "931": 1.04, "934": 1.04, "935": 0.87, "936": 1.02, "941": 0.63, "946": 0.9, "976": 1.56, "977": 1.12, 
                "980": 0.9, "981": 0.84, "992": 1.04, "989": 1.05,};
 return munips[municipality];
}

function getRoomTempMultiplier(roomTemp) {
  var roonTempMultiplier = 1 + 0.05 * (roomTemp - 21);
  return roonTempMultiplier;
}

function getSaunaHeatneed(saunaPerMonth) {
  // Heating a sauna takes approximately 8 kWh of energy
  return 8 * 12 * saunaPerMonth;
}


function getElecEmissionFactor(userInput) {
  // If not known, expected to be conventional
  var emissionFactors = [0, 0.141, 0];
  var contractType = userInput.elecContractType;
  var contractEmissions = emissionFactors[contractType];
  var prosumerShare = userInput.prosumerShare / 100;
  
  return (1-prosumerShare)*contractEmissions;
  
}



function getAppliancesElecConsumption(userInput) {
  var refrigeration = 430 / userInput.residents;
  var homeElectronics = 390 - 60 * (userInput.residents - 1);
  
  var annualDishesWaterUsage = userInput.weeklyDishes * (365 / 7) * 15; // Dish washer uses 15 litres of hot water per run
  var dishesheatNeed = (1.082 * annualDishesWaterUsage * 65) / 1000 / userInput.residents;
  
  var cooking = 420 - dishesheatNeed;
  var lighting = 170;
  var other = 80 - (10 * userInput.residents);
  
  return refrigeration + homeElectronics + cooking + lighting + other;
}

function getShowerEmissions(userInput) {
  var annualShowerMinutes = userInput.dailyShowerMinutes * 365;
  var heatEmissionFactor = getHeatSourceEmissions(userInput.heatSource) / getHeatSourceEfficiency(userInput.heatSource);
  
  var liters = 12 * annualShowerMinutes; // A standard tap flows 12 liters of water in a minute
  var showerKWh = (1.082* liters * (userInput.showerTemp - 5))/1000; // Pipe water temp expected to be 5'C
  return heatEmissionFactor * showerKWh;
}

function getDishesEmissions(userInput) {
  var annualDishesWaterUsage = userInput.weeklyDishes * (365 / 7) * 15; // Dish washer uses 15 litres of hot water per run
  var heatNeed = (1.082 * annualDishesWaterUsage * 65) / 1000 / userInput.residents;
  return getElecEmissionFactor(userInput) * heatNeed;
}

function getLaundryEmissions(userInput) {
  var annualLaundryWaterUsage = userInput.weeklyLaundry * (365 / 7) * 59;
  var heatNeed = (1.082 * annualLaundryWaterUsage * 33) / 1000;
  
  return getElecEmissionFactor(userInput) * heatNeed / userInput.residents;
}

function getElectricCarElectricityEmissions(userInput) {
  
  var types = [];
  var sizes = [];
  
  for (i = 0; i < userInput.cars[0].length; i++){
    
    var type = userInput.cars[0][i];
    var size = userInput.cars[1][i];
    
    if (type == "Gasoline") {
      types.push(0);
    } else if (type == "Diesel") {
      types.push(1);
    
    } else if (type == "Diesel hybrid") {
      types.push(2);
    
    } else if (type == "Gasoline hybrid") {
      types.push(3);
    
    } else if (type == "Electric") {
      types.push(4);
    }
    
    if (size == "Small") {
      sizes.push(0);
    } else if (size == "Medium"){
      sizes.push(1);
    } else if (size == "Large"){
      sizes.push(2);   
    }
  }

  var kms = userInput.cars[2];
  var elecPortions = userInput.cars[3];
  var consumptions = userInput.cars[4];
  var elecConsumption = [0.15, 0.225, 0.3];
  var carElecConsumption = 0;
  
  for (i = 0; i < types.length; i++) {
    carElecConsumption += kms[i] * elecPortions[i] * elecConsumption[sizes[i]];
  }
  
  return carElecConsumption;
}




