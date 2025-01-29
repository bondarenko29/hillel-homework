let company = {
    sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600}],
    development:  {
      web: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800}],
      fullstack: [{name: 'Adam', salary: 2500}, {name: 'Nick', salary: 1600}],
      internals: [{name: 'Jack', salary: 1300}, {name: 'Denny', salary: 1500}]  
    }
  };
  const equivalent = '$';
  function getObjectCompany(department) {
    if (Array.isArray(department)) {
        department.forEach(worker => {
            console.log(`Name: ${worker.name} Salary: ${worker.salary} ${equivalent}`);
            const list = document.getElementById('list');
            const newItem = document.createElement('li');
            newItem.textContent = `Ім'я: ${worker.name}. ЗП: ${worker.salary}  ${equivalent}`;
            list.appendChild(newItem);
        });
    } else {
        for (const subDepartment in department) {
            getObjectCompany(department[subDepartment]);
          }
    };
  }
  
  function getSalary(folder) {
   let allSalaries = [];
   if (Array.isArray(folder)) {
    allSalaries = folder.map(comp => comp.salary)
   } 
   else {
    for (const subFolder in folder){
            allSalaries = allSalaries.concat(getSalary(folder[subFolder]));
        }   
    }   
    let sumSalary = allSalaries.reduce((sum, salary) => sum + salary, 0);
    return sumSalary;  
  }
  getObjectCompany(company);
  console.log(getSalary(company));
  document.getElementById('recursive').textContent = `Загальна зарплата: ${getSalary(company)} ${equivalent}`;
  
