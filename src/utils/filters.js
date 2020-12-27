function isStringInText(string, text) {
    if(text === undefined || string === undefined)
        return false;
    return (text.toLowerCase().search(string.toLowerCase()) !== -1);
}

function removeAccents (str) {
    if(str===undefined)
        return str;
    
    var map = {
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ',
        ''  : ' '
    };
    
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
};

function isEqual(num1, num2) {
    return parseInt(num1)===parseInt(num2);
}

function filterListByText(list, textToSearch) {
    return list.filter(listItem => {
        return (isStringInText(removeAccents(textToSearch), removeAccents(listItem.description)))     
        });
}

function filterMaterialsByRecipeId(materialsRecipesList, recipeId) {
    let filteredItems = [];

    if (materialsRecipesList.length === 0)
        return filteredItems;

    filteredItems = materialsRecipesList.filter(item => isEqual(item.recipe_id, recipeId));
    return filteredItems.map(item => item.material_id)
}

function filterMaterialsAmountByRecipeId(materialsRecipesList, recipeId) {
    const filteredItems = materialsRecipesList.filter(item => isEqual(item.recipe_id, recipeId));
    return filteredItems.map(item => {
        return {"id": item.material_id, 
                "amount": item.amount}
    })
}

function filterOrdersByText(ordersList, text) {
    const textWithNoAccents = removeAccents(text);
    return ordersList.filter(listItem => {
            return isStringInText(textWithNoAccents, removeAccents(listItem.status_fabrication)) ||
                   isStringInText(textWithNoAccents, removeAccents(listItem.customerName)) ||
                   isStringInText(textWithNoAccents, removeAccents(listItem.productDescription));
        }
    );     
};

function dateSort(string1,string2){
    const date1 = new Date(string1);
    const date2 = new Date(string2);
    return date1.getTime() - date2.getTime();
}

function sortOrdersByDate(orderList){
    return orderList.sort( (order1,order2) => dateSort(order2.order_date,order1.order_date) )
}

/* function alphabeticSort(string1,string2){
    if(string1.charCodeAt(0) !== string2.charCodeAt(0)){
        return string1.charCodeAt(0) - string2.charCodeAt(0);
    }else{
        return alphabeticSort(string1.substring(1),string2.substring(1));
    }
}

function orderByName(contacts){
    return contacts.sort( (a,b) => alphabeticSort(a.name,b.name) )
} */

export {
    filterListByText,
    filterMaterialsByRecipeId,
    filterMaterialsAmountByRecipeId,
    filterOrdersByText,
    sortOrdersByDate
};