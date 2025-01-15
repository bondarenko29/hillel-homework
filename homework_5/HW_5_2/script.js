function myFunction() {
    let fragment = new DocumentFragment();
    for (let i = 10; i<= 100; i += 10) {
        let result = i * 26;
        result = `${i} $ = ${result} грн`;
        let el = document.createElement("li"); 
        el.append(result); 
        fragment.append(el);
        console.log(result);
    }
    return fragment;
}



