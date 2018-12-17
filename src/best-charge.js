'use strict';

var loadAllItems = require("items.js");
var loadPromotions = require("promotions");

function bestCharge(selectedItems) {
  return /*TODO*/;
}

function getItemsList(originalArr){
    // return Arr like [["ITEM0001", 1], ["ITEM0013", 2], ["ITEM0022", 1]]
}

function computeItemsPriceList(itemslist){
    //return Arr like [["ITEM0001", 1, 18.00], ["ITEM0013", 2, 12.00], ["ITEM0022", 1, 8.00]]
}

function computePromotion(itemsPriceList){
    //return Object like {type: '满30减6元', discount: 6}
    //or {type: '指定菜品半价',items: ['ITEM0001', 'ITEM0022'], discount: 13}
}

function computeTotalPrice(itemsPriceList, promotion){
    //return Number totalPrice
}

function getBill(itemsPriceList, promotion, totalPrice){
    //return final bill to print
}

