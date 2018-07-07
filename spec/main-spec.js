const main = require('../main/main');
const {formatMenu,
        detailMenu,
        calculateSubtotal
} = require('../main/main');
const {loadAllItems}=require('../main/items');
const {loadPromotions}=require('../main/items');
// describe('Take out food', function () {

//     it('should generate best charge when best is 指定菜品半价', function() {
//       let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//       let summary = bestCharge(inputs).trim();
//       let expected = `
//   ============= 订餐明细 =============
//   黄焖鸡 x 1 = 18元
//   肉夹馍 x 2 = 12元
//   凉皮 x 1 = 8元
//   -----------------------------------
//   使用优惠:
//   指定菜品半价(黄焖鸡，凉皮)，省13元
//   -----------------------------------
//   总计：25元
//   ===================================`.trim()
//       expect(summary).toEqual(expected)
//     });
  
//     it('should generate best charge when best is 满30减6元', function() {
//       let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
//       let summary = bestCharge(inputs).trim();
//       let expected = `
//   ============= 订餐明细 =============
//   肉夹馍 x 4 = 24元
//   凉皮 x 1 = 8元
//   -----------------------------------
//   使用优惠:
//   满30减6元，省6元
//   -----------------------------------
//   总计：26元
//   ===================================`.trim()
//       expect(summary).toEqual(expected)
//     });
  
//     it('should generate best charge when no promotion can be used', function() {
//       let inputs = ["ITEM0013 x 4"];
//       let summary = bestCharge(inputs).trim();
//       let expected = `
//   ============= 订餐明细 =============
//   肉夹馍 x 4 = 24元
//   -----------------------------------
//   总计：24元
//   ===================================`.trim()
//       expect(summary).toEqual(expected)
//     });
      
//   });

  describe('Take out food', function () {

    it('formatMenu', function() {
    //when
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let formatMenu_text=formatMenu(inputs);
    //then
    const actualText = [ { id: 'ITEM0001', count: 1 },
    { id: 'ITEM0013', count: 2 },
    { id: 'ITEM0022', count: 1 } ];
      expect(formatMenu_text).toEqual(actualText)
    });
  
   });
   describe('Take out food', function () {

    it('formatMenu', function() {
    //when
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let loadAllItems_text=loadAllItems();
    //console.log(loadAllItems_text);
    let formatMenu_text=formatMenu(inputs);
    let detailMenu_text=detailMenu(formatMenu_text,loadAllItems_text);
    //then
    const actualText = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      count:1,
      price: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      count:2,
      price: 6.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      count:1,
      price: 8.00
    }];
      expect(detailMenu_text).toEqual(actualText)
    });
  
   });
   describe('Take out food', function () {

    it('formatMenu', function() {
    //when
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let loadAllItems_text=loadAllItems();
    //console.log(loadAllItems_text);
    let formatMenu_text=formatMenu(inputs);
    let detailMenu_text=detailMenu(formatMenu_text,loadAllItems_text);
    let calculateSubtotal_text = calculateSubtotal(detailMenu_text); 
    
    //then
    const actualText = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      count:1,
      price:18.00,
      subtotal:18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      count:2,
      price: 6.00,
      subtotal:12.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      count:1,
      price: 8.00,
      subtotal:16.00
    }];
      expect(calculateSubtotal_text).toEqual(actualText)
    });
  
   });