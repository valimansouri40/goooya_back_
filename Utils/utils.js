exports.UniqueRandomNumber = (arr)=>{
    const min = Math.ceil(15689);
    const max = Math.floor(97238);
    const RandomNumber = Math.floor(Math.random() * (max - min)) + min;
    const unique = arr.map(mp=>{
           const strToarr = mp.split('-')[2].replace('.jpeg','');
            
            if( strToarr && strToarr === RandomNumber){
                return strToarr
            }
    })
    
    while(unique && unique.length > 0 && unique[0] === RandomNumber){
        this.UniqueRandomNumber(arr)
    }
    
    return RandomNumber;
}