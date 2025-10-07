const toPrice = (value) => {
    if(value){
        return parseFloat(value).toLocaleString() + ' ฿';
    }
}

export default toPrice;