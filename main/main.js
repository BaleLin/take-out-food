// Write your cade below:
const {loadAllItems}=require('../main/items');
const {loadPromotions}=require('../main/promotions');
function bestCharge(inputs){
    let loadAllItems_text=loadAllItems();
    let loadPromotions_text = loadPromotions();
    let formatMenu_text=formatMenu(inputs);
    let detailMenu_text=detailMenu(formatMenu_text,loadAllItems_text);
    let calculateSubtotal_text = calculateSubtotal(detailMenu_text); 
    let claculateSavemony_test = claculateSavemony(calculateSubtotal_text,loadPromotions_text);
    let claculateSum_test = claculateSum(calculateSubtotal_text,claculateSavemony_test);
    let produceList_test = produceList(calculateSubtotal_text,claculateSavemony_test,claculateSum_test);
      return produceList_test;
  }
  function formatMenu(menuCollections){
    
    return  menuCollections.map(menuCollection =>{
       let spil = menuCollection.split(" x ");
       return {
               id:spil[0],
               count:parseInt(spil[1])
                }
            }
    );
}
function detailMenu(menuObjects,loadAllItems){
    return   menuObjects.map(menuObject=>{
      let product = loadAllItems.find(loadAllItem=>menuObject.id===loadAllItem.id);
      return {
                 id:menuObject.id,
                 name:product.name,
                 count:menuObject.count,
                 price:product.price

             }
            });
}
function calculateSubtotal(menudetaleObjects){
    let menudetaleSubtotalObjects = [];
    menudetaleObjects.forEach(menudetaleObject=>{
        menudetaleObject.subtotal=parseInt(menudetaleObject.price)*parseInt(menudetaleObject.count);
        menudetaleSubtotalObjects.push(menudetaleObject);
    });
   //console.log(menudetaleSubtotalObjects);
    return menudetaleSubtotalObjects;
}
function calculateFirstDiscount(menudetaleSubtotalObjects,loadPromotions){
    let sum = 0;
    let menuDiscountbjects = {};
    menudetaleSubtotalObjects.forEach(menudetaleSubtotalObject=>{
        sum += menudetaleSubtotalObject.subtotal;
    });
    if(sum>=30){
        menuDiscountbjects.type = loadPromotions[0].type;
        menuDiscountbjects.saveMoney = 6;
    }else{
        menuDiscountbjects.type = loadPromotions[0].type;
        menuDiscountbjects.saveMoney = 0;
    }
    //console.log(menuDiscountbjects);
    return menuDiscountbjects;
}
function calculateSecondDiscount(menudetaleSubtotalObjects,loadPromotions){
    let sum = 0;
    let menuDiscountbjects = {};
    var tempMenuName = [];
    menudetaleSubtotalObjects.forEach(menudetaleSubtotalObject=>{
        loadPromotions[1].items.forEach(loadPromotion=>{
            if(menudetaleSubtotalObject.id===loadPromotion){
                sum += (menudetaleSubtotalObject.subtotal/2); 
                tempMenuName.push(menudetaleSubtotalObject.name);
            }
           });
    });
    menuDiscountbjects.type = loadPromotions[1].type;
    menuDiscountbjects.saveMoney = sum;
    menuDiscountbjects.discountMenuName = tempMenuName;
    //console.log(menuDiscountbjects);
    return menuDiscountbjects;
}
function claculateSavemony(menudetaleSubtotalObjects,loadPromotions){
    
    let firstDiscount = calculateFirstDiscount(menudetaleSubtotalObjects,loadPromotions);
    let secondDiscount = calculateSecondDiscount(menudetaleSubtotalObjects,loadPromotions);
    if(firstDiscount.saveMoney!==0&&secondDiscount.saveMoney!==0){
        if(firstDiscount.saveMoney>secondDiscount.saveMoney){
            return firstDiscount;
        }
        else{
            return secondDiscount;
        }
    }else{
        return null;
    }
   
}
function claculateSum(menudetaleSubtotalObjects,menuDiscountbjects){
    let sum = 0;
     menudetaleSubtotalObjects.forEach(menudetaleSubtotalObject=>{
            sum += menudetaleSubtotalObject.subtotal;
        });
    if(menuDiscountbjects!==null){
        sum -= menuDiscountbjects.saveMoney;
    }else{
        return sum;
    }
    return sum;
}
function produceList(menudetaleSubtotalObjects,menuDiscountbjects,sum){
  let str="============= 订餐明细 =============\n";
  for(let detalevariable of menudetaleSubtotalObjects){
    str+=`${detalevariable.name} x ${detalevariable.count} = ${detalevariable.subtotal}元\n`
  }
  if(menuDiscountbjects!==null){
    str+="-----------------------------------\n";
      str+="使用优惠:\n";
      if(menuDiscountbjects.type==="指定菜品半价"){
        let strNameCollection = "";
        for(let strName of menuDiscountbjects.discountMenuName){
            strNameCollection+=strName+'，';
        } 
        strNameCollection=strNameCollection.substring(0,strNameCollection.length-1);
        str+=`${menuDiscountbjects.type}(${strNameCollection})，省${menuDiscountbjects.saveMoney}元\n`
      }else{
        str+=`${menuDiscountbjects.type}，省${menuDiscountbjects.saveMoney}元\n`
      }
  }
   str+=`-----------------------------------\n`
  str+=`总计：${sum}元\n`
  str+=`===================================\n`
  return str.trim();
}

module.exports = {
    formatMenu,
    detailMenu,
    calculateSubtotal,
    calculateFirstDiscount,
    calculateSecondDiscount,
    claculateSavemony,
    claculateSum,
    produceList,
    bestCharge
}
