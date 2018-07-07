// Write your cade below:
function formatMenu(menuCollections){
    let menuObjects = [];
    menuCollections.map(menuCollection =>{
            let spil = menuCollection.split("x");
            menuObjects.push({
                id:spil[0],
                count:parseInt(spil[1])
            });
        }
    );
    console.log(menuObjects);
    return menuObjects;
}
function detailMenu(menuObjects,loadAllItems){
    let menudetaleObjects = {};
    menuObjects.map(
        menuObject=>{loadAllItems.map(
                loadAllItem=>{
                     if(menuObject.id===loadAllItem.id){
                        menudetaleObjects.push({
                            id:menuObject.id,
                            name:loadAllItem.name,
                            count:menuObject.count,
                            price:menuObject.price

                        })
                    }
                }
            ); 
        }
    );
    console(menudetaleObjects);
    return menudetaleObjects;
}
module.exports = {
    formatMenu
}
