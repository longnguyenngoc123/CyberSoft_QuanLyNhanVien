import { getElementById } from "../controller/main.js";

class Validation {

    checkEmpty(value, divId, mess) {
        let spaceRegex = /^ +$/;
        if(value === "" || value.match(spaceRegex)) {
            this.updateDom(divId, mess, true);
            return false;
        }
        this.updateDom(divId, mess, false);
        return true;
    }

    checkIfExisTk(tk, divId, mess, data) {
        for (let i = 0; i < data.length; i++) {
            if  (tk === data[i].tk) {
                this.updateDom(divId, mess, true);
                return false;
            }
        }
        this.updateDom(divId, mess, false);
        return true;
    }

    checkIfCorrectLength(value, divId, mess, lowerLimit, upperLimit) {
        if(value.length < lowerLimit || value.length > upperLimit) {
            this.updateDom(divId, mess, true);
            return false
        }
        this.updateDom(divId, mess, false);
        return true;
        
    } 

    checkIfNumber(value, divId, mess) {
        const regex =  /^[0-9]+$/;
        if (value.match(regex)) {
            this.updateDom(divId, mess, false);
            return true;
        }
        this.updateDom(divId, mess, true);
        return false;
    }

    checkIfCharacter(value, divId, mess) {
        const regex = /^[\p{L}\s]+$/u;
        if (value.match(regex)) {
            this.updateDom(divId, mess, false);
            return true;
        }
        this.updateDom(divId, mess, true);
        return false;
    }

    checkIfEmail(value, divId, mess) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(regex)) {
            this.updateDom(divId, mess, false);
            return true;
        }
        this.updateDom(divId, mess, true);
        return false;
    }

    checkIfPassword(value, divId, mess) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(regex)) {
            this.updateDom(divId, mess, false);
            return true;
        }
        this.updateDom(divId, mess, true);
        return false;
    }

    checkIfDate(value, divId, mess) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
        const regexUS = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        if (value.match(regex) || value.match(regexUS)) {
            this.updateDom(divId, mess, false);
            return true;
        }
        this.updateDom(divId, mess, true);
        return false;
    }

    checkPosition(value, divId, mess) {
        if (["Sếp", "Trưởng phòng", "Nhân viên"].includes(value)) {
            this.updateDom(divId, mess, false);
            return true;
        }
        this.updateDom(divId, mess, true);
        return false;
    }

    updateDom(divId, mess, error) {
        if (error) {
            getElementById(divId).innerHTML = mess;
            getElementById(divId).style.display = "block"
        }
        
        else {
            getElementById(divId).innerHTML = ""
            getElementById(divId).style.display = "none"
        }
        
    }

    checkIfCorrectValue(value, divId, mess, lower, upper) {
        if(value < lower || value > upper) {
            this.updateDom(divId, mess, true);
            return false
        }
        this.updateDom(divId, mess, false);
        return true;
    }

}

export default Validation;