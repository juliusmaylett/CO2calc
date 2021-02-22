var id = "169cv5RLUbmydenH6GrfhihUy2WdIUgAGH-XeeEfRUtU"
var ss = SpreadsheetApp.openById(id);
var UITemp = HtmlService.createTemplateFromFile("WebAppUI");
var dataSheet = ss.getSheetByName("municipalities");

function doGet(e) {  
  
  //var munipSheet = ss.getSheetByName("municipalities");
  return UITemp.evaluate();
}

function userClicked(userInput) {
  
  var dataSheet = ss.getSheetByName("data");
  dataSheet.appendRow([
    userInput.input1, 
    userInput.input2, 
    userInput.age, 
    userInput.municipality, 
    userInput.housingType, 
    userInput.houseAge, 
    userInput.heatSource, 
    userInput.residents, 
    userInput.fuelType, 
    userInput.fuelConsumption, 
    userInput.annualDriving, 
    new Date()]);
    
    var data = [];
    
    data.push(electricity(userInput));
    data.push(heating(userInput));
    data.push(food(userInput));
    data.push(travelling(userInput));
    data.push(waterUsage(userInput));
    data.push(wasteHandling(userInput));
    data.push(consumables(userInput));
    data.push(leisure(userInput));
    
    var labels = [];
    //labels = ['Electricity', 'Heating', 'Food', 'Travelling', 'Water usage', 'Waste handling', 'Consumables', 'Leisure'];
    return JSON.stringify(data);
  }
  
// Calculation of emissions in tCO2e divided in given categories

function electricity(userInput) {
  var electricityCO2 = 0.86;
  return electricityCO2;
}

function heating(userInput) {
  var heatingCO2 = 2;
  var heatingNeed = dataSheet.getRange(1, 1, dataSheet.getLastRow()-1, 3);
  Logger.log(heatingNeed);
  return heatingCO2;
}

function food(userInput) {
  var foodCO2 =1.8;
  return foodCO2;
}

function travelling(userInput) {
  var travellingCO2 = userInput.annualDriving * userInput.fuelConsumption / 10000;
  return travellingCO2;
}

function waterUsage(userInput) {
  var waterUsageCO2 = 1;
  return waterUsageCO2;
}

function wasteHandling(userInput) {
  var wastehandlingCO2 = 0.5;
  return wastehandlingCO2;
}

function consumables(userInput) {
  var consumablesCO2 = 1.3;
  return consumablesCO2;
}

function leisure(userInput) {
  var leisureCO2 = 1.6;
  return leisureCO2;
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}