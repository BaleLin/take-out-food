// Write your cade below:
const {loadAllItems}=require('../main/items');
const {loadPromotions}=require('../main/promotions');
function formatMenu(menuCollections){
    let menuObjects = [];
    menuCollections.map(menuCollection =>{
            let spil = menuCollection.split("x");
            let fomatStr=spil[0].replace(/(\s*$)/g,"")
            menuObjects.push({
                id:fomatStr,
                count:parseInt(spil[1])
            });
        }
    );
    //console.log(menuObjects);
    return menuObjects;
}
function detailMenu(menuObjects,loadAllItems){
    let menudetaleObjects = [];
            for(let menuObject of menuObjects){
                for(let loadAllItem of loadAllItems){
                    if(menuObject.id===loadAllItem.id){
                       menudetaleObjects.push({
                           id:menuObject.id,
                           name:loadAllItem.name,
                           count:menuObject.count,
                           price:loadAllItem.price

                       });
                   }
               }
            } 
    return menudetaleObjects;
}
function calculateSubtotal(menudetaleObjects){
    let menudetaleSubtotalObjects = [];
    menudetaleObjects.map(menudetaleObject=>{
        menudetaleObject.subtotal=parseInt(menudetaleObject.price)*parseInt(menudetaleObject.count);
        menudetaleSubtotalObjects.push(menudetaleObject);
    });
   //console.log(menudetaleSubtotalObjects);
    return menudetaleSubtotalObjects;
}
function calculateFirstDiscount(menudetaleSubtotalObjects,loadPromotions){
    let sum = 0;
    let menuDiscountbjects = {};
    menudetaleSubtotalObjects.map(menudetaleSubtotalObject=>{
        sum += menudetaleSubtotalObject.subtotal;
    });
    if(sum>=30){
        menuDiscountbjects.type = loadPromotions[0].type;
        menuDiscountbjects.saveMoney = 6;
    }else{
        menuDiscountbjects.type = loadPromotions[0].type;
        menuDiscountbjects.saveMoney = 0;
    }
    console.log(menuDiscountbjects);
    return menuDiscountbjects;
}
function calculateSecondDiscount(menudetaleSubtotalObjects,loadPromotions){
    let sum = 0;
    let menuDiscountbjects = {};
    menudetaleSubtotalObjects.map(menudetaleSubtotalObject=>{
        loadPromotions[1].items.map(loadPromotion=>{
            if(menudetaleSubtotalObject.id===loadPromotion){
                sum += (menudetaleSubtotalObject.subtotal/2);
            }
           });
    });
    menuDiscountbjects.type = loadPromotions[1].type;
    menuDiscountbjects.saveMoney = sum;
    console.log(menuDiscountbjects);
    return menuDiscountbjects;
}
function claculateSum(menudetaleSubtotalObjects,loadPromotions){
    let firstDiscount = calculateFirstDiscount(menudetaleSubtotalObjects,loadPromotions);
    let secondDiscount = calculateSecondDiscount(menudetaleSubtotalObjects,loadPromotions);
    if(firstDiscount.saveMoney>secondDiscount.saveMoney){
        return firstDiscount;
    }else{
        return secondDiscount;
    }
}
module.exports = {
    formatMenu,
    detailMenu,
    calculateSubtotal,
    calculateFirstDiscount,
    calculateSecondDiscount,
    claculateSum
}
