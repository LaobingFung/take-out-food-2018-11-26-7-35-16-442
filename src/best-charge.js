'use strict';
var loadAllItems = require("items.js");
var loadPromotions = require("promotions");

function bestCharge(selectedItems) {
  // let allItems = loadAllItems();
  // let promotions = loadPromotions();
  let itemsList = getItemsList(selectedItems);
  let itemsPriceList = computeItemsSubtotalList(itemsList);
  let promotion = computeDiscount(itemsPriceList);
  let totalPrice = computeTotalPrice(itemsPriceList, promotion);
  return getBill(itemsPriceList, promotion, totalPrice);
}

function getItemsList(originalArr) {
  let itemsList = originalArr.map(function(curStr) {
    let order = curStr.split(" x ");
    return {
      id: order[0],
      count: order[1]
    };
  });
  return itemsList;
  //return Arr like
  //[{id: "ITEM0001", count: 1}, {id: "ITEM0013", count: 2}, {id: "ITEM0022", count: 1}]
}

function computeItemsSubtotalList(itemsList) {
  let allItems = loadAllItems();
  itemsList.forEach(function(curItem, curI, arr) {
    let item = this.find(function(curItemAll) {
      return curItemAll.id === curItem.id;
    });
    let singlePrice = item.price;
    arr[curI].subtotal = singlePrice * arr[curI].count;
    arr[curI].name = item.name;
  }, allItems)
  return itemsList;
  //return Arr like
  //[{id: "ITEM0001", count: 1, subtotal: 18.00, name: '黄焖鸡'},
  // {id: "ITEM0013", count: 2, subtotal: 12.00}, name: '肉夹馍'
  // {id: "ITEM0022", count: 1, subtotal: 8.00， name: '凉皮'}]
}

function computeDiscount(itemsPriceList) {
  let promotions = loadPromotions();
  let discount6Per30 = computeDiscount6Per30(itemsPriceList, promotions);
  let discountHalf = computeDiscountHalf(itemsPriceList, promotions);
  let promotionsObj = discount6Per30 >= discountHalf.discount ? {
    "type": '满30减6元',
    "discount": discount6Per30
  } : {
    "type": '指定菜品半价',
    "names": discountHalf.specialItems,
    "discount": discountHalf.discount
  }
  return promotionsObj;
  //return Object like {type: '满30减6元', discount: 6.00}
  //or {type: '指定菜品半价',items: ['ITEM0001', 'ITEM0022'], discount: 13.00}
}

function computeDiscount6Per30(itemsPriceList, promotions) {
  let totalPriceTemp = itemsPriceList.reduce((acc, curObj) => {
    return acc += curObj.subtotal
  }, 0);
  return Math.floor(totalPriceTemp / 30) * 6;
}

function computeDiscountHalf(itemsPriceList, promotions) {
  let itemsToDiscount = itemsPriceList.filter(function(curObj) {
    return this[1].items.includes(curObj.id);
  }, promotions);
  let discount = itemsToDiscount.reduce((acc, curObj) => {
    if (promotions[1].items.includes(curObj.id)) {
      return acc += curObj.subtotal / 2;
    }
  }, 0);
  return {
    "discount": discount,
    "specialItems": itemsToDiscount.map((curObj) => {
      return curObj.name;
    })
  };
}

function computeTotalPrice(itemsPriceList, promotion) {
  let totalPriceTemp = itemsPriceList.reduce((acc, curObj) => {
    return acc += curObj.subtotal
  }, 0);
  return totalPriceTemp - promotion.discount;
  //return Number totalPrice
}

function getBill(itemsPriceList, promotion, totalPrice) {
  let output = '============= 订餐明细 =============\n';
  itemsPriceList.forEach(function(curObj) {
    let item = curObj.name + ' x ' + curObj.count + ' = ' + curObj.subtotal + '元\n';
    output += item;
  })
  output += '-----------------------------------\n';
  if (promotion.discount !== 0) {
    if (promotion.type === '满30减6元') {
      output += '使用优惠:\n满30减6元，省' + promotion.discount.toString() + '元\n';
    } else if (promotion.type === '指定菜品半价') {
      output += '使用优惠:\n指定菜品半价(';
      promotion.names.forEach(function(curStr, curI, arr) {
        output += curStr;
        output += (curI === (arr.length - 1)) ? ')，省' : '，';
      })
      output += promotion.discount.toString() + '元\n';
    }
    output += '-----------------------------------\n';
  }
  output += '总计：' + totalPrice.toString() + '元\n';
  output += '===================================';
  //return final bill to print
  return output;
}