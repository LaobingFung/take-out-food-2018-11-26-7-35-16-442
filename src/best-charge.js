'use strict';
var loadAllItems = require("items.js");
var loadPromotions = require("promotions");

function bestCharge(selectedItems) {
  return /*TODO*/;
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
  }, allItems)
  return itemsList;
  //return Arr like
  //[{id: "ITEM0001", count: 1, subtotal: 18.00}, {id: "ITEM0013", count: 2, subtotal: 12.00}, {id: "ITEM0022", count: 1, subtotal: 8.00}]
}

function computeDiscount(itemsPriceList) {
  let promotions = loadPromotions();
  let totalPriceTemp = itemsPriceList.reduce((acc, curObj) => {
    return acc += curObj.subtotal
  }, 0);
  let discount6Per30 = Math.floor(totalPriceTemp / 30) * 6;
  let discountHalf = itemsPriceList.reduce((acc, curObj) => {
    if (promotions[1].items.includes(curObj.id)) {
      return acc += curObj.subtotal / 2;
    }
  }, 0);
  let discountObj = discount6Per30 >= discountHalf ?
    //return Object like {type: '满30减6元', discount: 6.00}
    //or {type: '指定菜品半价',items: ['ITEM0001', 'ITEM0022'], discount: 13.00}
}

function computeDiscount6Per30(itemsPriceList, promotions) {
  let totalPriceTemp = itemsPriceList.reduce((acc, curObj) => {
    return acc += curObj.subtotal
  }, 0);
  return discount = Math.floor(totalPriceTemp / 30) * 6;
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
        return curObj.id;
    })
  };
}

function computeTotalPrice(itemsPriceList, promotion) {
  //return Number totalPrice
}

function getBill(itemsPriceList, promotion, totalPrice) {
  //return final bill to print
}