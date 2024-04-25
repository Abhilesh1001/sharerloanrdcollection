import React from 'react'

const Page = () => {
  return (
    <main className="min-h-screen bg-base-100">

    {/* Main content area */}
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Placeholder for dashboard content */}
        <div className="flex flex-col my-2 w-full">
          <div className="grid h-auto pt-4 pb-4 text-accent font-bold text-2xl card bg-base-300 rounded-box place-items-center pr-4 pl-6">
          This project aims to streamline the management of shareholder accounts, recurring deposits (RDs), loan distribution and collection, as well as expense tracking. It facilitates efficient handling of these financial operations by providing comprehensive functionalities.
          </div>
          <div className="divider divider-secondary"></div>

        </div>

        <div className="flex flex-col w-full lg:flex-row">
          <div className="grid flex-grow  p-4 text-lg h-auto card bg-base-300 text-success rounded-box place-items-center">
          1.	Creating Account : Customer Account is creating from Add Person 
          <div></div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow text-lg text-success p-4 h-auto card bg-base-300 rounded-box place-items-center">
          2.	RD Creation : One Customer can hold many RDS and as per this we will provide Intrest rate on this and it can be close as require.
          </div>
        </div>
        <div className="flex flex-col w-full lg:flex-row mt-4">
          <div className="grid flex-grow  p-4 text-lg h-auto card bg-base-300 text-success rounded-box place-items-center">
          3.	Loan :One Customer can hold multiple Loan according to that we can calculate EMI and can be collected moneney as per date or per day collection and can be close according to EMI Sheet.
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow text-lg text-success p-4 h-auto card bg-base-300 rounded-box place-items-center">
          4.	Share Holder: Customer can give money and according to profit loss through RD collection and loan collection or distribution shre will be provided to customer according to that customer can quit according to share money will be provided.
          </div>
        </div>

        <div className="flex flex-col w-full lg:flex-row mt-4">
          <div className="grid flex-grow  p-4 text-lg h-auto card bg-base-300 text-success rounded-box place-items-center">
          5.	Fixed Deposite : Customer can give Fixed Deposite will be provided intrest as per certain condition.
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow text-lg text-success p-4 h-auto card bg-base-300 rounded-box place-items-center">
          6.	Expenses : During this process any expenses can be credit or debit 
          </div>
        </div>
        <div className="flex flex-col w-full lg:flex-row mt-4">
          <div className="grid flex-grow  p-4 text-lg h-auto card bg-base-300 text-success rounded-box place-items-center">
          7.	Staff Salary  : For the collection of Money from many customer
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow text-lg text-success p-4 h-auto card bg-base-300 rounded-box place-items-center">
          8.	Assets: During this If any assets is purchasing then it can be added 
          </div>
        </div>
        <div className="flex flex-col w-full lg:flex-row mt-4">
          <div className="grid flex-grow  p-4 text-lg h-auto card bg-base-300 text-success rounded-box place-items-center">
          7.	Cash Flow Statement  : Through Cash flow state ment we can check daily loan collection, RD Collection , customer add all the record can be traced here 
          
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow text-lg text-success p-4 h-auto card bg-base-300 rounded-box place-items-center">
          8.	Profit and Losss: Through the date section we can gate from particular date (date range) we can get profit and loss statemet.  
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}

export default Page