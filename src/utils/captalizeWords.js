export const captalizeWords=(word='')=>{
    if(!word) return "";
    // console.log("words:",word.charAt(0).toUpperCase()+word.slice(1).toLocaleLowerCase());
    return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
}