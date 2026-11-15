class Emloyee {
    
    constructor(tk, name, email, password, workDay, salary, position, workHours) {
        this.tk = tk;
        this.name = name;
        this.email = email;
        this.password = password;
        this.workDay = workDay;
        this.salary = salary
        this.position = position;
        this.workHours = workHours;
        this.totalSalary = this.totalSalaryCount();
        this.rank = this.countRank();

    }


    totalSalaryCount() {
        if(this.position === "Sếp") {
            return this.salary * 3;
        }
        
        if(this.position === "Trưởng phòng") {
            return this.salary * 2;
        }
        return this.salary;
    }

    countRank() {
        if (this.workHours >= 192) {
            return "Xuất sắc";
        }

        else if(this.workHours >= 176) {
            return "Giỏi";
        }

        else if(this.workHours >= 160) {
            return "Khá";
        }

        else {
            return "Trung bình";
        }
    }
    
}
export default Emloyee;