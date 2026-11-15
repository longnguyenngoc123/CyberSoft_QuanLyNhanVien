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

    

}

export default Company;