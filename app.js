const prompt = require("prompt-sync")();
const mongoose = require("mongoose");
const Customer = require('./model.js')
require("dotenv").config();

console.log("Welcome to the CRM")

console.log("What would you like to do?");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
};
connect();


const createCustomer = async () => {
  let customerName = prompt("What is the customer name");
  let customerAge = parseInt(prompt("What is the customer age?"));

  const customerData = {
    name: customerName,
    age: customerAge,
  };

  const customer = await Customer.create(customerData);
  console.log('New customer created', Customer)
};

const viewCustomers = async () => {
    const allTheCustomers = await Customer.find({});
    console.log(allTheCustomers)
}

const updateCustomer = async () => {
    let customerId = prompt("Copy and paste the id of the customer you would like to update here: ");
    let customerName = prompt("What is the customer's new name? ");
    let customerAge = prompt("What is the customer's new age: ");
    

    const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        { name: customerName,
          age: customerAge },   
        { new: true }           
    );

    if (updatedCustomer) {
        console.log( "Customer has been updated", updatedCustomer);
    } else {
        console.log("Customer not found!");
    }
};

const deleteCustomer = async () => {
    let customerName = prompt('Enter the name of customer you want to delete:');

    const deletedCustomer = await Customer.findOneAndDelete( {name: customerName} );
    if (deletedCustomer) {
        console.log("Customer has been deleted", deletedCustomer)
    } else {
        console.log('customer not found')
    }

};

const quitCustomer = async () => {
    await mongoose.disconnect();
    console.log('exiting...')
    process.exit();
};

const choiceOptions = async () => {
    console.log(" 1. Create a customer");
    console.log(" 2. View All customers");
    console.log(" 3. update a customer");
    console.log(" 4. Delete a customer");
    console.log(" 5. Quit");
    
    let methodNum = prompt("Number of action to run");
    console.log(methodNum);

    if (methodNum === '1') {
      createCustomer();
    }

    else if (methodNum === '2') {
        viewCustomers();
    }

    else if (methodNum === '3') {
        updateCustomer();
    }

    else if (methodNum === '4') {
     deleteCustomer();
    }

    else if (methodNum === '5') {
        quitCustomer();
    }

    else {
        console.log("Invalid option. Please choose a valid number.")
    }
}
choiceOptions();


