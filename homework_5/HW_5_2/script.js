const dollarRate = 26;
function myFunction() {
    let fragment = new DocumentFragment();
    for (let i = 10; i<= 100; i += 10) {
        let result = i * dollarRate;
        result = `${i} $ = ${result} грн`;
        let el = document.createElement("li"); 
        el.append(result); 
        fragment.append(el);
        console.log(result);
    }
    return fragment;
}



