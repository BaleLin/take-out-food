// Write your cade below:
const {loadAllItems}=require('../main/items');
const {loadPromotions}=require('../main/items');
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
        menudetaleObject.subtotal=menudetaleObjects.price*menudetaleObjects.count;
        menudetaleSubtotalObjects.push(menudetaleObject);
    });
    return menudetaleSubtotalObjects;
}
module.exports = {
    formatMenu,
    detailMenu,
    calculateSubtotal
}
