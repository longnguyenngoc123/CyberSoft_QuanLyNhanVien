import Company from "../model/company.js";
import Emloyee from "../model/employee.js";
import Validation from "../model/validation.js";

let employeeList = new Company;
let validation = new Validation;

export function getElementById(id) {
    return document.getElementById(id);
}

function getEmployee(isUpdate) {
    const tk = getElementById("tknv").value;
    const name = getElementById("name").value;
    const email = getElementById("email").value;
    const password = getElementById("password").value;
    const workDay = getElementById("datepicker").value;
    const salary = getElementById("luongCB").value;
    const position = getElementById("chucvu").value;
    const workHours = getElementById("gioLam").value;

    let isValid = validateEmployee(tk, name, email, password, workDay, salary, position, workHours, isUpdate);
    if (!isValid) return null;

    const employee = new Emloyee(tk, name, email, password, workDay, salary, position, workHours);
    return employee;
}

getElementById("btnThemNV").onclick = function() {
    const employee = getEmployee();
    if (employee !== null) {
        employeeList.addEmployee(employee);
        addToLocalStorage(employeeList.employees);
        renderEmployeeList();
    }
}

getElementById("btnThem").onclick = () => resetModal();

function resetModal() {
    document.getElementById("employeeForm").reset();
    getElementById("btnThemNV").style.display = "block";
    getElementById("btnCapNhat").style.display = "none";
    getElementById("header-title").innerHTML = "Log in";
    let spans = document.querySelectorAll(".sp-thongbao");
    spans.forEach(span => {
        span.style.display = "none";
    });
}

function addToLocalStorage(employee) {
    const dataString = JSON.stringify(employee);
    localStorage.setItem("EMPLOYEE", dataString);
}

function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("EMPLOYEE"));
    if (data !== null) {
        employeeList.employees = data;
        renderEmployeeList();
    }
    
}

function renderEmployeeList() {
    let employees = employeeList.employees;
    let content = "";
    if (employees !== null) {
            for(let i = 0; i < employees.length; i++) {
            if (employees[i] === null) {
                return;
            }
            content +=
            `<tr>
                <td>${employees[i].tk}</td>
                <td>${employees[i].name}</td>
                <td>${employees[i].email}</td>
                <td>${employees[i].workDay}</td>
                <td>${employees[i].position}</td>
                <td>${employees[i].totalSalary}</td>
                <td>${employees[i].rank}</td>
                <td>
                    <button onClick="handleEdit('${employees[i].tk}')" data-target="#myModal" data-toggle="modal" class="btn btn-info">Edit</button>
                    <button onClick="handleDelete('${employees[i].tk}')" class="btn btn-danger">Delete</button>
                </td>
            </tr>`
        }
    }
    getElementById("tableDanhSach").innerHTML = content;
}

function handleDelete(tk) {
    employeeList.deleteEmployee(tk);
    addToLocalStorage(employeeList.employees);
    renderEmployeeList();
}

function handleEdit(tk) {
    resetModal();
    getElementById("header-title").innerHTML = "Edit employee";
    const data = employeeList.findEmployeeBytk(tk);
    if(data !== null) {
        getElementById("tknv").value = data.tk;
        getElementById("tknv").disabled = true;
        getElementById("name").value = data.name;
        getElementById("email").value = data.email;
        getElementById("password").value = data.password;
        getElementById("datepicker").value = data.workDay;
        getElementById("luongCB").value = data.salary;
        getElementById("chucvu").value = data.position;
        getElementById("gioLam").value = data.workHours;
    }

    getElementById("btnThemNV").style.display = "none";
    getElementById("btnCapNhat").style.display = "block";
}

getElementById("btnCapNhat").onclick = function() {
    let employee = getEmployee(true);
    employeeList.editEmployee(employee.tk, employee);
    addToLocalStorage(employeeList.employees);
    renderEmployeeList();
}

function validateEmployee(tk, name, email, password, workDay, salary, position, workHours, isUpdate) {
    let isValid = true;
    isValid &= validation.checkEmpty(tk, "tbTKNV", "(*) Tai khoan khong duoc de trong") &&
    validation.checkIfCorrectLength(tk, "tbTKNV", "(*) Tai khoan phai tu 4 den 6 ky so", 4 , 6) &&
    (isUpdate || validation.checkIfExisTk(tk, "tbTKNV", "(*) Tai khoan da ton tai", employeeList.employees));

    isValid &= validation.checkEmpty(name, "tbTen", "(*) Ten khong duoc de trong") &&
    validation.checkIfCharacter(name, "tbTen", "(*) Ten phai la chu");

    isValid &= validation.checkEmpty(email, "tbEmail", "(*) Email khong duoc de trong") &&
    validation.checkIfEmail(email, "tbEmail", "(*) Email khong hop le");

    isValid &= validation.checkEmpty(password, "tbMatKhau", "(*) Mat khau khong duoc de trong") &&
    validation.checkIfCorrectLength(password, "tbMatKhau", "(*) Mat khau phai tu 6 den 10 ky tu", 6, 10) &&
    validation.checkIfPassword(password, "tbMatKhau", "(*) Mat khau khong hop le");

    isValid &= validation.checkEmpty(workDay, "tbNgay", "(*) Ngay lam khong duoc de trong") &&
    validation.checkIfDate(workDay, "tbNgay", "(*) Ngay khong hop le");

    isValid &= validation.checkEmpty(salary, "tbLuongCB", "(*) Luong khong duoc de trong") &&
    validation.checkIfNumber(salary, "tbLuongCB", "(*) Luong phai la so") &&
    validation.checkIfCorrectValue(salary, "tbLuongCB", "(*) Luong phai tu 1tr den 20tr", 1000000, 20000000);

    isValid &= validation.checkEmpty(position, "tbChucVu", "(*) Chuc vu khong duoc de trong") &&
    validation.checkPosition(position, "tbChucVu", "(*) Chuc vu khong hop le");

    isValid &= validation.checkEmpty(workHours, "tbGiolam", "(*) Gio lam khong duoc de trong") &&
    validation.checkIfNumber(workHours, "tbGiolam", "(*) Gio lam phai la so") &&
    validation.checkIfCorrectValue(workHours, "tbGiolam", "(*) Gio lam khong hop le", 80, 200);
    return isValid;
} 

getLocalStorage();

window.handleDelete = handleDelete;
window.handleEdit = handleEdit;