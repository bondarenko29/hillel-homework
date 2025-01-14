function myFunction(){
    let array = '';
    for (let i = 20; i <= 30; i += 0.5) {
        array += i + ' ';
        array = array.replace('.', ',');
    }    
    console.log(`(${array.trim()})`);
}

