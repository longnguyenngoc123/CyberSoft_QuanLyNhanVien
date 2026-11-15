class Company {

    constructor() {
        this.employees = [];
    }

    addEmployee(employee) {
        this.employees.push(employee);
    }

    deleteEmployee(tk) {
        const index = this.findIndex(tk);
        if(index !== -1) this.employees.splice(index, 1);
    }

    editEmployee(tk, employee) {
        const index = this.findIndex(tk);
        if(index !== -1) this.employees[index] = employee;
    }

    findIndex(tk) {
        for(let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].tk === tk) {
                return i;
            }
        }
        return -1;
    }

    findEmployeeBytk(tk) {
        const index = this.findIndex(tk);
        if(index === -1) return null;
        return this.employees[index];
    }

    filter(type) {
        let newList = [];
        if (type === "Tất cả") {
            return this.employees;
        }
        for(let i = 0; i < this.employees.length; i++) {
            if(this.employees[i].rank === type) {
                newList.push(this.employees[i]);
            }
        }
        return newList;
    }

    search(keyword) {
        let newList = [];
        if (keyword === null || keyword === "") {
            return this.employees;
        }
        for(let i = 0; i < this.employees.length; i++) {
            if(this.employees[i].name.toLowerCase().includes(keyword.toLowerCase())) {
                newList.push(this.employees[i]);
            }
        }
        return newList;
    }
    
    searchAndFilter(type, keyword) {
        let newList = [];
        for(let i = 0; i < this.employees.length; i++) {
            let isValid = true;
            isValid &= type === "Tất cả" || this.employees[i].rank === type;
            isValid &= (keyword === "" || keyword === null) || 
            this.employees[i].name.toLowerCase().includes(keyword.toLowerCase());
            
            if(isValid) {
                newList.push(this.employees[i]);
            }
        }
        
        return newList;
    }
    

}

export default Company;