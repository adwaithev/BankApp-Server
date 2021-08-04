user = {
    1000: { acno: 1000, uname: "akhil", password: "userone", balance: 3000, transaction: [] },
    1001: { acno: 1001, uname: "aahan", password: "usertwo", balance: 1000, transaction: [] }
}


const register = (acno, uname, password) => {


    if (acno in user) {

        return {
            statusCode: 422,
            status: false,
            message: "user already exists please login"
        }
    }

    else {
        user[acno] = {
            acno,
            uname,
            password,
            balance: 0,
            transaction: []
        }
        return {
            status: true,
            statusCode: 200,
            message: "Registration suceessful"
        }
    }
}


const login = (acno, pswd) => {

    if (acno in user) {
        if (pswd == user[acno]["password"]) {
            currentuser = user[acno]["uname"];
            currentacc = acno;

            return {
                status: true,
                statusCode: 200,
                message: 'login successful'
            }
        }
        else {

            return {
                status: false,
                statusCode: 422,
                message: 'incorrect password'
            }
        }

    }
    else {

        return {
            status: false,
            statusCode: 422,
            message: 'invalid user'
        }
    }

}

const deposit = (acno, password, amt) => {

    var amount = parseInt(amt);

    if (acno in user) {
        if (password == user[acno]["password"]) {
            user[acno]["balance"] += amount;

            user[acno]['transaction'].push({
                amount: amount,
                type: "CREDIT"
            })



            return {
                status: true,
                statusCode: 200,
                message: amount + "Debited successfuly and new balance is :" + user[acno]["balance"]
            }
        }
        else {

            return {
                status: false,
                statusCode: 422,
                message: "incorrect password"
            }
        }
    }
    else {

        return {
            status: false,
            statusCode: 422,
            message: "invalid user"
        }
    }
}

const withdraw = (acno, password, amt) => {

    var amount = parseInt(amt);
    if (acno in user) {

        if (password == user[acno]["password"]) {

            if (user[acno]["balance"] >= amount) {
                user[acno]["balance"] -= amount;
                user[acno]['transaction'].push({
                    amount: amount,
                    type: "DEBIT"
                })

                return {
                    status: true,
                    statusCode: 200,
                    message: amount + "is debited, available balance is:" + user[acno]["balance"]
                }

            } else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "insufficiet fund"
                }
            }
        } else {

            return {
                status: true,
                statusCode: 422,
                message: "incorrect password"
            }
        }

    } else {
        return {
            status: true,
            statusCode: 422,
            message: "invalid user"
        }
    }

}




module.exports = {
    register,
    login,
    deposit,
    withdraw
}